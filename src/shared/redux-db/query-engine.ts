import {
  eq,
  lt,
  lte,
  gt,
  gte,
  startsWith,
  stubTrue,
  noop,
  head,
  get,
  isNumber,
  isString,
  isBoolean,
  isDate,
  set,
  isEqual,
} from "lodash";
import { Query, FilterNode, QuerySort } from "./query";
import { Table } from "./table";
import { PrimaryKey, TableRecord } from "./table-record";
import CryptoJS, { SHA256 } from "crypto-js";
import { Unsubscribe } from "./table-record-change-emitter";
import { QueryChangeEmitter } from "./query-change-emitter";

export type Operator = (...p: unknown[]) => unknown;
export type GetTable = (tableName: string) => Table;
export type PrimaryKeySet = Set<PrimaryKey>;
export type TableRecordSet = Set<TableRecord>;
export type RecordPredicate = (
  record: TableRecord,
  otherRecord?: TableRecord
) => boolean;
export type SortCompareFn = (lhs: TableRecord, rhs: TableRecord) => number;

function not(value: boolean): boolean {
  return !value;
}

function neq(value: boolean) {
  return !value;
}

function _and(...values: boolean[]): boolean {
  return values.reduce(
    (previousValue: boolean, currentValue: boolean) =>
      previousValue && currentValue,
    true
  );
}

function _or(...values: boolean[]): boolean {
  return values.reduce(
    (previousValue: boolean, currentValue: boolean) =>
      previousValue || currentValue,
    false
  );
}

function arrayStartWith(target: unknown[], needle: unknown[]): boolean {
  if (target.length < needle.length) {
    return false;
  }

  for (const index in needle) {
    if (target[index] !== needle[index]) {
      return false;
    }
  }

  return true;
}

export const operators: Record<string, Operator> = {
  eq: eq,
  lt: lt,
  lte: lte,
  gt: gt,
  gte: gte,
  not: not as Operator,
  neq: neq as Operator,
  and: _and as Operator,
  or: _or as Operator,
  startsWith: startsWith as Operator,
  number: (...p: unknown[]) => Number(head(p)),
  boolean: (...p: unknown[]) => Boolean(head(p)),
  string: (...p: unknown[]) => String(head(p)),
  head: head as Operator,
  isEqual: isEqual,
  arrayStartWith: arrayStartWith as Operator,
};

function buildPredicate(
  parameters: Record<string, unknown>,
  filter: FilterNode | []
): RecordPredicate {
  function evalTree(
    record: TableRecord,
    otherRecord: TableRecord,
    filter: FilterNode
  ): unknown {
    const [name, children] = filter;
    const prefix = head(name);
    const identifier = name.substring(1);

    if (prefix === "$") {
      const args = children.map((child) =>
        evalTree(record, otherRecord, child)
      );
      const operator = operators[identifier];

      if (operator === undefined) {
        throw new Error(`No operator named ${identifier}`);
      }

      return operator(...args);
    } else if (prefix === ":") {
      if (!parameters.hasOwnProperty(identifier)) {
        throw new Error(`No parameter named`);
      }

      return parameters[identifier];
    } else if (prefix === ".") {
      return get(otherRecord, identifier);
    } else {
      return get(record, name);
    }
  }

  const evaluate = filter.length === 0 ? stubTrue : evalTree;

  return (record: TableRecord, otherRecord: TableRecord = {}): boolean =>
    Boolean(evaluate(record, otherRecord, filter as FilterNode));
}

function buildSortCompareFn(
  sorts: QuerySort[],
  isLessThan: (a: unknown, b: unknown) => boolean
): SortCompareFn {
  return (lhs: TableRecord, rhs: TableRecord): number => {
    for (const querySort of sorts) {
      const lhsValue = get(lhs, querySort.path);
      const rhsValue = get(rhs, querySort.path);

      if (lhsValue === rhsValue) {
        continue;
      }

      const reverseFactor = querySort.asc === true ? 1 : -1;

      if (isLessThan(lhsValue, rhsValue)) {
        return -1 * reverseFactor;
      }

      return 1 * reverseFactor;
    }

    return 0;
  };
}

export function getQueryFootprint(query: Query): string {
  return SHA256(JSON.stringify(query)).toString(CryptoJS.enc.Hex);
}

interface Layer {
  tableName: string;
  resultset: Set<PrimaryKey>;
  predicate: RecordPredicate;
}

export class QueryExecutor {
  private query: Query;
  private getTable: GetTable;
  private layers: Layer[] = [];
  public unsubscribe: Unsubscribe = noop;
  public queryChangeEmitter = new QueryChangeEmitter();
  public isLessThanFn = (a: unknown, b: unknown) => {
    if (isNumber(a) && isNumber(b)) {
      return a < b;
    }

    if (isString(a) && isString(b)) {
      return a < b;
    }

    if (isBoolean(a) && isBoolean(b)) {
      return a < b;
    }

    if (isDate(a) && isDate(b)) {
      return a < b;
    }

    throw new Error(`Cannot compare types ${typeof a}, ${typeof b}`);
  };

  public constructor(query: Query, getTable: GetTable) {
    this.query = query;
    this.getTable = getTable;
  }

  public addLayer(tableName: string, where: FilterNode | []): void {
    const predicate = buildPredicate(this.query.parameters, where);
    const table = this.getTable(tableName);
    const records = table.records.filter((x) => predicate(x));
    const layer: Layer = {
      tableName,
      predicate: predicate,
      resultset: new Set<PrimaryKey>(records.map(table.buildPk)),
    };

    this.layers.push(layer);

    const buildPk = table.buildPk;
    this.unsubscribe = table.tableEventEmitter.addOnCommitSubscriber(
      (
        insertions: TableRecord[],
        deletions: TableRecord[],
        updates: [TableRecord, TableRecord][]
      ) => {
        const hasInsertion = insertions.some((record) => predicate(record));
        const hasDeletion = deletions.some((record) =>
          layer.resultset.has(buildPk(record))
        );
        const hasUpdate = updates.some(([_, record]) =>
          layer.resultset.has(buildPk(record))
        );

        if (hasInsertion || hasDeletion || hasUpdate) {
          const records = this.execute();
          this.queryChangeEmitter.triggerQueryResult(records);
        }
      }
    );
  }

  public execute(): TableRecord[] {
    const table = this.getTable(this.query.fromTable);
    const wherePredicate = buildPredicate(
      this.query.parameters,
      this.query.where
    );
    let records: TableRecord[] = table.records;

    for (const queryJoin of this.query.joins) {
      const targetTable = this.getTable(queryJoin.onTable);
      const joinPredicate = buildPredicate(
        this.query.parameters,
        queryJoin.where
      );
      const combinedRecords: TableRecord[] = [];

      for (const queryRecord of records) {
        for (const candidateRecord of targetTable.records) {
          if (joinPredicate(queryRecord, candidateRecord)) {
            combinedRecords.push({
              ...queryRecord,
              [queryJoin.toProperty]: candidateRecord,
            });
          }
        }
      }
    }

    let postProcessedRecords = records.filter((x) => wherePredicate(x));

    if (this.query.sort.length > 0) {
      const sortCmp = buildSortCompareFn(this.query.sort, this.isLessThanFn);
      postProcessedRecords.sort(sortCmp);
    }

    if (this.query.projections.length > 0) {
      postProcessedRecords = postProcessedRecords.map((record) =>
        this.query.projections.reduce((previousValue, [path, alias]) => {
          const value = get(record, path);
          set(previousValue, alias, value);
          return previousValue;
        }, {})
      );
    }

    return postProcessedRecords;
  }
}

export class QueryEngine {
  private getTable: GetTable;

  public constructor(getTable: GetTable) {
    this.getTable = getTable;
  }

  public build(query: Query): QueryExecutor {
    if (query.joins.length === 0) {
      const executor = new QueryExecutor(query, this.getTable);
      executor.addLayer(query.fromTable, query.where);
      return executor;
    } else {
      throw new Error("Unsupported query");
    }
  }
}

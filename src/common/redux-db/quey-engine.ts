import { eq, lt, lte, gt, gte, startsWith, stubTrue, noop } from 'lodash'
import { Query, FilterNode, QueryParameter } from './query';
import { Table } from './table';
import { PrimaryKey, TableRecord } from './table-record';
import CryptoJS, { SHA256 } from 'crypto-js';
import { Unsubcribe } from './table-watcher';

export type Operator = (...p: unknown[]) => unknown;
export type GetTable = (tableName: string) => Table;
export type PrimaryKeySet = Set<PrimaryKey>;
export type TableRecordSet = Set<TableRecord>;
export type RecordPredicate = (record: TableRecord) => boolean

function not(value: boolean): boolean {
    return !value;
}

function neq(value: boolean) {
    return !value;
}

function _and(...values: boolean[]): boolean {
    return values.reduce((previousValue: boolean, currentValue: boolean) => previousValue && currentValue, true)
}

function _or(...values: boolean[]): boolean {
    return values.reduce((previousValue: boolean, currentValue: boolean) => previousValue || currentValue, false)
}

const operators: Record<string, Operator> = {
        "$eq": eq,
        "$lt": lt,
        "$lte": lte,
        "$gt": gt,
        "$gte": gte,
        "$not": not as Operator,
        "$neq": neq as Operator,
        "$and": _and as Operator,
        "$or": _or as Operator,
        "$startsWith": startsWith as Operator
    };

function buildPredicate(parameters: QueryParameter, filter: FilterNode | []): RecordPredicate {
    function evalTree(record: TableRecord, filter: FilterNode): unknown {
        const [ name, children] = filter

        if(name.startsWith('$')) {
            const args = children.map(child => evalTree(record, child))
            const operator = operators[name];

            if(operator === undefined) {
                throw new Error(`No operator named ${name}`)
            }

            return operator(...args)
        }
        else if(name.startsWith(':')) {
            const parameterName = name.substring(1)

            if(!parameters.has(parameterName)) {
                throw new Error(`No parameter named`)
            }

            return parameters.get(parameterName)
        }
        else {
            return record[name];
        }
    }

    const evaluate = filter.length === 0 ? stubTrue : evalTree;

    return (record: TableRecord): boolean => Boolean(evaluate(record, filter as FilterNode))
}

export function getQueryFootprint(query: Query): string {
    return SHA256(JSON.stringify(query)).toString(CryptoJS.enc.Hex)
}

interface Layer {
    tableName: string;
    resultset: Set<PrimaryKey>
    predicate: RecordPredicate
}

export class QueryExecutor {
    private query: Query;
    private getTable: GetTable;
    private layers: Layer[] = [];
    public unsubscribe: Unsubcribe = noop;

    public constructor(query: Query, getTable: GetTable) {
        this.query = query;
        this.getTable = getTable
    }

    public addLayer(tableName: string, where: FilterNode | []): void {
        const predicate = buildPredicate(this.query.parameters, where);
        const table = this.getTable(tableName)
        const records = table.records.filter(predicate)
        const layer: Layer = {
            tableName,
            predicate: predicate,
            resultset: new Set<PrimaryKey>(records.map(table.buildPk))
        } 
        
        this.layers.push(layer)

        const buildPk = table.buildPk
        this.unsubscribe = table.watchTable({
            onUpdate: (_, after) => layer.resultset.has(buildPk(after)),
            onRemove: (record) => layer.resultset.has(buildPk(record)),
            onInsert: (record) => layer.predicate(record),
        })
    }

    public execute(): TableRecord[] {
        const results: TableRecord[] = [];
        const lastLayer = this.layers[this.layers.length - 1];
        const table = this.getTable(lastLayer.tableName)

        for(const primaryKey of lastLayer.resultset) {
            results.push(table.getRecord(primaryKey).value);
        }

        return results;
    }
}

export class QueryEngine {
    private getTable: GetTable;

    public constructor(getTable: GetTable) {
        this.getTable = getTable;
    }

    public build(query: Query): QueryExecutor {
        if(query.joins.length === 0) {
            const executor = new QueryExecutor(query, this.getTable);
            executor.addLayer(query.fromTable, query.where);
            return executor;
        }
        else {
            throw new Error("Unsupported query")
        }
    }
}
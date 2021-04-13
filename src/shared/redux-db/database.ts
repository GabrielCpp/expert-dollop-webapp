import { DatabaseTable } from "./database-table";
import { Query } from "./query";
import { PrimaryIndex, Table } from "./table";
import { TableRecord } from "./table-record";
import { getQueryFootprint, QueryEngine, QueryExecutor } from "./query-engine";
import { Unsubscribe } from "./table-record-change-emitter";
import { OnQueryChange } from "./query-change-emitter";
import { Transaction } from "./transaction";

export class ReduxDatabase {
  private readonly _tables = new Map<string, Table>();
  private readonly _queries = new Map<string, QueryExecutor>();
  private readonly _queryEngine: QueryEngine;
  private _transaction = new Transaction();

  public constructor() {
    this.getInternalTable = this.getInternalTable.bind(this);
    this._queryEngine = new QueryEngine(this.getInternalTable);
  }

  public transaction(action: (t: ReduxDatabase) => void) {
    this._transaction.openTransaction();

    try {
      action(this);
    } finally {
      this._transaction.closeTransaction();
      this._transaction.commit();
    }
  }

  public query<T extends TableRecord>(query: Query): T[] {
    const queryFootprint = getQueryFootprint(query);
    const queryExecutor = this._queries.get(queryFootprint);

    if (queryExecutor !== undefined) {
      return queryExecutor.execute() as T[];
    }

    return new QueryExecutor(query, this.getInternalTable).execute() as T[];
  }

  public watchQuery<T>(
    query: Query,
    onChange: OnQueryChange<T>
  ): [T[], Unsubscribe] {
    const queryFootprint = getQueryFootprint(query);
    let queryExecutor = this._queries.get(queryFootprint);

    if (queryExecutor === undefined) {
      queryExecutor = this._queryEngine.build(query);
      this._queries.set(queryFootprint, queryExecutor);
    }

    const unsubscribe = queryExecutor.queryChangeEmitter.addQueryWatcher(
      onChange
    );
    const records = queryExecutor.execute() as T[];

    return [records, unsubscribe];
  }

  public addTable(tableName: string, primaryIndex?: PrimaryIndex): void {
    if (!this._tables.has(tableName)) {
      this._tables.set(tableName, new Table([], primaryIndex));
    }
  }

  public getTable(tableName: string): DatabaseTable {
    let table = this._tables.get(tableName);

    if (table === undefined) {
      table = new Table();
      this._tables.set(tableName, table);
    }

    return new DatabaseTable(
      table,
      this._transaction.openTableTransaction(table)
    );
  }

  private getInternalTable(tableName: string) {
    const table = this._tables.get(tableName);

    if (table === undefined) {
      throw new Error(`No such table ${tableName}`);
    }

    return table;
  }
}

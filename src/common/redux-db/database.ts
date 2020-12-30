
import { DatabaseTable } from './database-table';
import { Query } from './query';
import { PrimaryIndex, Table } from './table'
import { TableRecord } from './table-record';
import { getQueryFootprint, QueryEngine, QueryExecutor } from './quey-engine';
import { Unsubcribe } from './table-watcher';

export class Database {
    private _tables = new Map<string, Table>();
    private _queries = new Map<string, QueryExecutor>();
    private _queryEngine = new QueryEngine((tableName) => {
        const table = this._tables.get(tableName);

        if(table === undefined) {
            throw new Error(`No such table ${tableName}`);
        }

        return table;
    })

    public query<T extends TableRecord>(query: Query): T[] {
        const queryFootprint = getQueryFootprint(query)
        const queryExecutor = this._queries.get(queryFootprint)

        if(queryExecutor !== undefined) {
            return queryExecutor.execute() as T[];
        }

        throw new Error('Direct execution not implemented')
    }

    public watchQuery(query: Query): Unsubcribe {
        const queryFootprint = getQueryFootprint(query)
        let queryExecutor = this._queries.get(queryFootprint)

        if(queryExecutor === undefined) {
            queryExecutor = this._queryEngine.build(query);
            this._queries.set(queryFootprint, queryExecutor)
        }

        return queryExecutor.unsubscribe
    }

    public addTable(tableName: string, primaryIndex?: PrimaryIndex): void {
        if(!this._tables.has(tableName)) {
            this._tables.set(tableName, new Table([], primaryIndex));
        }
    }

    public getTable(tableName: string): DatabaseTable {
        let table = this._tables.get(tableName);

        if(table === undefined) {
            table = new Table()
            this._tables.set(tableName, table);
        }

        return new DatabaseTable(table)
    }
}
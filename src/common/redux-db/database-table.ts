import { PrimaryKey, TableRecord } from './table-record';
import { Unsubcribe, WatchEvent } from './table-watcher';
import { TableTransaction } from './table-transaction';
import { Table } from './table';

export class DatabaseTable {
    private _tableTransaction = new TableTransaction();
    private _table: Table;

    public constructor(table: Table) {
        this._table = table;
    }

    public transaction(action: (t: DatabaseTable) => void) {
        this._tableTransaction.openTransaction();

        try {
            action(this);
        }
        finally {
            this._tableTransaction.closeTransaction();
            this._tableTransaction.commit()
        }
    }

    public upsertMany(records: TableRecord[]) {
        this._table.upsertMany(this._tableTransaction, records)
        this._tableTransaction.commit()
    }

    public removeMany(records: TableRecord[]) {
        this._table.removeMany(this._tableTransaction, records)
        this._tableTransaction.commit()
    }

    public removeManyByKey(records: PrimaryKey[]) {
        this._table.removeManyByKey(this._tableTransaction, records)
        this._tableTransaction.commit()
    }

    public getPrimaryKey(record: TableRecord): PrimaryKey {
        return this._table.buildPk(record);
    }

    public findRecord<T extends TableRecord>(primaryKey: PrimaryKey): T {
        return this._table.getRecord(primaryKey).value as T;
    }

    public watchRecord(primaryKey: string, events: WatchEvent): Unsubcribe {
        return this._table.watchRecord(primaryKey, events)
    }

    public watchTable(events: WatchEvent): Unsubcribe {
        return this._table.watchTable(events)
    }
}


import { PrimaryKey, TableRecord } from './table-record';
import { Unsubscribe, WatchEvent } from './table-record-change-emitter';
import { TableTransaction } from './table-transaction';
import { Table } from './table';
import { OnTableChange } from './table-change-emitter';

export class DatabaseTable {
    private _tableTransaction;
    private _table: Table;

    public constructor(table: Table, tableTransaction: TableTransaction) {
        this._table = table;
        this._tableTransaction = tableTransaction;
    }

    public upsertMany(records: TableRecord[]) {
        this._table.upsertMany(this._tableTransaction, records)
        this._tableTransaction.flush()
    }

    public removeMany(records: TableRecord[]) {
        const buildPk = this._table.buildPk;
        this._table.removeMany(this._tableTransaction, records.map(buildPk))
        this._tableTransaction.flush()
    }

    public removeManyByKey(records: PrimaryKey[]) {
        this._table.removeMany(this._tableTransaction, records)
        this._tableTransaction.flush()
    }

    public getPrimaryKey(record: TableRecord): PrimaryKey {
        return this._table.buildPk(record);
    }

    public findRecord<T extends TableRecord>(primaryKey: PrimaryKey): T {
        return this._table.getRecord(primaryKey).value as T;
    }

    public findRecordSafe<T extends TableRecord>(primaryKey: PrimaryKey): T | undefined {
        try {
            return this._table.getRecord(primaryKey).value as T;
        }
        catch(e) {
            if(e.name !== 'primary_key_missing') {
                throw e;
            }
        }

        return undefined;
    }

    public watchRecord(primaryKey: string, events: WatchEvent): Unsubscribe {
        return this._table.watchRecord(primaryKey, events)
    }

    public watchTable(onTableChange: OnTableChange): Unsubscribe {
        return this._table.tableEventEmitter.addOnCommitSubscriber(onTableChange)
    }
}


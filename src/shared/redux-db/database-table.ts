import { getPk, PrimaryKey, TableRecord } from "./table-record";
import { Unsubscribe, WatchEvent } from "./table-record-change-emitter";
import { TableTransaction } from "./table-transaction";
import { Table } from "./table";
import { OnTableChange } from "./table-change-emitter";

export class DatabaseTable {
  private _tableTransaction;
  private _table: Table;

  public constructor(table: Table, tableTransaction: TableTransaction) {
    this._table = table;
    this._tableTransaction = tableTransaction;
  }

  public where<T extends TableRecord>(
    predicate: (record: T) => boolean
  ): T[] {
    return this._table.where(predicate);
  }

  public upsertMany(records: TableRecord[]) {
    this._table.upsertMany(this._tableTransaction, records);
    this._tableTransaction.flush();
  }

  public removeMany(records: TableRecord[]) {
    this._table.removeMany(this._tableTransaction, records.map(getPk));
    this._tableTransaction.flush();
  }

  public removeManyByKey(records: PrimaryKey[]) {
    this._table.removeMany(this._tableTransaction, records);
    this._tableTransaction.flush();
  }

  public findRecord<T extends TableRecord>(
    primaryKey: PrimaryKey
  ): T | undefined {
    return this._table.getRecord(primaryKey)?.value as T | undefined;
  }

  public findRecordOrDefault<T extends TableRecord>(
    primaryKey: PrimaryKey,
    defaultRecord: T
  ): T {
    return (this._table.getRecord(primaryKey)?.value || defaultRecord) as T;
  }

  public initRecord<T extends TableRecord>(primaryKey: PrimaryKey, defaultValue: T): T {
    let record = this.findRecord(primaryKey)

    if(record === undefined) {
      this._table.silentSet(primaryKey, defaultValue)
      record = defaultValue
    }

    return record as T
  }

  public watchRecord(primaryKey: string, events: WatchEvent): Unsubscribe {
    return this._table.watchRecord(primaryKey, events);
  }

  public watchTable(onTableChange: OnTableChange): Unsubscribe {
    return this._table.tableEventEmitter.addOnCommitSubscriber(onTableChange);
  }
}

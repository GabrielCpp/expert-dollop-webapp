import {
  TableRecord,
  UniqueIndexKeyBuilder,
  PrimaryKey,
  getPk,
} from "./table-record";
import { TableTransaction } from "./table-transaction";
import {
  RecordChangeEmitter,
  Unsubscribe,
  WatchEvent,
} from "./table-record-change-emitter";
import { TableChangeEmitter } from "./table-change-emitter";
import { Transaction } from "./transaction";

class TableRecordDetails extends RecordChangeEmitter {
  public value: TableRecord;

  public constructor(value: TableRecord) {
    super();
    this.value = value;
  }
}

class PrimaryIndex {
  public records = new Map<PrimaryKey, TableRecordDetails>();
  public buildKey: UniqueIndexKeyBuilder;
  public fieldPath: string | undefined;

  public constructor(buildKey: UniqueIndexKeyBuilder, fieldPath?: string) {
    this.buildKey = buildKey;
    this.fieldPath = fieldPath;
  }
}

export class Table {
  private tableChangeEmitter = new TableChangeEmitter();
  private primaryIndex= new PrimaryIndex(getPk, "id");

  public constructor(records: TableRecord[] = []) {
    this.upsertMany(
      new TableTransaction(new Transaction(), this.tableChangeEmitter),
      records
    );
  }

  public get tableEventEmitter(): TableChangeEmitter {
    return this.tableChangeEmitter;
  }

  public get records(): TableRecord[] {
    const records: TableRecord[] = [];

    for (const record of this.primaryIndex.records.values()) {
      records.push(record.value);
    }

    return records;
  }

  public get primaryKeys(): PrimaryKey[] {
    const keys: PrimaryKey[] = [];

    for (const primaryKey of this.primaryIndex.records.keys()) {
      keys.push(primaryKey);
    }

    return keys;
  }

  public where<T extends TableRecord>(
    predicate: (record: T) => boolean
  ): T[] {
    const records: T[] = [];

    for (const record of this.primaryIndex.records.values()) {
      if (predicate(record.value as T)) {
        records.push(record.value as T);
      }
    }

    return records;
  }

  public upsertMany(
    eventCumulator: TableTransaction,
    records: TableRecord[]
  ): void {
    for (const record of records) {
      const primaryKey = this.primaryIndex.buildKey(record);
      let recordDetails = this.primaryIndex.records.get(primaryKey);

      if (recordDetails === undefined) {
        recordDetails = new TableRecordDetails(record);
        this.primaryIndex.records.set(primaryKey, recordDetails);
        eventCumulator.addRecordInsertEvent(recordDetails, record);
      } else {
        const before = recordDetails.value;
        recordDetails.value = record;
        eventCumulator.addRecordUpdateEvent(recordDetails, before, record);
      }
    }
  }

  public removeMany(
    eventCumulator: TableTransaction,
    primaryKeys: PrimaryKey[]
  ) {
    for (const primaryKey of primaryKeys) {
      let recordDetails = this.primaryIndex.records.get(primaryKey);

      if (recordDetails !== undefined) {
        this.primaryIndex.records.delete(primaryKey);
        eventCumulator.addRecordRemoveEvent(recordDetails, recordDetails.value);
      }
    }
  }

  public truncate(eventCumulator: TableTransaction) {
    for (const recordDetails of this.primaryIndex.records.values()) {
      eventCumulator.addRecordRemoveEvent(recordDetails, recordDetails.value);
    }

    this.primaryIndex.records.clear();
  }

  public watchRecord(primaryKey: string, events: WatchEvent): Unsubscribe {
    let recordDetails = this.getRecord(primaryKey);

    if (recordDetails === undefined) {
      if (events.defaultRecord) {
        recordDetails = new TableRecordDetails(events.defaultRecord);
        this.primaryIndex.records.set(primaryKey, recordDetails);
      } else {
        const error = new Error(`No such key ${primaryKey}`);
        error.name = "primary_key_missing";
        throw error;
      }
    }

    return recordDetails.watchEvents(events);
  }

  public getRecord(primaryKey: PrimaryKey): TableRecordDetails | undefined {
    return this.primaryIndex.records.get(primaryKey);
  }

  public silentSet(primaryKey: string, record: TableRecord) {
    const recordDetails = new TableRecordDetails(record);
    this.primaryIndex.records.set(primaryKey, recordDetails);
  }
}

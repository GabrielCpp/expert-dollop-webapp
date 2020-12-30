import { TableRecord, UniqueIndexKeyBuilder, PrimaryKey, getPk, TableWatcher } from './table-record'
import { TableTransaction } from './table-transaction';
import { RecordChangeEmitter, Unsubcribe, WatchEvent } from './table-record-change-emitter';
import { TableChangeEmitter } from './table-change-emitter';

export class TableRecordDetails extends RecordChangeEmitter {
    public value: TableRecord;

    public constructor(value: TableRecord) {
        super();
        this.value = value
    }
}

export class PrimaryIndex {
    public records = new Map<PrimaryKey, TableRecordDetails>();
    public buildKey: UniqueIndexKeyBuilder;
    public fieldPath: string | undefined;

    public constructor(buildKey: UniqueIndexKeyBuilder, fieldPath?: string) {
        this.buildKey = buildKey;
        this.fieldPath = fieldPath
    }
}

export class Table {
    private tableChangeEmitter = new TableChangeEmitter();
    private primaryIndex: PrimaryIndex;

    public constructor(
        records: TableRecord[]=[],
        primaryIndex: PrimaryIndex = new PrimaryIndex(getPk, 'id'),
    ) {
        this.primaryIndex = primaryIndex;
        this.upsertMany(new TableTransaction(this.tableChangeEmitter), records)
    }

    public get tableEventEmitter(): TableChangeEmitter {
        return this.tableChangeEmitter;
    }

    public get buildPk(): UniqueIndexKeyBuilder {
        return this.primaryIndex.buildKey;
    }

    public get records(): TableRecord[] {
        const records: TableRecord[] = [];

        for(const record of this.primaryIndex.records.values()) {
            records.push(record.value)
        }

        return records;
    }

    public get primaryKeys(): PrimaryKey[] {
        const keys: PrimaryKey[] = [];

        for(const primaryKey of this.primaryIndex.records.keys()) {
            keys.push(primaryKey)
        }

        return keys;
    }

    public where<T extends Record<string, unknown>>(predicate: (record: T) => boolean): T[] {
        const records: T[] = [];

        for(const record of this.primaryIndex.records.values()) {
            if(predicate(record.value as T)) {
                records.push(record.value as T)
            }            
        }

        return records;
    }

    public upsertMany(eventCumulator: TableTransaction, records: TableRecord[]): void {
        for(const record of records) {
            const primaryKey = this.primaryIndex.buildKey(record)
            let recordDetails = this.primaryIndex.records.get(primaryKey)

            if(recordDetails === undefined) {                
                recordDetails = new TableRecordDetails(record);
                this.primaryIndex.records.set(primaryKey, recordDetails);
                eventCumulator.addRecordInsertEvent(recordDetails, record)
            }
            else {
                const before = recordDetails.value;
                recordDetails.value = record;
                eventCumulator.addRecordUpdateEvent(recordDetails, before, record)
            }
        }
    }

    public removeMany(eventCumulator: TableTransaction, primaryKeys: PrimaryKey[]) {
        for(const primaryKey of primaryKeys) {
            let recordDetails = this.primaryIndex.records.get(primaryKey)

            if(recordDetails !== undefined) {       
                this.primaryIndex.records.delete(primaryKey);
                eventCumulator.addRecordRemoveEvent(recordDetails, recordDetails.value)         
            }
        }
    }

    public truncate(eventCumulator: TableTransaction) {
        for(const recordDetails of this.primaryIndex.records.values()) {
            eventCumulator.addRecordRemoveEvent(recordDetails, recordDetails.value)   
        }

        this.primaryIndex.records.clear()
    }

    public watchRecord(primaryKey: string, events: WatchEvent): Unsubcribe {
        const recordDetails = this.getRecord(primaryKey);
        return recordDetails.watchEvents(events);
    }

    public getRecord(primaryKey: PrimaryKey): TableRecordDetails {
        const recordDetails = this.primaryIndex.records.get(primaryKey) 

        if(recordDetails === undefined) {
            throw new Error(`No such key ${primaryKey}`)
        }

        return recordDetails;
    }
}

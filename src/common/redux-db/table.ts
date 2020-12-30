import { TableRecord, UniqueIndexKeyBuilder, PrimaryKey, getPk } from './table-record'
import { TableTransaction } from './table-transaction';
import { TableWatcher, Unsubcribe, WatchEvent } from './table-watcher';

export class TableRecordDetails extends TableWatcher {
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
    private tableWatcher = new TableWatcher();
    private primaryIndex: PrimaryIndex;

    public constructor(
        records: TableRecord[]=[],
        primaryIndex: PrimaryIndex = new PrimaryIndex(getPk, 'id'),
    ) {
        this.primaryIndex = primaryIndex;
        this.upsertMany(new TableTransaction(), records)
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
                eventCumulator.addTableAddEvent(this.tableWatcher, record)
            }
            else {
                const before = recordDetails.value;
                recordDetails.value = record;
                eventCumulator.addTableUpdateEvent(this.tableWatcher, before, record)
                eventCumulator.addRecordUpdateEvent(recordDetails, before, record)
            }
        }
    }

    public removeMany(eventCumulator: TableTransaction, records: TableRecord[]) {
        this.removeManyByKey(eventCumulator, records.map(record => this.primaryIndex.buildKey(record)));
    }

    public removeManyByKey(eventCumulator: TableTransaction, primaryKeys: PrimaryKey[]) {
        for(const primaryKey of primaryKeys) {
            let recordDetails = this.primaryIndex.records.get(primaryKey)

            if(recordDetails !== undefined) {       
                this.primaryIndex.records.delete(primaryKey);
                eventCumulator.addTableRemoveEvent(this.tableWatcher, recordDetails.value)
                eventCumulator.addRecordRemoveEvent(recordDetails, recordDetails.value)         
            }
        }
    }

    public watchRecord(primaryKey: string, events: WatchEvent): Unsubcribe {
        const recordDetails = this.getRecord(primaryKey);
        return recordDetails.watchEvents(events);
    }

    public watchTable(events: WatchEvent): Unsubcribe {
        return this.tableWatcher.watchEvents(events);
    }

    public getRecord(primaryKey: PrimaryKey): TableRecordDetails {
        const recordDetails = this.primaryIndex.records.get(primaryKey) 

        if(recordDetails === undefined) {
            throw new Error(`No such key ${primaryKey}`)
        }

        return recordDetails;
    }
}

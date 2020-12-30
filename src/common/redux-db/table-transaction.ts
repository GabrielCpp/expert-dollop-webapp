import { OnRecordInsert, OnRecordRemove, OnRecordUpdate, RecordWatcher, TableRecord, TableWatcher } from "./table-record";

interface RecordChange {
    discriminator: 'update' | 'remove' | 'insert'
}

interface UpdateHandler extends RecordChange {
    discriminator: 'update' 
    handler: OnRecordUpdate
    before: TableRecord;
    after: TableRecord
}

function createUpdateHandler(
    handler: OnRecordUpdate,
    before: TableRecord,
    after: TableRecord,
): UpdateHandler {
    return {
            discriminator: 'update',
            handler,
            before,
            after,
        }
}

interface RemoveHandler extends RecordChange {
    discriminator: 'remove' 
    handler: OnRecordRemove
    record: TableRecord;
}

function createRemoveHandler(
    handler: OnRecordRemove,
    record: TableRecord
): RemoveHandler {
    return {
        discriminator: 'remove',
        handler,
        record
    }
}

interface InsertHandler extends RecordChange {
    discriminator: 'insert' 
    handler: OnRecordInsert
    record: TableRecord;
}

function createInsertHandler(
    handler: OnRecordInsert,
    record: TableRecord
): InsertHandler {
    return {
        discriminator: 'insert',
        handler,
        record
    }
}

export class TableTransaction {
    private tableWatcher: TableWatcher;
    private recordEvents = new Map<RecordWatcher, RecordChange>()
    private isTransaction = false;

    public constructor(tableWatcher: TableWatcher) {
        this.tableWatcher = tableWatcher;
    }

    public openTransaction() {
        this.isTransaction = true;
    }

    public closeTransaction() {
        this.isTransaction = false;
    }

    public addRecordUpdateEvent(recordDetails: RecordWatcher, before: Record<string, unknown>, after: Record<string, unknown>) {
        const previousEvent = this.recordEvents.get(recordDetails);

        if(previousEvent !== undefined && previousEvent.discriminator === 'update') {
            const lastUpdate = previousEvent as UpdateHandler
            this.recordEvents.set(recordDetails, createUpdateHandler(
                recordDetails.triggerUpdate, lastUpdate.before, after,
            ))
        }
        else {
            this.recordEvents.set(recordDetails, createUpdateHandler(
                recordDetails.triggerUpdate, before, after,
            ))
        }       
    }

    public addRecordRemoveEvent(recordDetails: RecordWatcher, record: Record<string, unknown>) {
        this.recordEvents.set(recordDetails, createRemoveHandler(recordDetails.triggerRemoveEvent, record))
    }

    public addRecordInsertEvent(recordDetails: RecordWatcher, record: Record<string, unknown>) {
        this.recordEvents.set(recordDetails, createInsertHandler(recordDetails.triggerInsertEvent, record))
    }

    public commit() {
        if(this.isTransaction) {
            return;
        }

        const updates: [TableRecord, TableRecord][] = []
        const insertions: TableRecord[] = []
        const deletions: TableRecord[] = []

        for(const event of this.recordEvents.values()) {
            if(event.discriminator === 'update') {
                const updateEvent = event as UpdateHandler;
                updateEvent.handler(updateEvent.before, updateEvent.after)
                updates.push([updateEvent.before, updateEvent.after])
            }
            else if(event.discriminator === 'insert') {
                const insertEvent = event as InsertHandler;
                insertEvent.handler(insertEvent.record)
                insertions.push(insertEvent.record)
            }
            else {
                const removeEvent = event as RemoveHandler;
                removeEvent.handler(removeEvent.record)
                deletions.push(removeEvent.record)
            }
        }
        
        this.tableWatcher.triggerOnCommit(insertions, deletions, updates);
        this.recordEvents.clear() 
    }
}
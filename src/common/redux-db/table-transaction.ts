import { OnRecordRemove, OnRecordUpdate, QueryResultChangeWatcher, RecordWatcher, TableAddWatcher, TableRecord, TableRemoveWatcher, TableUpdateWatcher } from "./table-record";

interface RecordChange {
    discriminator: 'update' | 'remove'
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

function createURemoveHandler(
    handler: OnRecordRemove,
    record: TableRecord
): RemoveHandler {
    return {
        discriminator: 'remove',
        handler,
        record
    }
}



export class TableTransaction {
    private tableInsertEvents = new Map<TableAddWatcher, () => void>()
    private tableUpdateEvents = new Map<TableUpdateWatcher, () => void>()
    private tableRemoveEvents = new Map<TableRemoveWatcher, () => void>()
    private recordEvents = new Map<RecordWatcher, RecordChange>()
    private isTransaction = false;

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
        this.recordEvents.set(recordDetails, createURemoveHandler(recordDetails.triggerRemoveEvent, record))
    }

    public addTableUpdateEvent(recordDetails: TableUpdateWatcher, before: Record<string, unknown>, after: Record<string, unknown>) {
        if(!this.tableUpdateEvents.has(recordDetails)) {
            this.tableUpdateEvents.set(recordDetails, () => recordDetails.triggerUpdate(before, after))
        }
    }

    public addTableAddEvent(recordDetails: TableAddWatcher, record: Record<string, unknown>) {
        if(!this.tableInsertEvents.has(recordDetails)) {
            this.tableInsertEvents.set(recordDetails, () => recordDetails.triggerAddEvent(record))
        }
    }

    public addTableRemoveEvent(recordDetails: TableRemoveWatcher, record: Record<string, unknown>) {
        if(!this.tableRemoveEvents.has(recordDetails)) {
            this.tableRemoveEvents.set(recordDetails, () => recordDetails.triggerRemoveEvent(record))
        }
    }

    public commit() {
        if(this.isTransaction) {
            return;
        }

        for(const event of this.recordEvents.values()) {
            if(event.discriminator === 'update') {
                const updateEvent = event as UpdateHandler;
                updateEvent.handler(updateEvent.before, updateEvent.after)

            }
            else {
                const removeEvent = event as RemoveHandler;
                removeEvent.handler(removeEvent.record)
            }
        }

        for(const action of this.tableInsertEvents.values()) {
            action()
        }

        for(const action of this.tableUpdateEvents.values()) {
            action()
        }

        for(const action of this.tableRemoveEvents.values()) {
            action()
        }

        this.recordEvents.clear()
        this.tableInsertEvents.clear()
        this.tableUpdateEvents.clear()
        this.tableRemoveEvents.clear()
    }
}
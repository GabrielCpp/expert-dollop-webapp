import { EventEmitter, EventSubscription } from "fbemitter";
import { 
    ADD_EVENT, OnRecordInsert, OnRecordRemove, OnRecordUpdate, RecordWatcher, REMOVE_EVENT, TableAddWatcher, 
    TableRecord, TableRemoveWatcher, TableUpdateWatcher, UPDATE_EVENT 
} from "./table-record";

export type Unsubcribe = () => void;

export interface WatchEvent {
    onUpdate?: OnRecordUpdate;
    onInsert?: OnRecordInsert; 
    onRemove?: OnRecordRemove;
}

export class TableWatcher implements TableUpdateWatcher, TableAddWatcher, TableRemoveWatcher, RecordWatcher {
    private eventEmitter = new EventEmitter();

    public constructor() {
        this.triggerUpdate = this.triggerUpdate.bind(this);
        this.triggerAddEvent = this.triggerAddEvent.bind(this)
        this.triggerRemoveEvent = this.triggerRemoveEvent.bind(this)
    }

    public triggerUpdate(before: TableRecord, after: TableRecord): void {
        this.eventEmitter.emit(UPDATE_EVENT, before, after);
    }

    public triggerAddEvent(record: TableRecord): void {
        this.eventEmitter.emit(ADD_EVENT, record)
    }

    public triggerRemoveEvent(record: Record<string, unknown>): void {
        this.eventEmitter.emit(REMOVE_EVENT, record);
    }

    public addRemoveWatcher(callback: OnRecordRemove): EventSubscription {
        return this.eventEmitter.addListener(REMOVE_EVENT, callback)
    }

    public addTableUpdateWatcher(callback: OnRecordUpdate): EventSubscription {
        return this.eventEmitter.addListener(UPDATE_EVENT, callback)
    }

    public addTableInsertWatcher(callback: OnRecordInsert): EventSubscription {
        return this.eventEmitter.addListener(ADD_EVENT, callback)
    }

    public watchEvents({onUpdate, onInsert, onRemove}: WatchEvent): Unsubcribe {
        const subcriptions: EventSubscription[] = []

        if(onUpdate !== undefined) {
            subcriptions.push(this.addTableUpdateWatcher(onUpdate))
        }

        if(onInsert !== undefined) {
            subcriptions.push(this.addTableInsertWatcher(onInsert))
        }

        if(onRemove !== undefined) {
            subcriptions.push(this.addRemoveWatcher(onRemove))
        }

        return () => subcriptions.forEach(subcription => subcription.remove())
    }
}
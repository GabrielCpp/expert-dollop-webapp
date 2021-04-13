import { EventEmitter, EventSubscription } from "fbemitter";
import {
  ADD_EVENT as INSERT_EVENT,
  OnRecordInsert,
  OnRecordRemove,
  OnRecordUpdate,
  REMOVE_EVENT,
  TableRecord,
  UPDATE_EVENT,
  RecordWatcher,
} from "./table-record";

export type Unsubscribe = () => void;

export interface WatchEvent {
  onUpdate?: OnRecordUpdate;
  onInsert?: OnRecordInsert;
  onRemove?: OnRecordRemove;
}

export class RecordChangeEmitter implements RecordWatcher {
  private eventEmitter = new EventEmitter();

  public constructor() {
    this.triggerUpdate = this.triggerUpdate.bind(this);
    this.triggerInsertEvent = this.triggerInsertEvent.bind(this);
    this.triggerRemoveEvent = this.triggerRemoveEvent.bind(this);
  }

  public triggerUpdate(before: TableRecord, after: TableRecord): void {
    this.eventEmitter.emit(UPDATE_EVENT, before, after);
  }

  public triggerInsertEvent(record: TableRecord): void {
    this.eventEmitter.emit(INSERT_EVENT, record);
  }

  public triggerRemoveEvent(record: TableRecord): void {
    this.eventEmitter.emit(REMOVE_EVENT, record);
  }

  public addRemoveWatcher(callback: OnRecordRemove): EventSubscription {
    return this.eventEmitter.addListener(REMOVE_EVENT, callback);
  }

  public addUpdateWatcher(callback: OnRecordUpdate): EventSubscription {
    return this.eventEmitter.addListener(UPDATE_EVENT, callback);
  }

  public addInsertWatcher(callback: OnRecordInsert): EventSubscription {
    return this.eventEmitter.addListener(INSERT_EVENT, callback);
  }

  public watchEvents({
    onUpdate,
    onInsert,
    onRemove,
  }: WatchEvent): Unsubscribe {
    const subcriptions: EventSubscription[] = [];

    if (onUpdate !== undefined) {
      subcriptions.push(this.addUpdateWatcher(onUpdate));
    }

    if (onInsert !== undefined) {
      subcriptions.push(this.addInsertWatcher(onInsert));
    }

    if (onRemove !== undefined) {
      subcriptions.push(this.addRemoveWatcher(onRemove));
    }

    return () => subcriptions.forEach((subcription) => subcription.remove());
  }
}

import { TableRecord } from "./table-record";
import { EventEmitter } from "fbemitter";
import { Unsubscribe } from "./table-record-change-emitter";

export type OnQueryChange<T> = (record: T[]) => void;
export const QUERY_RESULT_CHANGE_EVENT = "query-result";

export class QueryChangeEmitter {
  private emitter = new EventEmitter();

  public addQueryWatcher<T>(callback: OnQueryChange<T>): Unsubscribe {
    const subscriber = this.emitter.addListener(
      QUERY_RESULT_CHANGE_EVENT,
      callback
    );
    return () => subscriber.remove();
  }

  public triggerQueryResult(records: TableRecord[]): void {
    this.emitter.emit(QUERY_RESULT_CHANGE_EVENT, records);
  }
}

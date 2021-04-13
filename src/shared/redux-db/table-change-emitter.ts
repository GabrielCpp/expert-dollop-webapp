import { EventEmitter } from "fbemitter";
import { TableRecord, TableWatcher } from "./table-record";
import { Unsubscribe } from "./table-record-change-emitter";

export const ON_TABLE_COMMIT = "table-commit";
export type OnTableChange = (
  insertions: TableRecord[],
  deletions: TableRecord[],
  updates: [TableRecord, TableRecord][]
) => void;

export class TableChangeEmitter implements TableWatcher {
  private eventEmitter = new EventEmitter();

  public triggerOnCommit(
    insertions: TableRecord[],
    deletions: TableRecord[],
    updates: [TableRecord, TableRecord][]
  ): void {
    this.eventEmitter.emit(ON_TABLE_COMMIT, insertions, deletions, updates);
  }

  public addOnCommitSubscriber(callback: OnTableChange): Unsubscribe {
    const subscriber = this.eventEmitter.addListener(ON_TABLE_COMMIT, callback);
    return () => subscriber.remove();
  }
}

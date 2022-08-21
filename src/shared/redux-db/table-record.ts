export type PrimaryKey = string;
export type UniqueIndexKeyBuilder = (record: TableRecord) => PrimaryKey;
export interface TableRecord extends Record<string, unknown> {
  id: string
}

export const UPDATE_EVENT = "update";
export const ADD_EVENT = "add";
export const REMOVE_EVENT = "remove";

export type OnRecordUpdate = (before: TableRecord, after: TableRecord) => void;
export type OnRecordInsert = (record: TableRecord) => void;
export type OnRecordRemove = (record: TableRecord) => void;

export interface RecordWatcher {
  triggerRemoveEvent(record: TableRecord): void;
  triggerUpdate(before: TableRecord, after: TableRecord): void;
  triggerInsertEvent(record: TableRecord): void;
}

export interface TableWatcher {
  triggerOnCommit(
    insertions: TableRecord[],
    deletions: TableRecord[],
    updates: [TableRecord, TableRecord][]
  ): void;
}

export function getPk(record: TableRecord): PrimaryKey {
  return record.id as string;
}

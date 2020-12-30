import { TableWatcher } from './table-watcher';

export type PrimaryKey = string;
export type UniqueIndexKeyBuilder = (record: TableRecord) => PrimaryKey
export type TableRecord = Record<string, unknown> 

export const UPDATE_EVENT = 'update';
export const ADD_EVENT = 'add';
export const REMOVE_EVENT = 'remove';
export const QUERY_RESULT_CHANGE_EVENT = 'query-result';

export type OnRecordUpdate = (before: TableRecord, after: TableRecord) => void;
export type OnRecordInsert =  (record: TableRecord) => void;
export type OnRecordRemove =  (record: TableRecord) => void;

export interface TableUpdateWatcher {
    triggerUpdate(before: TableRecord, after: TableRecord): void 
}

export interface TableAddWatcher {
    triggerAddEvent(record: TableRecord): void
}

export interface TableRemoveWatcher {
    triggerRemoveEvent(record: TableRecord): void
}

export interface RecordWatcher {
    triggerRemoveEvent(record: TableRecord): void
    triggerUpdate(before: TableRecord, after: TableRecord): void 
}

export interface QueryResultChangeWatcher {
    triggerQueryResult(): void
}

export function getPk(record: TableRecord): PrimaryKey {
    return record.id as string;
}

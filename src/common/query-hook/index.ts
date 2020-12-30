import { PrimaryKey, TableRecord } from "../redux-db/table-record";
import { Query } from '../redux-db/query';
import { createContext, useContext, useRef, useState } from "react";
import { Database } from '../redux-db/database';

export type UpdateTableRecord<T> = (tableRecord: T) => void;

export const DatabaseContext = createContext<Database>(new Database());

export function useTableRecord<T>(tableName: string, primaryKey: PrimaryKey, defaultValue?: T): [T | undefined, UpdateTableRecord<T>, UpdateTableRecord<T>] {
    const database = useContext(DatabaseContext)
    const record = database.getTable(tableName).findRecord(primaryKey)
    const [state, setLocalState ] = useState<T | undefined>(record === undefined ? defaultValue : record as T);
    const isInitialized = useRef(false)

    function publishState(value: T) {
        database.getTable(tableName).upsertMany([value as TableRecord])
        setLocalState(value)
    }

    if(isInitialized.current === false) {
        isInitialized.current = true;
        database.getTable(tableName).watchRecord(primaryKey, {
            onUpdate: (_, after) => setLocalState(after as T),
            onRemove: _ => setLocalState(undefined),
        })
    }

    return [state, publishState, setLocalState]
}

export function useTableQuery<T>(tableName: string, query: Query): T[] {
    return []
}

export function useTableRecordRecucer() {
    
}
import { PrimaryKey, TableRecord } from "../redux-db/table-record";
import { Query } from '../redux-db/query';
import { useEffect, useRef, useState } from "react";
import { useInject } from "../container-context";
import { Database, Unsubscribe } from '../redux-db';
import { noop } from "lodash";

export type UpdateTableRecord<T> = (tableRecord: T) => void;

export function useTableRecord<T>(tableName: string, primaryKey: PrimaryKey, defaultValue?: T): [T | undefined, UpdateTableRecord<T>, UpdateTableRecord<T>] {
    const database = useInject(Database)
    const record = database.getTable(tableName).findRecord(primaryKey)
    const [state, setLocalState ] = useState<T | undefined>(record === undefined ? defaultValue : record as T);
    const unsubscribe = useRef<Unsubscribe>(noop)

    function publishState(value: T) {
        database.getTable(tableName).upsertMany([value as TableRecord])
        setLocalState(value)
    }

    useEffect(() => {
        return () => {
            unsubscribe.current();
        }
    });

    if(unsubscribe.current === noop) { 
        unsubscribe.current = database.getTable(tableName).watchRecord(primaryKey, {
            onUpdate: (_, after) => setLocalState(after as T),
            onRemove: _ => setLocalState(undefined),
        })
    }

    return [state, publishState, setLocalState]
}

export function useTableQuery<T>(query: Query): T[] {
    const database = useInject(Database)
    const unsubscribe = useRef<Unsubscribe>(noop)
    let tmpResults: T[] | undefined = undefined;

    if(unsubscribe.current === noop) {
        const [results, unsubscriber] = database.watchQuery<T>(query, onChange);
        tmpResults = results;
        unsubscribe.current = unsubscriber;
    }

    const [results, setResults ] = useState<T[]>(tmpResults || []);
    
    function onChange(records: T[]) {
        setResults(records);
    }

    useEffect(() => {
        return () => {
            unsubscribe.current();
        }
    });

    return results
}


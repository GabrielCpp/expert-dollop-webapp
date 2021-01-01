import { useEffect, useRef, useState } from "react";
import { noop } from "lodash";
import { interfaces } from 'inversify'
import { PrimaryKey, TableRecord, Query, Database, Unsubscribe  } from "../redux-db";
import { useInject, useContainer } from "../container-context";
import { ReduxDatabase } from "../redux-db/database";

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

export interface TableProvider {
    service: interfaces.ServiceIdentifier<unknown>;
    fetch(p: any): Promise<TableRecord[]>
}

export function useTableProvider(tableProviders: Record<string, TableProvider>, onSuccess: () => void=noop) {
    const container = useContainer();
    const [isLoading, setIsLoading] = useState(true);
    const [errors, setErrors] = useState<Error[]>([]);
    const isInitialized = useRef(false);

    if(isInitialized.current === false) {
        isInitialized.current = true;

        const tableNames: string[] = []
        const promises: Promise<TableRecord[]>[] = []

        for(const [ tableName, provider ] of Object.entries(tableProviders)) {
            const service = container.get(provider.service)

            tableNames.push(tableName)
            promises.push(provider.fetch(service))            
        }

        const database = container.get(ReduxDatabase);
        Promise.all(promises).then(results => results.forEach(((resultset, index) => {
            const tableName = tableNames[index];
            database.getTable(tableName).upsertMany(resultset)
        }))).then(_ => {
            setIsLoading(false)
            onSuccess()
        }).catch(reason => {
            setIsLoading(false)
            setErrors([reason as Error])
        })
    }

    return { isLoading, errors }
}

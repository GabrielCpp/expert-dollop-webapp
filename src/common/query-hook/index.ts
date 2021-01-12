import { useEffect, useRef, useState } from "react";
import { identity, noop } from "lodash";
import { interfaces } from 'inversify'
import { PrimaryKey, TableRecord, Query, ReduxDatabase, Unsubscribe  } from "../redux-db";
import { useInject, useContainer } from "../container-context";

export type UpdateTableRecord<T> = (tableRecord: T) => void;

export function useTableExistingRecord<T>(tableName: string, primaryKey: PrimaryKey): [T | undefined, UpdateTableRecord<T>, UpdateTableRecord<T>] {
    const database = useInject(ReduxDatabase)
    const record = database.getTable(tableName).findRecord(primaryKey)
    const [state, setLocalState ] = useState<T | undefined>(record as T);
    const unsubscribe = useRef<Unsubscribe>(noop)

    function publishState(value: T) {
        database.getTable(tableName).upsertMany([value as TableRecord])
        setLocalState(value)
    }

    useEffect(() => {
        return () => {
            unsubscribe.current();
        }
    }, []);

    if(unsubscribe.current === noop) { 
        const table = database.getTable(tableName);

        unsubscribe.current = table.watchRecord(primaryKey, {
            onUpdate: (_, after) => setLocalState(after as T),
            onRemove: _ => setLocalState(undefined),
        })
    }

    return [state, publishState, setLocalState]
}

export function useTableRecord<T>(tableName: string, primaryKey: PrimaryKey, defaultValue?: T): [T | undefined, UpdateTableRecord<T>, UpdateTableRecord<T>] {
    const database = useInject(ReduxDatabase)
    const record = database.getTable(tableName).findRecordSafe(primaryKey)
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
    }, []);

    if(unsubscribe.current === noop) { 
        const table = database.getTable(tableName);

        if(defaultValue !== undefined && record === undefined ) {
            table.upsertMany([defaultValue as Record<string, unknown>])
        }

        unsubscribe.current = table.watchRecord(primaryKey, {
            onUpdate: (_, after) => setLocalState(after as T),
            onRemove: _ => setLocalState(undefined),
        })
    }

    return [state, publishState, setLocalState]
}

export function useTableQuery<T,U=T[]>(query: Query, denormalize: (results: T[]) => U=identity): U {
    const database = useInject(ReduxDatabase)
    const unsubscribe = useRef<Unsubscribe>(noop)
    let tmpResults: U | undefined = undefined;

    if(unsubscribe.current === noop) {
        const [results, unsubscriber] = database.watchQuery<T>(query, onChange);
        tmpResults = denormalize(results);
        unsubscribe.current = unsubscriber;
    }

    const [results, setResults ] = useState<U>(tmpResults as U);
    
    function onChange(records: T[]) {
        setResults(denormalize(records));
    }

    useEffect(() => {
        return () => {
            unsubscribe.current();
        }
    }, []);

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
            setErrors([reason as Error])
            setIsLoading(false)
        })
    }

    return { isLoading, errors }
}

export function useRefResult<T>(fn: (...p: any[]) => T, ...p: unknown[]): T {
    const value = useRef<T | undefined>(undefined);

    if(value.current === undefined) {
        value.current = fn(...p);
    }

    return value.current
}

export function useRefMappedValue<Seed, Value, Result>(elements: [Seed, (p: Value) => Result][], builder: (s: Seed) => Value): [Seed, Result][] {
    const value = useRef<[Seed, Result][] | undefined>(undefined);

    if(value.current === undefined) {
        value.current = elements.map(([seed, factory]) => [seed, factory(builder(seed))]);
    }

    return value.current
}

export function useDatabase() {
    const database = useInject(ReduxDatabase);
    return database;
}

export function _throw(error: Error) {
    throw error;
}

export function createAbortFlowError(): Error {
    const error = new Error('Abort action flow');
    error.name = 'abort_action_flow';
    return error;
}

export function buildActionFlow(actions: Array<() => void>, onError: (e: Error) => void=e => console.error(e)) {
    return async () => {
        try {
            for(const action of actions) {
                await action();
            }
        }
        catch(e) {
            if(e.name !== 'abort_action_flow') {
                onError(e)
            }           
        }
    }
}
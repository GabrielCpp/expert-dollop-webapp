import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { identity, noop } from "lodash";
import { ReduxDatabase } from './database'
import { PrimaryKey, TableRecord } from "./table-record";
import { useServices } from "../service-context";
import { Unsubscribe } from "./table-record-change-emitter";
import { Query } from './query'

export type UpdateTableRecord<T> = (tableRecord: T) => void;

interface ReduxDbService {
    reduxDb: ReduxDatabase
}

export function useId(id?: string): string {
    const refRef = useRef(id)

    if(refRef.current === undefined) {
        refRef.current = uuidv4()
    }

    return refRef.current
}

export function buildPk(...items: string[]): string {
    return items.join('.');
}

export function useTableExistingRecord<T>(tableName: string, primaryKey: PrimaryKey): [T | undefined, UpdateTableRecord<T>, UpdateTableRecord<T>] {
    const { reduxDb } = useServices<ReduxDbService>()
    const record = reduxDb.getTable(tableName).findRecord(primaryKey)
    const [state, setLocalState ] = useState<T | undefined>(record as T);
    const unsubscribe = useRef<Unsubscribe>(noop)

    function publishState(value: T) {
        reduxDb.getTable(tableName).upsertMany([value as TableRecord])
        setLocalState(value)
    }

    useEffect(() => {
        return () => {
            unsubscribe.current();
        }
    }, []);

    if(unsubscribe.current === noop) { 
        const table = reduxDb.getTable(tableName);

        unsubscribe.current = table.watchRecord(primaryKey, {
            onUpdate: (_, after) => setLocalState(after as T),
            onRemove: _ => setLocalState(undefined),
        })
    }

    return [state, publishState, setLocalState]
}

export function useTableRecord<T>(tableName: string, primaryKey: PrimaryKey, defaultValue: T, sideEffect: (value: T) => void = noop): [T, UpdateTableRecord<T>, UpdateTableRecord<T>] {
    const { reduxDb } = useServices<ReduxDbService>()
    const unsubscribe = useRef<Unsubscribe>(noop)
    let initialState: T | undefined = undefined

    if(unsubscribe.current === noop) {
        const table = reduxDb.getTable(tableName);
        const record = table.findRecordSafe(primaryKey)

        if(defaultValue !== undefined && record === undefined ) {
            table.upsertMany([defaultValue as Record<string, unknown>])
        }

        unsubscribe.current = table.watchRecord(primaryKey, {
            onUpdate: (_, after) => {
                sideEffect(after as T);
                setLocalState(after as T)
            },
            onRemove: _ => {
                unsubscribe.current = noop;
                setLocalState(undefined);
            },
        })

        initialState = record === undefined ? defaultValue : record as T;
    }
    
    const [state, setLocalState ] = useState<T | undefined>(initialState);

    function publishState(value: T) {
        reduxDb.getTable(tableName).upsertMany([value as TableRecord])
        setLocalState(value)
    }

    useEffect(() => {
        return () => {
            unsubscribe.current();
        }
    }, []);

    return [state as T, publishState, setLocalState]
}

export function useTableQuery<T,U=T[]>(query: Query, denormalize: (results: T[]) => U=identity): U {
    const { reduxDb } = useServices<ReduxDbService>()
    const unsubscribe = useRef<Unsubscribe>(noop)
    let tmpResults: U | undefined = undefined;

    if(unsubscribe.current === noop) {
        const [results, unsubscriber] = reduxDb.watchQuery<T>(query, onChange);
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

export function useTableWeakQuery<T,U=T[]>(query: Query, denormalize: (results: T[]) => U=identity): U {
    const { reduxDb } = useServices<ReduxDbService>()
    const unsubscribe = useRef<Unsubscribe>(noop)
    let tmpResults: U | undefined = undefined;

    if(unsubscribe.current === noop) {
        const [results, unsubscriber] = reduxDb.watchQuery<T>(query, onChange);
        tmpResults = denormalize(results);
        unsubscribe.current = unsubscriber;
    }

    const results = useRef<U>(tmpResults as U);
    
    function onChange(records: T[]) {
        results.current = denormalize(records);
    }

    useEffect(() => {
        return () => {
            unsubscribe.current();
        }
    }, []);

    return results.current
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

export function useTableLifetime<T>(setup: () => T, cleanup: (state: T) => void=noop) {
    const [state] = useState(setup)

    useEffect(() => {
        return () => {
            cleanup(state);
        }
    }, [cleanup, state]);

    return [state]
}

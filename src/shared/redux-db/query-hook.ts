import { useCallback, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { identity, noop } from "lodash";
import { ReduxDatabase } from "./database";
import { PrimaryKey, TableRecord } from "./table-record";
import { useServices } from "../service-context";
import { Unsubscribe } from "./table-record-change-emitter";
import { Query } from "./query";

export type UpdateTableRecord<T> = (tableRecord: T) => void;

interface ReduxDbService {
  reduxDb: ReduxDatabase;
}

export function useId(id?: string): string {
  const refRef = useRef(id);

  if (refRef.current === undefined) {
    refRef.current = uuidv4();
  }

  return refRef.current;
}

export function buildPk(...items: string[]): string {
  return items.join(".");
}

type KeyOfObject<T> = { [key in keyof T]: string };
interface UseMultipleIdResult<T> {
  idByName: KeyOfObject<T>;
  ids: string[];
}

export function useIds<T>(...names: (keyof T)[]): UseMultipleIdResult<T> {
  const refRef = useRef<UseMultipleIdResult<T> | undefined>();

  if (refRef.current === undefined) {
    const idByName: Partial<KeyOfObject<T>> = {};
    const ids: string[] = [];
    for (const name of names) {
      const id = uuidv4();
      idByName[name] = id;
      ids.push(id);
    }

    refRef.current = { idByName: idByName as KeyOfObject<T>, ids };
  }

  return refRef.current as UseMultipleIdResult<T>;
}

export function useTableRecord<T extends TableRecord>(
  tableName: string,
  primaryKey: PrimaryKey,
  makeDefaultValue: () => T,
  sideEffect: (value: T) => void = noop
): [T, UpdateTableRecord<T>, UpdateTableRecord<T>] {
  const { reduxDb } = useServices<ReduxDbService>();
  const [state, setLocalState] = useState<T>(makeDefaultValue);

  useEffect(() => {
    const table = reduxDb.getTable(tableName);

    return table.watchRecord(primaryKey, {
      defaultRecord: makeDefaultValue(),
      onUpdate: (_, after) => {
        sideEffect(after as T);
        setLocalState(after as T);
      },
    });
  }, [reduxDb, primaryKey, makeDefaultValue, sideEffect, tableName]);

  const publishState = useCallback(
    (value: T) => {
      reduxDb.getTable(tableName).upsertMany([value as TableRecord]);
    },
    [reduxDb, tableName]
  );

  return [state, publishState, setLocalState];
}

export function useTableQuery<T extends TableRecord, U = T[]>(
  query: Query,
  denormalize: (results: T[]) => U = identity
): U {
  const { reduxDb } = useServices<ReduxDbService>();
  const unsubscribe = useRef<Unsubscribe>(noop);
  let tmpResults: U | undefined = undefined;

  if (unsubscribe.current === noop) {
    const [results, unsubscriber] = reduxDb.watchQuery<T>(query, onChange);
    tmpResults = denormalize(results);
    unsubscribe.current = unsubscriber;
  }

  const [results, setResults] = useState<U>(tmpResults as U);

  function onChange(records: T[]) {
    setResults(denormalize(records));
  }

  useEffect(() => {
    return () => {
      unsubscribe.current();
    };
  }, []);

  return results;
}

export function useTableLifetime<T>(
  setup: () => T,
  cleanup: (state: T) => void = noop
) {
  const [state] = useState(setup);

  useEffect(() => {
    return () => {
      cleanup(state);
    };
  }, [cleanup, state]);

  return [state];
}

export function useCallbackValue<T>(callback: () => T): T {
  return useMonoCallbackValue(callback, undefined)
}

export function useMonoCallbackValue<T,P=undefined>(callback: (p: P) => T, p: P): T {
  const value = useRef<T | undefined>(undefined);
  const lastCallback = useRef<((p: P) => T) | undefined>(undefined);

  if (lastCallback.current !== callback) {
    value.current = callback(p);
    lastCallback.current = callback;
  }

  return value.current as T;
}

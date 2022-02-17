import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
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

export function useTableRecord<T>(
  tableName: string,
  primaryKey: PrimaryKey,
  defaultValue: T,
  sideEffect: (value: T) => void = noop
): [T, UpdateTableRecord<T>, UpdateTableRecord<T>] {
  const { reduxDb } = useServices<ReduxDbService>();
  const [state, setLocalState] = useState<T | undefined>(
    () => reduxDb.getTable(tableName).findRecord(primaryKey) as T
  );

  useLayoutEffect(() => {
    const table = reduxDb.getTable(tableName);

    return table.watchRecord(primaryKey, {
      defaultRecord: defaultValue as Record<string, unknown>,
      onUpdate: (_, after) => {
        sideEffect(after as T);
        setLocalState(after as T);
      },
      onRemove: (_) => {
        setLocalState(undefined);
      },
    });
  }, [reduxDb, primaryKey, defaultValue, sideEffect, tableName]);

  const publishState = useCallback(
    (value: T) => {
      reduxDb.getTable(tableName).upsertMany([value as TableRecord]);
      setLocalState(value);
    },
    [reduxDb, tableName]
  );

  return [state as T, publishState, setLocalState];
}

export function useTableQuery<T, U = T[]>(
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

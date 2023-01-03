import { useCallback } from "react";
import { useMethods } from "react-use";
import { v4 as uuidv4 } from "uuid";
import { useCallbackValue } from "../../../shared/redux-db";

export interface OrdinalMetadata extends Record<string, unknown> {
  ordinal: number;
}

export interface UseFieldArray<T> {
  insert: (p?: { index?: number; after?: OnInsert<T> }) => void;
  remove: (id: string) => void;
  refresh: () => void;
  elements: FieldArrayElement<T>[];
  leftSlotCount: number;
}

export interface FieldArrayElement<T> {
  id: string;
  value: T;
  metadata: OrdinalMetadata;
}

export type OnInsert<T> = (
  element: FieldArrayElement<T>,
  index: number,
  elements: FieldArrayElement<T>[]
) => void;
export type IdGenerator = () => string;
export type FieldArrayBuilder<T> = (
  makeId: IdGenerator
) => FieldArrayElement<T>[];

export interface UseFieldArrayHook<T> {
  createElement: (makeId: IdGenerator) => T;
  initialState?: FieldArrayBuilder<T> | T[];
  afterInsert?: OnInsert<T>;
  maximumItemCount?: number;
}

export function useFieldArray<T>({
  createElement,
  afterInsert,
  initialState,
  maximumItemCount = 100,
}: UseFieldArrayHook<T>): UseFieldArray<T> {
  const buildArray = useCallback(() => {
    if (initialState === undefined) {
      return [];
    } else if (Array.isArray(initialState)) {
      return initialState.map((x, ordinal) => ({
        id: uuidv4(),
        value: x,
        metadata: {
          ordinal,
        },
      }));
    }
    return initialState(uuidv4);
  }, [initialState]);
  const initialStateValue = useCallbackValue(buildArray);
  const [elements, { insert: insertRaw, remove, refresh }] = useMethods(
    createArrayMethods,
    initialStateValue
  );
  const insert = useCallback(
    ({ index, after }: { index?: number; after?: OnInsert<T> } = {}) =>
      insertRaw({ index, createElement, afterInsert, after, maximumItemCount }),
    [insertRaw, createElement, afterInsert]
  );

  return {
    insert,
    remove,
    elements,
    refresh,
    leftSlotCount: maximumItemCount - elements.length,
  };
}

function createArrayMethods<T>(state: FieldArrayElement<T>[]) {
  function insert({
    createElement,
    afterInsert,
    after,
    index,
    maximumItemCount,
  }: {
    createElement: (makeId: IdGenerator) => T;
    afterInsert?: OnInsert<T>;
    after?: OnInsert<T>;
    index?: number;
    maximumItemCount: number;
  }): FieldArrayElement<T>[] {
    if (state.length >= maximumItemCount) {
      return state;
    }

    const elements = [...state];
    const newElement: FieldArrayElement<T> = {
      value: createElement(uuidv4),
      id: uuidv4(),
      metadata: {
        ordinal: index || state.length,
      },
    };

    if (index === undefined) {
      elements.push(newElement);
    } else {
      elements.splice(index, 0, newElement);
    }

    if (afterInsert) {
      afterInsert(newElement, newElement.metadata.ordinal, elements);
    }

    if (after) {
      after(newElement, newElement.metadata.ordinal, elements);
    }

    return elements;
  }

  function remove(id: string): FieldArrayElement<T>[] {
    return state.filter((x) => x.id !== id);
  }

  function refresh(): FieldArrayElement<T>[] {
    return [...state];
  }

  return {
    insert,
    remove,
    refresh,
  };
}

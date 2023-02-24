import { useCallback } from "react";
import { useMethods } from "react-use";
import { v4 as uuidv4 } from "uuid";
import { useCallbackValue } from "../../../shared/redux-db";

export interface OrdinalMetadata extends Record<string, unknown> {
  ordinal: number;
}

export interface UseFieldArray<T> {
  insert: (p?: { index?: number; after?: OnInsert<T> }) => void;
  remove: (p: { id: string; after?: OnRemove<T> }) => void;
  refresh: () => void;
  elements: FieldArrayElement<T>[];
  leftSlotCount: number;
}

export interface FieldArrayElement<T> {
  id: string;
  value: T;
  metadata: OrdinalMetadata;
}

export type OnInsert<T> = (p: AfterInsert<T>) => void;
export interface AfterInsert<T> {
  element: FieldArrayElement<T>;
  index: number;
  elements: FieldArrayElement<T>[];
}
export type OnRemove<T> = (p: AfterRemove<T>) => void;
export interface AfterRemove<T> {
  element: FieldArrayElement<T>;
  index: number;
  elements: FieldArrayElement<T>[];
}
export type IdGenerator = () => string;
export type FieldArrayBuilder<T> = (
  makeId: IdGenerator
) => FieldArrayElement<T>[];

export interface UseFieldArrayHook<T> {
  createElement: (makeId: IdGenerator) => T;
  initialState?: FieldArrayBuilder<T> | T[];
  afterInsert?: OnInsert<T>;
  afterRemove?: OnRemove<T>;
  maximumItemCount?: number;
}

export function useFieldArray<T>({
  createElement,
  afterInsert,
  afterRemove,
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
  const [elements, { insert: insertRaw, remove: removeRaw, refresh }] =
    useMethods(createArrayMethods, initialStateValue);
  const insert = useCallback(
    ({
      index,
      afterInsert: afterInsertLocal,
    }: { index?: number; afterInsert?: OnInsert<T> } = {}) => {
      const after: OnInsert<T> = (p) => {
        if (afterInsert) {
          afterInsert(p);
        }
        if (afterInsertLocal) {
          afterInsertLocal(p);
        }
      };

      insertRaw({ index, createElement, after, maximumItemCount });
    },
    [insertRaw, createElement, afterInsert, maximumItemCount]
  );

  const remove = useCallback(
    ({
      id,
      afterRemove: afterRemoveLocal,
    }: {
      id: string;
      afterRemove?: OnRemove<T>;
    }) => {
      const after: OnInsert<T> = (p) => {
        if (afterRemove) {
          afterRemove(p);
        }
        if (afterRemoveLocal) {
          afterRemoveLocal(p);
        }
      };

      removeRaw({ id, after });
    },
    [removeRaw, afterRemove]
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
    after,
    index,
    maximumItemCount,
  }: {
    createElement: (makeId: IdGenerator) => T;
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

    if (after) {
      after({
        element: newElement,
        index: newElement.metadata.ordinal,
        elements,
      });
    }

    return elements;
  }

  function remove({
    id,
    after,
  }: {
    id: string;
    after: OnRemove<T>;
  }): FieldArrayElement<T>[] {
    const initial: {
      elements: FieldArrayElement<T>[];
      element?: FieldArrayElement<T>;
      index: number;
    } = { elements: [], element: undefined, index: 0 };
    const resultState = state.reduce((p, c) => {
      if (c.id === id) {
        p.element = c;
        return p;
      }

      if (p.element === undefined) {
        p.index++;
      }

      p.elements.push(c);

      return p;
    }, initial);

    if (resultState.element === undefined) {
      return state;
    }

    if (after) {
      after(
        resultState as AfterRemove<T>
      );
    }

    return resultState.elements;
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

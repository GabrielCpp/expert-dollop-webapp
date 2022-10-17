import { useCallback, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";

export interface OrdinalMetadata extends Record<string, unknown> {
  ordinal: number;
}

interface UseFieldArray<T> {
  push: (p?: { newElement?: T, onAdded?: (id: FieldArrayElement<T>, index: number) => void }) => void;
  remove: (id: string) => void;
  refresh: () => void;
  elements: FieldArrayElement<T>[];
}

export interface FieldArrayElement<T> {
  id: string
  value: T
  metadata: OrdinalMetadata
}

type Action<T> = { type: "ADD" | "REMOVE" | "UPDATE_VALUE"; id?: string, onAdded?: (id: FieldArrayElement<T>, index: number) => void, makeDefaultValue: (makeId: IdGenerator) => T }
export type IdGenerator = () => string

export function useFieldArray<T>(makeDefaultValue: (makeId: IdGenerator) => T, originalIds: (makeId: IdGenerator) => () => FieldArrayElement<T>[] = () => () => []): UseFieldArray<T> {
  const castedReducer = reducer as ((ids: FieldArrayElement<T>[],action: Action<T>) => FieldArrayElement<T>[])
  const [elements, dispatch] = useReducer(castedReducer, [], originalIds(uuidv4));
  const push = useCallback(({newElement, onAdded } = {}) => dispatch({ type: "ADD", onAdded, makeDefaultValue: () => newElement || makeDefaultValue(uuidv4) }), [dispatch, makeDefaultValue]);
  const remove = useCallback(
    (id) => dispatch({ type: "REMOVE", id, makeDefaultValue }),
    [dispatch, makeDefaultValue]
  );
  const refresh = useCallback(
    () => dispatch({ type: "UPDATE_VALUE", makeDefaultValue }),
    [dispatch, makeDefaultValue]
  );

  return { push, remove, elements, refresh };
}


function reducer<T>(
  elements: FieldArrayElement<T>[],
  action: Action<T>
): FieldArrayElement<T>[] {
  switch (action.type) {
    case "ADD":
      const newElement = { id: uuidv4(), value: action.makeDefaultValue(uuidv4), metadata: { ordinal: elements.length } }
      if(action.onAdded) {
        action.onAdded(newElement, elements.length)
      }
      
      return [...elements, newElement];
    case "REMOVE":
      return elements.filter((x) => x.id !== action.id);
    case "UPDATE_VALUE":
      return [...elements]
    default:
      throw new Error();
  }
}
import { useCallback, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";

interface UseFieldArray<T> {
  push: (d?: T) => void;
  remove: (id: string) => void;
  elements: FieldArrayElement<T>[];
}

export interface FieldArrayElement<T> {
  id: string
  value: T
}

type Action<T> = { type: "ADD" | "REMOVE"; id?: string, makeDefaultValue: (makeId: IdGen) => T }
type IdGen = () => string

export function useFieldArray<T>(makeDefaultValue: (makeId: IdGen) => T, originalIds: (makeId: IdGen) => () => FieldArrayElement<T>[] = () => () => []): UseFieldArray<T> {
  const castedReducer = reducer as ((ids: FieldArrayElement<T>[],action: Action<T>) => FieldArrayElement<T>[])
  const [elements, dispatch] = useReducer(castedReducer, [], originalIds(uuidv4));
  const push = useCallback((d?: T) => dispatch({ type: "ADD", makeDefaultValue: () => d || makeDefaultValue(uuidv4) }), [dispatch, makeDefaultValue]);
  const remove = useCallback(
    (id) => dispatch({ type: "REMOVE", id, makeDefaultValue }),
    [dispatch, makeDefaultValue]
  );

  return { push, remove, elements };
}


function reducer<T>(
  ids: FieldArrayElement<T>[],
  action: Action<T>
): FieldArrayElement<T>[] {
  switch (action.type) {
    case "ADD":
      return [...ids, { id: uuidv4(), value: action.makeDefaultValue(uuidv4) }];
    case "REMOVE":
      return ids.filter((x) => x.id !== action.id);
    default:
      throw new Error();
  }
}
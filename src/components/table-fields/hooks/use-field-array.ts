import { useCallback, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";

interface UseFieldArray {
  push: () => void;
  remove: (id: string) => void;
  ids: string[];
}

export function useFieldArray(originalIds: () => string[] = () => []): UseFieldArray {
  const [ids, dispatch] = useReducer(reducer, [], originalIds);
  const push = useCallback(() => dispatch({ type: "ADD" }), [dispatch]);
  const remove = useCallback(
    (id) => dispatch({ type: "REMOVE", id }),
    [dispatch]
  );

  return { push, remove, ids };
}


function reducer(
  ids: string[],
  action: { type: "ADD" | "REMOVE"; id?: string }
) {
  switch (action.type) {
    case "ADD":
      return [...ids, uuidv4()];
    case "REMOVE":
      return ids.filter((x) => x !== action.id);
    default:
      throw new Error();
  }
}
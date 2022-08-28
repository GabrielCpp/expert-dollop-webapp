import { useRef } from "react";

export function useBoundedCallbacks<E, A, C>(
  elements: E[],
  getArg: (e: E) => A,
  makeCallback: (a: A) => C
): [C[], { callbackFor: (a: A) => C }] {
  const callbacks = useRef(new Map<A, C>());

  const args: A[] = elements.map((e) => getArg(e));

  for (const arg of callbacks.current.keys()) {
    if (!args.includes(arg)) {
      callbacks.current.delete(arg);
    }
  }

  for (const arg of args) {
    if (!callbacks.current.has(arg)) {
      callbacks.current.set(arg, makeCallback(arg));
    }
  }

  function getCallback(a: A): C {
    return callbacks.current.get(a) as C;
  }

  return [args.map(getCallback), { callbackFor: getCallback }];
}

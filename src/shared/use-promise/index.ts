import { useRef, useState } from "react";

interface UsePromiseOption<T> {
  skip?: boolean;
  onComplete?: (result: T) => void;
}

export function usePromise<T>(
  query_data: () => Promise<T>,
  { skip = false, onComplete }: UsePromiseOption<T>
): {
  data: T | undefined;
  error: Error | undefined;
  loading: boolean;
} {
  const [data, setData] = useState<T | undefined>(undefined);
  const [error, setError] = useState<Error | undefined>(undefined);
  const hasStartFetching = useRef(false);

  if (skip) {
    return { data, error, loading: false };
  }

  if (hasStartFetching.current === false) {
    query_data()
      .then((body: T) => {
        if (onComplete) {
          onComplete(body);
        }

        setData(body);
      })
      .catch((err) => {
        setError(err);
      });

    hasStartFetching.current = true;
  }

  return { data, error, loading: data === undefined && error === undefined };
}

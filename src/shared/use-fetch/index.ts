import { useRef, useState } from "react";

interface FetchError extends Error {
  status: number;
}

interface FetchOption {
  skip?: boolean;
}

export function useFetch<T>(
  ressource: string,
  { skip = false }: FetchOption
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

  if (hasStartFetching.current == false) {
    fetch(ressource)
      .then((response) => {
        if (response.ok) {
          return response
            .json()
            .then((body: T) => {
              setData(body);
            })
            .catch((err) => {
              setError(err);
            });
        }

        const err: Partial<FetchError> = Error("fetch_failure");
        err.status = response.status;

        setError(err as Error);
      })
      .catch((err) => {
        setError(err);
      });

    hasStartFetching.current = true;
  }

  return { data, error, loading: data === undefined && error === undefined };
}

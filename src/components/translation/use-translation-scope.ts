import { addTranslations, LocalizedTranslation } from "./tables";
import { useTranslation } from "react-i18next";
import { useServices } from "../../services-def";
import { useRef, useState } from "react";

interface FetchError extends Error {
  status: number;
}

interface FetchOption {
  skip?: boolean;
}

function useFetch<T>(
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

interface TranlationScopeHook {
  isLoading: boolean;
  error: Error | undefined;
}

export function useTranlationScope(ressourceId: string): TranlationScopeHook {
  const { reduxDb } = useServices();
  const { i18n } = useTranslation();
  const { loading, data, error } = useFetch<Record<string, string>>(
    `/api/translation/${ressourceId}/${i18n.language}/json_bundle`,
    { skip: ressourceId === "" }
  );

  if (data) {
    const mappedTranslations: LocalizedTranslation[] = [];

    for (const [name, value] of Object.entries(data)) {
      mappedTranslations.push({
        name,
        value,
        ressourceId,
      });
    }

    addTranslations(reduxDb, mappedTranslations);
  }

  return { isLoading: loading, error };
}

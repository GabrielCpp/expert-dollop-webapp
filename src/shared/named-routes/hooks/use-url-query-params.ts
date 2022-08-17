import { useLocation } from "react-router-dom";

export function getSearchParams(search: string): Record<string, string> {
  const result: Record<string, string> = {};

  for (const [key, value] of new URLSearchParams(search).entries()) {
    result[key] = value;
  }

  return result;
}

export function useUrlQueryParams<T extends Record<string, string>>(): T {
  const location = useLocation();
  return getSearchParams(location.search) as T;
}

import { useLocation } from "react-router-dom";

export function useUrlQueryParams<T extends Record<string, string>>(): T {
  const location = useLocation();
  const result: Record<string, string> = {};

  for (const [key, value] of new URLSearchParams(location.search).entries()) {
    result[key] = value;
  }

  return result as T;
}

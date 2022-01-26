import { addTranslations, LocalizedTranslation } from "./tables";
import { useTranslation } from "react-i18next";
import { useServices } from "../../services-def";
import { usePromise } from "../../shared/use-promise";

interface TranlationHook {
  isLoading: boolean;
  error: Error | undefined;
}

export function useDynamicTranlation(ressourceId: string): TranlationHook {
  const { reduxDb, api } = useServices();
  const { i18n } = useTranslation();
  const { loading, data, error } = usePromise<Record<string, string>>(
    () => api.loadTranslations(ressourceId, i18n.language),
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

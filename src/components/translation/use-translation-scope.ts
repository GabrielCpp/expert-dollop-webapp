import {
  addTranslations,
  getAllRessourceId,
  LocalizedTranslation,
} from "./tables";
import { useTranslation } from "react-i18next";
import { useServices } from "../../services-def";
import { useAsync } from "react-use";
import i18next from "i18next";
import { useState } from "react";
import { zip } from "lodash";
import { ReduxDatabase } from "../../shared/redux-db";
import { useLoadingNotifier } from "../loading-frame";

interface TranlationHook {
  isLoading: boolean;
  error: Error | undefined;
}

function mapTranslationBundle(
  ressourceId: string,
  bundle: Record<string, string>
): LocalizedTranslation[] {
  const mappedTranslations: LocalizedTranslation[] = [];

  for (const [name, value] of Object.entries(bundle)) {
    mappedTranslations.push({
      name,
      value,
      ressourceId,
    });
  }

  return mappedTranslations;
}

function addBundles(
  reduxDb: ReduxDatabase,
  bundles: [string, Record<string, string>][]
) {
  let mappedTranslations: LocalizedTranslation[] = [];
  for (const [ressourceId, bundle] of bundles) {
    mappedTranslations = [
      ...mappedTranslations,
      ...mapTranslationBundle(ressourceId, bundle),
    ];
  }

  addTranslations(reduxDb, mappedTranslations);
}

export function useDynamicTranlation(ressourceId: string): TranlationHook {
  const { reduxDb, api } = useServices();
  const { i18n } = useTranslation();
  const { loading, error } = useAsync(
    async () => {
      if(ressourceId !== "") {
        const data = await api.loadTranslations(ressourceId, i18n.language)
        const mappedTranslations = mapTranslationBundle(ressourceId, data);
        addTranslations(reduxDb, mappedTranslations);
      }
    },
    [api, ressourceId, mapTranslationBundle, addTranslations]
  );


  return { isLoading: loading, error };
}

export function useLocaleSelector(): [string, (locale: string) => void] {
  const { reduxDb, api } = useServices();
  const { i18n } = useTranslation();
  const [locale, setLocale] = useState(i18n.language);
  const { onLoading, onError } = useLoadingNotifier();

  function setEveryLocale(locale: string) {
    onLoading(true);

    i18next.changeLanguage(locale, (err) => {
      if (err) return onError(err);
      const ressourceIds = getAllRessourceId(reduxDb);
      const bundlePromises = ressourceIds.map((ressourceId) =>
        api.loadTranslations(ressourceId, locale)
      );

      Promise.all(bundlePromises)
        .then((bundles) => {
          addBundles(
            reduxDb,
            zip(ressourceIds, bundles) as [string, Record<string, string>][]
          );
          setLocale(locale);
        })
        .then(() => onLoading(false))
        .catch(onError);
    });
  }

  return [locale, setEveryLocale];
}

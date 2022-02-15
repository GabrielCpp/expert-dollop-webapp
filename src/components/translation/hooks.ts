import { isString } from "lodash";
import { TFunction, useTranslation } from "react-i18next";
import { Translation } from "../../generated";
import { useServices } from "../../services-def";

interface TranslationHook {
  dbTrans: (key?: string | null) => string;
  t: TFunction<"translation">;
}

export function useDbTranslation(
  ressourceId: string,
  emptyPlaceholder: string = ""
): TranslationHook {
  const { reduxDb } = useServices();
  const { t } = useTranslation();
  const translation = reduxDb.getTable("translation");

  function trans(key?: string | null | undefined): string {
    const value = translation.findRecordSafe<Translation>(key || "")?.value;

    if (isString(value)) {
      return value || t(emptyPlaceholder);
    }

    return key || t(emptyPlaceholder);
  }

  return {
    t,
    dbTrans: trans,
  };
}

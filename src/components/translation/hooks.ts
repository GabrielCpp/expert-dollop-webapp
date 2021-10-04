import { isString } from "lodash";
import { TFunction, useTranslation } from "react-i18next";
import { Translation } from "../../generated";
import { useServices } from "../../services-def";

interface TranslationHook {
  dbTrans: (key?: string | null) => string;
  t: TFunction<"translation">;
}

export function useDbTranslation(ressourceId: string): TranslationHook {
  const { reduxDb } = useServices();
  const { t, i18n } = useTranslation();
  const translation = reduxDb.getTable("translation");

  function trans(
    key?: string | null,
    emptyPlaceholder: string = "project_definition_editor.empty_placeholder"
  ) {
    key = key || "";
    const value = translation.findRecordSafe<Translation>(
      `${ressourceId}-${i18n.language}-${key}`
    )?.value;

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

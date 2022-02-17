import { isString } from "lodash";
import { useEffect, useState } from "react";
import { TFunction, useTranslation } from "react-i18next";
import { Translation } from "../../generated";
import { useServices } from "../../services-def";
import { TableRecord } from "../../shared/redux-db";
import { LocalizedTranslation } from "./tables";

interface TranslationHook {
  dbTrans: (key?: string | null) => JSX.Element;
  t: TFunction<"translation">;
}

export function useDbTranslation(
  ressourceId: string,
  emptyPlaceholder: string = ""
): TranslationHook {
  const { t } = useTranslation();

  return {
    t,
    dbTrans: (key?: string | null) => (
      <DbI18n
        i18n={key}
        emptyPlaceholder={emptyPlaceholder}
        ressourceId={ressourceId}
      />
    ),
  };
}

export function DbI18n({
  i18n,
  emptyPlaceholder = "",
  ressourceId,
}: {
  i18n?: string | null;
  emptyPlaceholder?: string;
  ressourceId: string;
}): JSX.Element {
  const { reduxDb } = useServices();
  const { t } = useTranslation();
  const [value, setValue] = useState(
    () =>
      reduxDb.getTable("translation").findRecord<Translation>(i18n || "")?.value
  );

  useEffect(() => {
    const defaultRecord: LocalizedTranslation = {
      ressourceId,
      name: i18n || t(emptyPlaceholder),
      value: i18n || t(emptyPlaceholder),
    };
    return reduxDb.getTable("translation").watchRecord(i18n || "", {
      defaultRecord: defaultRecord,
      onInsert: (record: TableRecord) => setValue(record.value as string),
      onUpdate: (_: TableRecord, after: TableRecord) =>
        setValue(after.value as string),
    });
  }, [reduxDb, i18n, emptyPlaceholder, ressourceId, t]);

  if (isString(value)) {
    return <>{value || t(emptyPlaceholder)}</>;
  }

  return <>{i18n || t(emptyPlaceholder)}</>;
}

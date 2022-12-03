import { useTranslation } from "react-i18next";
import {
  StaticChoiceFieldConfig,
  StringFieldValue,
} from "../../../../generated";

interface StaticChoiceFieldValueView {
  config: StaticChoiceFieldConfig;
  value?: StringFieldValue;
}

export function StaticChoiceFieldValueView({
  config,
  value,
}: StaticChoiceFieldValueView) {
  const { t } = useTranslation();

  if (value === undefined) {
    return null;
  }

  const option = config.options.find((x) => x.id === value.text);

  if (option === undefined) {
    return null;
  }

  return <span>{t(option.label)}</span>;
}

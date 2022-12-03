import { useTranslation } from "react-i18next";
import { BoolFieldConfig, BoolFieldValue } from "../../../../generated";

interface BoolFieldValueViewProps {
  config: BoolFieldConfig;
  value?: BoolFieldValue;
  labels: {
    enabledLabel: string;
    disabledLabel: string;
  };
}

export function BoolFieldValueView({ value, labels }: BoolFieldValueViewProps) {
  const { t } = useTranslation();

  if (value === undefined) {
    return null;
  }

  return (
    <span>{t(value.enabled ? labels.enabledLabel : labels.disabledLabel)}</span>
  );
}

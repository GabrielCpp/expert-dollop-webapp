import { useTranslation } from "react-i18next";
import { DecimalFieldConfig, DecimalFieldValue } from "../../../../generated";

interface DecimalFieldValueViewProps {
  config: DecimalFieldConfig;
  value?: DecimalFieldValue;
}

export function DecimalfieldValueView({
  config,
  value,
}: DecimalFieldValueViewProps) {
  const { t } = useTranslation();

  if (value === undefined) {
    return null;
  }

  return (
    <span>
      {t("intlNumber", {
        val: value.numeric,
        minimumFractionDigits: config.precision,
      })}
    </span>
  );
}

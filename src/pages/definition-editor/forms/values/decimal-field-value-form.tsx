import { useTranslation } from "react-i18next";
import {
  DECIMAL_VALIDATOR,
  Field,
  textField,
  useForm,
} from "../../../../components/table-fields";
import { DecimalFieldConfig, DecimalFieldValue } from "../../../../generated";

interface DecimalFieldValueProps {
  name: string;
  parentPath: string[];
  config: DecimalFieldConfig;
  value: DecimalFieldValue;
  label?: string;
}

export function DecimalFieldValueForm({
  name,
  parentPath,
  config,
  value,
  label,
}: DecimalFieldValueProps) {
  const { t } = useTranslation();
  const { formPath } = useForm({ name, parentPath });

  return (
    <Field
      validator={DECIMAL_VALIDATOR}
      defaultValue={value.numeric}
      path={formPath}
      name="numeric"
      key="numeric"
      label={label}
      t={t}
      component={textField}
      unit={config.unit}
    />
  );
}

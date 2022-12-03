import { useTranslation } from "react-i18next";
import {
  INT_VALIDATOR,
  Field,
  textField,
  useForm,
} from "../../../../components/table-fields";
import { IntFieldConfig, IntFieldValue } from "../../../../generated";

interface IntFieldValueProps {
  name: string;
  parentPath: string[];
  config: IntFieldConfig;
  value: IntFieldValue;
  label?: string;
}

export function IntFieldValueForm({
  name,
  parentPath,
  config,
  value,
  label,
}: IntFieldValueProps) {
  const { t } = useTranslation();
  const { formPath } = useForm({ name, parentPath });

  return (
    <Field
      validator={INT_VALIDATOR}
      defaultValue={value.integer}
      path={formPath}
      name="integer"
      key="integer"
      label={label}
      t={t}
      component={textField}
      unit={config.unit}
    />
  );
}

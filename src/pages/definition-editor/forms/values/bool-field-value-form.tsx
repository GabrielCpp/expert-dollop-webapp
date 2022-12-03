import { useTranslation } from "react-i18next";
import {
  BOOLEAN_VALIDATOR,
  checkboxField,
  Field,
  useForm,
} from "../../../../components/table-fields";
import { BoolFieldConfig, BoolFieldValue } from "../../../../generated";

interface BoolFieldValueFormProps {
  name: string;
  parentPath: string[];
  config: BoolFieldConfig;
  value: BoolFieldValue;
  label?: string;
}

export function BoolFieldValueForm({
  name,
  parentPath,
  value,
  label,
}: BoolFieldValueFormProps) {
  const { t } = useTranslation();
  const { formPath } = useForm({ name, parentPath });

  return (
    <Field
      validator={BOOLEAN_VALIDATOR}
      defaultValue={value.enabled}
      path={formPath}
      name="enabled"
      key="enabled"
      label={label}
      t={t}
      component={checkboxField}
    />
  );
}

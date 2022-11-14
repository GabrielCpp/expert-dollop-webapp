import { useTranslation } from "react-i18next";
import {
  useForm,
  Field,
  BOOLEAN_VALIDATOR,
  checkboxField,
} from "../../../../components/table-fields";
import { BoolFieldConfig } from "../../../../generated";

interface BoolFieldConfigProps {
  name: string;
  parentPath: string[];
  labels: {
    bool: {
      name: string;
      label: string;
    };
  };
  config?: BoolFieldConfig | null;
}

export function BoolFieldConfigForm({
  name,
  parentPath,
  labels,
  config,
}: BoolFieldConfigProps) {
  const { t } = useTranslation();
  const { formPath } = useForm({ name, parentPath });

  return (
    <Field
      validator={BOOLEAN_VALIDATOR}
      defaultValue={config?.enabled === undefined ? false : config?.enabled}
      path={formPath}
      name={labels.bool.name}
      key={labels.bool.name}
      label={labels.bool.label}
      t={t}
      component={checkboxField}
    />
  );
}

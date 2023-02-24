import { useTranslation } from "react-i18next";
import {
  useForm,
  useHiddenField,
  Field,
  USER_STRING_VALIDATOR,
  InlineTextField,
} from "../../../../components/table-fields";
import { StringFieldConfig } from "../../../../generated";

const DEFAULT_TRANSFORMS = ["trim", "remove_double_space"];

interface StringFieldConfigProps {
  name: string;
  parentPath: string[];
  labels: {
    string: {
      name: string;
      label: string;
      defaultValue: string;
    };
  };
  config?: StringFieldConfig | null;
}

export function StringFieldConfigForm({
  name,
  parentPath,
  labels,
  config,
}: StringFieldConfigProps) {
  const { t } = useTranslation();
  const { formPath } = useForm({ name, parentPath });
  useHiddenField({
    name: "transforms",
    value: DEFAULT_TRANSFORMS,
    parentPath: formPath,
  });

  return (
    <Field
      validator={USER_STRING_VALIDATOR}
      defaultValue={config?.text || labels.string.defaultValue}
      path={formPath}
      name={labels.string.name}
      key={labels.string.name}
      label={labels.string.label}
      t={t}
      component={InlineTextField}
    />
  );
}

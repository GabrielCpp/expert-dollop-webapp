import { useTranslation } from "react-i18next";
import {
  Field,
  selectField,
  SelectOption,
  STRING_VALIDATOR,
  useForm,
} from "../../../../components/table-fields";
import {
  StaticChoiceFieldConfig,
  StringFieldValue,
} from "../../../../generated";

interface StaticChoiceFieldValueProps {
  name: string;
  parentPath: string[];
  config: StaticChoiceFieldConfig;
  value: StringFieldValue;
  label?: string;
}

export function StaticChoiceFieldValueForm({
  name,
  parentPath,
  config,
  value,
  label,
}: StaticChoiceFieldValueProps) {
  const { t } = useTranslation();
  const { formPath } = useForm({ name, parentPath });
  const options: SelectOption[] = config.options.map((o) => ({
    id: o.id,
    label: o.label,
    title: o.helpText,
  }));

  return (
    <Field
      validator={STRING_VALIDATOR}
      defaultValue={value.text}
      path={formPath}
      name="text"
      key="text"
      label={label}
      t={t}
      component={selectField}
      options={options}
    />
  );
}

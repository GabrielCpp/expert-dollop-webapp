import { useTranslation } from "react-i18next";
import { SelectOption } from "@mui/base";
import {
  Field,
  FieldLabel,
  SelectField,
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
  const options: SelectOption<string>[] = config.options.map((o) => ({
    value: o.id,
    label: <FieldLabel title={o.helpText} label={o.label} t={t} />,
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
      component={SelectField}
      options={options}
    />
  );
}

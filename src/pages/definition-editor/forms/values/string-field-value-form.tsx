import { useTranslation } from "react-i18next";
import {
  USER_STRING_VALIDATOR,
  Field,
  InlineTextField,
  useForm,
} from "../../../../components/table-fields";
import { StringFieldConfig, StringFieldValue } from "../../../../generated";

interface StringFieldValueProps {
  name: string;
  parentPath: string[];
  config: StringFieldConfig;
  value: StringFieldValue;
  label?: string;
}

export function StringFieldValueForm({
  name,
  parentPath,
  value,
  label,
}: StringFieldValueProps) {
  const { t } = useTranslation();
  const { formPath } = useForm({ name, parentPath });

  return (
    <Field
      validator={USER_STRING_VALIDATOR}
      defaultValue={value.text}
      path={formPath}
      name="text"
      key="text"
      label={label}
      t={t}
      component={InlineTextField}
    />
  );
}

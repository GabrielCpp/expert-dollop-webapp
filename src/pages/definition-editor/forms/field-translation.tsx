import { useTranslation } from "react-i18next";
import {
  Field,
  FormSection,
  STRING_VALIDATOR,
  textField,
  useForm,
} from "../../../components/table-fields";
import { TranslationInput } from "../../../generated";

export interface FieldTranslationLabels {
  label: {
    id: string;
    label: string;
  };
  helpText: {
    id: string;
    label: string;
  };
}

export interface FieldTranslationProps {
  path: string[];
  name: string;
  locale: string;
  label: unknown;
  labels: FieldTranslationLabels;
  translations: TranslationInput[];
  labelTranslationKeyName: string;
  helpTextTranslationKeyName: string;
}

export function FieldTranslation({
  path,
  name,
  locale,
  translations,
  labelTranslationKeyName,
  helpTextTranslationKeyName,
  labels,
}: FieldTranslationProps) {
  const { t } = useTranslation();
  const { formPath } = useForm({ name, parentPath: path });
  const tabTranslations = translations.filter(
    (translation) => translation.locale === locale
  );
  const label =
    tabTranslations.find(
      (translation) => translation.name === labelTranslationKeyName
    )?.value || "";
  const helpText =
    tabTranslations.find(
      (translation) => translation.name === helpTextTranslationKeyName
    )?.value || "";

  return (
    <FormSection>
      <Field
        validator={STRING_VALIDATOR}
        path={formPath}
        defaultValue={label}
        name={labels.label.id}
        key={labels.label.id}
        label={labels.label.label}
        component={textField}
        t={t}
      />
      <Field
        validator={STRING_VALIDATOR}
        path={formPath}
        defaultValue={helpText}
        name={labels.helpText.id}
        key={labels.helpText.id}
        label={labels.helpText.label}
        component={textField}
        t={t}
      />
    </FormSection>
  );
}

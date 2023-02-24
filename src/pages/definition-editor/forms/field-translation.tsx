import { useTranslation } from "react-i18next";
import {
  ANY_STRING_VALIDATOR,
  Field,
  FormSection,
  InlineTextField,
} from "../../../components/table-fields";
import { TranslationInput } from "../../../generated";

export interface FieldTranslationLabels {
  label: {
    name: string;
    label: string;
  };
  helpText: {
    name: string;
    label: string;
  };
}

export interface FieldTranslationProps {
  labelPath: string[];
  helpTextPath: string[];
  locale: string;
  label: unknown;
  labels: FieldTranslationLabels;
  translations: TranslationInput[];
  labelTranslationKeyName: string;
  helpTextTranslationKeyName: string;
}

export function FieldTranslation({
  labelPath,
  helpTextPath,
  locale,
  translations,
  labelTranslationKeyName,
  helpTextTranslationKeyName,
  labels,
}: FieldTranslationProps) {
  const { t } = useTranslation();
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
        validator={ANY_STRING_VALIDATOR}
        path={labelPath}
        defaultValue={label}
        name={labels.label.name}
        key={labels.label.label}
        label={labels.label.label}
        component={InlineTextField}
        t={t}
      />
      <Field
        validator={ANY_STRING_VALIDATOR}
        path={helpTextPath}
        defaultValue={helpText}
        name={labels.helpText.name}
        key={labels.helpText.label}
        label={labels.helpText.label}
        component={InlineTextField}
        t={t}
      />
    </FormSection>
  );
}

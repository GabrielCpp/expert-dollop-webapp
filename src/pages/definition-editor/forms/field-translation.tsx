import { useTranslation } from "react-i18next";
import {
  Field,
  FormSection,
  STRING_VALIDATOR,
  textField,
  useForm,
} from "../../../components/table-fields";
import { Translation, TranslationConfig } from "../../../generated";
import { nodeFormLabels } from "../form-definitions";

export interface FieldTranslationProps {
  path: string[];
  name: string;
  locale: string;
  label: unknown;
  labels: typeof nodeFormLabels["tabs"]["body"];
  translations: Translation[];
  translationConfig: TranslationConfig;
}

export function FieldTranslation({
  path,
  name,
  locale,
  translations,
  translationConfig,
  labels,
}: FieldTranslationProps) {
  const { t } = useTranslation();
  const { formPath } = useForm({ name, parentPath: path });
  const tabTranslations = translations.filter(
    (translation) => translation.locale === locale
  );
  const label =
    tabTranslations.find(
      (translation) => translation.name === translationConfig.label
    )?.value || "";
  const helpText =
    tabTranslations.find(
      (translation) => translation.name === translationConfig.helpTextName
    )?.value || "";

  return (
    <FormSection>
      <Field
        validator={STRING_VALIDATOR}
        path={formPath}
        defaultValue={label}
        name={labels.label.id}
        key={labels.label.id}
        label={t(labels.label.label)}
        component={textField}
        t={t}
      />
      <Field
        validator={STRING_VALIDATOR}
        path={formPath}
        defaultValue={helpText}
        name={labels.helpText.id}
        key={labels.helpText.id}
        label={t(labels.helpText.label)}
        component={textField}
        t={t}
      />
    </FormSection>
  );
}

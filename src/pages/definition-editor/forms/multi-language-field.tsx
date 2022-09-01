import { noop } from "lodash";
import {
  FieldArrayElement,
  IdGenerator,
  StaticTabs,
  Translator,
  useFieldArray,
  useFieldsWatchCallack,
  useForm,
  useHiddenField,
} from "../../../components/table-fields";
import { TranslationInput } from "../../../generated";
import { FieldTranslation } from "./field-translation";

interface MultiLanguageFieldProps {
  t: Translator;
  parentPath: string[];
  name: string;
  translations: TranslationInput[];
  labelTranslationKeyName: string;
  helpTextTranslationKeyName: string;
  nameId: string;
  active?: boolean;
  labels: {
    name: string;
    defaultOne: string;
    body: {
      label: {
        name: string;
        label: string;
      };
      helpText: {
        name: string;
        label: string;
      };
    };
    fr: {
      label: string;
      name: string;
      locale: string;
    };
    en: {
      label: string;
      name: string;
      locale: string;
    };
  };
}

export function MultiLanguageField({
  labels,
  parentPath,
  name,
  translations,
  labelTranslationKeyName,
  helpTextTranslationKeyName,
  nameId,
  t,
  active = true,
}: MultiLanguageFieldProps) {
  const { elements } = useFieldArray(noop, getDefaultValues);

  const { value: latestLabelTranslationKeyName } =
    useFieldsWatchCallack<string>({
      defaultValue: labelTranslationKeyName,
      ids: nameId,
    });

  const { value: latestHelpTextTranslationKeyName } =
    useFieldsWatchCallack<string>({
      defaultValue: helpTextTranslationKeyName,
      ids: nameId,
      callback: buildTranslationKey,
    });

  // FR

  const { formPath: frLabelPath } = useForm({
    parentPath,
    name,
    id: elements[0].id,
    metadata: elements[0].metadata,
  });

  const { formPath: frHelpTextPath } = useForm({
    parentPath,
    name,
    id: elements[1].id,
    metadata: elements[1].metadata,
  });

  useHiddenField({
    name: "name",
    path: frLabelPath,
    value: latestLabelTranslationKeyName,
  });
  useHiddenField({
    name: "locale",
    path: frLabelPath,
    value: labels.fr.locale,
  });

  useHiddenField({
    name: "name",
    path: frHelpTextPath,
    value: latestHelpTextTranslationKeyName,
  });
  useHiddenField({
    name: "locale",
    path: frHelpTextPath,
    value: labels.fr.locale,
  });

  // EN

  const { formPath: enLabelPath } = useForm({
    parentPath,
    name,
    id: elements[2].id,
    metadata: elements[2].metadata,
  });

  const { formPath: enHelpTextPath } = useForm({
    parentPath,
    name,
    id: elements[3].id,
    metadata: elements[3].metadata,
  });

  useHiddenField({
    name: "name",
    path: enLabelPath,
    value: latestLabelTranslationKeyName,
  });
  useHiddenField({
    name: "locale",
    path: enLabelPath,
    value: labels.en.locale,
  });

  useHiddenField({
    name: "name",
    path: enHelpTextPath,
    value: latestHelpTextTranslationKeyName,
  });
  useHiddenField({
    name: "locale",
    path: enHelpTextPath,
    value: labels.en.locale,
  });

  return (
    <StaticTabs
      defaultSelectedField={labels.fr.name}
      key={labels.name}
      active={active}
    >
      <FieldTranslation
        labelPath={frLabelPath}
        helpTextPath={frHelpTextPath}
        key={labels.fr.name}
        locale={labels.fr.locale}
        label={t(labels.fr.label)}
        labels={labels.body}
        labelTranslationKeyName={latestLabelTranslationKeyName}
        helpTextTranslationKeyName={latestHelpTextTranslationKeyName}
        translations={translations}
      />
      <FieldTranslation
        labelPath={enLabelPath}
        helpTextPath={enHelpTextPath}
        key={labels.en.name}
        locale={labels.en.locale}
        label={t(labels.en.label)}
        labels={labels.body}
        labelTranslationKeyName={latestLabelTranslationKeyName}
        helpTextTranslationKeyName={latestHelpTextTranslationKeyName}
        translations={translations}
      />
    </StaticTabs>
  );
}

const getDefaultValues =
  (makeId: IdGenerator) => (): FieldArrayElement<unknown>[] => {
    return [
      {
        id: makeId(),
        value: undefined,
        metadata: { ordinal: 0 },
      },
      {
        id: makeId(),
        value: undefined,
        metadata: { ordinal: 1 },
      },
      {
        id: makeId(),
        value: undefined,
        metadata: { ordinal: 2 },
      },
      {
        id: makeId(),
        value: undefined,
        metadata: { ordinal: 3 },
      },
    ];
  };

function buildTranslationKey(...name: unknown[]): string {
  return `${name[0] as string}_help_text`;
}

import { Card, CardActions, CardContent, CardHeader } from "@mui/material";
import { head } from "lodash";
import { useCallback } from "react";
import { AdditionRemovalActionGroup } from "../../../components/buttons";
import { LeftSideButton } from "../../../components/custom-styles";
import {
  Field,
  FieldArrayElement,
  FieldArrayElementPicker,
  FormSection,
  getFieldValue,
  selectField,
  StaticTabs,
  STRING_VALIDATOR,
  textField,
  Translator,
  useFieldArray,
  useFieldWatch,
  useForm,
  useFormFieldValueRef,
  useNodePickerState,
} from "../../../components/table-fields";
import { StaticChoiceOptionInput } from "../../../generated";
import { useServices } from "../../../services-def";
import { FieldTranslation } from "./field-translation";

interface StaticChoiceFormLabels {
  selected: {
    id: string;
    label: string;
    fallbackLabel: string;
  };
  optionCardHeader: {
    label: string;
  };
  options: {
    id: {
      id: string;
      label: string;
    };
    label: {
      id: string;
      label: string;
    };
    helpText: {
      id: string;
      label: string;
    };
    tabs: {
      id: string;
      defaultOne: string;
      body: {
        label: {
          id: string;
          label: string;
        };
        helpText: {
          id: string;
          label: string;
        };
      };
      fr: {
        label: string;
        id: string;
        locale: string;
      };
      en: {
        label: string;
        id: string;
        locale: string;
      };
    };
  };
}

interface StaticChoiceFormProps {
  parentPath: string[];
  name: string;
  defaultValue?: string | null;
  options?: StaticChoiceOptionInput[];
  t: Translator;
  labels: StaticChoiceFormLabels;
}

export function StaticChoiceForm({
  parentPath,
  name,
  labels,
  defaultValue,
  options = [],
  t,
}: StaticChoiceFormProps) {
  const { reduxDb } = useServices();
  const { formPath } = useForm({ parentPath, name });
  const getDefaultOptions = useCallback(
    (makeId) => () => {
      const existingElements = options.map((o, index) => ({
        id: makeId(),
        value: {
          option: o,
          optionValueId: makeId(),
        },
        metadata: { ordinal: index },
      }));

      if (existingElements.length === 0) {
        return [
          {
            id: makeId(),
            value: makeDefaultOption(makeId),
            metadata: { ordinal: 0 },
          },
        ];
      }

      return existingElements;
    },
    [options]
  );

  const { push, remove, elements } = useFieldArray<StaticOptionArrayValue>(
    makeDefaultOption,
    getDefaultOptions
  );

  const { currentNodeId, setCurrentNodeId } = useNodePickerState(
    head(elements)?.id
  );

  const { value: currentElementValue } = useFieldWatch(
    elements.find((e) => e.id === currentNodeId)?.value.optionValueId
  );

  const { value: selectedValue, id: selectedId } = useFormFieldValueRef(
    elements.find(
      (e) =>
        e.value.option.id === (defaultValue || head(elements)?.value.option.id)
    )?.value.optionValueId
  );

  return (
    <FormSection>
      <Field
        id={selectedId}
        path={formPath}
        name={labels.selected.id}
        key={labels.selected.id}
        label={labels.selected.label}
        validator={STRING_VALIDATOR}
        component={selectField}
        t={t}
        defaultValue={selectedValue}
        fallbackSelection={{ label: labels.selected.fallbackLabel }}
        options={elements.map((e) => ({
          id: e.value.optionValueId,
          label: getFieldValue(
            reduxDb,
            e.value.optionValueId,
            e.value.option.id
          ) as string,
        }))}
      />
      <Card>
        <CardHeader title={t(labels.optionCardHeader.label)} />
        <CardContent>
          <FormSection>
            {elements
              .filter((e) => e.id === currentNodeId)
              .map((element) => (
                <SelectOptionForm
                  key={element.id}
                  parentPath={formPath}
                  element={element}
                  labels={labels.options}
                  t={t}
                />
              ))}
          </FormSection>
        </CardContent>
        <CardActions disableSpacing>
          <FieldArrayElementPicker
            elements={elements}
            current={currentNodeId}
            currentLabel={currentElementValue as string}
            onChange={setCurrentNodeId}
            getLabel={(e) => getFieldValue(reduxDb, e.id) as string}
          />
          <LeftSideButton>
            <AdditionRemovalActionGroup
              addAction={() => {
                push({ onAdded: (e) => setCurrentNodeId(e.id) });
              }}
              deleteAction={
                currentNodeId ? () => remove(currentNodeId) : undefined
              }
            />
          </LeftSideButton>
        </CardActions>
      </Card>
    </FormSection>
  );
}

interface StaticOptionArrayValue {
  option: StaticChoiceOptionInput;
  optionValueId: string;
}

function makeDefaultOption(makeId: () => string): StaticOptionArrayValue {
  return {
    option: {
      helpText: "",
      id: "0",
      label: "",
      translated: [],
    },
    optionValueId: makeId(),
  };
}

interface SelectOptionFormProps {
  element: FieldArrayElement<StaticOptionArrayValue>;
  parentPath: string[];
  labels: StaticChoiceFormLabels["options"];
  t: Translator;
}

function SelectOptionForm({
  parentPath,
  labels,
  element,
  t,
}: SelectOptionFormProps) {
  const { formPath: path } = useForm({
    parentPath,
    id: element.id,
    name: "options",
    metadata: element.metadata,
  });

  const option = element.value.option;

  return (
    <FormSection>
      <Field
        id={element.value.optionValueId}
        validator={STRING_VALIDATOR}
        path={path}
        defaultValue={option.id}
        name={labels.id.id}
        key={labels.id.id}
        label={labels.id.label}
        component={textField}
        t={t}
      />
      <StaticTabs defaultSelectedField={labels.tabs.fr.id} key={labels.tabs.id}>
        <FieldTranslation
          path={path}
          key={labels.tabs.fr.id}
          name={labels.tabs.fr.id}
          locale={labels.tabs.fr.locale}
          label={t(labels.tabs.fr.label)}
          labels={labels.tabs.body}
          labelTranslationKeyName={option.label}
          helpTextTranslationKeyName={option.helpText}
          translations={option.translated}
        />
        <FieldTranslation
          path={path}
          key={labels.tabs.en.id}
          name={labels.tabs.en.id}
          locale={labels.tabs.en.locale}
          label={t(labels.tabs.en.label)}
          labels={labels.tabs.body}
          labelTranslationKeyName={option.label}
          helpTextTranslationKeyName={option.helpText}
          translations={option.translated}
        />
      </StaticTabs>
    </FormSection>
  );
}

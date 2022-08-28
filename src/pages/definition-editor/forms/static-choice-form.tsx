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
    name: string;
    label: string;
    fallbackLabel: string;
  };
  optionCardHeader: {
    label: string;
  };
  options: {
    id: {
      name: string;
      label: string;
    };
    label: {
      name: string;
      label: string;
    };
    helpText: {
      name: string;
      label: string;
    };
    tabs: {
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
  const { push, remove, elements } = useFieldArray<StaticOptionArrayValue>(
    makeDefaultOption,
    getDefaultOptions(options)
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

  const removeCurrentElement = useCallback(() => {
    if (currentNodeId) {
      remove(currentNodeId);
    }

    setCurrentNodeId(elements.find((e) => e.id !== currentNodeId)?.id);
  }, [remove, setCurrentNodeId, elements, currentNodeId]);

  const addElement = useCallback(() => {
    push({ onAdded: (e) => setCurrentNodeId(e.id) });
  }, [push, setCurrentNodeId]);

  return (
    <FormSection>
      <Field
        id={selectedId}
        path={formPath}
        name={labels.selected.name}
        key={labels.selected.name}
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
              addAction={addElement}
              deleteAction={
                currentNodeId === undefined ? undefined : removeCurrentElement
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

const getDefaultOptions =
  (options: StaticChoiceOptionInput[]) => (makeId: () => string) => () => {
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
  };

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
        name={labels.id.name}
        key={labels.id.name}
        label={labels.id.label}
        component={textField}
        t={t}
      />
      <StaticTabs
        defaultSelectedField={labels.tabs.fr.name}
        key={labels.tabs.name}
      >
        <FieldTranslation
          path={path}
          key={labels.tabs.fr.name}
          name={labels.tabs.fr.name}
          locale={labels.tabs.fr.locale}
          label={t(labels.tabs.fr.label)}
          labels={labels.tabs.body}
          labelTranslationKeyName={option.label}
          helpTextTranslationKeyName={option.helpText}
          translations={option.translated}
        />
        <FieldTranslation
          path={path}
          key={labels.tabs.en.name}
          name={labels.tabs.en.name}
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

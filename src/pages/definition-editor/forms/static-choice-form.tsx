import { Card, CardActions, CardContent, CardHeader } from "@mui/material";
import { head } from "lodash";
import { useCallback } from "react";
import { usePrevious } from "react-use";
import { AdditionRemovalActionGroup } from "../../../components/buttons";
import { LeftSideButton } from "../../../components/custom-styles";
import {
  checkboxField,
  Field,
  FieldArray,
  FieldArrayElement,
  FieldArrayElementPicker,
  FormSection,
  getFieldValue,
  OrdinalMetadata,
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
import { useId } from "../../../shared/redux-db";
import { FieldTranslation } from "./field-translation";

interface StaticChoiceFormLabels {
  selected: {
    id: string;
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
    selected: {
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
      const existingElements = options.map((o) => ({
        id: makeId(),
        value: {
          option: o,
          optionValueId: makeId(),
        },
      }));

      if (existingElements.length === 0) {
        return [{ id: makeId(), value: makeDefaultOption(makeId) }];
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
    head(elements)?.value.optionValueId
  );

  const { value: currentElementValue } = useFieldWatch(currentNodeId);
  const defaultValueSelectedId = useId();

  return (
    <Card>
      <CardHeader title="Triggers" />
      <CardContent>
        <FieldArray<StaticOptionArrayValue>
          elements={elements}
          current={currentNodeId}
        >
          {(
            element: FieldArrayElement<StaticOptionArrayValue>,
            metadata: OrdinalMetadata
          ) => (
            <SelectOptionForm
              key={element.id}
              parentPath={formPath}
              id={element.id}
              metadata={metadata}
              labels={labels.options}
              option={element.value.option}
              optionValueId={element.value.optionValueId}
              defaultValueSelectedId={defaultValueSelectedId}
              t={t}
            />
          )}
        </FieldArray>
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
            addAction={() => push()}
            deleteAction={
              currentNodeId ? () => remove(currentNodeId) : undefined
            }
          />
        </LeftSideButton>
      </CardActions>
    </Card>
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
      id: "",
      label: "",
      translated: [],
    },
    optionValueId: makeId(),
  };
}

interface SelectOptionFormProps {
  id: string;
  parentPath: string[];
  metadata: OrdinalMetadata;
  option: StaticChoiceOptionInput;
  optionValueId: string;
  defaultValueSelectedId: string;
  t: Translator;
  labels: StaticChoiceFormLabels["options"];
}

function SelectOptionForm({
  id,
  parentPath,
  metadata,
  labels,
  option,
  optionValueId,
  defaultValueSelectedId,
  t,
}: SelectOptionFormProps) {
  const { formPath: path } = useForm({
    parentPath,
    id,
    name: "options",
    metadata,
  });

  const { value: optionIdValue, id: optionId } = useFormFieldValueRef(
    "0",
    optionValueId
  );
  const { value: selectedDefaultValue, id: selectedId } = useFormFieldValueRef(
    "0",
    defaultValueSelectedId
  );
  const previousOptionIdValue = usePrevious(optionIdValue);

  return (
    <FormSection>
      <Field
        id={optionId}
        validator={STRING_VALIDATOR}
        path={path}
        defaultValue={optionIdValue}
        name={labels.id.id}
        key={labels.id.id}
        label={labels.id.label}
        component={textField}
        t={t}
      />
      <Field
        id={selectedId}
        validator={STRING_VALIDATOR}
        path={parentPath}
        defaultValue={
          previousOptionIdValue === selectedDefaultValue &&
          optionIdValue !== selectedDefaultValue
            ? optionIdValue
            : selectedDefaultValue
        }
        name={labels.selected.id}
        key={labels.selected.id}
        label={labels.selected.label}
        component={checkboxField}
        valueToFormModel={(previous, current) => {
          if (Boolean(current)) {
            return optionIdValue;
          }

          return previous;
        }}
        formatter={(current) => current === optionIdValue}
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

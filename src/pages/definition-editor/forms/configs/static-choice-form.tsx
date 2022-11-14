import { Card, CardActions, CardContent, CardHeader } from "@mui/material";
import { head } from "lodash";
import { useCallback, useLayoutEffect, useRef } from "react";
import { AdditionRemovalActionGroup } from "../../../../components/buttons";
import { LeftSideButton } from "../../../../components/custom-styles";
import {
  Field,
  FieldArrayElement,
  FieldArrayElementPicker,
  FormSection,
  getFieldValue,
  patchFormField,
  selectField,
  STRING_VALIDATOR,
  textField,
  Translator,
  useFieldArray,
  useFieldWatch,
  useForm,
  useHiddenField,
  useNodePickerState,
} from "../../../../components/table-fields";
import {
  StaticChoiceFieldConfigInput,
  StaticChoiceOptionInput,
} from "../../../../generated";
import { useServices } from "../../../../services-def";
import { useId } from "../../../../shared/redux-db";
import { MultiLanguageField } from "../multi-language-field";

interface StaticChoiceFormLabels {
  form: {
    name: string;
  };
  selected: {
    name: string;
    label: string;
    fallbackLabel: string;
  };
  optionCardHeader: {
    label: string;
  };
  options: {
    formElement: {
      name: string;
    };
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
  staticChoice?: StaticChoiceFieldConfigInput | null;
  t: Translator;
  labels: StaticChoiceFormLabels;
}

export function StaticChoiceForm({
  parentPath,
  labels,
  staticChoice,
  t,
}: StaticChoiceFormProps) {
  const { reduxDb } = useServices();
  const { formPath } = useForm({ parentPath, name: labels.form.name });
  const { push, remove, elements } = useFieldArray<StaticOptionArrayValue>(
    makeDefaultOption,
    getDefaultOptions(staticChoice?.options || [])
  );
  const { currentNodeId, setCurrentNodeId } = useNodePickerState(
    head(elements)?.id
  );

  const { value: currentElementValue } = useFieldWatch(
    elements.find((e) => e.id === currentNodeId)?.value.optionValueId
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

  const getLabel = useCallback(
    (e) =>
      getFieldValue(
        reduxDb,
        e.value.optionValueId,
        e.value.option.id
      ) as string,
    [reduxDb]
  );

  const selectedId = useId();

  const modelView = useRef(
    (() => {
      let optionValueId: unknown;

      const toModel = (current: unknown) => {
        const e = elements.find((e) => e.value.optionValueId === current);

        if (e === undefined) {
          return staticChoice?.selected || head(elements)?.value.option.id;
        }

        optionValueId = current;
        return currentElementValue || getLabel(e);
      };

      const toView = () => optionValueId as string;

      const update = () => {
        if (optionValueId) {
          patchFormField(reduxDb, selectedId, {
            value: toModel(optionValueId),
            viewValue: optionValueId,
          });
        }
      };

      return {
        toModel,
        toView,
        update,
      };
    })()
  );

  useLayoutEffect(() => {
    modelView.current.update();
  }, [getLabel, elements, staticChoice, currentElementValue]);

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
        defaultValue={
          elements.find(
            (e) =>
              e.value.option.id ===
              (staticChoice?.selected || head(elements)?.value.option.id)
          )?.value.optionValueId
        }
        fallbackSelection={{ label: labels.selected.fallbackLabel }}
        valueToFormModel={modelView.current.toModel}
        formatter={modelView.current.toView}
        options={elements.map((e) => ({
          id: e.value.optionValueId,
          label: getLabel(e),
        }))}
      />
      <Card>
        <CardHeader title={t(labels.optionCardHeader.label)} />
        <CardContent>
          <FormSection>
            {elements.map((element) => (
              <div
                key={element.id}
                style={{
                  display: element.id === currentNodeId ? "block" : "none",
                }}
              >
                <SelectOptionForm
                  key={element.id}
                  parentPath={formPath}
                  element={element}
                  labels={labels.options}
                  active={element.id === currentNodeId}
                  t={t}
                />
              </div>
            ))}
          </FormSection>
        </CardContent>
        <CardActions disableSpacing>
          <FieldArrayElementPicker
            elements={elements}
            current={currentNodeId}
            currentLabel={getLabel(
              elements.find((e) => e.id === currentNodeId)
            )}
            onChange={setCurrentNodeId}
            getLabel={getLabel}
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
  active: boolean;
  t: Translator;
}

function SelectOptionForm({
  parentPath,
  labels,
  element,
  active,
  t,
}: SelectOptionFormProps) {
  const { formPath: path } = useForm({
    parentPath,
    id: element.id,
    name: labels.formElement.name,
    metadata: element.metadata,
  });

  const option = element.value.option;

  useHiddenField({
    path,
    name: labels.label.name,
    value: option.label,
  });

  useHiddenField({
    path,
    name: labels.helpText.name,
    value: option.helpText,
  });

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
      <MultiLanguageField
        parentPath={path}
        name={labels.tabs.name}
        labels={labels.tabs}
        labelTranslationKeyName={option.label}
        helpTextTranslationKeyName={option.helpText}
        nameId={element.value.optionValueId}
        translations={option.translated}
        t={t}
        active={active}
      />
    </FormSection>
  );
}

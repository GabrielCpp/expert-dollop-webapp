import { CardHeader, Card, CardContent, CardActions } from "@mui/material";
import { useTranslation } from "react-i18next";
import { head } from "lodash";
import { AdditionRemovalActionGroup } from "../../../components/buttons";
import { LeftSideButton } from "../../../components/custom-styles";
import {
  useForm,
  useFieldArray,
  FormSection,
  IdGenerator,
  FieldArrayElement,
  useFormFieldValueRef,
  Field,
  STRING_VALIDATOR,
  SelectField,
  FieldArrayElementPicker,
  InlineTextField,
  useNodePickerState,
  getFieldValue,
  useFieldWatch,
} from "../../../components/table-fields";
import {
  AggregateAttributeSchemaInput,
  AggregateCollectionInput,
  AttributeDetailsEnum,
  FieldDetailsType,
} from "../../../generated";
import { collectionLabels } from "../form-definitions";
import { NAME_VALIDATOR } from "../validators";
import { BoolFieldConfigForm } from "./configs/bool-field-config-form";
import { DecimalFieldConfigForm } from "./configs/decimal-field-config-form";
import { IntFieldConfigForm } from "./configs/int-field-config-form";
import { StaticChoiceForm } from "./configs/static-choice-form";
import { StringFieldConfigForm } from "./configs/string-field-config-form";
import { useCallback } from "react";
import { useServices } from "../../../services-def";

interface CollectionAttributesSchemaProps {
  path: string[];
  projectDefinitionId: string;
  name: string;
  labels: typeof collectionLabels.attributesSchema;
  attributesSchema: AggregateCollectionInput["attributesSchema"];
}

export function CollectionAttributesSchema({
  name,
  path,
  labels,
  attributesSchema,
}: CollectionAttributesSchemaProps) {
  const { t } = useTranslation();
  const { reduxDb } = useServices();
  const { insert, remove, elements } = useFieldArray({
    createElement: makeDefaultattributeSchema,
    initialState: getAttributeSchemas(attributesSchema),
  });
  const { currentNodeId, setCurrentNodeId } = useNodePickerState(
    head(elements)?.id
  );
  const { value: currentElementValue } = useFieldWatch(
    elements.find((e) => e.id === currentNodeId)?.value.schemaId
  );
  const removeCurrentElement = useCallback(() => {
    if (currentNodeId) {
      remove({ id: currentNodeId });
    }

    setCurrentNodeId(elements.find((e) => e.id !== currentNodeId)?.id);
  }, [remove, setCurrentNodeId, elements, currentNodeId]);

  const addElement = useCallback(() => {
    insert({
      after: ({ element: e }) => setCurrentNodeId(e.id),
    });
  }, [insert, setCurrentNodeId]);

  const getLabel = useCallback(
    (e?: FieldArrayElement<AggregateAttributeSchema>) =>
      e === undefined
        ? ""
        : (getFieldValue(
            reduxDb,
            e.value.schemaId,
            e.value.schema.name
          ) as string),
    [reduxDb]
  );

  return (
    <Card>
      <CardHeader title={t(labels.formTitle)} />
      <CardContent>
        <FormSection spacing={0}>
          {elements.map((element) => (
            <div
              key={element.id}
              style={{
                display: element.id === currentNodeId ? "block" : "none",
              }}
            >
              <CollectionAttributeSchema
                key={element.id}
                parentPath={path}
                element={element}
                labels={labels}
                active={element.id === currentNodeId}
              />
            </div>
          ))}
        </FormSection>
      </CardContent>
      <CardActions disableSpacing>
        <FieldArrayElementPicker
          elements={elements}
          current={currentNodeId}
          currentLabel={currentElementValue as string}
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
  );
}

interface AggregateAttributeSchema {
  schemaId: string;
  schema: AggregateAttributeSchemaInput;
}

function makeDefaultattributeSchema(
  makeId: () => string
): AggregateAttributeSchema {
  return {
    schemaId: makeId(),
    schema: {
      name: "",
      details: {
        kind: AttributeDetailsEnum.DECIMAL_FIELD_CONFIG,
        decimal: {
          numeric: 0.0,
          precision: 3,
        },
      },
    },
  };
}

const getAttributeSchemas =
  (attributeSchema: AggregateAttributeSchemaInput[]) =>
  (makeId: IdGenerator): FieldArrayElement<AggregateAttributeSchema>[] => {
    return attributeSchema.map((schema, index) => ({
      id: makeId(),
      metadata: {
        ordinal: index,
      },
      value: {
        schemaId: makeId(),
        schema,
      },
    }));
  };

interface CollectionAttributeSchemaProps {
  parentPath: string[];
  active: boolean;
  element: FieldArrayElement<AggregateAttributeSchema>;
  labels: typeof collectionLabels["attributesSchema"];
}

function CollectionAttributeSchema({
  parentPath,
  element,
  labels,
}: CollectionAttributeSchemaProps) {
  const { t } = useTranslation();
  const { formPath } = useForm({
    parentPath,
    id: element.id,
    name: labels.name,
    metadata: element.metadata,
  });
  const { formPath: detailsPath } = useForm({
    parentPath: formPath,
    name: labels.schema.details.name,
  });
  const details = element.value.schema.details;
  const { value, id: configTypeId } = useFormFieldValueRef(details.kind);

  return (
    <FormSection>
      <Field
        id={element.value.schemaId}
        validator={NAME_VALIDATOR}
        path={formPath}
        defaultValue={element.value.schema.name}
        key={labels.schema.name.name}
        name={labels.schema.name.name}
        label={labels.schema.name.label}
        t={t}
        component={InlineTextField}
      />
      <Field
        id={configTypeId}
        validator={STRING_VALIDATOR}
        defaultValue={value}
        path={detailsPath}
        name={labels.schema.configType.name}
        key={labels.schema.configType.name}
        label={labels.schema.configType.label}
        t={t}
        component={SelectField}
        options={labels.schema.configType.options}
      />
      {value === FieldDetailsType.INT_FIELD_CONFIG && (
        <IntFieldConfigForm
          name={"int"}
          parentPath={detailsPath}
          labels={labels.schema}
          config={details.int}
        />
      )}
      {value === FieldDetailsType.DECIMAL_FIELD_CONFIG && (
        <DecimalFieldConfigForm
          name={"decimal"}
          parentPath={detailsPath}
          labels={labels.schema}
          config={details.decimal}
        />
      )}
      {value === FieldDetailsType.BOOL_FIELD_CONFIG && (
        <BoolFieldConfigForm
          name={"bool"}
          parentPath={detailsPath}
          labels={labels.schema}
          config={details.bool}
        />
      )}
      {value === FieldDetailsType.STRING_FIELD_CONFIG && (
        <StringFieldConfigForm
          name={"string"}
          parentPath={detailsPath}
          labels={labels.schema}
          config={details.string}
        />
      )}
      {value === FieldDetailsType.STATIC_CHOICE_FIELD_CONFIG && (
        <StaticChoiceForm
          staticChoice={details.staticChoice}
          parentPath={detailsPath}
          key={labels.schema.staticChoice.form.name}
          labels={labels.schema.staticChoice}
          t={t}
        />
      )}
    </FormSection>
  );
}

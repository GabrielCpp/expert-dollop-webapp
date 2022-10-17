import { useTranslation } from "react-i18next";
import {
  BOOLEAN_VALIDATOR,
  checkboxField,
  Field,
  FormSection,
  INT_VALIDATOR,
  remoteReferencePickerField,
  selectField,
  SelectOption,
  STRING_VALIDATOR,
  textField,
  useForm,
  useFormFieldValueRef,
  useHiddenField,
} from "../../../components/table-fields";
import {
  DECIMAL_VALIDATOR,
  USER_STRING_VALIDATOR,
} from "../../../components/table-fields/validators";
import {
  FieldDetailsType,
  FieldDetailsUnionInput,
  FindDefinitionFormulaFieldMixDocument,
  FindDefinitionFormulaFieldMixQuery,
  FindFormulaDocument,
  FindFormulaQuery,
  QueryFindDefinitionFormulaFieldMixArgs,
  QueryFindFormulaArgs,
} from "../../../generated";
import { useServices } from "../../../services-def";
import {
  useApolloFetchItem,
  useApolloPageFetch,
} from "../../../shared/async-cursor";
import { nodeFormLabels } from "../form-definitions";
import { StaticChoiceForm } from "./static-choice-form";
import { UnitSelector } from "./unit-selector-form";

interface ConfigFormProps {
  name: string;
  path: string[];
  fieldDetails: FieldDetailsUnionInput;
  labels: typeof nodeFormLabels["fieldConfig"];
  projectDefinitionId: string;
}

export function FieldConfig({
  name,
  path,
  fieldDetails,
  labels,
  projectDefinitionId,
}: ConfigFormProps) {
  const { t } = useTranslation();
  const { formPath } = useForm({ name, parentPath: path });
  const { value, id: configTypeId } = useFormFieldValueRef(fieldDetails.kind);

  return (
    <FormSection>
      <Field
        id={configTypeId}
        validator={STRING_VALIDATOR}
        defaultValue={value}
        path={formPath}
        name={labels.fieldConfigType.name}
        key={labels.fieldConfigType.name}
        label={labels.fieldConfigType.label}
        t={t}
        component={selectField}
        options={labels.fieldConfigType.options}
      />
      {value === FieldDetailsType.INT_FIELD_CONFIG && (
        <IntFieldConfig
          name={"int"}
          parentPath={formPath}
          labels={labels}
          fieldDetails={fieldDetails}
        />
      )}
      {value === FieldDetailsType.DECIMAL_FIELD_CONFIG && (
        <DecimalFieldConfig
          name={"decimal"}
          parentPath={formPath}
          labels={labels}
          fieldDetails={fieldDetails}
        />
      )}
      {value === FieldDetailsType.BOOL_FIELD_CONFIG && (
        <BoolFieldConfig
          name={"bool"}
          parentPath={formPath}
          labels={labels}
          fieldDetails={fieldDetails}
        />
      )}
      {value === FieldDetailsType.STRING_FIELD_CONFIG && (
        <StringFieldConfig
          name={"string"}
          parentPath={formPath}
          labels={labels}
          fieldDetails={fieldDetails}
        />
      )}
      {value === FieldDetailsType.STATIC_CHOICE_FIELD_CONFIG && (
        <StaticChoiceForm
          defaultValue={fieldDetails.staticChoice?.selected}
          options={fieldDetails.staticChoice?.options}
          parentPath={formPath}
          name={labels.staticChoice.name}
          key={labels.staticChoice.name}
          labels={labels.staticChoice}
          t={t}
        />
      )}
      {value === FieldDetailsType.STATIC_NUMBER_FIELD_CONFIG && (
        <StaticNumberFieldConfig
          name={"string"}
          parentPath={formPath}
          labels={labels}
          fieldDetails={fieldDetails}
          projectDefinitionId={projectDefinitionId}
        />
      )}
    </FormSection>
  );
}

interface FieldTypeConfig {
  name: string;
  parentPath: string[];
  labels: typeof nodeFormLabels["fieldConfig"];
  fieldDetails: FieldDetailsUnionInput;
}

function StaticNumberFieldConfig({
  name,
  parentPath,
  labels,
  fieldDetails,
  projectDefinitionId,
}: FieldTypeConfig & { projectDefinitionId: string }) {
  const { t } = useTranslation();
  const { formPath } = useForm({ name, parentPath });
  const { apollo, loader } = useServices();
  const formulaNodeFetcher = useApolloPageFetch<
    SelectOption,
    FindDefinitionFormulaFieldMixQuery,
    QueryFindDefinitionFormulaFieldMixArgs
  >({
    apollo,
    document: FindDefinitionFormulaFieldMixDocument,
    onError: loader.onError,
    variables: {
      projectDefinitionId,
    },
  });

  const fetchFormulabyId = useApolloFetchItem<
    SelectOption,
    FindFormulaQuery,
    QueryFindFormulaArgs,
    "formulaId"
  >({
    apollo,
    document: FindFormulaDocument,
    onError: loader.onError,
    variables: {
      projectDefinitionId,
    },
    idKey: "formulaId",
  });

  return (
    <Field
      validator={true}
      defaultValue={""}
      path={formPath}
      name={labels.string.name}
      key={labels.string.name}
      label={labels.string.label}
      t={t}
      component={remoteReferencePickerField}
      fetchPage={formulaNodeFetcher}
      findById={fetchFormulabyId}
    />
  );
}

const DEFAULT_TRANSFORMS = ["trim", "remove_double_space"];

function StringFieldConfig({
  name,
  parentPath,
  labels,
  fieldDetails,
}: FieldTypeConfig) {
  const { t } = useTranslation();
  const { formPath } = useForm({ name, parentPath });
  useHiddenField({
    name: "transforms",
    value: DEFAULT_TRANSFORMS,
    path: formPath,
  });

  return (
    <Field
      validator={USER_STRING_VALIDATOR}
      defaultValue={fieldDetails.string?.text || labels.string.defaultValue}
      path={formPath}
      name={labels.string.name}
      key={labels.string.name}
      label={labels.string.label}
      t={t}
      component={textField}
    />
  );
}

function BoolFieldConfig({
  name,
  parentPath,
  labels,
  fieldDetails,
}: FieldTypeConfig) {
  const { t } = useTranslation();
  const { formPath } = useForm({ name, parentPath });

  return (
    <Field
      validator={BOOLEAN_VALIDATOR}
      defaultValue={
        fieldDetails.bool?.enabled === undefined
          ? false
          : fieldDetails.bool?.enabled
      }
      path={formPath}
      name={labels.bool.name}
      key={labels.bool.name}
      label={labels.bool.label}
      t={t}
      component={checkboxField}
    />
  );
}

function IntFieldConfig({
  name,
  parentPath,
  labels,
  fieldDetails,
}: FieldTypeConfig) {
  const { t } = useTranslation();
  const { formPath } = useForm({ name, parentPath });

  return (
    <>
      <Field
        validator={INT_VALIDATOR}
        defaultValue={fieldDetails.int?.integer || 0}
        path={formPath}
        name={labels.int.name}
        key={labels.int.name}
        label={labels.int.label}
        t={t}
        component={textField}
      />
      <UnitSelector
        unit={fieldDetails.int?.unit}
        formPath={formPath}
        name={labels.unit.name}
        key={labels.unit.name}
        label={labels.unit.label}
        t={t}
      />
      ,
    </>
  );
}

function DecimalFieldConfig({
  name,
  parentPath,
  labels,
  fieldDetails,
}: FieldTypeConfig) {
  const { t } = useTranslation();
  const { formPath } = useForm({ name, parentPath });

  return (
    <>
      <Field
        validator={DECIMAL_VALIDATOR}
        defaultValue={
          fieldDetails.decimal?.numeric || labels.precision.defaultValue
        }
        path={formPath}
        name={labels.decimal.name}
        key={labels.decimal.name}
        label={labels.decimal.label}
        t={t}
        component={textField}
      />
      <Field
        validator={INT_VALIDATOR}
        defaultValue={
          fieldDetails.decimal?.precision || labels.precision.defaultPrecision
        }
        path={formPath}
        name={labels.precision.name}
        key={labels.precision.name}
        label={labels.precision.label}
        t={t}
        component={textField}
      />
      <UnitSelector
        unit={fieldDetails.decimal?.unit}
        formPath={formPath}
        name={labels.unit.name}
        key={labels.unit.name}
        label={labels.unit.label}
        t={t}
      />
    </>
  );
}

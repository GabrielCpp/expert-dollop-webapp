import { useTranslation } from "react-i18next";
import {
  BOOLEAN_VALIDATOR,
  checkboxField,
  Field,
  FormSection,
  INT_VALIDATOR,
  selectField,
  STRING_VALIDATOR,
  textField,
  useForm,
  useFormFieldValueRef,
} from "../../../components/table-fields";
import {
  DECIMAL_VALIDATOR,
  USER_STRING_VALIDATOR,
} from "../../../components/table-fields/validators";
import { FieldDetailsType, FieldDetailsUnionInput } from "../../../generated";
import { FormRole, nodeFormLabels, NodeLevel } from "../form-definitions";
import { StaticChoiceForm } from "./static-choice-form";
import { UnitSelector } from "./unit-selector-form";

interface ConfigFormProps {
  name: string;
  path: string[];
  fieldDetails: FieldDetailsUnionInput;
  level: NodeLevel;
  role: FormRole;
  labels: typeof nodeFormLabels["fieldConfig"];
}

export function FieldConfig({
  name,
  path,
  fieldDetails,
  labels,
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
      {value === FieldDetailsType.INT_FIELD_CONFIG && [
        <Field
          validator={INT_VALIDATOR}
          defaultValue={fieldDetails.int?.integer || 0}
          path={formPath}
          name={labels.int.name}
          key={labels.int.name}
          label={labels.int.label}
          t={t}
          component={textField}
        />,
        <UnitSelector
          unit={fieldDetails.int?.unit}
          formPath={formPath}
          name={labels.unit.name}
          key={labels.unit.name}
          label={labels.unit.label}
          t={t}
        />,
      ]}
      {value === FieldDetailsType.DECIMAL_FIELD_CONFIG && [
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
        />,
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
        />,
        <UnitSelector
          unit={fieldDetails.decimal?.unit}
          formPath={formPath}
          name={labels.unit.name}
          key={labels.unit.name}
          label={labels.unit.label}
          t={t}
        />,
      ]}
      {value === FieldDetailsType.BOOL_FIELD_CONFIG && (
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
      )}
      {value === FieldDetailsType.STRING_FIELD_CONFIG && (
        <Field
          validator={USER_STRING_VALIDATOR}
          defaultValue={fieldDetails.string?.text}
          path={formPath}
          name={labels.string.name}
          key={labels.string.name}
          label={labels.string.label}
          t={t}
          component={textField}
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
    </FormSection>
  );
}

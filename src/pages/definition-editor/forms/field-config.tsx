import { useTranslation } from "react-i18next";
import {
  Field,
  FormSection,
  selectField,
  STRING_VALIDATOR,
  useForm,
  useFormFieldValueRef,
} from "../../../components/table-fields";
import { FieldDetailsType, FieldDetailsUnionInput } from "../../../generated";
import { nodeFormLabels } from "../form-definitions";
import { BoolFieldConfigForm } from "./configs/bool-field-config-form";
import { DecimalFieldConfigForm } from "./configs/decimal-field-config-form";
import { IntFieldConfigForm } from "./configs/int-field-config-form";
import { StaticNumberFieldConfigForm } from "./configs/static-number-field-config-form";
import { StringFieldConfigForm } from "./configs/string-field-config-form";
import { StaticChoiceForm } from "./configs/static-choice-form";

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
        <IntFieldConfigForm
          name={"int"}
          parentPath={formPath}
          labels={labels}
          config={fieldDetails.int}
        />
      )}
      {value === FieldDetailsType.DECIMAL_FIELD_CONFIG && (
        <DecimalFieldConfigForm
          name={"decimal"}
          parentPath={formPath}
          labels={labels}
          config={fieldDetails.decimal}
        />
      )}
      {value === FieldDetailsType.BOOL_FIELD_CONFIG && (
        <BoolFieldConfigForm
          name={"bool"}
          parentPath={formPath}
          labels={labels}
          config={fieldDetails.bool}
        />
      )}
      {value === FieldDetailsType.STRING_FIELD_CONFIG && (
        <StringFieldConfigForm
          name={"string"}
          parentPath={formPath}
          labels={labels}
          config={fieldDetails.string}
        />
      )}
      {value === FieldDetailsType.STATIC_CHOICE_FIELD_CONFIG && (
        <StaticChoiceForm
          staticChoice={fieldDetails.staticChoice}
          parentPath={formPath}
          key={labels.staticChoice.form.name}
          labels={labels.staticChoice}
          t={t}
        />
      )}
      {value === FieldDetailsType.STATIC_NUMBER_FIELD_CONFIG && (
        <StaticNumberFieldConfigForm
          name={"string"}
          parentPath={formPath}
          labels={labels}
          config={fieldDetails.staticNumberFieldConfig}
          projectDefinitionId={projectDefinitionId}
        />
      )}
    </FormSection>
  );
}

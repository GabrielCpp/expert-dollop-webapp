import { useTranslation } from "react-i18next";
import {
  BOOLEAN_VALIDATOR,
  checkboxField,
  Field,
  FormSection,
  selectField,
  STRING_VALIDATOR,
  useForm,
  useFormFieldValueRef,
  useHiddenField,
} from "../../../components/table-fields";
import { FieldDetailsUnionInput } from "../../../generated";
import { FormRole, nodeFormLabels, NodeLevel } from "../form-definitions";
import { Triggers } from "./triggers";

const opyions = [
  {
    id: "string",
    label: "string",
  },
  {
    id: "INT_FIELD_CONFIG",
    label: "integer",
  },
  {
    id: "DECIMAL_FIELD_CONFIG",
    label: "float",
  },
  {
    id: "BOOL_FIELD_CONFIG",
    label: "boolean",
  },
  {
    id: "STATIC_CHOICE_FIELD_CONFIG",
    label: "choix",
  },
  {
    id: "STATIC_NUMBER_FIELD_CONFIG",
    label: "calcul",
  },
];

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
  const { value, id: configTypeId } = useFormFieldValueRef("string");
  console.log(fieldDetails);
  useHiddenField("configType", formPath, null);

  return (
    <FormSection>
      <Field
        id={configTypeId}
        validator={STRING_VALIDATOR}
        defaultValue={value}
        path={formPath}
        name={labels.fieldConfigType.id}
        key={labels.fieldConfigType.id}
        label={labels.fieldConfigType.label}
        t={t}
        component={selectField}
        options={opyions}
      />

      {value === "BOOL_FIELD_CONFIG" && (
        <Field
          validator={BOOLEAN_VALIDATOR}
          defaultValue={true}
          path={formPath}
          name={labels.config.bool.id}
          key={labels.config.bool.id}
          label={labels.config.bool.label}
          t={t}
          component={checkboxField}
        />
      )}
      <Triggers path={formPath} key={labels.triggers.id} />
    </FormSection>
  );
}

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
  SelectOption,
} from "../../../components/table-fields";
import { FieldDetailsType, FieldDetailsUnionInput } from "../../../generated";

interface SectionConfigProps {
  name: string;
  parentPath: string[];
  fieldDetails?: FieldDetailsUnionInput;
  labels: {
    sectionConfigTypes: {
      name: string;
      label: string;
      options: SelectOption[];
      defaultOption: string;
    };
    collapsibleContainer: {
      name: string;
      label: string;
      defaultValue: boolean;
    };
  };
}

export function SectionConfig({
  name,
  parentPath,
  fieldDetails,
  labels,
}: SectionConfigProps) {
  const { t } = useTranslation();
  const { formPath } = useForm({ name, parentPath });
  const { value, id: configTypeId } = useFormFieldValueRef(
    fieldDetails?.kind || labels.sectionConfigTypes.defaultOption
  );

  return (
    <FormSection>
      <Field
        id={configTypeId}
        validator={STRING_VALIDATOR}
        defaultValue={value}
        path={formPath}
        name={labels.sectionConfigTypes.name}
        key={labels.sectionConfigTypes.name}
        label={labels.sectionConfigTypes.label}
        options={labels.sectionConfigTypes.options}
        t={t}
        component={selectField}
      />
      {value === FieldDetailsType.COLLAPSIBLE_CONTAINER_FIELD_CONFIG && (
        <Field
          validator={BOOLEAN_VALIDATOR}
          path={formPath}
          defaultValue={
            fieldDetails?.collapsibleContainer?.isCollapsible ||
            labels.collapsibleContainer.defaultValue
          }
          key={labels.collapsibleContainer.name}
          name={labels.collapsibleContainer.name}
          label={t(labels.collapsibleContainer.label)}
          t={t}
          component={checkboxField}
        />
      )}
    </FormSection>
  );
}

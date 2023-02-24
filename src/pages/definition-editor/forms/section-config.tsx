import { useTranslation } from "react-i18next";
import { SelectOption } from "@mui/base";
import {
  BOOLEAN_VALIDATOR,
  checkboxField,
  Field,
  FormSection,
  SelectField,
  STRING_VALIDATOR,
  useForm,
  useFormFieldValueRef,
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
      options: SelectOption<string>[];
      defaultOption: string;
    };
    collapsibleContainer: {
      name: string;
      isCollapsible: {
        name: string;
        label: string;
        defaultValue: boolean;
      };
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
  const { formPath: collapsibleContainerFormPath } = useForm({
    name: labels.collapsibleContainer.name,
    parentPath: formPath,
  });
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
        component={SelectField}
      />
      {value === FieldDetailsType.COLLAPSIBLE_CONTAINER_FIELD_CONFIG && (
        <Field
          validator={BOOLEAN_VALIDATOR}
          path={collapsibleContainerFormPath}
          defaultValue={
            fieldDetails?.collapsibleContainer?.isCollapsible ||
            labels.collapsibleContainer.isCollapsible.defaultValue
          }
          key={labels.collapsibleContainer.isCollapsible.name}
          name={labels.collapsibleContainer.isCollapsible.name}
          label={t(labels.collapsibleContainer.isCollapsible.label)}
          t={t}
          component={checkboxField}
        />
      )}
    </FormSection>
  );
}

import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import {
  Field,
  Form,
  BOOLEAN_VALIDATOR,
  useForm,
  textField,
  checkboxField,
} from "../../../components/table-fields";
import { AggregateCollectionInput } from "../../../generated";
import { collectionLabels, FormRole } from "../form-definitions";
import { NAME_VALIDATOR } from "../validators";
import { CollectionAttributesSchema } from "./collection-attributes-schema";

const labels = collectionLabels;

interface CollectionFormProps {
  role: FormRole;
  collection: AggregateCollectionInput;
  onSubmit: (data: AggregateCollectionInput) => Promise<void>;
  projectDefinitionId: string;
}

export function CollectionForm({
  projectDefinitionId,
  role,
  collection,
  onSubmit,
}: CollectionFormProps) {
  const { t } = useTranslation();
  const { formPath } = useForm();

  return (
    <Form
      formPath={formPath}
      save={onSubmit}
      label="shared.buttons.save"
      title={<Typography variant="h4">{t(labels.title.get(role))}</Typography>}
    >
      <Field
        validator={NAME_VALIDATOR}
        path={formPath}
        defaultValue={collection.name}
        key={labels.name.name}
        name={labels.name.name}
        label={labels.name.label}
        t={t}
        component={textField}
      />
      <Field
        validator={BOOLEAN_VALIDATOR}
        path={formPath}
        defaultValue={collection.isAbstract}
        key={labels.isAbstract.name}
        name={labels.isAbstract.name}
        label={t(labels.isAbstract.label)}
        t={t}
        component={checkboxField}
      />
      <CollectionAttributesSchema
        projectDefinitionId={projectDefinitionId}
        path={formPath}
        name={labels.attributesSchema.name}
        key={labels.attributesSchema.name}
        labels={labels.attributesSchema}
        attributesSchema={collection.attributesSchema}
      />
    </Form>
  );
}

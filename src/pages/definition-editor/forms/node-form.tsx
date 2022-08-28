import { Card, CardContent, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import {
  BOOLEAN_VALIDATOR,
  checkboxField,
  Field,
  Form,
  INT_VALIDATOR,
  StaticTabs,
  textField,
  useForm,
} from "../../../components/table-fields";
import { ProjectDefinitionNodeCreationInput } from "../../../generated";
import { FormRole, nodeFormLabels, NodeLevel } from "../form-definitions";
import { NAME_VALIDATOR } from "../validators";
import { FieldConfig } from "./field-config";
import { FieldTranslation } from "./field-translation";
import { Triggers } from "./triggers";

interface ContainerFormProps {
  level: NodeLevel;
  role: FormRole;
  node: ProjectDefinitionNodeCreationInput;
  onSubmit: (data: ProjectDefinitionNodeCreationInput) => Promise<void>;
}

export function NodeForm({ level, role, node, onSubmit }: ContainerFormProps) {
  const { t } = useTranslation();
  const { formPath } = useForm();

  async function save(data: any) {
    console.log(data);
  }

  const labels = nodeFormLabels;

  return (
    <Form
      formPath={formPath}
      save={save}
      label="shared.buttons.save"
      title={
        <Typography variant="h4">{t(labels.title.get(role, level))}</Typography>
      }
    >
      <Field
        validator={NAME_VALIDATOR}
        path={formPath}
        defaultValue={node.name}
        key={labels.name.id}
        name={labels.name.id}
        label={t(labels.name.label)}
        t={t}
        component={textField}
      />
      <Field
        validator={BOOLEAN_VALIDATOR}
        path={formPath}
        defaultValue={node.isCollection}
        key={labels.isCollection.id}
        name={labels.isCollection.id}
        label={t(labels.isCollection.label)}
        t={t}
        component={checkboxField}
      />
      <Field
        validator={BOOLEAN_VALIDATOR}
        path={formPath}
        defaultValue={node.instanciateByDefault}
        key={labels.instanciateByDefault.id}
        name={labels.instanciateByDefault.id}
        label={t(labels.instanciateByDefault.label)}
        t={t}
        component={checkboxField}
      />
      <Field
        validator={INT_VALIDATOR}
        path={formPath}
        defaultValue={node.orderIndex}
        key={labels.orderIndex.id}
        name={labels.orderIndex.id}
        label={t(labels.orderIndex.label)}
        t={t}
        component={textField}
      />
      <Card>
        <CardContent>
          <StaticTabs
            defaultSelectedField={labels.tabs.fr.id}
            key={labels.tabs.id}
          >
            <FieldTranslation
              path={formPath}
              key={labels.tabs.fr.id}
              name={labels.tabs.fr.id}
              locale={labels.tabs.fr.locale}
              label={t(labels.tabs.fr.label)}
              labels={labels.tabs.body}
              labelTranslationKeyName={node.translations.label}
              helpTextTranslationKeyName={node.translations.helpTextName}
              translations={node.translated}
            />
            <FieldTranslation
              path={formPath}
              key={labels.tabs.en.id}
              name={labels.tabs.en.id}
              locale={labels.tabs.en.locale}
              label={t(labels.tabs.en.label)}
              labels={labels.tabs.body}
              labelTranslationKeyName={node.translations.label}
              helpTextTranslationKeyName={node.translations.helpTextName}
              translations={node.translated}
            />
          </StaticTabs>
        </CardContent>
      </Card>
      {node.fieldDetails !== undefined && node.fieldDetails !== null && (
        <FieldConfig
          path={formPath}
          key={labels.fieldConfig.id}
          name={labels.fieldConfig.id}
          level={level}
          role={role}
          labels={labels.fieldConfig}
          fieldDetails={node.fieldDetails}
        />
      )}
      <Triggers path={formPath} key={labels.triggers.id} />
    </Form>
  );
}

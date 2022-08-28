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
        key={labels.name.name}
        name={labels.name.name}
        label={t(labels.name.label)}
        t={t}
        component={textField}
      />
      <Field
        validator={BOOLEAN_VALIDATOR}
        path={formPath}
        defaultValue={node.isCollection}
        key={labels.isCollection.name}
        name={labels.isCollection.name}
        label={t(labels.isCollection.label)}
        t={t}
        component={checkboxField}
      />
      <Field
        validator={BOOLEAN_VALIDATOR}
        path={formPath}
        defaultValue={node.instanciateByDefault}
        key={labels.instanciateByDefault.name}
        name={labels.instanciateByDefault.name}
        label={t(labels.instanciateByDefault.label)}
        t={t}
        component={checkboxField}
      />
      <Field
        validator={INT_VALIDATOR}
        path={formPath}
        defaultValue={node.orderIndex}
        key={labels.orderIndex.name}
        name={labels.orderIndex.name}
        label={t(labels.orderIndex.label)}
        t={t}
        component={textField}
      />
      <Card>
        <CardContent>
          <StaticTabs
            defaultSelectedField={labels.tabs.fr.name}
            key={labels.tabs.name}
          >
            <FieldTranslation
              path={formPath}
              key={labels.tabs.fr.name}
              name={labels.tabs.fr.name}
              locale={labels.tabs.fr.locale}
              label={t(labels.tabs.fr.label)}
              labels={labels.tabs.body}
              labelTranslationKeyName={node.translations.label}
              helpTextTranslationKeyName={node.translations.helpTextName}
              translations={node.translated}
            />
            <FieldTranslation
              path={formPath}
              key={labels.tabs.en.name}
              name={labels.tabs.en.name}
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
          key={labels.fieldConfig.name}
          name={labels.fieldConfig.name}
          level={level}
          role={role}
          labels={labels.fieldConfig}
          fieldDetails={node.fieldDetails}
        />
      )}
      <Triggers
        path={formPath}
        name={labels.triggers.name}
        key={labels.triggers.name}
        labels={labels.triggers}
      />
    </Form>
  );
}

import { Card, CardContent, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import {
  BOOLEAN_VALIDATOR,
  checkboxField,
  Field,
  Form,
  INT_VALIDATOR,
  textField,
  useFieldsWatchCallack,
  useForm,
  useHiddenField,
} from "../../../components/table-fields";
import { ProjectDefinitionNodeCreationInput } from "../../../generated";
import { useId } from "../../../shared/redux-db";
import { FormRole, nodeFormLabels, NodeLevel } from "../form-definitions";
import { NAME_VALIDATOR } from "../validators";
import { FieldConfig } from "./field-config";
import { MetaConfigForm } from "./meta-config-form";
import { MultiLanguageField } from "./multi-language-field";
import { SectionConfig } from "./section-config";
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
  const nameId = useId();
  const labels = nodeFormLabels;

  const { formPath: translationConfigPath } = useForm({
    name: "translations",
    parentPath: formPath,
  });

  const { value: latestLabelTranslationKeyName } =
    useFieldsWatchCallack<string>({
      defaultValue: node.translations.label,
      ids: nameId,
    });

  useHiddenField({
    name: "label",
    path: translationConfigPath,
    value: latestLabelTranslationKeyName,
  });

  const { value: latestHelpTextTranslationKeyName } =
    useFieldsWatchCallack<string>({
      defaultValue: node.translations.helpTextName,
      ids: nameId,
      callback: buildTranslationKey,
    });

  useHiddenField({
    name: "helpTextName",
    path: translationConfigPath,
    value: latestHelpTextTranslationKeyName,
  });

  return (
    <Form
      formPath={formPath}
      save={onSubmit}
      label="shared.buttons.save"
      title={
        <Typography variant="h4">{t(labels.title.get(role, level))}</Typography>
      }
    >
      <Field
        id={nameId}
        validator={NAME_VALIDATOR}
        path={formPath}
        defaultValue={node.name}
        key={labels.name.name}
        name={labels.name.name}
        label={labels.name.label}
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
      <MetaConfigForm
        parentPath={formPath}
        key={labels.meta.name}
        name={labels.meta.name}
        meta={node.meta}
        labels={labels.meta}
        t={t}
      />
      <Card>
        <CardContent>
          <MultiLanguageField
            parentPath={formPath}
            name={labels.tabs.name}
            labels={labels.tabs}
            labelTranslationKeyName={node.translations.label}
            helpTextTranslationKeyName={node.translations.helpTextName}
            nameId={nameId}
            translations={node.translated}
            t={t}
          />
        </CardContent>
      </Card>
      {node.fieldDetails !== undefined &&
        node.fieldDetails !== null &&
        level === "field" && (
          <FieldConfig
            path={formPath}
            key={labels.fieldConfig.name}
            name={labels.fieldConfig.name}
            labels={labels.fieldConfig}
            fieldDetails={node.fieldDetails}
          />
        )}
      {level === "section" && (
        <SectionConfig
          parentPath={formPath}
          key={labels.sectionConfig.name}
          name={labels.sectionConfig.name}
          labels={labels.sectionConfig}
          fieldDetails={node.fieldDetails || undefined}
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

function buildTranslationKey(...name: unknown[]): string {
  return `${name[0] as string}_help_text`;
}

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useHistory, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import {
  AddProjectDefinitionNodeDocument,
  FieldDetailsType,
  FindProjectDefinitionNodeDocument,
  FindProjectDefinitionNodeQuery,
  ProjectDefinitionNode,
  Translation,
  useFindProjectDefinitionNodeQuery,
} from "../../../generated";
import { useServices } from "../../../services-def";
import { RouteViewCompoenentProps } from "../../../shared/named-routes";
import { useLoaderEffect } from "../../../components/loading-frame";
import { splitPath } from "../../project-editor/routes";
import {
  BOOLEAN_VALIDATOR,
  checkboxField,
  Field,
  FixedTabDisplay,
  hydrateForm,
  INT_VALIDATOR,
  STRING_VALIDATOR,
  textField,
  useForm,
  validateForm,
} from "../../../components/table-fields";

const NAME_VALIDATOR = {
  type: "string",
  minLength: 1,
  maxLength: 64,
  pattern: "^[a-z_][a-z0-9_]*$",
  errorMessage: {
    pattern: "field_validation.name.pattern",
    minLength: "field_validation.name.length",
    maxLength: "field_validation.name.length",
  },
};

export interface FieldTranslationProps {
  path: string[];
  name: string;
  translations: Translation[];
}

export function FieldTranslation({
  path,
  name,
  translations,
}: FieldTranslationProps) {
  const { t } = useTranslation();
  const { formPath } = useForm(name, path);
  const tabTranslations = translations.filter(
    (translation) => translation.locale === name
  );
  const helpText =
    tabTranslations.find((translation) => translation.name.endsWith("helptext"))
      ?.value || "";
  const label =
    tabTranslations.find(
      (translation) => !translation.name.endsWith("helptext")
    )?.value || "";

  return (
    <Grid
      container
      direction="column"
      justify="flex-start"
      alignItems="flex-start"
    >
      <Field
        validator={STRING_VALIDATOR}
        path={formPath}
        defaultValue={label}
        name="label"
        component={textField}
        label="project_definition_editor.add_node_form.label"
        t={t}
      />
      <Field
        validator={STRING_VALIDATOR}
        path={formPath}
        defaultValue={helpText}
        name="helpText"
        component={textField}
        label="project_definition_editor.add_node_form.help_text"
        t={t}
      />
    </Grid>
  );
}

interface ConfigFormProps {
  configType: FieldDetailsType;
  name: string;
  path: string[];
}

function ConfigForm({ name, path, configType }: ConfigFormProps) {
  const { t } = useTranslation();
  const { formPath } = useForm(name, path);

  if (configType === FieldDetailsType.COLLAPSIBLE_CONTAINER_FIELD_CONFIG) {
    return (
      <Field
        validator={BOOLEAN_VALIDATOR}
        defaultValue={true}
        path={formPath}
        name="isCollapsible"
        component={checkboxField}
        label="project_definition_editor.add_node_form.is_collapsible"
        t={t}
      />
    );
  }

  return <span></span>;
}

export interface AddContainerFormProps extends RouteViewCompoenentProps {
  configType: FieldDetailsType;
}

interface AddContainerFormBody {
  name: string;
  isCollection: boolean;
  instanciateByDefault: boolean;
  orderIndex: number;
  fr: {
    label: string;
    helpText: string;
  };

  en: {
    label: string;
    helpText: string;
  };

  config?: {
    isCollapsible: boolean;
  };
}

interface AddContainerFormParams {
  projectDefinitionId: string;
  selectedPath: string;
}

type NodeLevel = "root-section" | "sub-section" | "form" | "section" | "field";

const levelMapping: Record<string, NodeLevel> = {
  0: "root-section",
  1: "sub-section",
  2: "form",
  3: "section",
  4: "field",
};

interface ContainerFormLabels {
  title: string;
}

const containerFormLabels: Record<
  "edit" | "add",
  Record<NodeLevel, ContainerFormLabels>
> = {
  edit: {
    "root-section": {
      title: "project_definition_editor.add_node_form.edit_root_section",
    },
    "sub-section": {
      title: "project_definition_editor.add_node_form.edit_sub_section",
    },
    form: {
      title: "project_definition_editor.add_node_form.edit_form",
    },
    section: {
      title: "project_definition_editor.add_node_form.edit_section",
    },
    field: {
      title: "project_definition_editor.add_node_form.edit_field",
    },
  },
  add: {
    "root-section": {
      title: "project_definition_editor.add_node_form.add_root_section",
    },
    "sub-section": {
      title: "project_definition_editor.add_node_form.add_sub_section",
    },
    form: {
      title: "project_definition_editor.add_node_form.add_form",
    },
    section: {
      title: "project_definition_editor.add_node_form.add_section",
    },
    field: {
      title: "project_definition_editor.add_node_form.add_field",
    },
  },
};

interface ContainerFormProps {
  path: string[];
  level: NodeLevel;
  role: "edit" | "add";
  onSubmit: () => Promise<void>;
  returnUrl: string;
  node: ProjectDefinitionNode;
}

function ContainerForm({
  path,
  onSubmit,
  level,
  role,
  returnUrl,
  node,
}: ContainerFormProps) {
  const { t } = useTranslation();
  const labels = containerFormLabels[role][level];

  return (
    <Card>
      <CardHeader
        title={<Typography variant="h4">{t(labels.title)}</Typography>}
      />
      <CardContent>
        <form>
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="flex-start"
          >
            <Field
              validator={NAME_VALIDATOR}
              path={path}
              defaultValue={node.name}
              name="name"
              component={textField}
              label="project_definition_editor.add_node_form.name"
              t={t}
            />
            <Field
              validator={BOOLEAN_VALIDATOR}
              path={path}
              defaultValue={node.isCollection}
              name="isCollection"
              component={checkboxField}
              label="project_definition_editor.add_node_form.is_collection"
              t={t}
            />
            <Field
              validator={BOOLEAN_VALIDATOR}
              path={path}
              defaultValue={node.instanciateByDefault}
              name="instanciateByDefault"
              component={checkboxField}
              label="project_definition_editor.add_node_form.instanciate_by_default"
              t={t}
            />
            <Field
              validator={INT_VALIDATOR}
              path={path}
              defaultValue={node.orderIndex}
              name="orderIndex"
              component={textField}
              label="project_definition_editor.add_node_form.order"
              t={t}
            />
            <FixedTabDisplay
              path={path}
              defaultSelectedField={"fr"}
              tabs={[
                ["fr", t("language.french")],
                ["en", t("language.english")],
              ]}
            >
              {({ path, name }) => (
                <FieldTranslation
                  path={path}
                  name={name}
                  translations={node.translations}
                />
              )}
            </FixedTabDisplay>
            {(level === "section" || level === "field") && (
              <ConfigForm
                path={path}
                name="config"
                configType={FieldDetailsType.COLLAPSIBLE_CONTAINER_FIELD_CONFIG}
              />
            )}

            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="flex-start"
            >
              <Button variant="contained" color="primary" onClick={onSubmit}>
                {t(role === "add" ? "button.add" : "button.save")}
              </Button>
              <Button component={Link} to={returnUrl}>
                {t("button.cancel")}
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
}

export function AddContainerView({ returnUrl }: RouteViewCompoenentProps) {
  const { formPath: path } = useForm();
  const { reduxDb, ajv, apollo } = useServices();
  const { projectDefinitionId, selectedPath } =
    useParams<AddContainerFormParams>();
  const nodePath = splitPath(selectedPath);
  const level = levelMapping[nodePath.length];
  const history = useHistory();

  function getFieldDetails(): FieldDetailsType | null {
    return null;
  }

  async function onSubmit() {
    if (validateForm(reduxDb, ajv)(path) === false) {
      return;
    }

    let newNodePath: string[] = [];

    if (nodePath.length > 0) {
      const { data } = await apollo.query<FindProjectDefinitionNodeQuery>({
        query: FindProjectDefinitionNodeDocument,
        variables: {
          projectDefId: projectDefinitionId,
          nodeId: nodePath[nodePath.length - 1],
        },
      });

      const node = data.findProjectDefinitionNode;
      newNodePath = [...node.path, node.id];
    }

    const form = hydrateForm<AddContainerFormBody>(reduxDb)(path);

    await apollo.mutate({
      mutation: AddProjectDefinitionNodeDocument,
      variables: {
        node: {
          id: uuidv4(),
          projectDefId: projectDefinitionId,
          name: form.name,
          isCollection: form.isCollection,
          instanciateByDefault: form.instanciateByDefault,
          orderIndex: form.orderIndex,
          config: {
            fieldDetails: getFieldDetails(),
            valueValidator: null,
          },
          defaultValue: null,
          path: newNodePath,
        },
      },
      update(cache, { data: { addTodo } }) {},
    });

    history.push(returnUrl);
  }

  const node: ProjectDefinitionNode = {
    id: uuidv4(),
    isCollection: false,
    projectDefId: projectDefinitionId,
    name: "",
    instanciateByDefault: true,
    orderIndex: 0,
    config: {
      fieldDetails: null,
      valueValidator: null,
      translations: {
        helpTextName: "",
        label: "",
      },
      triggers: [],
    },
    defaultValue: null,
    path: [],
    children: [],
    translations: [],
  };

  return (
    <ContainerForm
      path={path}
      level={level}
      onSubmit={onSubmit}
      returnUrl={returnUrl}
      node={node}
      role="add"
    />
  );
}

interface EditContainerFormParams extends RouteViewCompoenentProps {
  projectDefinitionId: string;
  selectedPath: string;
  nodeId: string;
}

export function EditContainerView({ returnUrl }: RouteViewCompoenentProps) {
  const { formPath: path } = useForm();
  const { reduxDb, ajv, apollo } = useServices();
  const { projectDefinitionId, selectedPath, nodeId } =
    useParams<EditContainerFormParams>();
  const nodePath = splitPath(selectedPath);
  const level = levelMapping[nodePath.length];
  const history = useHistory();
  async function onSubmit() {
    if (validateForm(reduxDb, ajv)(path) === false) {
      return;
    }
  }

  const { data, loading, error } = useFindProjectDefinitionNodeQuery({
    variables: {
      projectDefId: projectDefinitionId,
      nodeId,
    },
  });

  useLoaderEffect(error, loading);

  if (data === undefined) {
    return null;
  }

  const node: ProjectDefinitionNode = {
    ...data.findProjectDefinitionNode,
    children: [],
  };

  return (
    <ContainerForm
      path={path}
      level={level}
      onSubmit={onSubmit}
      returnUrl={returnUrl}
      node={node}
      role="edit"
    />
  );
}

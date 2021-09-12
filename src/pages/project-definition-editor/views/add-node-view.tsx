import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Typography,
} from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { Link, useHistory, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import {
  AddProjectDefinitionNodeDocument,
  CollapsibleContainerFieldConfig,
  FieldDetailsType,
  FindProjectDefinitionNodeDocument,
  FindProjectDefinitionNodeQuery,
  NodeConfig,
  ProjectDefinitionNode,
  Translation,
  TranslationConfig,
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
  selectField,
  STRING_VALIDATOR,
  textField,
  useForm,
  useFormValue,
  useLocalRef,
  validateForm,
} from "../../../components/table-fields";
import { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
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
  translationConfig: TranslationConfig;
}

export function FieldTranslation({
  path,
  name,
  translations,
  translationConfig,
}: FieldTranslationProps) {
  const { t } = useTranslation();
  const { formPath } = useForm(name, path);
  const tabTranslations = translations.filter(
    (translation) => translation.locale === name
  );
  const helpText =
    tabTranslations.find(
      (translation) => translation.name === translationConfig.label
    )?.value || "";
  const label =
    tabTranslations.find(
      (translation) => translation.name === translationConfig.helpTextName
    )?.value || "";

  return (
    <Grid
      container
      direction="column"
      justifyContent="flex-start"
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

interface TriggersProps {
  path: string[];
}

function Triggers({ path }: TriggersProps) {
  const { t } = useTranslation();
  const { formPath } = useForm("triggers", path);
  const [ids, setIds] = useState<string[]>([]);

  function addTrigger() {
    setIds([...ids, uuidv4()]);
  }

  const deleteTrigger = (id: string) => () => {
    setIds(ids.filter((x) => x !== id));
  };

  return (
    <Card>
      <CardHeader
        action={
          <IconButton aria-label="settings" onClick={addTrigger}>
            <AddIcon />
          </IconButton>
        }
        title="Triggers"
      />
      <CardContent>
        <Grid direction="column" container>
          {ids.map((id) => (
            <Grid key={id}>
              <IconButton onClick={deleteTrigger(id)}>
                <DeleteIcon />
              </IconButton>
              <Field
                id={id}
                validator={STRING_VALIDATOR}
                defaultValue={"SET_VISIBILITY"}
                path={formPath}
                name="action"
                component={selectField}
                label="project_definition_editor.add_node_form.triggers.action"
                options={[
                  {
                    id: "CHANGE_NAME",
                    label:
                      "project_definition_editor.add_node_form.triggers.change_name_option",
                  },
                  {
                    id: "SET_VISIBILITY",
                    label:
                      "project_definition_editor.add_node_form.triggers.set_visibility_option",
                  },
                ]}
                t={t}
              />
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}

interface ConfigFormProps {
  config: NodeConfig;
  level: string;
  name: string;
  path: string[];
}

function ConfigForm({ name, path, config, level }: ConfigFormProps) {
  const { t } = useTranslation();
  const { formPath } = useForm(name, path);
  const { value, id: configTypeId } = useLocalRef(
    "fieldConfigType",
    formPath,
    "string"
  );

  const configType =
    level === "section"
      ? FieldDetailsType.COLLAPSIBLE_CONTAINER_FIELD_CONFIG
      : null;
  useFormValue(name, path, configType);

  if (configType === FieldDetailsType.COLLAPSIBLE_CONTAINER_FIELD_CONFIG) {
    const collapsibleContainerFieldConfig =
      config.fieldDetails as CollapsibleContainerFieldConfig;
    return (
      <Field
        validator={BOOLEAN_VALIDATOR}
        defaultValue={collapsibleContainerFieldConfig.isCollapsible}
        path={formPath}
        name="isCollapsible"
        component={checkboxField}
        label="project_definition_editor.add_node_form.is_collapsible"
        t={t}
      />
    );
  }

  return (
    <>
      {level === "field" && (
        <Field
          id={configTypeId}
          validator={STRING_VALIDATOR}
          defaultValue={value}
          path={formPath}
          name="fieldConfigType"
          component={selectField}
          label="project_definition_editor.add_node_form.field_details"
          options={[
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
          ]}
          t={t}
        />
      )}
      {value === "boolean" && (
        <Field
          validator={BOOLEAN_VALIDATOR}
          defaultValue={true}
          path={formPath}
          name="isCheckbox"
          component={checkboxField}
          label="project_definition_editor.add_node_form.config.is_checkbox"
          t={t}
        />
      )}
      <Triggers path={formPath} />
    </>
  );
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
            justifyContent="flex-start"
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
                  translationConfig={node.config.translations}
                  translations={node.translations}
                />
              )}
            </FixedTabDisplay>
            <ConfigForm
              path={path}
              name="config"
              level={level}
              config={node.config}
            />
            <Grid
              container
              direction="row"
              justifyContent="flex-start"
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
  const { reduxDb, ajv } = useServices();
  const { projectDefinitionId, selectedPath, nodeId } =
    useParams<EditContainerFormParams>();
  const nodePath = splitPath(selectedPath);
  const level = levelMapping[nodePath.length];
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

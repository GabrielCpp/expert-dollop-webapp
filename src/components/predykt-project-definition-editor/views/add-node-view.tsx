import { Button, Grid } from "@material-ui/core";
import React from "react";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from "uuid";

import {
  AddProjectDefinitionNodeDocument,
  FieldDetailsType,
  ProjectDefinitionNodeInput,
} from "../../../generated";
import { Services } from "../../../hooks";
import { RouteViewCompoenentProps } from "../../../shared/named-routes";
import { useServices } from "../../../shared/service-context";

import { useUrlQueryParams } from "../../../shared/named-routes";
import { useFindProjectDefinitionNodeQuery } from "../../../generated/graphql";
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
} from "../../table-fields";
import { useParams } from "react-router-dom";

export interface FieldTranslationProps {
  path: string[];
  name: string;
}

export function FieldTranslation({ path, name }: FieldTranslationProps) {
  const { t } = useTranslation();
  const { formPath } = useForm(name, path);

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
        defaultValue={""}
        name="label"
        component={textField}
        label="label"
        t={t}
      />
      <Field
        validator={STRING_VALIDATOR}
        path={formPath}
        defaultValue={""}
        name="helpText"
        component={textField}
        label="help_text"
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
        label="is_collapsible"
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
  projectDefId: string;
}

export function AddContainerForm({
  navigateBack,
  configType,
}: AddContainerFormProps) {
  const { reduxDb, ajv, apollo } = useServices<Services>();
  const { projectDefId } = useParams<AddContainerFormParams>();
  const { parentNodeId } = useUrlQueryParams();
  const { data } = useFindProjectDefinitionNodeQuery({
    variables: {
      projectDefId,
      nodeId: parentNodeId,
    },
  });

  const { t } = useTranslation();
  const { formPath: path } = useForm();

  async function onSubmit() {
    if (validateForm(reduxDb, ajv)(path) === false) {
      return;
    }

    if (data === undefined) {
      return;
    }

    const form = hydrateForm<AddContainerFormBody>(reduxDb)(path);
    const node = data.findProjectDefinitionNode;

    await apollo.mutate({
      mutation: AddProjectDefinitionNodeDocument,
      variables: {
        id: uuidv4(),
        projectDefId: node.projectDefId,
        name: form.name,
        isCollection: form.isCollection,
        instanciateByDefault: form.instanciateByDefault,
        orderIndex: form.orderIndex,
        config: {
          kind: configType,
          collapsibleContainer: {
            isCollapsible: form.config?.isCollapsible,
          },
        },
        defaultValue: null,
        path: node.path,
      },
    });

    navigateBack();
  }

  return (
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
          defaultValue={""}
          name="name"
          component={textField}
          label="name"
          t={t}
        />
        <Field
          validator={BOOLEAN_VALIDATOR}
          path={path}
          defaultValue={false}
          name="isCollection"
          component={checkboxField}
          label="is_collection"
          t={t}
        />
        <Field
          validator={BOOLEAN_VALIDATOR}
          path={path}
          defaultValue={true}
          name="instanciateByDefault"
          component={checkboxField}
          label="instanciate_by_default"
          t={t}
        />
        <Field
          validator={INT_VALIDATOR}
          path={path}
          defaultValue={0}
          name="orderIndex"
          component={textField}
          label="order_index"
          t={t}
        />
        <FixedTabDisplay
          path={path}
          defaultSelectedField={"fr"}
          tabs={[
            ["fr", "french"],
            ["en", "english"],
          ]}
        >
          {FieldTranslation}
        </FixedTabDisplay>
        <ConfigForm
          path={path}
          name="config"
          configType={FieldDetailsType.COLLAPSIBLE_CONTAINER_FIELD_CONFIG}
        />
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
        >
          <Button onClick={onSubmit}>Add</Button>
          <Button onClick={navigateBack}>Cancel</Button>
        </Grid>
      </Grid>
    </form>
  );
}

export function AddContainerView({ navigateBack }: RouteViewCompoenentProps) {
  return (
    <AddContainerForm
      navigateBack={navigateBack}
      configType={FieldDetailsType.COLLAPSIBLE_CONTAINER_FIELD_CONFIG}
    />
  );
}

const NAME_VALIDATOR = {
  type: "string",
  minLength: 1,
  maxLength: 64,
  pattern: "^[a-z_][a-z0-9_]*$",
};

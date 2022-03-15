import {
  Card,
  CardHeader,
  Collapse,
  Grid,
  IconButton,
  styled,
  Tooltip,
  Typography,
} from "@mui/material";
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

import {
  CollapsibleContainerFieldConfig,
  ProjectDefinitionNode,
  ProjectDefinitionTreeNode,
  StaticChoiceFieldConfig,
  useFindProjectDefinitionFormContentQuery,
} from "../../../generated";
import { useServices } from "../../../services-def";
import { useLoaderEffect } from "../../../components/loading-frame";
import { Field, radioField, textField } from "../../../components/table-fields";
import { checkboxField } from "../../../components/table-fields/table-checkbox-field";
import { useDbTranslation } from "../hooks/db-trans";
import { EditButton } from "../components/edit-button";
import {
  buildAddNodeParams,
  buildEditNodeParams,
  PROJECT_DEFINITION_EDITOR_NODE_ADD,
  PROJECT_DEFINITION_EDITOR_NODE_EDIT,
} from "../routes";
import EditIcon from "@mui/icons-material/Edit";
import {
  ExpandIconButton,
  UnpadCardContent,
} from "../../../components/custom-styles";

interface FormProps {
  node: ProjectDefinitionTreeNode;
}

function getFieldValue(node: ProjectDefinitionNode): string | number | boolean {
  const { text, numeric, enabled, integer } = {
    text: null,
    numeric: null,
    enabled: null,
    integer: null,
    ...node.defaultValue,
  };

  const value = [text, numeric, enabled, integer].find((x) => x != null);

  if (value === null || value === undefined) {
    throw new Error("Bad value");
  }

  return value;
}

function FormField({ node }: FormProps): JSX.Element {
  const { dbTrans } = useDbTranslation(node.definition.projectDefinitionId);
  const { routes } = useServices();

  if (
    node.definition.config.fieldDetails === null ||
    node.definition.config.fieldDetails === undefined
  ) {
    throw new Error("Bad config");
  }

  const { __typename: fieldType } = node.definition.config.fieldDetails;
  const value = getFieldValue(node.definition);
  const validator = JSON.parse(node.definition.config.valueValidator);
  const EditButton = (
    <IconButton
      aria-label="edit"
      component={RouterLink}
      to={routes.render(
        PROJECT_DEFINITION_EDITOR_NODE_EDIT,
        buildEditNodeParams(
          node.definition.projectDefinitionId,
          node.definition.path,
          node.definition.id
        )
      )}
    >
      <EditIcon fontSize="inherit" />
    </IconButton>
  );

  if (
    fieldType === "StringFieldConfig" ||
    fieldType === "IntFieldConfig" ||
    fieldType === "DecimalFieldConfig"
  ) {
    return (
      <FullWidthGrid>
        <GridFieldItem>
          <Field
            validator={validator}
            path={node.definition.path}
            name={node.definition.name}
            defaultValue={value}
            id={node.definition.id}
            label={node.definition.name}
            t={dbTrans}
            component={textField}
          />
        </GridFieldItem>
        <GridEditButton>{EditButton}</GridEditButton>
      </FullWidthGrid>
    );
  }

  if (fieldType === "BoolFieldConfig") {
    return (
      <FullWidthGrid>
        <GridFieldItem>
          <Field
            validator={validator}
            path={node.definition.path}
            name={node.definition.name}
            defaultValue={value}
            id={node.definition.id}
            label={node.definition.name}
            t={dbTrans}
            component={checkboxField}
          />
        </GridFieldItem>
        <GridEditButton>{EditButton}</GridEditButton>
      </FullWidthGrid>
    );
  }

  if (fieldType === "StaticChoiceFieldConfig") {
    const choices = node.definition.config
      .fieldDetails as StaticChoiceFieldConfig;
    return (
      <FullWidthGrid>
        <GridFieldItem>
          <Field
            options={choices.options}
            validator={validator}
            path={node.definition.path}
            name={node.definition.name}
            defaultValue={value}
            id={node.definition.id}
            label={node.definition.config.translations.label}
            t={dbTrans}
            component={radioField}
          />
        </GridFieldItem>
        <GridEditButton>{EditButton}</GridEditButton>
      </FullWidthGrid>
    );
  }

  if (fieldType === "StaticNumberFieldConfig") {
    return (
      <FullWidthGrid>
        <GridFieldItem>
          <label>{dbTrans(node.definition.name)}</label>{" "}
        </GridFieldItem>
        <GridEditButton>{EditButton}</GridEditButton>
      </FullWidthGrid>
    );
  }

  return <div key={node.definition.name}>{node.definition.name}</div>;
}

const FullWidthGrid = styled(Grid)(() => ({
  width: "100%",
}));

const GridFieldItem = styled(Grid)(() => ({
  width: "90%",
}));

const GridEditButton = styled(Grid)(() => ({
  width: "10%",
}));

function FormSection({ node }: FormProps): JSX.Element {
  const valueType = node.definition.config
    .fieldDetails as CollapsibleContainerFieldConfig;
  const [expanded, setExpanded] = useState(!valueType.isCollapsible);
  const { dbTrans } = useDbTranslation(node.definition.projectDefinitionId);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const action = valueType.isCollapsible ? (
    <ExpandIconButton
      expanded={expanded}
      onClick={handleExpandClick}
      aria-expanded={expanded}
      aria-label="show more"
    >
      <ExpandMoreIcon />
    </ExpandIconButton>
  ) : undefined;

  return (
    <Card variant="outlined">
      <CardHeader
        avatar={
          <EditButton
            projectDefinitionId={node.definition.projectDefinitionId}
            path={node.definition.path}
            id={node.definition.id}
          />
        }
        action={action}
        title={
          <Tooltip
            title={dbTrans(node.definition.config.translations.helpTextName)}
          >
            <Typography variant="h5" component="h5" gutterBottom>
              {dbTrans(node.definition.config.translations.label)}
            </Typography>
          </Tooltip>
        }
      />
      <Collapse in={expanded} mountOnEnter={true} timeout="auto">
        <UnpadCardContent>
          <Grid container direction="column">
            {node.children.map((child) => (
              <Grid item key={child.definition.name}>
                <FormField node={child} />
              </Grid>
            ))}
          </Grid>
        </UnpadCardContent>
      </Collapse>
    </Card>
  );
}

interface FormDefinitionEditorProps {
  projectDefinitionId: string;
  formDefId: string;
}

export function FormDefinitionEditor({
  projectDefinitionId,
  formDefId,
}: FormDefinitionEditorProps) {
  const { t, dbTrans } = useDbTranslation(projectDefinitionId);
  const { routes } = useServices();
  const { loading, data, error } = useFindProjectDefinitionFormContentQuery({
    variables: {
      id: projectDefinitionId,
      formId: formDefId,
    },
  });

  useLoaderEffect(error, loading);

  const formNode = data?.findProjectDefinitionNode;
  const formContent = data?.findProjectDefinitionFormContent.roots;

  return (
    <>
      {formNode && (
        <Tooltip title={dbTrans(formNode.config.translations.helpTextName)}>
          <Typography variant="h4" component="h4" gutterBottom>
            {dbTrans(formNode.config.translations.label)}
          </Typography>
        </Tooltip>
      )}
      <form>
        <Grid container direction="column" spacing={1}>
          {formContent &&
            formContent.map((node) => (
              <Grid item key={node.definition.name}>
                <FormSection node={node as ProjectDefinitionTreeNode} />
              </Grid>
            ))}
          {formNode && (
            <Card variant="outlined">
              <CardHeader
                action={
                  <IconButton
                    component={RouterLink}
                    to={routes.render(
                      PROJECT_DEFINITION_EDITOR_NODE_ADD,
                      buildAddNodeParams(projectDefinitionId, [
                        ...formNode.path,
                        formNode.id,
                      ])
                    )}
                  >
                    <AddIcon />
                  </IconButton>
                }
                title={
                  <Typography variant="h5" component="h5" gutterBottom>
                    {t("project_definition_editor.add_new_section")}
                  </Typography>
                }
              />
            </Card>
          )}
        </Grid>
      </form>
    </>
  );
}

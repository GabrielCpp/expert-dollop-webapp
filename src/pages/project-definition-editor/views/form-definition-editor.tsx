import {
  Card,
  CardContent,
  CardHeader,
  Collapse,
  Grid,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { ExpandMore as ExpandMoreIcon } from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import clsx from "clsx";
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
import { MouseOverPopover } from "../../../components/mouse-over-popover";
import { Field, radioField, textField } from "../../../components/table-fields";
import { checkboxField } from "../../../components/table-fields/table-checkbox-field";
import { useDbTranslation } from "../../../components/translation";
import { EditButton } from "../components/edit-button";
import {
  buildAddNodeParams,
  PROJECT_DEFINITION_EDITOR_NODE_ADD,
} from "../routes";

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
  const { dbTrans } = useDbTranslation(node.definition.projectDefId);

  if (
    node.definition.config.fieldDetails === null ||
    node.definition.config.fieldDetails === undefined
  ) {
    throw new Error("Bad config");
  }

  const { __typename: fieldType } = node.definition.config.fieldDetails;
  const value = getFieldValue(node.definition);
  const validator = JSON.parse(node.definition.config.valueValidator);

  if (
    fieldType === "StringFieldConfig" ||
    fieldType === "IntFieldConfig" ||
    fieldType === "DecimalFieldConfig"
  ) {
    return (
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
    );
  }

  if (fieldType === "BoolFieldConfig") {
    return (
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
    );
  }

  if (fieldType === "StaticChoiceFieldConfig") {
    const choices = node.definition.config
      .fieldDetails as StaticChoiceFieldConfig;
    return (
      <Field
        options={choices.options}
        validator={validator}
        path={node.definition.path}
        name={node.definition.name}
        defaultValue={value}
        id={node.definition.id}
        label={node.definition.name}
        t={dbTrans}
        component={radioField}
      />
    );
  }

  return <div key={node.definition.name}>{node.definition.name}</div>;
}

const useStyles = makeStyles((theme) => ({
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  cardContent: {
    paddingTop: 0,
  },
  leftSideButton: {
    marginLeft: "auto",
  },
}));

function FormSection({ node }: FormProps): JSX.Element {
  const valueType = node.definition.config
    .fieldDetails as CollapsibleContainerFieldConfig;
  const classes = useStyles();
  const [expanded, setExpanded] = useState(!valueType.isCollapsible);
  const { dbTrans } = useDbTranslation(node.definition.projectDefId);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const action = valueType.isCollapsible ? (
    <IconButton
      className={clsx(classes.expand, {
        [classes.expandOpen]: expanded,
      })}
      onClick={handleExpandClick}
      aria-expanded={expanded}
      aria-label="show more"
    >
      <ExpandMoreIcon />
    </IconButton>
  ) : undefined;

  return (
    <Card variant="outlined">
      <CardHeader
        avatar={
          <EditButton
            projectDefId={node.definition.projectDefId}
            path={node.definition.path}
            id={node.definition.id}
          />
        }
        action={action}
        title={
          <MouseOverPopover
            name={node.definition.name}
            text={dbTrans(node.definition.config.translations.helpTextName)}
          >
            {(props) => (
              <Typography {...props} variant="h5" component="h5" gutterBottom>
                {dbTrans(node.definition.config.translations.label)}
              </Typography>
            )}
          </MouseOverPopover>
        }
      />
      <Collapse in={expanded} timeout="auto">
        <CardContent className={classes.cardContent}>
          <Grid container direction="column">
            {node.children.map((child) => (
              <Grid item key={child.definition.name}>
                <FormField node={child} />
              </Grid>
            ))}
          </Grid>
        </CardContent>
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
        <MouseOverPopover
          name={formNode.name}
          text={dbTrans(formNode.config.translations.helpTextName)}
        >
          {(props) => (
            <Typography {...props} variant="h4" component="h4" gutterBottom>
              {dbTrans(formNode.config.translations.label)}
            </Typography>
          )}
        </MouseOverPopover>
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

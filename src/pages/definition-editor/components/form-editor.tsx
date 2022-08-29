import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Card,
  CardActions,
  CardHeader,
  Collapse,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

import EditIcon from "@mui/icons-material/Edit";
import {
  ExpandIconButton,
  LeftSideButton,
  UnpadCardContent,
} from "../../../components/custom-styles";
import { useLoaderEffect } from "../../../components/loading-frame";
import {
  checkboxField,
  Field,
  radioField,
  textField,
} from "../../../components/table-fields";
import {
  CollapsibleContainerFieldConfig,
  ProjectDefinitionTreeNode,
  StaticChoiceFieldConfig,
  useFindProjectDefinitionFormContentQuery,
} from "../../../generated";
import { useServices } from "../../../services-def";
import { useDbTranslation } from "../hooks/db-trans";
import {
  buildAddNodeParams,
  buildEditNodeParams,
  PROJECT_DEFINITION_EDITOR_NODE_ADD,
  PROJECT_DEFINITION_EDITOR_NODE_EDIT,
} from "../routes";
import { EditButton } from "./edit-button";

interface FormProps {
  node: ProjectDefinitionTreeNode;
}

function FormField({ node }: FormProps): JSX.Element {
  const { dbTrans } = useDbTranslation(node.definition.projectDefinitionId);
  const { routes } = useServices();
  const validator = JSON.parse(node.definition.validator);

  if (
    node.definition.fieldDetails === null ||
    node.definition.fieldDetails === undefined
  ) {
    throw new Error("Bad config");
  }

  const { __typename: fieldType } = node.definition.fieldDetails;
  const EditButton = (
    <IconButton
      aria-label="edit"
      size="small"
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

  if (fieldType === "StringFieldConfig") {
    return (
      <Field
        validator={validator}
        path={node.definition.path}
        name={node.definition.name}
        defaultValue={node.definition.fieldDetails.text}
        id={node.definition.id}
        label={node.definition.name}
        t={dbTrans}
        component={textField}
        startAdornment={EditButton}
      />
    );
  }

  if (fieldType === "IntFieldConfig") {
    return (
      <Field
        validator={validator}
        path={node.definition.path}
        name={node.definition.name}
        defaultValue={node.definition.fieldDetails.integer}
        id={node.definition.id}
        label={node.definition.name}
        t={dbTrans}
        component={textField}
        startAdornment={EditButton}
      />
    );
  }

  if (fieldType === "DecimalFieldConfig") {
    return (
      <Field
        validator={validator}
        path={node.definition.path}
        name={node.definition.name}
        defaultValue={node.definition.fieldDetails.numeric}
        id={node.definition.id}
        label={node.definition.name}
        t={dbTrans}
        component={textField}
        startAdornment={EditButton}
      />
    );
  }

  if (fieldType === "BoolFieldConfig") {
    return (
      <Field
        validator={validator}
        path={node.definition.path}
        name={node.definition.name}
        defaultValue={node.definition.fieldDetails.enabled}
        id={node.definition.id}
        label={node.definition.name}
        t={dbTrans}
        component={checkboxField}
        endAdornment={EditButton}
      />
    );
  }

  if (fieldType === "StaticChoiceFieldConfig") {
    const choices = node.definition.fieldDetails as StaticChoiceFieldConfig;
    return (
      <Field
        options={choices.options}
        validator={validator}
        path={node.definition.path}
        name={node.definition.name}
        defaultValue={node.definition.fieldDetails.selected}
        id={node.definition.id}
        label={node.definition.translations.label}
        t={dbTrans}
        component={radioField}
        startAdornment={EditButton}
      />
    );
  }

  if (fieldType === "StaticNumberFieldConfig") {
    return (
      <label>
        {dbTrans(node.definition.name)}
        {EditButton}
      </label>
    );
  }

  return <div key={node.definition.name}>{node.definition.name}</div>;
}

function FormSection({ node }: FormProps): JSX.Element {
  const valueType = node.definition
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
          <Tooltip title={dbTrans(node.definition.translations.helpTextName)}>
            <Typography variant="h5" component="h5" gutterBottom>
              {dbTrans(node.definition.translations.label)}
            </Typography>
          </Tooltip>
        }
      />
      <Collapse in={expanded} mountOnEnter={true} timeout="auto">
        <UnpadCardContent>
          <Grid container direction="column" rowSpacing={1}>
            {node.children.map((child) => (
              <Grid item key={child.definition.name}>
                <FormField node={child} />
              </Grid>
            ))}
          </Grid>
        </UnpadCardContent>
      </Collapse>
      {/* TODO: extract those to a reusable component */}
      <CardActions disableSpacing>
        <LeftSideButton>
          <IconButton>
            <AddIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </LeftSideButton>
      </CardActions>
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
        <Tooltip title={dbTrans(formNode.translations.helpTextName)}>
          <Typography variant="h4" component="h4" gutterBottom>
            {dbTrans(formNode.translations.label)}
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
            <Grid item>
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
                      {t("definition_editor.form_editor.add_new_section")}
                    </Typography>
                  }
                />
              </Card>
            </Grid>
          )}
        </Grid>
      </form>
    </>
  );
}

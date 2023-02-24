import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import {
  Card,
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
import { compact, head, pick, values } from "lodash";
import { AddButtonLinkFullWidth } from "../../../components/buttons";
import {
  ExpandIconButton,
  UnpadCardContent,
} from "../../../components/custom-styles";
import {
  RefectGroup,
  useLoaderEffect,
  useSharedRefetch,
} from "../../../components/loading-frame";
import {
  checkboxField,
  Field,
  FieldLabel,
  patchFormFields,
  RadioField,
  InlineTextField,
} from "../../../components/table-fields";
import {
  CollapsibleContainerFieldConfig,
  FindProjectDefinitionFormContentQuery,
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

interface FormFieldProps {
  node: FindProjectDefinitionFormContentQuery["findProjectDefinitionFormContent"]["roots"][number]["children"][number];
}

function FormField({ node }: FormFieldProps): JSX.Element {
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
        id={node.definition.id}
        validator={validator}
        path={node.definition.path}
        name={node.definition.name}
        defaultValue={node.definition.fieldDetails.text}
        label={node.definition.name}
        t={dbTrans}
        component={InlineTextField}
        startAdornment={EditButton}
      />
    );
  }

  if (fieldType === "IntFieldConfig") {
    return (
      <Field
        id={node.definition.id}
        validator={validator}
        path={node.definition.path}
        name={node.definition.name}
        defaultValue={node.definition.fieldDetails.integer}
        label={node.definition.name}
        t={dbTrans}
        component={InlineTextField}
        startAdornment={EditButton}
      />
    );
  }

  if (fieldType === "DecimalFieldConfig") {
    return (
      <Field
        id={node.definition.id}
        validator={validator}
        path={node.definition.path}
        name={node.definition.name}
        defaultValue={node.definition.fieldDetails.numeric}
        label={node.definition.name}
        t={dbTrans}
        component={InlineTextField}
        startAdornment={EditButton}
      />
    );
  }

  if (fieldType === "BoolFieldConfig") {
    return (
      <Field
        id={node.definition.id}
        validator={validator}
        path={node.definition.path}
        name={node.definition.name}
        defaultValue={node.definition.fieldDetails.enabled}
        label={node.definition.name}
        t={dbTrans}
        component={checkboxField}
        endAdornment={EditButton}
      />
    );
  }

  if (fieldType === "StaticChoiceFieldConfig") {
    const options = node.definition.fieldDetails.options.map((x) => ({
      value: x.id,
      label: <FieldLabel title={x.helpText} label={x.label} t={dbTrans} />,
    }));

    return (
      <Field
        id={node.definition.id}
        options={options}
        validator={validator}
        path={node.definition.path}
        name={node.definition.name}
        defaultValue={node.definition.fieldDetails.selected}
        label={node.definition.translations.label}
        t={dbTrans}
        component={RadioField}
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

interface FormSectionProps {
  node: FindProjectDefinitionFormContentQuery["findProjectDefinitionFormContent"]["roots"][number];
}

function FormSection({ node }: FormSectionProps): JSX.Element {
  const { routes } = useServices();
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
            <Grid item key="add">
              <AddButtonLinkFullWidth
                label="definition_editor.form_editor.add_new_field"
                to={routes.render(
                  PROJECT_DEFINITION_EDITOR_NODE_ADD,
                  buildAddNodeParams(node.definition.projectDefinitionId, [
                    ...node.definition.path,
                    node.definition.id,
                  ])
                )}
              />
            </Grid>
          </Grid>
        </UnpadCardContent>
      </Collapse>
    </Card>
  );
}

interface FormDefinitionEditorProps {
  projectDefinitionId: string;
  formDefId: string;
  refectGroup: RefectGroup;
}

export function FormDefinitionEditor({
  projectDefinitionId,
  formDefId,
  refectGroup,
}: FormDefinitionEditorProps) {
  const { dbTrans } = useDbTranslation(projectDefinitionId);
  const { routes, reduxDb } = useServices();
  const { loading, data, error, refetch } =
    useFindProjectDefinitionFormContentQuery({
      variables: {
        id: projectDefinitionId,
        formId: formDefId,
      },
      fetchPolicy: "network-only",
      onCompleted: (result) => {
        const patchs: Record<string, unknown> = {};
        result.findProjectDefinitionFormContent.roots.forEach((r) =>
          r.children.forEach((c) => {
            const items = pick(c.definition.fieldDetails, [
              "text",
              "enabled",
              "numeric",
              "integer",
            ]);

            patchs[c.definition.id] = head(compact(values(items)));
          })
        );

        patchFormFields(reduxDb, patchs);
      },
    });

  useSharedRefetch(refectGroup, refetch);
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
                <FormSection node={node} />
              </Grid>
            ))}
          {formNode && (
            <Grid item>
              <AddButtonLinkFullWidth
                label="definition_editor.form_editor.add_new_section"
                to={routes.render(
                  PROJECT_DEFINITION_EDITOR_NODE_ADD,
                  buildAddNodeParams(projectDefinitionId, [
                    ...formNode.path,
                    formNode.id,
                  ])
                )}
              />
            </Grid>
          )}
        </Grid>
      </form>
    </>
  );
}

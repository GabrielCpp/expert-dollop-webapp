import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@material-ui/core";
import { ExpandMore as ExpandMoreIcon } from "@material-ui/icons";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import {
  CollapsibleContainerFieldConfig,
  ProjectDefinitionNode,
  ProjectDefinitionTreeNode,
  StaticChoiceFieldConfig,
  useFindProjectDefinitionFormContentQuery,
} from "../../../generated";
import { useLoader } from "../../loading-frame";
import { MouseOverPopover } from "../../mouse-over-popover";
import { Field, radioField, textField } from "../../table-fields";
import { checkboxField } from "../../table-fields/table-checkbox-field";
import { useDbTranslation } from "../../translation";
import { splitPath } from "../routes";

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
  const { labelTrans } = useDbTranslation(node.definition.projectDefId);

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
        t={labelTrans}
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
        t={labelTrans}
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
        t={labelTrans}
        component={radioField}
      />
    );
  }

  return <div key={node.definition.name}>{node.definition.name}</div>;
}

function FormAccordionSection({ node }: FormProps): JSX.Element {
  const { labelTrans, helpTextTrans } = useDbTranslation(
    node.definition.projectDefId
  );

  return (
    <Accordion key={node.definition.name}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel-header"
        id={`${node.definition.name}-panel-header`}
      >
        <MouseOverPopover
          name={node.definition.name}
          text={helpTextTrans(node.definition.name)}
        >
          {(props) => (
            <Typography {...props}>
              {labelTrans(node.definition.name)}
            </Typography>
          )}
        </MouseOverPopover>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container direction="column">
          {node.children.map((child) => (
            <Grid item key={child.definition.name}>
              <FormField node={child} />
            </Grid>
          ))}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
}

function FormInlineSection({ node }: FormProps): JSX.Element {
  const { labelTrans, helpTextTrans } = useDbTranslation(
    node.definition.projectDefId
  );

  return (
    <Card variant="outlined">
      <CardContent>
        <MouseOverPopover
          name={node.definition.name}
          text={helpTextTrans(node.definition.name)}
        >
          {(props) => (
            <Typography {...props} variant="h5" component="h5" gutterBottom>
              {labelTrans(node.definition.name)}
            </Typography>
          )}
        </MouseOverPopover>

        <Grid container direction="column">
          {node.children.map((child) => (
            <Grid item key={child.definition.name}>
              <FormField node={child} />
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}

function FormSection({ node }: FormProps): JSX.Element {
  const valueType = node.definition.config
    .fieldDetails as CollapsibleContainerFieldConfig;

  if (
    valueType !== null &&
    valueType !== undefined &&
    valueType.isCollapsible
  ) {
    return <FormAccordionSection node={node} />;
  }

  return <FormInlineSection node={node} />;
}

interface FormDefinitionEditorParams extends Record<string, string> {
  projectDefinitionId: string;
  selectedPath: string;
}

export function FormDefinitionEditor() {
  const { onLoading } = useLoader();
  const {
    projectDefinitionId,
    selectedPath,
  } = useParams<FormDefinitionEditorParams>();
  const { labelTrans, helpTextTrans } = useDbTranslation(projectDefinitionId);
  const [, , formId] = splitPath(selectedPath);
  const { loading, data, error } = useFindProjectDefinitionFormContentQuery({
    skip: formId === undefined,
    variables: {
      id: projectDefinitionId,
      formId,
    },
  });

  useEffect(() => {
    onLoading(loading, error);
  }, [error, loading, onLoading]);

  const formNode = data?.findProjectDefinitionNode;
  const formContent = data?.findProjectDefinitionFormContent.roots;

  return (
    <>
      {formNode && (
        <MouseOverPopover
          name={formNode.name}
          text={helpTextTrans(formNode.name)}
        >
          {(props) => (
            <Typography {...props} variant="h4" component="h4" gutterBottom>
              {labelTrans(formNode.name)}
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
        </Grid>
      </form>
    </>
  );
}

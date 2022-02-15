import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  Grid,
  IconButton,
  styled,
  Typography,
  Tooltip,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import {
  CollapsibleContainerFieldConfig,
  DecimalFieldConfig,
  FieldUpdateInput,
  FindProjectFormContentQuery,
  IntFieldConfig,
  StaticChoiceFieldConfig,
  useAddProjectCollectionItemMutation,
  useFindProjectFormContentQuery,
  useUpdateFieldsMutation,
} from "../../../generated";
import { useLoaderEffect } from "../../../components/loading-frame";
import {
  buildFormMapById,
  Field,
  radioField,
  textField,
  validateForm,
} from "../../../components/table-fields";
import { checkboxField } from "../../../components/table-fields/table-checkbox-field";
import { useDbTranslation } from "../../../components/translation";
import { NodePicker } from "./node-picker";
import { useServices } from "../../../shared/service-context";
import { convertToFieldValue } from "../field-helper";
import { useLayoutEffect } from "react";
import {
  ExpandIconButton,
  UnpadCardContent,
} from "../../../components/custom-styles";

const FieldRow = styled(Grid)(() => ({
  marginBottom: "0.5em",
}));

function getFieldValue(
  value: Record<string, string | number | boolean> | undefined | null
): string | number | boolean {
  const { text, numeric, enabled, integer } = {
    text: null,
    numeric: null,
    enabled: null,
    integer: null,
    ...value,
  };

  const realValue = [text, numeric, enabled, integer].find((x) => x != null);

  if (realValue === null || realValue === undefined) {
    throw new Error("Bad value");
  }

  return realValue;
}

function FormField({
  definition,
  node,
}: {
  definition: FindProjectFormContentQuery["findProjectFormContent"]["roots"][number]["definition"];
  node: FindProjectFormContentQuery["findProjectFormContent"]["roots"][number]["nodes"][number]["node"];
}): JSX.Element {
  const { dbTrans } = useDbTranslation(definition.projectDefId);
  const { __typename: fieldType } = definition.config.fieldDetails || {};
  const value = getFieldValue(node.value);
  const validator = JSON.parse(definition.config.valueValidator);

  if (
    fieldType === "StringFieldConfig" ||
    fieldType === "IntFieldConfig" ||
    fieldType === "DecimalFieldConfig"
  ) {
    let unit: string | undefined;
    if (fieldType === "IntFieldConfig") {
      const config = definition.config.fieldDetails as IntFieldConfig;
      unit = config.unit;
    } else if (fieldType === "DecimalFieldConfig") {
      const config = definition.config.fieldDetails as DecimalFieldConfig;
      unit = config.unit;
    }

    return (
      <Field
        validator={validator}
        path={node.path}
        name={definition.name}
        defaultValue={value}
        id={node.id}
        label={definition.config.translations.label}
        title={definition.config.translations.helpTextName}
        t={dbTrans}
        component={textField}
        unit={unit}
      />
    );
  }

  if (fieldType === "BoolFieldConfig") {
    return (
      <Field
        validator={validator}
        path={node.path}
        name={definition.name}
        defaultValue={value}
        id={node.id}
        label={definition.config.translations.label}
        title={definition.config.translations.helpTextName}
        t={dbTrans}
        component={checkboxField}
      />
    );
  }

  if (fieldType === "StaticChoiceFieldConfig") {
    const choices = definition.config.fieldDetails as StaticChoiceFieldConfig;
    return (
      <Field
        options={choices.options}
        validator={validator}
        path={node.path}
        name={definition.name}
        defaultValue={value}
        id={node.id}
        label={definition.config.translations.label}
        title={definition.config.translations.helpTextName}
        t={dbTrans}
        component={radioField}
      />
    );
  }

  return <div key={definition.name}>{definition.name}</div>;
}

const LeftSideButton = styled("span")(() => ({
  marginLeft: "auto",
}));

interface FormFieldCardProps {
  node: FindProjectFormContentQuery["findProjectFormContent"]["roots"][number]["nodes"][number]["children"][number];
}

function FormFieldCard({ node }: FormFieldCardProps) {
  const [currentNodeId, setCurrentNodeId] = useState(node.nodes[0]?.node.id);

  useLayoutEffect(() => {
    const newId = node.nodes[0]?.node.id;
    if (newId !== undefined) {
      setCurrentNodeId(newId);
    }
  }, [node]);

  const currentNode = node.nodes.find((x) => x.node.id === currentNodeId);

  if (!node.definition.isCollection) {
    return (
      <>
        {currentNode && (
          <FormField definition={node.definition} node={currentNode.node} />
        )}
      </>
    );
  }

  return (
    <Card>
      <CardContent>
        {currentNode && (
          <FormField definition={node.definition} node={currentNode.node} />
        )}
      </CardContent>
      <CardActions disableSpacing>
        <NodePicker
          nodes={node.nodes}
          current={currentNodeId}
          onChange={setCurrentNodeId}
        ></NodePicker>
        <LeftSideButton>
          <IconButton aria-label="add">
            <AddIcon />
          </IconButton>
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        </LeftSideButton>
      </CardActions>
    </Card>
  );
}

interface FormSectionProps {
  parentNodeId: string;
  projectId: string;
  node: FindProjectFormContentQuery["findProjectFormContent"]["roots"][number];
}

function FormSection({
  node,
  projectId,
  parentNodeId,
}: FormSectionProps): JSX.Element {
  const collapsibleConfig = node.definition.config
    .fieldDetails as CollapsibleContainerFieldConfig;
  const [expanded, setExpanded] = useState(!collapsibleConfig.isCollapsible);
  const [currentNodeId, setCurrentNodeId] = useState(node.nodes[0]?.node.id);
  const { dbTrans } = useDbTranslation(node.definition.projectDefId);
  const [addProjectCollectionItemMutation, { loading, error }] =
    useAddProjectCollectionItemMutation();

  useLayoutEffect(() => {
    const newId = node.nodes[0]?.node.id;
    if (newId !== undefined) {
      setCurrentNodeId(newId);
    }
  }, [node]);

  useLoaderEffect(error, loading);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  async function addProjectCollectionItem() {
    await addProjectCollectionItemMutation({
      variables: {
        projectId,
        collectionTarget: {
          collectionTypeId: node.definition.id,
          parentNodeId,
        },
      },
    });
  }

  const action = collapsibleConfig.isCollapsible ? (
    <ExpandIconButton
      expanded={expanded}
      onClick={handleExpandClick}
      aria-expanded={expanded}
      aria-label="show more"
    >
      <ExpandMoreIcon />
    </ExpandIconButton>
  ) : undefined;

  const currentNode = node.nodes.find((x) => x.node.id === currentNodeId);

  return (
    <Card variant="outlined">
      <CardHeader
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
        {currentNode && (
          <UnpadCardContent>
            <Grid container direction="column">
              {currentNode.children.map((x) => (
                <FieldRow key={x.definition.name}>
                  <FormFieldCard node={x} />
                </FieldRow>
              ))}
            </Grid>
          </UnpadCardContent>
        )}
      </Collapse>
      {node.definition.isCollection && (
        <CardActions disableSpacing>
          <NodePicker
            nodes={node.nodes}
            current={currentNodeId}
            onChange={setCurrentNodeId}
          />
          <LeftSideButton>
            <IconButton aria-label="add" onClick={addProjectCollectionItem}>
              <AddIcon />
            </IconButton>
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          </LeftSideButton>
        </CardActions>
      )}
    </Card>
  );
}

interface FormEditorProps {
  rootSectionId: string;
  formId: string;
  projectId: string;
}

export function FormEditor({
  projectId,
  rootSectionId,
  formId,
}: FormEditorProps) {
  const { reduxDb, ajv } = useServices();
  const { loading, data, error } = useFindProjectFormContentQuery({
    variables: {
      projectId,
      formId,
    },
  });

  const [updateFields] = useUpdateFieldsMutation();

  useLoaderEffect(error, loading);

  async function save() {
    if (validateForm(reduxDb, ajv)([rootSectionId]) === false) {
      return;
    }

    const fields = buildFormMapById(reduxDb, [rootSectionId]);
    const updates: FieldUpdateInput[] = [];

    for (const [nodeId, rawValue] of fields.entries()) {
      updates.push({
        nodeId,
        value: convertToFieldValue(rawValue),
      });
    }

    await updateFields({
      variables: {
        projectId,
        updates: updates,
      },
    });
  }

  const formContent = data?.findProjectFormContent.roots;

  return (
    <>
      <form>
        <Grid container direction="column" spacing={1}>
          {formContent &&
            formContent.map((node) => (
              <Grid item key={node.definition.name}>
                <FormSection
                  projectId={projectId}
                  parentNodeId={formId}
                  node={node}
                />
              </Grid>
            ))}
          <Grid container item alignItems="flex-end">
            <Button variant="contained" color="primary" onClick={save}>
              Save
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
}

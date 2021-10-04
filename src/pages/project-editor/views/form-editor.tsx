import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  Grid,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import clsx from "clsx";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import {
  BoolFieldValue,
  CollapsibleContainerFieldConfig,
  DecimalFieldValue,
  FieldUpdateInput,
  FindProjectFormContentQuery,
  IntFieldValue,
  StaticChoiceFieldConfig,
  StringFieldValue,
  useAddProjectCollectionItemMutation,
  useFindProjectFormContentQuery,
  useUpdateFieldsMutation,
} from "../../../generated";
import { useLoaderEffect } from "../../../components/loading-frame";
import { MouseOverPopover } from "../../../components/mouse-over-popover";
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

function getFieldValue(
  value:
    | IntFieldValue
    | DecimalFieldValue
    | StringFieldValue
    | BoolFieldValue
    | null
    | undefined
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
    return (
      <Field
        validator={validator}
        path={node.path}
        name={definition.name}
        defaultValue={value}
        id={node.id}
        label={definition.name}
        t={dbTrans}
        component={textField}
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
        label={definition.name}
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
        label={definition.name}
        t={dbTrans}
        component={radioField}
      />
    );
  }

  return <div key={definition.name}>{definition.name}</div>;
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

interface FormFieldCardProps {
  node: FindProjectFormContentQuery["findProjectFormContent"]["roots"][number]["nodes"][number]["children"][number];
}

function FormFieldCard({ node }: FormFieldCardProps) {
  const classes = useStyles();
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
        <span className={classes.leftSideButton}>
          <IconButton aria-label="add">
            <AddIcon />
          </IconButton>
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        </span>
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
  const classes = useStyles();
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

  const currentNode = node.nodes.find((x) => x.node.id === currentNodeId);

  return (
    <Card variant="outlined">
      <CardHeader
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
        {currentNode && (
          <CardContent className={classes.cardContent}>
            <Grid container direction="column">
              {currentNode.children.map((x) => (
                <Grid key={x.definition.name}>
                  <FormFieldCard node={x} />
                </Grid>
              ))}
            </Grid>
          </CardContent>
        )}
      </Collapse>
      {node.definition.isCollection && (
        <CardActions disableSpacing>
          <NodePicker
            nodes={node.nodes}
            current={currentNodeId}
            onChange={setCurrentNodeId}
          />
          <span className={classes.leftSideButton}>
            <IconButton aria-label="add" onClick={addProjectCollectionItem}>
              <AddIcon />
            </IconButton>
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          </span>
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

/*
      {formNode && (
        <MouseOverPopover
          name={formNode.name}
          text={dbTrans(formNode.name)}
        >
          <Typography variant="h4" component="h4" gutterBottom>
            {dbTrans(formNode.definition.name)}
          </Typography>
        </MouseOverPopover>
      )}
*/

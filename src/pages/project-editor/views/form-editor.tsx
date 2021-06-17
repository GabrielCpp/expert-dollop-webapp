import {
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
import { useEffect, useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import {
  BoolFieldValue,
  CollapsibleContainerFieldConfig,
  DecimalFieldValue,
  FindProjectFormContentQuery,
  IntFieldValue,
  StaticChoiceFieldConfig,
  StringFieldValue,
  useFindProjectFormContentQuery,
} from "../../../generated";
import { useLoader } from "../../../components/loading-frame";
import { MouseOverPopover } from "../../../components/mouse-over-popover";
import { Field, radioField, textField } from "../../../components/table-fields";
import { checkboxField } from "../../../components/table-fields/table-checkbox-field";
import { useDbTranslation } from "../../../components/translation";
import { NodePicker } from "./node-picker";

interface FormProps {
  node: FindProjectFormContentQuery["findProjectFormContent"]["roots"][number];
}

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
  const { labelTrans } = useDbTranslation(definition.projectDefId);
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
        t={labelTrans}
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
        t={labelTrans}
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
        t={labelTrans}
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

function FormFieldCard({ node }: FormProps) {
  const classes = useStyles();
  const [currentNodeId, setCurrentNodeId] = useState(node.nodes[0]?.node.id);

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

function FormSection({ node }: FormProps): JSX.Element {
  const classes = useStyles();
  const collapsibleConfig = node.definition.config
    .fieldDetails as CollapsibleContainerFieldConfig;
  const [expanded, setExpanded] = useState(!collapsibleConfig.isCollapsible);
  const [currentNodeId, setCurrentNode] = useState(node.nodes[0]?.node.id);
  const { labelTrans, helpTextTrans } = useDbTranslation(
    node.definition.projectDefId
  );

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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
            text={helpTextTrans(node.definition.name)}
          >
            {(props) => (
              <Typography {...props} variant="h5" component="h5" gutterBottom>
                {labelTrans(node.definition.name)}
              </Typography>
            )}
          </MouseOverPopover>
        }
      />
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        {currentNode && (
          <CardContent className={classes.cardContent}>
            <Grid container direction="column">
              {currentNode.children.map((x) => (
                <Grid key={x.definition.name}>
                  <FormFieldCard node={x as any} />
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
            onChange={setCurrentNode}
          />
          <span className={classes.leftSideButton}>
            <IconButton aria-label="add">
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
  formId: string;
  projectId: string;
}

export function FormEditor({ projectId, formId }: FormEditorProps) {
  const { onLoading } = useLoader();
  const { labelTrans, helpTextTrans } = useDbTranslation(projectId);
  const { loading, data, error } = useFindProjectFormContentQuery({
    variables: {
      projectId,
      formId,
    },
  });

  useEffect(() => {
    onLoading(loading, error);
  }, [error, loading, onLoading]);

  const formContent = data?.findProjectFormContent.roots;

  return (
    <>
      <form>
        <Grid container direction="column" spacing={1}>
          {formContent &&
            formContent.map((node) => (
              <Grid item key={node.definition.name}>
                <FormSection node={node} />
              </Grid>
            ))}
        </Grid>
      </form>
    </>
  );
}

/*
      {formNode && (
        <MouseOverPopover
          name={formNode.name}
          text={helpTextTrans(formNode.name)}
        >
          <Typography variant="h4" component="h4" gutterBottom>
            {labelTrans(formNode.definition.name)}
          </Typography>
        </MouseOverPopover>
      )}
*/

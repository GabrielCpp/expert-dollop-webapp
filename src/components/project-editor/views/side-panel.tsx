import {
  Card,
  CardContent,
  Collapse,
  createStyles,
  Divider,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Theme,
} from "@material-ui/core";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import React, { Fragment, useEffect, useState } from "react";
import { NavLink as RouterLink } from "react-router-dom";

import {
  FindProjectRootSectionContainersQuery,
  useFindProjectRootSectionContainersQuery,
} from "../../../generated/graphql";
import { useLoaderEffect } from "../../loading-frame";
import { MouseOverPopover } from "../../mouse-over-popover";
import { useDbTranslation } from "../../translation";
import { buildLinkFor } from "../routes";
import { NodePicker } from "./node-picker";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
    selectedListItem: {
      fontWeight: "bold",
    },
    grid: {
      width: "100%",
    },
  })
);

interface SidePanelProps {
  projectId: string;
  rootSectionId: string;
  subSectionId: string;
  formId: string;
}

export function SidePanel({
  projectId,
  rootSectionId,
  subSectionId,
  formId,
}: SidePanelProps) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState<string | undefined>(undefined);
  const { data, loading, error } = useFindProjectRootSectionContainersQuery({
    skip: rootSectionId === undefined,
    variables: {
      projectId,
      rootSectionId,
    },
  });

  useLoaderEffect(error, loading);

  const subSections = data?.findProjectRootSectionContainers.roots;

  useEffect(() => {
    if (subSections !== undefined && subSections.length > 0) {
      setExpanded(subSections[0].definition.id);
    } else {
      setExpanded(undefined);
    }
  }, [subSections]);

  return (
    <Card>
      <CardContent style={{ padding: "0" }}>
        <List component="nav" className={classes.root}>
          {subSections &&
            subSections.map((subSection, index) => (
              <Fragment key={subSection.definition.name}>
                <SubSectionPicker
                  projectId={projectId}
                  rootSectionId={rootSectionId}
                  formId={formId}
                  expanded={expanded}
                  setExpanded={setExpanded}
                  definition={subSection.definition}
                  nodes={subSection.nodes}
                />
                {index < subSections.length - 1 && <Divider />}
              </Fragment>
            ))}
        </List>
      </CardContent>
    </Card>
  );
}

function SubSectionPicker({
  projectId,
  rootSectionId,
  formId,
  expanded,
  setExpanded,
  definition,
  nodes,
}: {
  projectId: string;
  rootSectionId: string;
  formId: string;
  expanded: string | undefined;
  setExpanded: (id: string | undefined) => void;
  definition: FindProjectRootSectionContainersQuery["findProjectRootSectionContainers"]["roots"][number]["definition"];
  nodes: FindProjectRootSectionContainersQuery["findProjectRootSectionContainers"]["roots"][number]["nodes"];
}) {
  const [currentNodeId, setCurrentNodeId] = useState(nodes[0]?.node.id);
  const { labelTrans, helpTextTrans } = useDbTranslation(projectId);
  const currentNode = nodes.find((x) => x.node.id === currentNodeId);

  const handleChange = (id: string) => () => {
    setExpanded(expanded === id ? undefined : id);
  };

  if (currentNode === undefined) {
    return null;
  }

  return (
    <Fragment>
      <ListItem>
        {definition.isCollection && (
          <NodePicker
            nodes={nodes}
            current={currentNodeId}
            onChange={setCurrentNodeId}
          />
        )}
        <MouseOverPopover
          name={`${definition.name}-popover`}
          text={helpTextTrans(definition.name)}
        >
          {(props) => (
            <ListItemText {...props} primary={labelTrans(definition.name)} />
          )}
        </MouseOverPopover>

        <ListItemSecondaryAction>
          {expanded === definition.id ? (
            <IconButton size="small" onClick={handleChange(definition.id)}>
              <ExpandLess />
            </IconButton>
          ) : (
            <IconButton size="small" onClick={handleChange(definition.id)}>
              <ExpandMore />
            </IconButton>
          )}
        </ListItemSecondaryAction>
      </ListItem>
      <Collapse in={expanded === definition.id} timeout="auto">
        <List component="div" disablePadding>
          {currentNode.children.map((secondLayerNode) => (
            <FormPicker
              key={secondLayerNode.definition.name}
              projectId={projectId}
              rootSectionId={rootSectionId}
              formId={formId}
              secondLayerNode={secondLayerNode}
            />
          ))}
        </List>
      </Collapse>
    </Fragment>
  );
}

interface FormPickerProps {
  projectId: string;
  rootSectionId: string;
  formId: string;
  secondLayerNode: FindProjectRootSectionContainersQuery["findProjectRootSectionContainers"]["roots"][number]["nodes"][number]["children"][number];
}

function FormPicker({
  projectId,
  rootSectionId,
  formId,
  secondLayerNode,
}: FormPickerProps) {
  const classes = useStyles();
  const [currentNodeId, setCurrentNodeId] = useState(
    secondLayerNode.nodes[0]?.node.id
  );
  const { labelTrans, helpTextTrans } = useDbTranslation(projectId);

  const currentNode = secondLayerNode.nodes.find(
    (x) => x.node.id === currentNodeId
  );

  if (currentNode === undefined) {
    return null;
  }

  return (
    <ListItem
      button
      className={classes.nested}
      key={secondLayerNode.definition.id}
    >
      {secondLayerNode.definition.isCollection && (
        <NodePicker
          nodes={secondLayerNode.nodes}
          current={currentNodeId}
          onChange={setCurrentNodeId}
        />
      )}
      <MouseOverPopover
        name={`${secondLayerNode.definition.name}-popover`}
        text={helpTextTrans(secondLayerNode.definition.name)}
      >
        {(props) => (
          <ListItemText
            {...props}
            primaryTypographyProps={{
              className:
                secondLayerNode.definition.id !== formId
                  ? classes.selectedListItem
                  : undefined,
            }}
            primary={
              secondLayerNode.definition.id === formId ? (
                labelTrans(secondLayerNode.definition.name)
              ) : (
                <Link
                  component={RouterLink}
                  to={buildLinkFor(
                    projectId,
                    rootSectionId,
                    secondLayerNode.nodes[0].node.id,
                    secondLayerNode.nodes[0].node.id
                  )}
                >
                  {labelTrans(secondLayerNode.definition.name)}
                </Link>
              )
            }
          />
        )}
      </MouseOverPopover>
    </ListItem>
  );
}

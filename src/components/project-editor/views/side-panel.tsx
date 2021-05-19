import {
  Collapse,
  createStyles,
  Link,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Theme,
} from "@material-ui/core";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import React, { Fragment, useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";

import {
  FindProjectRootSectionContainersQuery,
  useFindProjectRootSectionContainersQuery,
} from "../../../generated/graphql";
import { useLoader } from "../../loading-frame";
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
  const { onLoading } = useLoader();
  const [expanded, setExpanded] = React.useState<string | undefined>(
    subSectionId
  );
  const { data, loading, error } = useFindProjectRootSectionContainersQuery({
    skip: rootSectionId === undefined,
    variables: {
      projectId,
      rootSectionId,
    },
  });

  useEffect(() => {
    setExpanded(subSectionId);
  }, [subSectionId]);

  useEffect(() => {
    onLoading(loading, error);
  }, [error, loading, onLoading]);

  const handleChange = (id: string) => () => {
    setExpanded(expanded === id ? undefined : id);
  };

  const subSections = data?.findProjectRootSectionContainers.roots || [];

  return (
    <List component="nav" className={classes.root}>
      {subSections.map((firstLayerNode) => (
        <SubSectionPicker
          key={firstLayerNode.definition.name}
          projectId={projectId}
          rootSectionId={rootSectionId}
          formId={formId}
          expanded={expanded}
          handleChange={handleChange}
          definition={firstLayerNode.definition}
          nodes={firstLayerNode.nodes}
        />
      ))}
    </List>
  );
}

function SubSectionPicker({
  projectId,
  rootSectionId,
  formId,
  expanded,
  handleChange,
  definition,
  nodes,
}: {
  projectId: string;
  rootSectionId: string;
  formId: string;
  expanded: string | undefined;
  handleChange: (id: string) => () => void;
  definition: FindProjectRootSectionContainersQuery["findProjectRootSectionContainers"]["roots"][number]["definition"];
  nodes: FindProjectRootSectionContainersQuery["findProjectRootSectionContainers"]["roots"][number]["nodes"];
}) {
  const [currentNodeId, setCurrentNodeId] = useState(nodes[0]?.node.id);
  const { labelTrans, helpTextTrans } = useDbTranslation(projectId);

  const currentNode = nodes.find((x) => x.node.id === currentNodeId);

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

        {expanded === definition.id ? (
          <ExpandLess onClick={handleChange(definition.id)} />
        ) : (
          <ExpandMore onClick={handleChange(definition.id)} />
        )}
      </ListItem>
      <Collapse in={expanded === definition.id} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {currentNode.children.map((secondLayerNode) => (
            <InnerPanel
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

interface InnerPanelProps {
  projectId: string;
  rootSectionId: string;
  formId: string;
  secondLayerNode: FindProjectRootSectionContainersQuery["findProjectRootSectionContainers"]["roots"][number]["nodes"][number]["children"][number];
}

function InnerPanel({
  projectId,
  rootSectionId,
  formId,
  secondLayerNode,
}: InnerPanelProps) {
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

import {
  Card,
  CardContent,
  Collapse,
  Divider,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Tooltip,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import React, { Fragment, useEffect, useState } from "react";
import { NavLink as RouterLink } from "react-router-dom";
import {
  FindProjectRootSectionContainersQuery,
  useFindProjectRootSectionContainersQuery,
} from "../../../generated/graphql";
import { useLoaderEffect } from "../../../components/loading-frame";
import { useDbTranslation } from "../../../components/translation";
import { buildLinkToProjectPath } from "../routes";
import { NodePicker } from "../components/node-picker";
import { ListRoot, NestedListItem } from "../../../components/custom-styles";

const boldListItem: React.CSSProperties = {
  fontWeight: "bold",
};

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

  useLoaderEffect(error, loading);

  const subSections = data?.findProjectRootSectionContainers.roots;

  useEffect(() => {
    if (subSections !== undefined && subSections.length > 0) {
      setExpanded(subSectionId);
    } else {
      setExpanded(undefined);
    }
  }, [subSections, subSectionId]);

  if (
    subSections &&
    subSections.every((subSection) => subSection.state.isVisible === false)
  ) {
    return null;
  }

  return (
    <Card>
      <CardContent style={{ padding: "0" }}>
        <ListRoot>
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
        </ListRoot>
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
  const { dbTrans } = useDbTranslation(projectId);
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
        <Tooltip title={dbTrans(definition.config.translations.helpTextName)}>
          <ListItemText
            primary={dbTrans(definition.config.translations.label)}
          />
        </Tooltip>

        <ListItemSecondaryAction>
          {expanded === currentNodeId ? (
            <IconButton size="small" onClick={handleChange(currentNodeId)}>
              <ExpandLess />
            </IconButton>
          ) : (
            <IconButton size="small" onClick={handleChange(currentNodeId)}>
              <ExpandMore />
            </IconButton>
          )}
        </ListItemSecondaryAction>
      </ListItem>
      <Collapse
        in={expanded === currentNodeId}
        mountOnEnter={true}
        timeout="auto"
      >
        <List component="div" disablePadding>
          {currentNode.children.map((secondLayerNode) => (
            <FormPicker
              key={secondLayerNode.definition.name}
              projectId={projectId}
              parentSubSectionId={currentNodeId}
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
  parentSubSectionId: string;
  formId: string;
  secondLayerNode: FindProjectRootSectionContainersQuery["findProjectRootSectionContainers"]["roots"][number]["nodes"][number]["children"][number];
}

function FormPicker({
  projectId,
  rootSectionId,
  parentSubSectionId,
  formId,
  secondLayerNode,
}: FormPickerProps) {
  const [currentNodeId, setCurrentNodeId] = useState(
    secondLayerNode.nodes[0]?.node.id
  );
  const { dbTrans } = useDbTranslation(projectId);

  const currentNode = secondLayerNode.nodes.find(
    (x) => x.node.id === currentNodeId
  );

  if (currentNode === undefined) {
    return null;
  }

  return (
    <NestedListItem key={secondLayerNode.definition.id}>
      {secondLayerNode.definition.isCollection && (
        <NodePicker
          nodes={secondLayerNode.nodes}
          current={currentNodeId}
          onChange={setCurrentNodeId}
        />
      )}
      <Tooltip
        title={dbTrans(
          secondLayerNode.definition.config.translations.helpTextName
        )}
      >
        <ListItemText
          primaryTypographyProps={{
            style: {
              ...(currentNodeId === formId ? boldListItem : {}),
            },
          }}
          primary={
            currentNodeId === formId ? (
              dbTrans(secondLayerNode.definition.config.translations.label)
            ) : (
              <Link
                component={RouterLink}
                to={buildLinkToProjectPath(
                  projectId,
                  rootSectionId,
                  parentSubSectionId,
                  secondLayerNode.nodes[0].node.id
                )}
              >
                {dbTrans(secondLayerNode.definition.config.translations.label)}
              </Link>
            )
          }
        />
      </Tooltip>
    </NestedListItem>
  );
}

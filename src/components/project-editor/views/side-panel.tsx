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
import React, { Fragment, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";

import {
  FindProjectRootSectionContainersQuery,
  useFindProjectRootSectionContainersQuery,
} from "../../../generated/graphql";
import { useLoader } from "../../loading-frame";
import { MouseOverPopover } from "../../mouse-over-popover";
import { useDbTranslation } from "../../translation";
import { buildLinkFor } from "../routes";

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
  const { labelTrans, helpTextTrans } = useDbTranslation(projectId);
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
      {subSections.map((firstLayerNode) =>
        firstLayerNode.nodes.map((node) => (
          <Fragment key={node.node.id}>
            <ListItem>
              <MouseOverPopover
                name={`${firstLayerNode.definition.name}-popover`}
                text={helpTextTrans(firstLayerNode.definition.name)}
              >
                {(props) => (
                  <ListItemText
                    {...props}
                    primary={labelTrans(firstLayerNode.definition.name)}
                  />
                )}
              </MouseOverPopover>

              {expanded === node.node.id ? (
                <ExpandLess onClick={handleChange(node.node.id)} />
              ) : (
                <ExpandMore onClick={handleChange(node.node.id)} />
              )}
            </ListItem>
            <Collapse
              in={expanded === node.node.id}
              timeout="auto"
              unmountOnExit
            >
              <InnerPanel
                projectDefinitionId={projectId}
                rootSectionId={rootSectionId}
                formId={formId}
                firstLayerNode={firstLayerNode}
                node={node}
              />
            </Collapse>
          </Fragment>
        ))
      )}
    </List>
  );
}

interface InnerPanelProps {
  projectDefinitionId: string;
  rootSectionId: string;
  formId: string;
  firstLayerNode: FindProjectRootSectionContainersQuery["findProjectRootSectionContainers"]["roots"][number];
  node: FindProjectRootSectionContainersQuery["findProjectRootSectionContainers"]["roots"][number]["nodes"][number];
}

function InnerPanel({
  projectDefinitionId,
  rootSectionId,
  formId,
  firstLayerNode,
  node,
}: InnerPanelProps) {
  const classes = useStyles();
  const { labelTrans, helpTextTrans } = useDbTranslation(projectDefinitionId);

  return (
    <List component="div" disablePadding>
      {node.children.map((secondLayerNode) => (
        <ListItem
          button
          className={classes.nested}
          key={secondLayerNode.definition.id}
        >
          <MouseOverPopover
            name={`${firstLayerNode.definition.name}-popover`}
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
                        projectDefinitionId,
                        rootSectionId,
                        firstLayerNode.nodes[0].node.id,
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
      ))}
    </List>
  );
}

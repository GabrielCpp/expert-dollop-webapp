import {
  Button,
  Collapse,
  createStyles,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  makeStyles,
  Theme,
  Tooltip,
  Link,
} from "@material-ui/core";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import React, { Fragment, useEffect } from "react";
import { Link as RouterLink, useHistory, useParams } from "react-router-dom";

import {
  FindProjectDefinitionRootSectionContainersQuery,
  useFindProjectDefinitionRootSectionContainersQuery,
} from "../../../generated/graphql";
import { MouseOverPopover } from "../../mouse-over-popover";
import { useDbTranslation } from "../../translation";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import EditIcon from "@material-ui/icons/Edit";
import {
  ADD_PROJECT_SECTION_ROUTE_NAME,
  buildLinkFor,
  splitPath,
} from "../routes";
import { useServices } from "../../../shared/service-context";
import { Services } from "../../../hooks";

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

interface SidePanelParams extends Record<string, string> {
  projectDefinitionId: string;
  selectedPath: string;
}

interface SidePanelProps {
  onLoading: (isLoading: boolean, error?: Error) => void;
}

export function SidePanel({ onLoading }: SidePanelProps) {
  const history = useHistory();
  const { routes } = useServices<Services>();
  const params = useParams<SidePanelParams>();
  const { projectDefinitionId, selectedPath } = params;
  const [rootSectionId, subSectionId, formId] = splitPath(selectedPath);
  const { t, labelTrans, helpTextTrans } = useDbTranslation(
    projectDefinitionId
  );
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState<string | undefined>(
    subSectionId
  );
  const {
    data,
    loading,
    error,
  } = useFindProjectDefinitionRootSectionContainersQuery({
    skip: rootSectionId === undefined,
    variables: {
      id: projectDefinitionId,
      rootSectionId: rootSectionId as string,
    },
  });

  useEffect(() => {
    if (subSectionId !== undefined) {
      setExpanded(subSectionId);
    }
  }, [subSectionId]);

  useEffect(() => {
    if (data !== undefined && loading === false) {
      const subSections =
        data?.findProjectDefinitionRootSectionContainers.roots;

      if (
        subSections !== undefined &&
        subSectionId === undefined &&
        subSections.length > 0
      ) {
        const newSubSectionId = subSections[0].definition.id;

        if (formId === undefined && subSections[0].children.length > 0) {
          const newFormId = subSections[0].children[0].definition.id;
          history.push(
            buildLinkFor(
              projectDefinitionId,
              rootSectionId,
              newSubSectionId,
              newFormId
            )
          );
        } else {
          history.push(
            buildLinkFor(projectDefinitionId, rootSectionId, newSubSectionId)
          );
        }
      }
    }
  }, [
    data,
    loading,
    history,
    rootSectionId,
    subSectionId,
    formId,
    projectDefinitionId,
  ]);

  useEffect(() => {
    onLoading(loading, error);
  }, [error, loading, onLoading]);

  const handleChange = (id: string) => () => {
    setExpanded(expanded === id ? undefined : id);
  };

  const subSections = data?.findProjectDefinitionRootSectionContainers.roots;

  return (
    <>
      {subSections && (
        <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Nested List Items
            </ListSubheader>
          }
          className={classes.root}
        >
          {subSections.map((firstLayerNode) => (
            <Fragment key={firstLayerNode.definition.name}>
              <ListItem button>
                <MouseOverPopover
                  name={`${firstLayerNode.definition.name}-popover`}
                  text={helpTextTrans(firstLayerNode.definition.name)}
                >
                  <ListItemText
                    primary={labelTrans(firstLayerNode.definition.name)}
                  />
                </MouseOverPopover>

                <EditNodeButtons />

                {expanded === firstLayerNode.definition.id ? (
                  <ExpandLess
                    onClick={handleChange(firstLayerNode.definition.id)}
                  />
                ) : (
                  <ExpandMore
                    onClick={handleChange(firstLayerNode.definition.id)}
                  />
                )}
              </ListItem>
              <Collapse
                in={expanded === firstLayerNode.definition.id}
                timeout="auto"
                unmountOnExit
              >
                <InnerPanel
                  projectDefinitionId={projectDefinitionId}
                  rootSectionId={rootSectionId}
                  formId={formId}
                  firstLayerNode={firstLayerNode}
                />
              </Collapse>
            </Fragment>
          ))}
        </List>
      )}
      <Button
        variant="contained"
        color="primary"
        component={RouterLink}
        to={routes.render(ADD_PROJECT_SECTION_ROUTE_NAME, params, {
          parentNodeId: rootSectionId,
        })}
      >
        {t("add")}
      </Button>
    </>
  );
}

interface InnerPanelProps {
  projectDefinitionId: string;
  rootSectionId: string;
  formId: string;
  firstLayerNode: FindProjectDefinitionRootSectionContainersQuery["findProjectDefinitionRootSectionContainers"]["roots"][number];
}

function InnerPanel({
  projectDefinitionId,
  rootSectionId,
  formId,
  firstLayerNode,
}: InnerPanelProps) {
  const classes = useStyles();
  const { labelTrans, helpTextTrans } = useDbTranslation(projectDefinitionId);

  return (
    <List component="div" disablePadding>
      {firstLayerNode.children.map((secondLayerNode) => (
        <Fragment key={secondLayerNode.definition.name}>
          <ListItem button className={classes.nested}>
            <MouseOverPopover
              name={`${firstLayerNode.definition.name}-popover`}
              text={helpTextTrans(secondLayerNode.definition.name)}
            >
              {secondLayerNode.definition.id === formId && (
                <ListItemText
                  primaryTypographyProps={{
                    className: classes.selectedListItem,
                  }}
                  primary={labelTrans(secondLayerNode.definition.name)}
                />
              )}
              {secondLayerNode.definition.id !== formId && (
                <ListItemText
                  primary={
                    <Link
                      component={RouterLink}
                      to={buildLinkFor(
                        projectDefinitionId,
                        rootSectionId as string,
                        firstLayerNode.definition.id,
                        secondLayerNode.definition.id
                      )}
                    >
                      {labelTrans(secondLayerNode.definition.name)}
                    </Link>
                  }
                />
              )}
            </MouseOverPopover>
            <EditNodeButtons />
          </ListItem>
        </Fragment>
      ))}
    </List>
  );
}

function EditNodeButtons() {
  return (
    <>
      <Tooltip title="Move up" aria-label="Move up">
        <IconButton aria-label="Move up" size="small">
          <ArrowUpwardIcon fontSize="inherit" />
        </IconButton>
      </Tooltip>

      <Tooltip title="Move down" aria-label="Move down">
        <IconButton aria-label="Move down" size="small">
          <ArrowDownwardIcon fontSize="inherit" />
        </IconButton>
      </Tooltip>

      <Tooltip title="Edit" aria-label="Edit">
        <IconButton aria-label="edit" size="small">
          <EditIcon fontSize="inherit" />
        </IconButton>
      </Tooltip>
    </>
  );
}

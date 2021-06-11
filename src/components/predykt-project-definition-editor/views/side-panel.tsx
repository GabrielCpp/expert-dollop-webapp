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
  Tooltip,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import React, { Fragment, useEffect } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";

import {
  FindProjectDefinitionRootSectionContainersQuery,
  useFindProjectDefinitionRootSectionContainersQuery,
} from "../../../generated/graphql";
import { useServices } from "../../../services-def";
import { useLoaderEffect } from "../../loading-frame";
import { MouseOverPopover } from "../../mouse-over-popover";
import { useDbTranslation } from "../../translation";
import { ADD_PROJECT_SECTION_ROUTE_NAME, buildLinkFor } from "../routes";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      backgroundColor: theme.palette.background.paper,
      padding: "o",
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
  projectDefinitionId: string;
  rootSectionDefId: string;
  subSectionDefId: string | undefined;
  formDefId: string | undefined;
}

interface SidePanelParams extends Record<string, string> {
  projectDefinitionId: string;
  selectedPath: string;
}

export function SidePanel({
  projectDefinitionId,
  rootSectionDefId,
  subSectionDefId,
  formDefId,
}: SidePanelProps) {
  const params = useParams<SidePanelParams>();
  const { routes } = useServices();
  const { t, labelTrans, helpTextTrans } = useDbTranslation(
    projectDefinitionId
  );
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState<string | undefined>(
    subSectionDefId
  );

  const {
    data,
    loading,
    error,
  } = useFindProjectDefinitionRootSectionContainersQuery({
    variables: {
      id: projectDefinitionId,
      rootSectionId: rootSectionDefId,
    },
  });

  useEffect(() => {
    if (subSectionDefId !== undefined) {
      setExpanded(subSectionDefId);
    }
  }, [subSectionDefId]);

  useLoaderEffect(error, loading);

  const handleChange = (id: string) => () => {
    setExpanded(expanded === id ? undefined : id);
  };

  const subSections = data?.findProjectDefinitionRootSectionContainers.roots;

  return (
    <Card>
      <CardContent style={{ padding: "0" }}>
        <List component="nav" className={classes.root}>
          {subSections &&
            subSections.map((subSection, index) => (
              <Fragment key={subSection.definition.name}>
                <ListItem>
                  <MouseOverPopover
                    name={`${subSection.definition.name}-popover`}
                    text={helpTextTrans(subSection.definition.name)}
                  >
                    {(props) => (
                      <ListItemText
                        {...props}
                        primary={labelTrans(subSection.definition.name)}
                      />
                    )}
                  </MouseOverPopover>

                  <ListItemSecondaryAction>
                    {expanded === subSection.definition.id ? (
                      <IconButton
                        size="small"
                        onClick={handleChange(subSection.definition.id)}
                      >
                        <ExpandLess />
                      </IconButton>
                    ) : (
                      <IconButton
                        size="small"
                        onClick={handleChange(subSection.definition.id)}
                      >
                        <ExpandMore />
                      </IconButton>
                    )}
                  </ListItemSecondaryAction>
                </ListItem>
                <Collapse
                  in={expanded === subSection.definition.id}
                  timeout="auto"
                >
                  <InnerPanel
                    projectDefinitionId={projectDefinitionId}
                    rootSectionId={rootSectionDefId}
                    formId={formDefId}
                    subSection={subSection}
                  />
                </Collapse>
                <Divider />
              </Fragment>
            ))}
          <ListItem>
            <ListItemText>
              {t("project_definition_editor.add_new_sub_section")}
            </ListItemText>
            <ListItemSecondaryAction>
              <IconButton
                size="small"
                component={RouterLink}
                to={routes.render(ADD_PROJECT_SECTION_ROUTE_NAME, params, {
                  parentNodeId: rootSectionDefId,
                })}
              >
                <AddIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
}

interface InnerPanelProps {
  projectDefinitionId: string;
  rootSectionId: string;
  formId: string | undefined;
  subSection: FindProjectDefinitionRootSectionContainersQuery["findProjectDefinitionRootSectionContainers"]["roots"][number];
}

function InnerPanel({
  projectDefinitionId,
  rootSectionId,
  formId,
  subSection,
}: InnerPanelProps) {
  const classes = useStyles();
  const params = useParams<SidePanelParams>();
  const { routes } = useServices();
  const { t, labelTrans, helpTextTrans } = useDbTranslation(
    projectDefinitionId
  );

  return (
    <List component="div" disablePadding>
      {subSection.children.map((secondLayerNode) => (
        <Fragment key={secondLayerNode.definition.name}>
          <ListItem className={classes.nested}>
            <MouseOverPopover
              name={`${subSection.definition.name}-popover`}
              text={helpTextTrans(secondLayerNode.definition.name)}
            >
              {(props) => (
                <>
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
                            rootSectionId as string,
                            subSection.definition.id,
                            secondLayerNode.definition.id
                          )}
                        >
                          {labelTrans(secondLayerNode.definition.name)}
                        </Link>
                      )
                    }
                  />
                </>
              )}
            </MouseOverPopover>
            <ListItemSecondaryAction>
              <Tooltip title="Edit" aria-label="Edit">
                <IconButton aria-label="edit" size="small">
                  <EditIcon fontSize="inherit" />
                </IconButton>
              </Tooltip>
            </ListItemSecondaryAction>
          </ListItem>
        </Fragment>
      ))}
      <ListItem className={classes.nested}>
        <ListItemText>
          {t("project_definition_editor.add_new_form")}
        </ListItemText>
        <ListItemSecondaryAction>
          <IconButton
            size="small"
            component={RouterLink}
            to={routes.render(ADD_PROJECT_SECTION_ROUTE_NAME, params, {
              parentNodeId: subSection.definition.id,
            })}
          >
            <AddIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </List>
  );
}

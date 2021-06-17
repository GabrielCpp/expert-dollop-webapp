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
import { Link as RouterLink } from "react-router-dom";

import {
  FindProjectDefinitionRootSectionContainersQuery,
  useFindProjectDefinitionRootSectionContainersQuery,
} from "../../../generated/graphql";
import { useServices } from "../../../services-def";
import { useLoaderEffect } from "../../loading-frame";
import { MouseOverPopover } from "../../mouse-over-popover";
import { useDbTranslation } from "../../translation";
import {
  buildAddNodeParams,
  buildEditNodeParams,
  buildLinkFor,
  PROJECT_DEFINITION_EDITOR_NODE_ADD,
  PROJECT_DEFINITION_EDITOR_NODE_EDIT,
} from "../routes";

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

export function SidePanel({
  projectDefinitionId,
  rootSectionDefId,
  subSectionDefId,
  formDefId,
}: SidePanelProps) {
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
            subSections.map((subSection) => (
              <Fragment key={subSection.definition.name}>
                <ListItem>
                  <MouseOverPopover
                    name={`${subSection.definition.name}-popover`}
                    text={helpTextTrans(subSection.definition.name)}
                  >
                    {(props) => (
                      <ListItemText
                        {...props}
                        primary={
                          <Link
                            component={RouterLink}
                            to={routes.render(
                              PROJECT_DEFINITION_EDITOR_NODE_EDIT,
                              buildEditNodeParams(
                                projectDefinitionId,
                                subSection.definition.path,
                                subSection.definition.id
                              )
                            )}
                          >
                            {labelTrans(subSection.definition.name)}
                          </Link>
                        }
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
                  <FormLinkList
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
              <Tooltip
                title={t("button.add") as string}
                aria-label={t("button.add")}
              >
                <IconButton
                  size="small"
                  component={RouterLink}
                  to={routes.render(
                    PROJECT_DEFINITION_EDITOR_NODE_ADD,
                    buildAddNodeParams(projectDefinitionId, [rootSectionDefId])
                  )}
                >
                  <AddIcon />
                </IconButton>
              </Tooltip>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
}

interface FormLinkListProps {
  projectDefinitionId: string;
  rootSectionId: string;
  formId: string | undefined;
  subSection: FindProjectDefinitionRootSectionContainersQuery["findProjectDefinitionRootSectionContainers"]["roots"][number];
}

function FormLinkList({
  projectDefinitionId,
  rootSectionId,
  formId,
  subSection,
}: FormLinkListProps) {
  const classes = useStyles();
  const { routes } = useServices();
  const { t, labelTrans, helpTextTrans } = useDbTranslation(
    projectDefinitionId
  );

  return (
    <List component="div" disablePadding>
      {subSection.children.map((formNode) => (
        <Fragment key={formNode.definition.name}>
          <ListItem className={classes.nested}>
            <MouseOverPopover
              name={`${subSection.definition.name}-popover`}
              text={helpTextTrans(formNode.definition.name)}
            >
              {(props) => (
                <>
                  <ListItemText
                    {...props}
                    primaryTypographyProps={{
                      className:
                        formNode.definition.id !== formId
                          ? classes.selectedListItem
                          : undefined,
                    }}
                    primary={
                      formNode.definition.id === formId ? (
                        labelTrans(formNode.definition.name)
                      ) : (
                        <Link
                          component={RouterLink}
                          to={buildLinkFor(
                            projectDefinitionId,
                            rootSectionId as string,
                            subSection.definition.id,
                            formNode.definition.id
                          )}
                        >
                          {labelTrans(formNode.definition.name)}
                        </Link>
                      )
                    }
                  />
                </>
              )}
            </MouseOverPopover>
            <ListItemSecondaryAction>
              <Tooltip
                title={t("button.edit") as string}
                aria-label={t("button.edit")}
              >
                <IconButton
                  aria-label="edit"
                  size="small"
                  component={RouterLink}
                  to={routes.render(
                    PROJECT_DEFINITION_EDITOR_NODE_EDIT,
                    buildEditNodeParams(
                      projectDefinitionId,
                      formNode.definition.path,
                      formNode.definition.id
                    )
                  )}
                >
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
          <Tooltip
            title={t("button.add") as string}
            aria-label={t("button.add")}
          >
            <IconButton
              size="small"
              component={RouterLink}
              to={routes.render(
                PROJECT_DEFINITION_EDITOR_NODE_ADD,
                buildAddNodeParams(projectDefinitionId, [
                  ...subSection.definition.path,
                  subSection.definition.id,
                ])
              )}
            >
              <AddIcon />
            </IconButton>
          </Tooltip>
        </ListItemSecondaryAction>
      </ListItem>
    </List>
  );
}

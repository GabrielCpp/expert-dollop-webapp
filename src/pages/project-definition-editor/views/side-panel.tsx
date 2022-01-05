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
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import React, { Fragment, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";

import {
  FindProjectDefinitionRootSectionContainersQuery,
  useFindProjectDefinitionRootSectionContainersQuery,
} from "../../../generated/graphql";
import { useServices } from "../../../services-def";
import { useLoaderEffect } from "../../../components/loading-frame";
import { MouseOverPopover } from "../../../components/mouse-over-popover";
import { useDbTranslation } from "../../../components/translation";
import {
  buildAddNodeParams,
  buildEditNodeParams,
  buildLinkFor,
  PROJECT_DEFINITION_EDITOR_NODE_ADD,
  PROJECT_DEFINITION_EDITOR_NODE_EDIT,
} from "../routes";
import { ListRoot, NestedListItem } from "../../../components/custom-styles";

const boldListItem: React.CSSProperties = {
  fontWeight: "bold",
};

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
  const { t, dbTrans } = useDbTranslation(projectDefinitionId);
  const [expanded, setExpanded] = React.useState<string | undefined>(
    subSectionDefId
  );

  const { data, loading, error } =
    useFindProjectDefinitionRootSectionContainersQuery({
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
        <ListRoot>
          {subSections &&
            subSections.map((subSection) => (
              <Fragment key={subSection.definition.name}>
                <ListItem>
                  <MouseOverPopover
                    name={`${subSection.definition.name}-popover`}
                    text={dbTrans(
                      subSection.definition.config.translations.helpTextName
                    )}
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
                            {dbTrans(
                              subSection.definition.config.translations.label
                            )}
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
        </ListRoot>
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
  const { routes } = useServices();
  const { t, dbTrans } = useDbTranslation(projectDefinitionId);

  return (
    <List component="div" disablePadding>
      {subSection.children.map((formNode) => (
        <Fragment key={formNode.definition.name}>
          <NestedListItem>
            <MouseOverPopover
              name={`${subSection.definition.name}-popover`}
              text={dbTrans(
                formNode.definition.config.translations.helpTextName
              )}
            >
              {(props) => (
                <>
                  <ListItemText
                    {...props}
                    primaryTypographyProps={{
                      style: {
                        ...(formNode.definition.id !== formId
                          ? boldListItem
                          : undefined),
                      },
                    }}
                    primary={
                      formNode.definition.id === formId ? (
                        dbTrans(formNode.definition.config.translations.label)
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
                          {dbTrans(
                            formNode.definition.config.translations.label
                          )}
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
          </NestedListItem>
        </Fragment>
      ))}
      <NestedListItem>
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
      </NestedListItem>
    </List>
  );
}

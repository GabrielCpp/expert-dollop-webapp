import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
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
import React, { Fragment, useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";

import {
  AddButtonLinkFullWidth,
  EditIconButtonLink,
} from "../../../components/buttons";
import { ListRoot, NestedListItem } from "../../../components/custom-styles";
import {
  RefectGroup,
  useLoaderEffect,
  useSharedRefetch,
} from "../../../components/loading-frame";
import {
  FindProjectDefinitionRootSectionContainersQuery,
  useFindProjectDefinitionRootSectionContainersQuery,
} from "../../../generated/graphql";
import { useServices } from "../../../services-def";
import { useDbTranslation } from "../hooks/db-trans";
import {
  buildAddNodeParams,
  buildEditNodeParams,
  buildLinkFor,
  PROJECT_DEFINITION_EDITOR_NODE_ADD,
  PROJECT_DEFINITION_EDITOR_NODE_EDIT,
} from "../routes";

const boldListItem: React.CSSProperties = {
  fontWeight: "bold",
};

interface SidePanelProps {
  projectDefinitionId: string;
  rootSectionDefId: string;
  subSectionDefId: string | undefined;
  formDefId: string | undefined;
  refectGroup: RefectGroup;
}

export function SidePanel({
  projectDefinitionId,
  rootSectionDefId,
  subSectionDefId,
  formDefId,
  refectGroup,
}: SidePanelProps) {
  const { routes } = useServices();
  const { dbTrans } = useDbTranslation(projectDefinitionId);
  const [expanded, setExpanded] = useState<string | undefined>(subSectionDefId);

  const { data, loading, error, refetch } =
    useFindProjectDefinitionRootSectionContainersQuery({
      fetchPolicy: "network-only",
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

  useSharedRefetch(refectGroup, refetch);
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
                  <EditIconButtonLink
                    size="small"
                    title="shared.buttons.edit"
                    to={routes.render(
                      PROJECT_DEFINITION_EDITOR_NODE_EDIT,
                      buildEditNodeParams(
                        projectDefinitionId,
                        subSection.definition.path,
                        subSection.definition.id
                      )
                    )}
                  />
                  <Tooltip
                    title={dbTrans(
                      subSection.definition.translations.helpTextName
                    )}
                  >
                    <ListItemText
                      primary={dbTrans(
                        subSection.definition.translations.label
                      )}
                    />
                  </Tooltip>

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
                  mountOnEnter={true}
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
            <AddButtonLinkFullWidth
              label="definition_editor.side_panel.add_new_sub_section"
              to={routes.render(
                PROJECT_DEFINITION_EDITOR_NODE_ADD,
                buildAddNodeParams(projectDefinitionId, [rootSectionDefId])
              )}
            />
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
  const { dbTrans } = useDbTranslation(projectDefinitionId);

  return (
    <List component="div" disablePadding>
      {subSection.children.map((formNode) => (
        <Fragment key={formNode.definition.name}>
          <NestedListItem>
            <Tooltip
              title={dbTrans(formNode.definition.translations.helpTextName)}
            >
              <ListItemText
                primaryTypographyProps={{
                  style:
                    formNode.definition.id === formId
                      ? boldListItem
                      : undefined,
                }}
                primary={
                  formNode.definition.id === formId ? (
                    dbTrans(formNode.definition.translations.label)
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
                      {dbTrans(formNode.definition.translations.label)}
                    </Link>
                  )
                }
              />
            </Tooltip>
            <ListItemSecondaryAction>
              <EditIconButtonLink
                size="small"
                title="shared.buttons.edit"
                to={routes.render(
                  PROJECT_DEFINITION_EDITOR_NODE_EDIT,
                  buildEditNodeParams(
                    projectDefinitionId,
                    formNode.definition.path,
                    formNode.definition.id
                  )
                )}
              />
            </ListItemSecondaryAction>
          </NestedListItem>
        </Fragment>
      ))}
      <NestedListItem>
        <AddButtonLinkFullWidth
          label="definition_editor.side_panel.add_new_form"
          title="shared.buttons.add"
          to={routes.render(
            PROJECT_DEFINITION_EDITOR_NODE_ADD,
            buildAddNodeParams(projectDefinitionId, [
              ...subSection.definition.path,
              subSection.definition.id,
            ])
          )}
        />
      </NestedListItem>
    </List>
  );
}

import { Grid, IconButton, Tab, Tabs, Tooltip } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link as RouterLink, useHistory } from "react-router-dom";

import { useFindProjectDefinitionRootSectionsQuery } from "../../../generated/graphql";
import { useServices } from "../../../services-def";
import { MoreButton } from "../../buttons";
import { useLoaderEffect } from "../../loading-frame";
import { useDbTranslation } from "../../translation";
import {
  buildAddNodeParams,
  buildEditNodeParams,
  buildLinkFor,
  PROJECT_DEFINITION_EDITOR_NODE_ADD,
  PROJECT_DEFINITION_EDITOR_NODE_EDIT,
} from "../routes";

interface RootSectionBarProps {
  projectDefinitionId: string;
  rootSectionDefId: string | undefined;
}

export function RootSectionBar({
  projectDefinitionId,
  rootSectionDefId,
}: RootSectionBarProps) {
  const { routes } = useServices();
  const { t } = useTranslation();
  const history = useHistory();
  const { labelTrans } = useDbTranslation(projectDefinitionId);
  const { loading, data, error } = useFindProjectDefinitionRootSectionsQuery({
    variables: {
      id: projectDefinitionId,
    },
  });

  useLoaderEffect(error, loading);

  const onChange = (_: React.ChangeEvent<{}>, newRootSectionDefId: string) => {
    history.push(buildLinkFor(projectDefinitionId, newRootSectionDefId));
  };

  const links = [];

  if (data === undefined) {
    return null;
  }

  const roots = data.findProjectDefinitionRootSections.roots;

  if (rootSectionDefId) {
    const rootSectionDefName =
      roots.find((x) => x.definition.id === rootSectionDefId)?.definition
        .name || "";

    links.push(
      {
        label: t("button.edit") + " " + labelTrans(rootSectionDefName),
        action: () =>
          history.push(
            routes.render(
              PROJECT_DEFINITION_EDITOR_NODE_EDIT,
              buildEditNodeParams(projectDefinitionId, [], rootSectionDefId)
            )
          ),
      },
      {
        label: t("button.delete") + " " + labelTrans(rootSectionDefName),
        action: () =>
          history.push(
            routes.render(
              PROJECT_DEFINITION_EDITOR_NODE_EDIT,
              buildEditNodeParams(projectDefinitionId, [], rootSectionDefId)
            )
          ),
      }
    );
  }

  return (
    <Grid container>
      <Grid item>
        {rootSectionDefId && roots && (
          <Tabs
            value={rootSectionDefId}
            onChange={onChange}
            variant="scrollable"
            scrollButtons="auto"
          >
            {roots.map((def) => (
              <Tab
                value={def.definition.id}
                key={def.definition.id}
                label={labelTrans(def.definition.name)}
              />
            ))}
          </Tabs>
        )}
      </Grid>

      <Grid item style={{ marginLeft: "auto" }}>
        <Tooltip title={t("button.add") as string} aria-label={t("button.add")}>
          <IconButton
            component={RouterLink}
            to={routes.render(
              PROJECT_DEFINITION_EDITOR_NODE_ADD,
              buildAddNodeParams(projectDefinitionId, [])
            )}
          >
            <AddIcon />
          </IconButton>
        </Tooltip>
        {rootSectionDefId && (
          <MoreButton links={links} placement="left-start" />
        )}
      </Grid>
    </Grid>
  );
}

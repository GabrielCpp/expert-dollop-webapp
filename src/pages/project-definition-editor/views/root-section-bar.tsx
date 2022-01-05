import { Grid, IconButton, Tab, Tabs, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link as RouterLink, useHistory } from "react-router-dom";

import { useFindProjectDefinitionRootSectionsQuery } from "../../../generated/graphql";
import { useServices } from "../../../services-def";
import { MoreButton } from "../../../components/buttons";
import { useLoaderEffect } from "../../../components/loading-frame";
import { useDbTranslation } from "../../../components/translation";
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
  const { dbTrans } = useDbTranslation(projectDefinitionId);
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
    const rootSectionDef = roots.find(
      (x) => x.definition.id === rootSectionDefId
    )?.definition;

    links.push(
      {
        label:
          t("button.edit") +
          " " +
          dbTrans(rootSectionDef?.config.translations.label),
        action: () =>
          history.push(
            routes.render(
              PROJECT_DEFINITION_EDITOR_NODE_EDIT,
              buildEditNodeParams(projectDefinitionId, [], rootSectionDefId)
            )
          ),
      },
      {
        label:
          t("button.delete") +
          " " +
          dbTrans(rootSectionDef?.config.translations.label),
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
            style={{
              maxWidth: "calc(100vw - 200px - 36px - 36px - 28px - 28px)",
            }}
          >
            {roots.map((def) => (
              <Tab
                value={def.definition.id}
                key={def.definition.id}
                label={dbTrans(def.definition.config.translations.label)}
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

import { Tab, Tabs } from "@mui/material";
import React from "react";
import { useHistory } from "react-router-dom";
import {
  RefectGroup,
  useLoaderEffect,
  useSharedRefetch,
} from "../../../components/loading-frame";
import { useFindProjectDefinitionRootSectionsQuery } from "../../../generated/graphql";
import { useDbTranslation } from "../hooks/db-trans";
import { buildLinkFor } from "../routes";
import { head } from "lodash";

interface RootSectionBarProps {
  projectDefinitionId: string;
  rootSectionDefId: string | undefined;
  refectGroup: RefectGroup;
}

export function RootSectionBar({
  projectDefinitionId,
  rootSectionDefId,
  refectGroup,
}: RootSectionBarProps) {
  const history = useHistory();
  const { dbTrans } = useDbTranslation(projectDefinitionId);
  const { loading, data, error, refetch } =
    useFindProjectDefinitionRootSectionsQuery({
      fetchPolicy: "network-only",
      variables: {
        id: projectDefinitionId,
      },
    });

  useSharedRefetch(refectGroup, refetch);
  useLoaderEffect(error, loading);

  const onChange = (_: React.ChangeEvent<{}>, newRootSectionDefId: string) => {
    history.push(buildLinkFor(projectDefinitionId, newRootSectionDefId));
  };

  const roots = data?.findProjectDefinitionRootSections.roots;

  if (rootSectionDefId === undefined || roots === undefined) {
    return null;
  }

  const existingRootSectionDef =
    roots.find((def) => def.definition.id === rootSectionDefId) || head(roots);

  return (
    <Tabs
      value={existingRootSectionDef?.definition?.id}
      onChange={onChange}
      variant="scrollable"
      scrollButtons="auto"
    >
      {roots.map((def) => (
        <Tab
          value={def.definition.id}
          key={def.definition.id}
          label={dbTrans(def.definition.translations.label)}
        />
      ))}
    </Tabs>
  );
}

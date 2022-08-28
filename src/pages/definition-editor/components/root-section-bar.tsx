import { Tab, Tabs } from "@mui/material";
import React from "react";
import { useHistory } from "react-router-dom";
import { useLoaderEffect } from "../../../components/loading-frame";
import { useFindProjectDefinitionRootSectionsQuery } from "../../../generated/graphql";
import { useDbTranslation } from "../hooks/db-trans";
import { buildLinkFor } from "../routes";

interface RootSectionBarProps {
  projectDefinitionId: string;
  rootSectionDefId: string | undefined;
}

export function RootSectionBar({
  projectDefinitionId,
  rootSectionDefId,
}: RootSectionBarProps) {
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

  const roots = data?.findProjectDefinitionRootSections.roots;

  if (rootSectionDefId === undefined || roots === undefined) {
    return null;
  }

  return (
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
          label={dbTrans(def.definition.translations.label)}
        />
      ))}
    </Tabs>
  );
}

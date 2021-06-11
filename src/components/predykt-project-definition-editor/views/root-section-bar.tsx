import { Tab, Tabs } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";

import { useFindProjectDefinitionRootSectionsQuery } from "../../../generated/graphql";
import { useLoaderEffect } from "../../loading-frame";
import { useDbTranslation } from "../../translation";
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

  if (data === undefined) {
    return null;
  }

  const roots = data.findProjectDefinitionRootSections.roots;

  return (
    <div>
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
    </div>
  );
}

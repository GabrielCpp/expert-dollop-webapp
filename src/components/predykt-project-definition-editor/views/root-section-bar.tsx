import { Button } from "@material-ui/core";
import React, { useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";

import { useFindProjectDefinitionRootSectionsQuery } from "../../../generated/graphql";
import { useDbTranslation } from "../../translation";
import { splitPath } from "../routes";
import { buildLinkFor } from "../routes";

interface RootSectionParams {
  projectDefinitionId: string;
  selectedPath: string;
}

interface RootSectionBarProps {
  onLoading: (isLoading: boolean, error?: Error) => void;
}

export function RootSectionBar({ onLoading }: RootSectionBarProps) {
  const { projectDefinitionId, selectedPath } = useParams<RootSectionParams>();
  const history = useHistory();
  const { labelTrans } = useDbTranslation(projectDefinitionId);
  const [rootSectionId] = splitPath(selectedPath);
  const { loading, data, error } = useFindProjectDefinitionRootSectionsQuery({
    variables: {
      id: projectDefinitionId,
    },
  });

  useEffect(() => {
    if (
      rootSectionId === undefined &&
      data !== undefined &&
      loading === false &&
      data.findProjectDefinitionRootSections.roots.length > 0
    ) {
      history.push(
        buildLinkFor(
          projectDefinitionId,
          data.findProjectDefinitionRootSections.roots[0].definition.id
        )
      );
    }
  }, [data, loading, history, rootSectionId, projectDefinitionId]);

  useEffect(() => {
    onLoading(loading, error);
  }, [error, loading, onLoading]);

  const roots = data?.findProjectDefinitionRootSections.roots;

  return (
    <>
      {roots &&
        roots.map((c) => (
          <Button
            key={c.definition.name}
            component={Link}
            to={buildLinkFor(projectDefinitionId, c.definition.id)}
            color="primary"
          >
            {labelTrans(c.definition.name)}
          </Button>
        ))}
    </>
  );
}

import { Button, Grid } from "@material-ui/core";
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
  const buildLink = buildLinkFor(projectDefinitionId);
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
        buildLink(data.findProjectDefinitionRootSections.roots[0].definition.id)
      );
    }
  }, [buildLink, data, loading, history, rootSectionId]);

  useEffect(() => {
    onLoading(loading, error);
  }, [error, loading, onLoading]);

  const roots = data?.findProjectDefinitionRootSections.roots;

  return (
    <Grid item xs={12}>
      {roots &&
        roots.map((c) => (
          <Button
            key={c.definition.name}
            component={Link}
            to={buildLink(c.definition.id)}
            color="primary"
          >
            {labelTrans(c.definition.name)}
          </Button>
        ))}
    </Grid>
  );
}

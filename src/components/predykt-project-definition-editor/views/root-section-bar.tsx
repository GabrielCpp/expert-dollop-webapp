import { Button, Grid } from "@material-ui/core";
import React from "react";
import { Link, useParams } from "react-router-dom";

import { useFindProjectDefinitionRootSectionsQuery } from "../../../generated/graphql";
import { useDbTranslation } from "../../translation";
import { splitPath } from "../routes";
import { buildLinkFor } from "../routes";

interface RootSectionParams {
  projectDefinitionId: string;
  selectedPath: string;
}

export function RootSectionBar() {
  const { projectDefinitionId, selectedPath } = useParams<RootSectionParams>();
  const { labelTrans } = useDbTranslation(projectDefinitionId);
  const buildLink = buildLinkFor(projectDefinitionId);
  const [rootSectionId] = splitPath(selectedPath);
  const { loading, data, error } = useFindProjectDefinitionRootSectionsQuery({
    variables: {
      id: projectDefinitionId,
    },
  });

  if (error) {
    console.error(error);
  }

  if (loading) {
    return <span>Loading...</span>;
  }

  if (data === undefined) {
    return null;
  }

  const roots = data.findProjectDefinitionRootSections.roots;

  return (
    <Grid item xs={12}>
      {roots.map((c) => (
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

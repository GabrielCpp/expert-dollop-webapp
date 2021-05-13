import { Tab, Tabs } from "@material-ui/core";
import React, { useEffect } from "react";
import {
  FindProjectRootSectionsQuery,
  useFindProjectRootSectionsQuery,
} from "../../../generated/graphql";
import { useDbTranslation } from "../../translation";
import { useLoader } from "../../loading-frame";
import { head } from "lodash";
import { useHistory } from "react-router-dom";
import { buildLinkFor } from "../routes";

interface RootSectionBarProps {
  projectId: string;
  rootSectionId: string;
}

export function RootSectionBar({
  projectId,
  rootSectionId,
}: RootSectionBarProps) {
  const history = useHistory();
  const { labelTrans } = useDbTranslation(projectId);
  const { onLoading } = useLoader();
  const { loading, data, error } = useFindProjectRootSectionsQuery({
    variables: {
      projectId,
    },
  });

  const onChange = (_: React.ChangeEvent<{}>, newRootSectionId: string) => {
    history.push(buildLinkFor(projectId, newRootSectionId));
  };

  useEffect(() => {
    onLoading(loading, error);
  }, [error, loading, onLoading]);

  const roots = data?.findProjectRootSections.roots || [];

  return (
    <Tabs
      value={rootSectionId}
      onChange={onChange}
      variant="scrollable"
      scrollButtons="auto"
    >
      {roots.map((def) => renderRootTab(labelTrans, rootSectionId, def))}
    </Tabs>
  );
}

function renderRootTab(
  labelTrans: (k: string) => string,
  rootSectionId: string,
  def: FindProjectRootSectionsQuery["findProjectRootSections"]["roots"][number]
) {
  if (
    (def.nodes.length === 0 && !def.definition.isCollection) ||
    def.state.isVisible === false
  ) {
    return null;
  }

  if (def.definition.isCollection) {
    const node =
      def.nodes.find((x) => x.node.id === rootSectionId) || head(def.nodes);

    if (node === undefined) {
      return (
        <Tab
          value={def.definition.id}
          key={def.definition.id}
          label={labelTrans(def.definition.name)}
        />
      );
    }

    return (
      <Tab
        value={node.node.id}
        key={node.node.id}
        label={labelTrans(def.definition.name)}
      />
    );
  }

  const node = def.nodes[0].node;

  return (
    <Tab
      value={node.id}
      key={node.id}
      label={labelTrans(def.definition.name)}
    />
  );
}

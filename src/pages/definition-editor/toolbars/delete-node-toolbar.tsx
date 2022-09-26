import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useParams } from "react-router-dom";
import { DeleteButtonLink } from "../../../components/buttons";
import { useLoaderEffect } from "../../../components/loading-frame";
import {
  useDeleteProjectDefinitionNodeMutation,
  useFindProjectDefinitionNodeQuery,
} from "../../../generated";
import { useServices } from "../../../services-def";
import { renderMainViewUrl } from "../routes";

interface DeleteNodeToolbarParams {
  projectDefinitionId: string;
  nodeId: string;
}

export function DeleteNodeToolbar() {
  const { t } = useTranslation();
  const { routes } = useServices();
  const history = useHistory();
  const { projectDefinitionId, nodeId } = useParams<DeleteNodeToolbarParams>();
  const { data, error, loading } = useFindProjectDefinitionNodeQuery({
    variables: {
      nodeId,
      projectDefinitionId,
    },
  });

  const [removeNode] = useDeleteProjectDefinitionNodeMutation({
    variables: {
      nodeId,
      projectDefinitionId,
    },
    update(cache, data) {
      const normalizedId = cache.identify({
        id: nodeId,
        __typename: "ProjectDefinitionNode",
      });
      cache.evict({ id: normalizedId });
      cache.gc();
    },
  });

  useLoaderEffect(error, loading);

  const removeEditedNode = useCallback(async () => {
    if (data) {
      await removeNode({
        variables: {
          nodeId,
          projectDefinitionId,
        },
      });
      history.push(
        renderMainViewUrl(
          routes,
          projectDefinitionId,
          data.findProjectDefinitionNode.path
        )
      );
    }
  }, [routes, removeNode, history, data, projectDefinitionId, nodeId]);

  if (data === undefined) {
    return null;
  }

  return (
    <DeleteButtonLink
      label={t("definition_editor.delete_node_toolbar.delete_node", {
        name: data.findProjectDefinitionNode.name,
      })}
      onClick={removeEditedNode}
    />
  );
}

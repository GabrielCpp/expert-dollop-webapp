import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { DeleteButtonLink } from "../../../components/buttons";
import { useLoaderEffect } from "../../../components/loading-frame";
import {
  ALERT_NOTIFICATION,
  useNavigateTransition,
} from "../../../components/snackbar-display";
import {
  useDeleteProjectDefinitionNodeMutation,
  useFindProjectDefinitionNodeQuery,
} from "../../../generated";
import { useServices } from "../../../services-def";
import { createNodeDeletionMessage } from "../messages";
import { renderMainViewUrl } from "../routes";

interface DeleteNodeToolbarParams {
  projectDefinitionId: string;
  nodeId: string;
}

export function DeleteNodeToolbar() {
  const { t } = useTranslation();
  const { routes, messaging } = useServices();
  const { projectDefinitionId, nodeId } = useParams<DeleteNodeToolbarParams>();
  const { navigateTo } = useNavigateTransition({ feed: ALERT_NOTIFICATION });
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
      messaging.send(createNodeDeletionMessage(nodeId));
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

      await navigateTo({
        message: t("definition_editor.delete_node_toolbar.deletion_suceed", {
          name: data.findProjectDefinitionNode.name,
        }),
        to: renderMainViewUrl(
          routes,
          projectDefinitionId,
          data.findProjectDefinitionNode.path
        ),
      });
    }
  }, [routes, t, removeNode, navigateTo, data, projectDefinitionId, nodeId]);

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

import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Card, CardActions, CardContent, IconButton } from "@mui/material";
import { LeftSideButton } from "../../../components/custom-styles";
import { useLoaderEffect } from "../../../components/loading-frame";
import { usePopupMenu } from "../../../components/menus";
import {
  ALERT_NOTIFICATION,
  scrollTop,
  useNotification,
} from "../../../components/snackbar-display";
import {
  FindProjectFormContentQuery,
  useAddProjectCollectionItemMutation,
  useDeleteProjectCollectionMutation,
} from "../../../generated";
import { FieldWrapper } from "./field-wrapper";
import { NodePicker, useNodePickerState } from "./node-picker";

interface FormFieldCardProps {
  node: FindProjectFormContentQuery["findProjectFormContent"]["roots"][number]["nodes"][number]["children"][number];
  projectId: string;
  parentNodeId: string;
  refetch: () => Promise<unknown>;
}

export function FormField({
  node,
  projectId,
  parentNodeId,
  refetch,
}: FormFieldCardProps) {
  const { success, catchError } = useNotification(ALERT_NOTIFICATION);
  const { currentNodeId, setCurrentNodeId } = useNodePickerState(
    node.nodes[0]?.node.id
  );

  const [addProjectCollectionItemMutation, creation] =
    useAddProjectCollectionItemMutation({
      onCompleted: (x) => {
        refetch()
          .then(() => {
            setCurrentNodeId(x.addProjectCollectionItem[0].id);
            success("shared.forms.section_added");
            scrollTop();
          })
          .catch(catchError);
      },
      onError: catchError,
    });

  const [deleteProjectCollectionItemMutation, deletion] =
    useDeleteProjectCollectionMutation({
      onCompleted: (x) => {
        refetch()
          .then(() => {
            setCurrentNodeId(node.nodes[0]?.node.id);
            success("form.section_deleted");
            scrollTop();
          })
          .catch(catchError);
      },
      onError: catchError,
    });

  const addProjectCollectionItem = () =>
    addProjectCollectionItemMutation({
      variables: {
        projectId,
        collectionTarget: {
          collectionTypeId: node.definition.id,
          parentNodeId,
        },
      },
    });

  const removeCollectionItem = () =>
    currentNodeId &&
    deleteProjectCollectionItemMutation({
      variables: {
        projectId,
        collectionNodeId: currentNodeId,
      },
    });

  const { menu, handleClick } = usePopupMenu([
    { id: "delete", label: "button.delete", action: removeCollectionItem },
  ]);

  useLoaderEffect(
    creation.error || deletion.error,
    creation.loading,
    deletion.loading
  );

  const currentNode = node.nodes.find((x) => x.node.id === currentNodeId);

  if (!node.definition.isCollection) {
    return (
      <>
        {currentNode && (
          <FieldWrapper definition={node.definition} node={currentNode.node} />
        )}
      </>
    );
  }

  return (
    <Card>
      <CardContent>
        {currentNode && (
          <FieldWrapper definition={node.definition} node={currentNode.node} />
        )}
      </CardContent>
      <CardActions disableSpacing>
        <NodePicker
          nodes={node.nodes}
          current={currentNodeId}
          onChange={setCurrentNodeId}
        ></NodePicker>
        <LeftSideButton>
          <IconButton aria-label="add" onClick={addProjectCollectionItem}>
            <AddIcon />
          </IconButton>
          <IconButton aria-label="settings" onClick={handleClick}>
            <MoreVertIcon />
          </IconButton>
        </LeftSideButton>
      </CardActions>
      {menu}
    </Card>
  );
}

import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Card,
  CardActions,
  CardHeader,
  Collapse,
  Grid,
  IconButton,
  styled,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import {
  ExpandIconButton,
  UnpadCardContent,
} from "../../../components/custom-styles";
import { useLoaderEffect } from "../../../components/loading-frame";
import { usePopupMenu } from "../../../components/global-loading/menus";
import {
  ALERT_NOTIFICATION,
  scrollTop,
  useNotification,
} from "../../../components/snackbar-display";
import { useDbTranslation } from "../../../components/translation";
import {
  CollapsibleContainerFieldConfig,
  FindProjectFormContentQuery,
  useAddProjectCollectionItemMutation,
  useDeleteProjectCollectionMutation,
} from "../../../generated";
import { FormField } from "./form-field";
import { NodePicker, useNodePickerState } from "./node-picker";

const FieldRow = styled(Grid)(() => ({
  marginBottom: "0.5em",
}));

const LeftSideButton = styled("span")(() => ({
  marginLeft: "auto",
}));

interface FormSectionProps {
  parentNodeId: string;
  projectId: string;
  refetch: () => Promise<unknown>;
  node: FindProjectFormContentQuery["findProjectFormContent"]["roots"][number];
}

export function FormSection({
  node,
  projectId,
  parentNodeId,
  refetch,
}: FormSectionProps): JSX.Element {
  const collapsibleConfig = node.definition
    .fieldDetails as CollapsibleContainerFieldConfig;
  const { dbTrans } = useDbTranslation(node.definition.projectDefinitionId);
  const { success, catchError } = useNotification(ALERT_NOTIFICATION);
  const [expanded, setExpanded] = useState(!collapsibleConfig.isCollapsible);
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

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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

  useLoaderEffect(
    creation.error || deletion.error,
    creation.loading,
    deletion.loading
  );

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

  const action = collapsibleConfig.isCollapsible ? (
    <ExpandIconButton
      expanded={expanded}
      onClick={handleExpandClick}
      aria-expanded={expanded}
      aria-label="show more"
    >
      <ExpandMoreIcon />
    </ExpandIconButton>
  ) : undefined;

  const currentNode = node.nodes.find((x) => x.node.id === currentNodeId);

  return (
    <Card variant="outlined">
      <CardHeader
        action={action}
        title={
          <Tooltip title={dbTrans(node.definition.translations.helpTextName)}>
            <Typography variant="h5" component="h5" gutterBottom>
              {dbTrans(node.definition.translations.label)}
            </Typography>
          </Tooltip>
        }
      />
      <Collapse in={expanded} mountOnEnter={true} timeout="auto">
        {currentNode && currentNodeId && (
          <UnpadCardContent>
            <Grid container direction="column">
              {currentNode.children.map((x) => (
                <FieldRow key={x.definition.name}>
                  <FormField
                    node={x}
                    refetch={refetch}
                    projectId={projectId}
                    parentNodeId={currentNodeId}
                  />
                </FieldRow>
              ))}
            </Grid>
          </UnpadCardContent>
        )}
      </Collapse>
      {node.definition.isCollection && (
        <CardActions disableSpacing>
          <NodePicker
            nodes={node.nodes}
            current={currentNodeId}
            onChange={setCurrentNodeId}
          />
          <LeftSideButton>
            <IconButton aria-label="add" onClick={addProjectCollectionItem}>
              <AddIcon />
            </IconButton>
            <IconButton aria-label="settings" onClick={handleClick}>
              <MoreVertIcon />
            </IconButton>
          </LeftSideButton>
        </CardActions>
      )}
      {menu}
    </Card>
  );
}

import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import {
  Autocomplete,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Popover,
  TextField,
  Tooltip,
} from "@mui/material";
import { EventEmitter } from "fbemitter";
import React, { useEffect, useState } from "react";
import { useDbTranslation } from "../../../components/translation";
import {
  FindProjectRootSectionsQuery,
  useAddProjectCollectionItemMutation,
  useCloneProjectCollectionMutation,
  useDeleteProjectCollectionMutation,
} from "../../../generated/graphql";
import {
  buildLinkToProjectCollection,
  buildLinkToProjectPath,
} from "../routes";

export type RootNode =
  FindProjectRootSectionsQuery["findProjectRootSections"]["roots"][number];

export interface RootSectionPickerProps {
  projectId: string;
  rootSectionId: string;
  root: RootNode;
  emitter: EventEmitter;
  historyPush: (url: string) => void;
  cloneRootSectionMutation: ReturnType<
    typeof useCloneProjectCollectionMutation
  >[0];
  addRootSectionMutation: ReturnType<
    typeof useAddProjectCollectionItemMutation
  >[0];
  deleteRootSectionMutation: ReturnType<
    typeof useDeleteProjectCollectionMutation
  >[0];
}

export function RootCollectionPicker({
  projectId,
  rootSectionId,
  root,
  historyPush,
  cloneRootSectionMutation,
  addRootSectionMutation,
  deleteRootSectionMutation,
  emitter,
}: RootSectionPickerProps): JSX.Element {
  const { t, dbTrans } = useDbTranslation(projectId);
  const [anchorEl, setAnchorEl] = useState<SVGSVGElement | null>(null);
  const open = Boolean(anchorEl);
  const [selectedNode, setSelectedNode] = useState<
    RootNode["nodes"][number] | null
  >(root.nodes.find((x) => x.node.id === rootSectionId) || null);
  const [selectionError, setSelectionError] = useState<string | null>(null);
  const collectionNodeId: string | undefined = selectedNode?.node.id;

  function addCollectionItem() {
    handleClose();
    addRootSectionMutation({
      variables: {
        projectId,
        collectionTarget: {
          collectionTypeId: root.definition.id,
        },
      },
    });
  }

  function deleteCollectionItem() {
    handleClose();
    setSelectedNode(null);
    if (collectionNodeId !== undefined) {
      deleteRootSectionMutation({
        variables: {
          collectionNodeId,
          projectId,
        },
      });
    }
  }

  function cloneCollectionItem() {
    handleClose();
    if (collectionNodeId !== undefined) {
      cloneRootSectionMutation({
        variables: {
          collectionNodeId,
          projectId,
        },
      });
    }
  }

  function goToSelectedNode() {
    if (selectedNode) {
      historyPush(buildLinkToProjectPath(projectId, selectedNode.node.id));
    } else {
      setSelectionError(
        "project_editor.root_section_node_picker.selection_required"
      );
    }
  }

  function viewAll() {
    const url = buildLinkToProjectCollection(projectId, root.definition.id);
    historyPush(url);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function handleClick(event: React.MouseEvent<SVGSVGElement>) {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  }

  useEffect(() => {
    const subscriber = emitter.addListener("handleClick", handleClick);
    return () => subscriber.remove();
  });

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <form>
        <Autocomplete
          options={root.nodes}
          value={selectedNode}
          onChange={(
            event: any,
            newValue: RootNode["nodes"][number] | null
          ) => {
            setSelectionError(null);
            setSelectedNode(newValue);
          }}
          getOptionLabel={(option) =>
            option.node.label || t("project_editor.unamed")
          }
          renderOption={(props, option) => {
            return (
              <li {...props} key={option.node.id}>
                {option.node.label || t("project_editor.unamed")}
              </li>
            );
          }}
          style={{ width: 300, margin: "10px" }}
          renderInput={(params) => (
            <Grid container>
              <Grid item md={10}>
                <TextField
                  {...params}
                  label={dbTrans(root.definition.config.translations.label)}
                  variant="outlined"
                  error={Boolean(selectionError)}
                  helperText={selectionError && t(selectionError)}
                />
              </Grid>
              <Grid item>
                <Tooltip title={t("tooltip.go") as string}>
                  <IconButton
                    edge="end"
                    aria-label="go"
                    size="large"
                    onClick={goToSelectedNode}
                  >
                    <ArrowUpwardIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          )}
        />

        <List>
          <ListItem button onClick={addCollectionItem}>
            <ListItemText primary={t("button.add")} />
          </ListItem>
          {collectionNodeId && (
            <ListItem button>
              <ListItemText
                primary={t("button.clone")}
                onClick={cloneCollectionItem}
              />
            </ListItem>
          )}
          {collectionNodeId && (
            <ListItem button>
              <ListItemText
                primary={t("button.delete")}
                onClick={deleteCollectionItem}
              />
            </ListItem>
          )}
          <ListItem button>
            <ListItemText primary={t("button.view_all")} onClick={viewAll} />
          </ListItem>
        </List>
      </form>
    </Popover>
  );
}

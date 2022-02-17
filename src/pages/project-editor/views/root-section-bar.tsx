import {
  List,
  ListItem,
  ListItemText,
  Popover,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";
import React, { useRef, useState } from "react";
import {
  FindProjectRootSectionsQuery,
  useAddProjectCollectionItemMutation,
  useCloneProjectCollectionMutation,
  useFindProjectRootSectionsQuery,
} from "../../../generated/graphql";
import { useDbTranslation } from "../../../components/translation";
import {
  HiddenWhileLoading,
  useLoaderEffect,
} from "../../../components/loading-frame";
import { useHistory } from "react-router-dom";
import {
  buildLinkToProjectCollection,
  buildLinkToProjectPath,
} from "../routes";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { EventEmitter } from "fbemitter";
import { useEffect } from "react";
import { noop } from "lodash";
import { Autocomplete } from "@mui/material";

interface RootSectionBarProps {
  projectId: string;
  rootSectionId: string;
}

interface CollectionItem {
  url: string;
  component?: React.ReactNode;
  handleClick: (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
}

function makeCollectionItem(
  url: string,
  component?: React.ReactNode,
  handleClick: (
    event: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => void = noop
) {
  return {
    url,
    component,
    handleClick,
  };
}

function createTooSectionPopover(
  projectId: string,
  root: FindProjectRootSectionsQuery["findProjectRootSections"]["roots"][number],
  cloneProjectCollectionMutation: ReturnType<
    typeof useCloneProjectCollectionMutation
  >[0],
  addProjectCollectionItemMutation: ReturnType<
    typeof useAddProjectCollectionItemMutation
  >[0],
  rootSectionId: string,
  historyPush: (url: string) => void,
  viewAll: () => void
) {
  const emitter = new EventEmitter();

  function addCollectionItem() {
    addProjectCollectionItemMutation({
      variables: {
        projectId,
        collectionTarget: {
          collectionTypeId: root.definition.id,
        },
      },
    });
  }

  function RootCollectionPicker() {
    const [anchorEl, setAnchorEl] = useState<SVGSVGElement | null>(null);
    const open = Boolean(anchorEl);
    const collectionNodeId: string | undefined = root.nodes.find(
      (x) => x.node.id === rootSectionId
    )?.node.id;

    function cloneCollectionItem() {
      if (collectionNodeId !== undefined) {
        cloneProjectCollectionMutation({
          variables: {
            collectionNodeId,
            projectId,
          },
        });
      }
    }

    function handleClick(event: React.MouseEvent<SVGSVGElement>) {
      event.stopPropagation();
      setAnchorEl(event.currentTarget);
    }

    function handleClose() {
      setAnchorEl(null);
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
            id="combo-box-demo"
            options={root.nodes}
            getOptionLabel={(option) => option.node.label || "<unammed>"}
            style={{ width: 300, margin: "10px" }}
            renderInput={(params) => (
              <TextField {...params} label="Combo box" variant="outlined" />
            )}
          />
          <List>
            <ListItem button onClick={addCollectionItem}>
              <ListItemText primary="Add" />
            </ListItem>
            {collectionNodeId && (
              <ListItem button>
                <ListItemText primary="Clone" onClick={cloneCollectionItem} />
              </ListItem>
            )}
            <ListItem button>
              <ListItemText primary="See all" onClick={viewAll} />
            </ListItem>
          </List>
        </form>
      </Popover>
    );
  }

  return {
    component: <RootCollectionPicker key={root.definition.id} />,
    handleClick: (event: React.MouseEvent<SVGSVGElement>) =>
      emitter.emit("handleClick", event),
  };
}

interface BuildUrlMapOptions {
  projectId: string;
  roots: FindProjectRootSectionsQuery["findProjectRootSections"]["roots"];
  historyPush: (url: string) => void;
  rootSectionId: string;
  cloneProjectCollectionMutation: ReturnType<
    typeof useCloneProjectCollectionMutation
  >[0];
  addProjectCollectionItemMutation: ReturnType<
    typeof useAddProjectCollectionItemMutation
  >[0];
}

function buildUrlMap({
  projectId,
  roots,
  historyPush,
  rootSectionId,
  cloneProjectCollectionMutation,
  addProjectCollectionItemMutation,
}: BuildUrlMapOptions): Map<string, CollectionItem> {
  const urls = new Map<string, CollectionItem>();

  for (const root of roots) {
    let collectionItem;
    if (root.definition.isCollection) {
      const url = buildLinkToProjectCollection(projectId, root.definition.id);
      const { component, handleClick } = createTooSectionPopover(
        projectId,
        root,
        cloneProjectCollectionMutation,
        addProjectCollectionItemMutation,
        rootSectionId,
        historyPush,
        () => historyPush(url)
      );
      collectionItem = makeCollectionItem(url, component, handleClick);
    } else {
      collectionItem = makeCollectionItem(
        buildLinkToProjectCollection(projectId, root.definition.id)
      );
    }

    urls.set(root.definition.id, collectionItem);

    for (const node of root.nodes) {
      urls.set(
        node.node.id,
        makeCollectionItem(buildLinkToProjectPath(projectId, node.node.id))
      );
    }
  }

  return urls;
}

export function RootSectionBar({
  projectId,
  rootSectionId,
}: RootSectionBarProps) {
  const history = useHistory();
  const urls = useRef<Map<string, CollectionItem> | undefined>(undefined);
  const { dbTrans } = useDbTranslation(rootSectionId);
  const { loading, data, error } = useFindProjectRootSectionsQuery({
    variables: {
      projectId,
    },
  });

  const [addProjectCollectionItemMutation] =
    useAddProjectCollectionItemMutation();
  const [cloneProjectCollectionMutation] = useCloneProjectCollectionMutation();

  useLoaderEffect(error, loading);

  const onChange = (_: React.ChangeEvent<{}>, id: string) => {
    const url = urls.current?.get(id);
    if (url) {
      history.push(url.url);
    }
  };

  if (data === undefined) {
    return null;
  }

  const roots = data.findProjectRootSections.roots;
  urls.current = buildUrlMap({
    cloneProjectCollectionMutation,
    addProjectCollectionItemMutation,
    projectId,
    roots: roots,
    historyPush: history.push.bind(history),
    rootSectionId,
  });

  return (
    <>
      <HiddenWhileLoading>
        <Tabs
          value={rootSectionId}
          onChange={onChange}
          variant="scrollable"
          scrollButtons="auto"
          style={{
            maxWidth: "calc(100vw - 200px)",
          }}
        >
          {roots
            .filter((x) => x.state.isVisible === true)
            .map((def) =>
              renderRootTab(dbTrans, rootSectionId, def, urls.current!)
            )}
        </Tabs>
      </HiddenWhileLoading>
      {Array.from(urls.current.values())
        .filter((x) => x.component !== undefined)
        .map((x) => x.component)}
    </>
  );
}

function renderRootTab(
  dbTrans: (key?: string | null | undefined) => JSX.Element,
  rootSectionId: string,
  def: FindProjectRootSectionsQuery["findProjectRootSections"]["roots"][number],
  collectionItems: Map<string, CollectionItem>
) {
  if (
    (def.nodes.length === 0 && !def.definition.isCollection) ||
    def.state.isVisible === false
  ) {
    return null;
  }

  if (def.definition.isCollection) {
    const node = def.nodes.find((x) => x.node.id === rootSectionId);
    const item = collectionItems.get(def.definition.id);

    if (node === undefined) {
      return (
        <Tab
          value={def.definition.id}
          key={def.definition.id}
          label={dbTrans(def.definition.config.translations.label)}
          iconPosition="end"
          icon={<ArrowDropDownIcon onClick={item?.handleClick} />}
        />
      );
    }

    return (
      <Tab
        value={node.node.id}
        key={node.node.id}
        label={
          node.node.label || dbTrans(def.definition.config.translations.label)
        }
        iconPosition="end"
        icon={<ArrowDropDownIcon onClick={item?.handleClick} />}
      />
    );
  }

  const node = def.nodes[0].node;

  return (
    <Tab
      value={node.id}
      key={node.id}
      label={dbTrans(def.definition.config.translations.label)}
    />
  );
}

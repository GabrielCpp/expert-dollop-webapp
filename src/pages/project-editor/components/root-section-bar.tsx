import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Tab, Tabs } from "@mui/material";
import { EventEmitter } from "fbemitter";
import { noop } from "lodash";
import React, { useCallback, useMemo } from "react";
import { useHistory } from "react-router-dom";
import {
  RefectGroup,
  useLoaderEffect,
  useSharedRefetch,
} from "../../../components/loading-frame";
import {
  scrollTop,
  useNotification,
} from "../../../components/snackbar-display";
import { useDbTranslation } from "../../../components/translation";
import {
  FindProjectRootSectionsQuery,
  useAddProjectCollectionItemMutation,
  useCloneProjectCollectionMutation,
  useDeleteProjectCollectionMutation,
  useFindProjectRootSectionsQuery,
} from "../../../generated/graphql";
import {
  buildLinkToProjectCollection,
  buildLinkToProjectPath,
} from "../routes";
import {
  RootCollectionPicker,
  RootSectionPickerProps,
} from "./root-section-node-picker";

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

interface BuildUrlMapOptions
  extends Omit<RootSectionPickerProps, "root" | "emitter"> {
  roots: FindProjectRootSectionsQuery["findProjectRootSections"]["roots"];
}

function buildUrlMap({
  projectId,
  rootSectionId,
  roots,
  historyPush,
  cloneRootSectionMutation,
  addRootSectionMutation,
  deleteRootSectionMutation,
}: BuildUrlMapOptions): Map<string, CollectionItem> {
  const urls = new Map<string, CollectionItem>();

  for (const root of roots) {
    let collectionItem;
    if (root.definition.isCollection) {
      const url = buildLinkToProjectCollection(projectId, root.definition.id);
      const { component, handleClick } = createTooSectionPopover({
        projectId,
        rootSectionId,
        root,
        historyPush,
        cloneRootSectionMutation,
        addRootSectionMutation,
        deleteRootSectionMutation,
      });

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

function createTooSectionPopover(
  props: Omit<RootSectionPickerProps, "emitter">
) {
  const emitter = new EventEmitter();

  return {
    component: (
      <RootCollectionPicker
        {...props}
        emitter={emitter}
        key={props.root.definition.id}
      />
    ),
    handleClick: (event: React.MouseEvent<SVGSVGElement>) =>
      emitter.emit("handleClick", event),
  };
}

interface RootSectionBarProps {
  projectId: string;
  rootSectionId: string;
  snackbarId: string;
  refectGroup: RefectGroup;
}

export function RootSectionBar({
  projectId,
  rootSectionId,
  snackbarId,
  refectGroup,
}: RootSectionBarProps) {
  const history = useHistory();
  const { dbTrans } = useDbTranslation(rootSectionId);
  const { success, catchError } = useNotification(snackbarId);
  const { loading, data, error, refetch } = useFindProjectRootSectionsQuery({
    variables: {
      projectId,
    },
  });

  const [addRootSectionMutation, { loading: addIsLoading, error: addError }] =
    useAddProjectCollectionItemMutation({
      onCompleted: (x) => {
        refetch()
          .then(() => {
            success("shared.forms.section_added");
            scrollTop();
            history.push(
              buildLinkToProjectPath(
                projectId,
                ...[
                  ...x.addProjectCollectionItem[0]?.path,
                  x.addProjectCollectionItem[0]?.id,
                ]
              )
            );
          })
          .catch(catchError);
      },
      onError: catchError,
    });

  const [
    cloneRootSectionMutation,
    { loading: cloneIsLoading, error: cloneError },
  ] = useCloneProjectCollectionMutation({
    onCompleted: (x) => {
      refetch()
        .then(() => {
          success("shared.forms.section_added");
          scrollTop();
          history.push(
            buildLinkToProjectPath(
              projectId,
              ...[
                ...x.cloneProjectCollection[0]?.path,
                x.cloneProjectCollection[0]?.id,
              ]
            )
          );
        })
        .catch(catchError);
    },
    onError: catchError,
  });

  const [
    deleteRootSectionMutation,
    { loading: deleteIsLoading, error: deleteError },
  ] = useDeleteProjectCollectionMutation({
    onCompleted: (x) => {
      success("form.section_deleted");
      scrollTop();
      history.push(buildLinkToProjectPath(projectId));
      refetch().catch(catchError);
    },
    onError: catchError,
  });

  useSharedRefetch(refectGroup, refetch);

  useLoaderEffect(
    error || addError || cloneError || deleteError,
    loading,
    addIsLoading,
    cloneIsLoading,
    deleteIsLoading
  );

  const urls = useMemo(() => {
    const roots = data?.findProjectRootSections.roots;
    if (roots) {
      return buildUrlMap({
        projectId,
        rootSectionId,
        roots,
        historyPush: history.push.bind(history),
        cloneRootSectionMutation,
        addRootSectionMutation,
        deleteRootSectionMutation,
      });
    }
  }, [
    projectId,
    rootSectionId,
    data,
    history,
    cloneRootSectionMutation,
    addRootSectionMutation,
    deleteRootSectionMutation,
  ]);

  const onChange = useCallback(
    (_: React.ChangeEvent<{}>, id: string) => {
      const url = urls?.get(id);
      if (url) {
        history.push(url.url);
      }
    },
    [history, urls]
  );

  if (data === undefined) {
    return null;
  }

  const roots = data.findProjectRootSections.roots;

  return (
    <>
      <Tabs
        value={rootSectionId}
        onChange={onChange}
        variant="scrollable"
        scrollButtons="auto"
      >
        {urls &&
          roots
            .filter((x) => x.state.isVisible === true)
            .map((def) => renderRootTab(dbTrans, rootSectionId, def, urls!))}
      </Tabs>
      {urls &&
        Array.from(urls.values())
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
          label={dbTrans(def.definition.translations.label)}
          iconPosition="end"
          icon={<ArrowDropDownIcon onClick={item?.handleClick} />}
        />
      );
    }

    return (
      <Tab
        value={node.node.id}
        key={node.node.id}
        label={node.node.label || dbTrans(def.definition.translations.label)}
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
      label={dbTrans(def.definition.translations.label)}
    />
  );
}

import {
  ApolloCache,
  ApolloClient,
  NormalizedCacheObject,
} from "@apollo/client";
import { useCallback, useEffect, useRef, useState } from "react";

import {
  FindProjectDefinitionRootSectionContainersDocument,
  FindProjectDefinitionRootSectionContainersQuery,
  FindProjectDefinitionRootSectionContainersQueryVariables,
  FindProjectDefinitionRootSectionsDocument,
  FindProjectDefinitionRootSectionsQuery,
  FindProjectDefinitionRootSectionsQueryVariables,
} from "../../../generated";
import { useServices } from "../../../services-def";
import { splitPath } from "../routes";

async function buildPathCache(
  apollo: ApolloClient<NormalizedCacheObject>,
  projectDefinitionId: string,
  rootSectionDefId: string | undefined,
  subSectionDefId: string | undefined,
  formDefId: string | undefined
): Promise<(string | undefined)[]> {
  function queryRoots() {
    return apollo.query<
      FindProjectDefinitionRootSectionsQuery,
      FindProjectDefinitionRootSectionsQueryVariables
    >({
      query: FindProjectDefinitionRootSectionsDocument,
      fetchPolicy: "network-only",
      variables: {
        id: projectDefinitionId,
      },
    });
  }

  function queryContainers(rootSectionDefId: string) {
    return apollo.query<
      FindProjectDefinitionRootSectionContainersQuery,
      FindProjectDefinitionRootSectionContainersQueryVariables
    >({
      query: FindProjectDefinitionRootSectionContainersDocument,
      fetchPolicy: "network-only",
      variables: {
        id: projectDefinitionId,
        rootSectionId: rootSectionDefId,
      },
    });
  }

  const rootsResult = await queryRoots();
  const roots = rootsResult.data.findProjectDefinitionRootSections.roots;

  if (rootSectionDefId === undefined && roots.length > 0) {
    rootSectionDefId = roots[0].definition.id;
  }

  if (rootSectionDefId !== undefined) {
    const containerResult = await queryContainers(rootSectionDefId);
    const containers =
      containerResult.data.findProjectDefinitionRootSectionContainers.roots;

    if (containers.length > 0) {
      if (subSectionDefId === undefined) {
        subSectionDefId = containers[0].definition.id;
      }

      const children = containers[0].children;

      if (formDefId === undefined && children.length > 0) {
        formDefId = children[0].definition.id;
      }
    }
  }

  return [rootSectionDefId, subSectionDefId, formDefId];
}

const EMPTY_PATH: (string | undefined)[] = [];

function isNodeExists(
  cache: ApolloCache<NormalizedCacheObject>,
  id: string
): boolean {
  const result = cache.identify({
    id,
    __typename: "ProjectDefinitionNode",
  });
  return result === undefined;
}

export function useProjectDefPath(
  projectDefinitionId: string,
  selectedPath: string
) {
  const { apollo } = useServices();
  let [rootSectionDefId, subSectionDefId, formDefId] = splitPath(selectedPath);
  const [path, setPath] = useState<(string | undefined)[]>(EMPTY_PATH);
  const loading = useRef(true);
  const error = useRef<Error | undefined>(undefined);

  const refetch = useCallback(() => {
    loading.current = true;
    error.current = undefined;
    let promise = null;

    if (!isNodeExists(apollo.cache, rootSectionDefId)) {
      setPath(EMPTY_PATH);
      promise = buildPathCache(
        apollo,
        projectDefinitionId,
        undefined,
        undefined,
        undefined
      );
    } else if (!isNodeExists(apollo.cache, subSectionDefId)) {
      promise = buildPathCache(
        apollo,
        projectDefinitionId,
        rootSectionDefId,
        undefined,
        undefined
      );
    } else if (!isNodeExists(apollo.cache, formDefId)) {
      promise = buildPathCache(
        apollo,
        projectDefinitionId,
        rootSectionDefId,
        subSectionDefId,
        undefined
      );
    } else {
      promise = buildPathCache(
        apollo,
        projectDefinitionId,
        rootSectionDefId,
        subSectionDefId,
        formDefId
      );
    }

    return promise
      .then((path) => {
        loading.current = false;
        setPath(path);
      })
      .catch((e) => {
        error.current = e;
        loading.current = false;
        setPath([]);
      });
  }, [
    projectDefinitionId,
    rootSectionDefId,
    subSectionDefId,
    formDefId,
    apollo,
  ]);

  useEffect(() => {
    buildPathCache(
      apollo,
      projectDefinitionId,
      rootSectionDefId,
      subSectionDefId,
      formDefId
    )
      .then((path) => {
        loading.current = false;
        setPath(path);
      })
      .catch((e) => {
        error.current = e;
        loading.current = false;
        setPath([]);
      });
  }, [
    apollo,
    loading,
    projectDefinitionId,
    rootSectionDefId,
    subSectionDefId,
    formDefId,
  ]);

  return { loading: loading.current, error: error.current, path, refetch };
}

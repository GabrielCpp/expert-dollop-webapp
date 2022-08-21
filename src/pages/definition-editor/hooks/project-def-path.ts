import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { useEffect, useRef, useState } from "react";

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

export function useProjectDefPath(
  projectDefinitionId: string,
  selectedPath: string
) {
  const { apollo } = useServices();
  const [rootSectionDefId, subSectionDefId, formDefId] =
    splitPath(selectedPath);
  const [path, setPath] = useState<(string | undefined)[]>([]);
  const loading = useRef(true);

  useEffect(() => {
    loading.current = true;
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

  return { loading: loading.current, path };
}

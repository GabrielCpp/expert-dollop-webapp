import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { useEffect, useState } from "react";

import {
  FindProjectRootSectionContainersDocument,
  FindProjectRootSectionContainersQuery,
  FindProjectRootSectionsDocument,
  FindProjectRootSectionsQuery,
} from "../../../generated";
import { useServices } from "../../../services-def";
import { splitPath } from "../routes";

async function buildPathCache(
  apollo: ApolloClient<NormalizedCacheObject>,
  projectId: string,
  rootSectionId: string | undefined,
  subSectionId: string | undefined,
  formId: string | undefined
): Promise<(string | undefined)[]> {
  function queryRoots() {
    return apollo.query<FindProjectRootSectionsQuery>({
      query: FindProjectRootSectionsDocument,
      variables: {
        projectId: projectId,
      },
    });
  }

  function queryContainers(rootSectionId: string) {
    return apollo.query<FindProjectRootSectionContainersQuery>({
      query: FindProjectRootSectionContainersDocument,
      variables: {
        projectId: projectId,
        rootSectionId: rootSectionId,
      },
    });
  }

  const rootsResult = await queryRoots();
  const roots = rootsResult.data.findProjectRootSections.roots;

  if (
    rootSectionId === undefined &&
    roots.length > 0 &&
    roots[0].nodes.length > 0
  ) {
    rootSectionId = roots[0].nodes[0].node.id;
  }

  if (rootSectionId !== undefined) {
    const containerResult = await queryContainers(rootSectionId);
    const containers =
      containerResult.data.findProjectRootSectionContainers.roots;

    if (containers.length > 0 && containers[0].nodes.length > 0) {
      if (subSectionId === undefined) {
        subSectionId = containers[0].nodes[0].node.id;
      }

      const children = containers[0].nodes[0].children;

      if (
        formId === undefined &&
        children.length > 0 &&
        children[0].nodes.length > 0
      ) {
        formId = children[0].nodes[0].node.id;
      }
    }
  }

  return [rootSectionId, subSectionId, formId];
}

export function useProjectPath(projectId: string, selectedPath: string) {
  const { apollo } = useServices();
  const [rootSectionId, subSectionId, formId] = splitPath(selectedPath);
  const [path, setPath] = useState<(string | undefined)[]>([]);

  useEffect(() => {
    setPath([]);
    buildPathCache(apollo, projectId, rootSectionId, subSectionId, formId).then(
      (path) => {
        setPath(path);
      }
    );
  }, [projectId, rootSectionId, subSectionId, formId, apollo]);

  return { loading: path.length === 0, path };
}

import React, { useRef } from "react";

import {
  FindProjectDefintionsDocument,
  FindProjectDefintionsQuery,
} from "../../../generated";
import { RouteViewCompoenentProps } from "../../../shared/named-routes";
import { PROJECT_DEFINITION_EDITOR_MAIN } from "../routes";
import { SearchGrid, SearchResultSet } from "../../search-grid";
import { useServices } from "../../../services-def";

interface ProjectDefinitionHomeProps extends RouteViewCompoenentProps {}

export function ProjectDefinitionHome({
  returnUrl,
}: ProjectDefinitionHomeProps) {
  const { apollo, routes } = useServices();
  const types = useRef<[string, string][]>([
    ["project-definition", "project_definition"],
  ]);
  const headers = useRef<[string, string][]>([["name", "name"]]);

  function fetch(
    query: string,
    types: string[],
    nextPageToken: string | null
  ): Promise<SearchResultSet> {
    return apollo
      .query<FindProjectDefintionsQuery>({
        query: FindProjectDefintionsDocument,
        variables: {
          query,
          first: 100,
          after: nextPageToken,
        },
      })
      .then((result) => ({
        nextPageToken: result.data.findProjectDefintions.pageInfo.hasNextPage
          ? result.data.findProjectDefintions.pageInfo.endCursor
          : null,
        results: result.data.findProjectDefintions.edges.map((item) => ({
          properties: { name: item.node.name },
          nextPageToken: item.cursor,
          type: "project-definition",
          uri: routes.render(PROJECT_DEFINITION_EDITOR_MAIN, {
            projectDefinitionId: item.node.id,
            selectedPath: "~",
          }),
        })),
      }));
  }

  return (
    <SearchGrid fetch={fetch} headers={headers.current} types={types.current} />
  );
}

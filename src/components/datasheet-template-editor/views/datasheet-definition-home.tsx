import { useRef } from "react";
import {
  FindDatasheetDefinitionsDocument,
  FindDatasheetDefinitionsQuery,
} from "../../../generated";
import { useServices } from "../../../services-def";
import { SearchGrid, SearchResultSet } from "../../search-grid";
import { DATASHEET_TEMPLATE_EDITOR_MAIN } from "../routes";

export function DatasheetDefinitionHome() {
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
      .query<FindDatasheetDefinitionsQuery>({
        query: FindDatasheetDefinitionsDocument,
        variables: {
          query,
          first: 100,
          after: nextPageToken,
        },
      })
      .then((result) => ({
        nextPageToken: result.data.findDatasheetDefinitions.pageInfo.hasNextPage
          ? result.data.findDatasheetDefinitions.pageInfo.endCursor
          : null,
        results: result.data.findDatasheetDefinitions.edges.map((item) => ({
          properties: { name: item.node.name },
          nextPageToken: item.cursor,
          type: "project-definition",
          uri: routes.render(DATASHEET_TEMPLATE_EDITOR_MAIN, {
            datasheetDefinitionId: item.node.id,
          }),
        })),
      }));
  }

  return (
    <SearchGrid fetch={fetch} headers={headers.current} types={types.current} />
  );
}

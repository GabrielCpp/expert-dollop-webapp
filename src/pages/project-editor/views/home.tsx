import { useRef } from "react";
import { FindProjectsQuery, FindProjectsDocument } from "../../../generated";
import { useServices } from "../../../services-def";
import { SearchGrid, SearchResultSet } from "../../../components/search-grid";
import { PROJECT_EDITOR } from "../routes";

export function ProjectSearchHome() {
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
      .query<FindProjectsQuery>({
        query: FindProjectsDocument,
        variables: {
          query,
          first: 100,
          after: nextPageToken,
        },
      })
      .then((result) => ({
        nextPageToken: result.data.findProjects.pageInfo.hasNextPage
          ? result.data.findProjects.pageInfo.endCursor
          : null,
        results: result.data.findProjects.edges.map((item) => ({
          properties: { name: item.node.name },
          nextPageToken: item.cursor,
          type: "project-definition",
          uri: routes.render(PROJECT_EDITOR, {
            projectId: item.node.id,
            selectedPath: "~",
          }),
        })),
      }));
  }

  return (
    <SearchGrid fetch={fetch} headers={headers.current} types={types.current} />
  );
}

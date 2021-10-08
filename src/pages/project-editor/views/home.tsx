import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  HeadCell,
  PaginatedDataGrid,
  SearchResultSet,
} from "../../../components/data-grid";
import { FindProjectsQuery, FindProjectsDocument } from "../../../generated";
import { useServices } from "../../../services-def";
import { PROJECT_EDITOR } from "../routes";

interface ProjectDefinitionItem {
  name: string;
}

export function ProjectSearchHome() {
  const { apollo, routes } = useServices();
  const { t } = useTranslation();

  const headers: HeadCell<ProjectDefinitionItem>[] = [
    {
      disablePadding: false,
      id: "name",
      label: t("name"),
      numeric: false,
    },
  ];

  function fetch(
    query: string,
    first: number,
    nextPageToken?: string
  ): Promise<SearchResultSet<ProjectDefinitionItem>> {
    return apollo
      .query<FindProjectsQuery>({
        query: FindProjectsDocument,
        variables: {
          query,
          first,
          after: nextPageToken,
        },
      })
      .then((result) => ({
        pageInfo: {
          endCursor: result.data.findProjects.pageInfo.endCursor,
          hasNextPage: result.data.findProjects.pageInfo.hasNextPage,
          totalCount: result.data.findProjects.pageInfo.totalCount,
        },
        results: result.data.findProjects.edges.map((item) => ({
          columns: {
            name: () => (
              <Link
                to={routes.render(PROJECT_EDITOR, {
                  projectId: item.node.id,
                  selectedPath: "~",
                })}
              >
                {item.node.name}
              </Link>
            ),
          },
          rowKey: item.node.id,
        })),
      }));
  }

  return <PaginatedDataGrid fetch={fetch} headers={headers} />;
}

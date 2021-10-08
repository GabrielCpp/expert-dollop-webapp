import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  PaginatedDataGrid,
  SearchResultSet,
} from "../../../components/data-grid";
import { HeadCell } from "../../../components/data-grid/paginated-data-grid";
import {
  FindDatasheetDefinitionsDocument,
  FindDatasheetDefinitionsQuery,
  FindDatasheetDefinitionsQueryVariables,
} from "../../../generated";
import { useServices } from "../../../services-def";
import { DATASHEET_TEMPLATE_EDITOR_MAIN } from "../routes";

interface DatasheetItem {
  name: string;
}

export function DatasheetDefinitionHome() {
  const { apollo, routes } = useServices();
  const { t } = useTranslation();
  const headers: HeadCell<DatasheetItem>[] = [
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
    nextPageToken: string | undefined
  ): Promise<SearchResultSet<DatasheetItem>> {
    return apollo
      .query<
        FindDatasheetDefinitionsQuery,
        FindDatasheetDefinitionsQueryVariables
      >({
        query: FindDatasheetDefinitionsDocument,
        variables: {
          query,
          first,
          after: nextPageToken,
        },
      })
      .then((result) => ({
        pageInfo: {
          endCursor: result.data.findDatasheetDefinitions.pageInfo.endCursor,
          hasNextPage:
            result.data.findDatasheetDefinitions.pageInfo.hasNextPage,
          totalCount: result.data.findDatasheetDefinitions.pageInfo.totalCount,
        },
        results: result.data.findDatasheetDefinitions.edges.map((item) => ({
          columns: {
            name: () => (
              <Link
                to={routes.render(DATASHEET_TEMPLATE_EDITOR_MAIN, {
                  datasheetDefinitionId: item.node.id,
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

  return <PaginatedDataGrid<DatasheetItem> fetch={fetch} headers={headers} />;
}

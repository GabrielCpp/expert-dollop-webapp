import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import {
  Datasheet,
  FindDatasheetsDocument,
  FindDatasheetsQuery,
  FindDatasheetsQueryVariables,
  FindProjectDefintionsDocument,
  FindProjectDefintionsQuery,
} from "../../../generated";
import { useServices } from "../../../services-def";
import {
  HeadCell,
  PaginatedDataGrid,
  SearchResultSet,
} from "../../../components/data-grid";
import { DATASHEET_EDITOR } from "../routes";

type Result = Pick<Datasheet, "name">;

export function BrowseDatasheet() {
  const { apollo, routes } = useServices();
  const { t } = useTranslation();

  function fetch(
    query: string,
    limit: number,
    nextPageToken?: string
  ): Promise<SearchResultSet<Result>> {
    return apollo
      .query<FindDatasheetsQuery, FindDatasheetsQueryVariables>({
        query: FindDatasheetsDocument,
        variables: {
          query,
          first: limit,
          after: nextPageToken,
        },
      })
      .then((result) => ({
        pageInfo: {
          endCursor: result.data.findDatasheets.pageInfo.endCursor,
          hasNextPage: result.data.findDatasheets.pageInfo.hasNextPage,
          totalCount: result.data.findDatasheets.pageInfo.totalCount,
        },
        results: result.data.findDatasheets.edges.map((item) => ({
          columns: {
            name: () => (
              <Link
                to={routes.render(DATASHEET_EDITOR, {
                  datasheetId: item.node.id,
                })}
              >
                {item.node.name}
              </Link>
            ),
            id: () => <Typography>{item.node.name}</Typography>,
            defaultDatasheetId: () => <Typography>{item.node.name}</Typography>,
          },
          rowKey: item.node.id,
        })),
      }));
  }

  const headers: HeadCell<Result>[] = [
    {
      disablePadding: false,
      id: "name",
      label: t("name"),
      numeric: false,
    },
  ];

  return (
    <PaginatedDataGrid
      fetch={fetch}
      headers={headers}
      displayActionColumn={true}
    />
  );
}

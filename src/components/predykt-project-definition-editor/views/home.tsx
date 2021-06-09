import React, { useRef } from "react";

import {
  FindProjectDefintionsDocument,
  FindProjectDefintionsQuery,
  ProjectDefinition,
} from "../../../generated";
import { RouteViewCompoenentProps } from "../../../shared/named-routes";
import { PROJECT_DEFINITION_EDITOR_MAIN } from "../routes";
import { useServices } from "../../../services-def";
import { PaginatedDataGrid, HeadCell, SearchResultSet } from "../../data-grid";
import { useTranslation } from "react-i18next";
import { IconButton, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
type Result = Pick<ProjectDefinition, "id" | "name" | "defaultDatasheetId">;

interface ProjectDefinitionHomeProps extends RouteViewCompoenentProps {}

export function ProjectDefinitionHome({
  returnUrl,
}: ProjectDefinitionHomeProps) {
  const { apollo, routes } = useServices();
  const { t } = useTranslation();

  function fetch(
    query: string,
    limit: number,
    nextPageToken?: string
  ): Promise<SearchResultSet<Result>> {
    return apollo
      .query<FindProjectDefintionsQuery>({
        query: FindProjectDefintionsDocument,
        variables: {
          query,
          first: limit,
          after: nextPageToken,
        },
      })
      .then((result) => ({
        pageInfo: {
          endCursor: result.data.findProjectDefintions.pageInfo.endCursor,
          hasNextPage: result.data.findProjectDefintions.pageInfo.hasNextPage,
          totalCount: 2,
        },
        results: result.data.findProjectDefintions.edges.map((item) => ({
          columns: {
            name: () => (
              <Link
                to={routes.render(PROJECT_DEFINITION_EDITOR_MAIN, {
                  projectDefinitionId: item.node.id,
                  selectedPath: "~",
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

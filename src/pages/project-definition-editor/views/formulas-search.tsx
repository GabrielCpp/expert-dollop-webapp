import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";

import {
  FindProjectDefinitionFormulasDocument,
  FindProjectDefinitionFormulasQuery,
  FindProjectDefinitionFormulasQueryVariables,
} from "../../../generated";
import { useServices } from "../../../services-def";
import {
  HeadCell,
  PaginatedDataGrid,
  SearchResultSet,
} from "../../../components/data-grid";
import { PROJECT_DEFINITION_EDITOR_FORMULA_EDIT } from "../routes";

type Result = {
  name: string;
  expression: string;
};

interface FormulasSearchParams extends Record<string, string> {
  projectDefinitionId: string;
  selectedPath: string;
}

export function FormulasSearch() {
  const { apollo, routes } = useServices();
  const { projectDefinitionId, selectedPath } =
    useParams<FormulasSearchParams>();
  const { t } = useTranslation();

  function fetch(
    query: string,
    limit: number,
    nextPageToken?: string
  ): Promise<SearchResultSet<Result>> {
    return apollo
      .query<
        FindProjectDefinitionFormulasQuery,
        FindProjectDefinitionFormulasQueryVariables
      >({
        query: FindProjectDefinitionFormulasDocument,
        variables: {
          query,
          projectDefId: projectDefinitionId,
          first: limit,
          after: nextPageToken,
        },
      })
      .then((result) => ({
        pageInfo: {
          endCursor:
            result.data.findProjectDefinitionFormulas.pageInfo.endCursor,
          hasNextPage:
            result.data.findProjectDefinitionFormulas.pageInfo.hasNextPage,
          totalCount:
            result.data.findProjectDefinitionFormulas.pageInfo.totalCount,
        },
        results: result.data.findProjectDefinitionFormulas.edges.map(
          (item) => ({
            columns: {
              name: () => (
                <Link
                  to={routes.render(PROJECT_DEFINITION_EDITOR_FORMULA_EDIT, {
                    projectDefinitionId,
                    selectedPath,
                    formulaId: item.node.id,
                  })}
                >
                  {item.node.name}
                </Link>
              ),
              expression: () => <Typography>{item.node.expression}</Typography>,
            },
            rowKey: item.node.id,
          })
        ),
      }));
  }

  const headers: HeadCell<Result>[] = [
    {
      disablePadding: false,
      id: "name",
      label: t("name"),
      numeric: false,
    },
    {
      disablePadding: false,
      id: "expression",
      label: t("expression"),
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

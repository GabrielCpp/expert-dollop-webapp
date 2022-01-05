import { Box, IconButton, Typography } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import {
  DatasheetDefinitionElementPropertyDict,
  QueryDatasheetDefinitionElementsDocument,
  QueryDatasheetDefinitionElementsQuery,
  QueryDatasheetDefinitionElementsQueryVariables,
  useFindDatasheetDefinitionQuery,
} from "../../../generated";
import { useServices } from "../../../services-def";
import { useLoaderEffect } from "../../../components/loading-frame";
import {
  HeadCell,
  PaginatedDataGrid,
  SearchResultSet,
} from "../../../components/data-grid";
import { NamedColumnComponent } from "../../../components/data-grid/paginated-data-grid";

interface DatasheetDefinitionEditorParam {
  datasheetDefinitionId: string;
}

export function DatasheetDefinitionEditor() {
  const { datasheetDefinitionId } = useParams<DatasheetDefinitionEditorParam>();
  const { apollo } = useServices();
  const { t } = useTranslation();
  const { data, loading, error } = useFindDatasheetDefinitionQuery({
    variables: {
      datasheetDefinitionId,
    },
  });

  useLoaderEffect(error, loading);

  if (data === undefined) {
    return null;
  }

  const headers: HeadCell<Record<string, string>>[] = [
    {
      disablePadding: false,
      id: "name",
      label: t("name"),
      numeric: false,
    },
    {
      disablePadding: false,
      id: "isCollection",
      label: t("isCollection"),
      numeric: false,
    },
    {
      disablePadding: false,
      id: "orderIndex",
      label: t("orderIndex"),
      numeric: false,
    },
    ...data.findDatasheetDefinition.properties.map((x) => ({
      disablePadding: false,
      id: x.name,
      label: x.name,
      numeric: false,
    })),
  ];

  function fetch(
    query: string,
    limit: number,
    nextPageToken?: string
  ): Promise<SearchResultSet<Record<string, string>>> {
    return apollo
      .query<
        QueryDatasheetDefinitionElementsQuery,
        QueryDatasheetDefinitionElementsQueryVariables
      >({
        query: QueryDatasheetDefinitionElementsDocument,
        variables: {
          query,
          datasheetDefinitionId,
          first: limit,
          after: nextPageToken,
        },
      })
      .then((result) => ({
        pageInfo: {
          endCursor:
            result.data.queryDatasheetDefinitionElements.pageInfo.endCursor,
          hasNextPage:
            result.data.queryDatasheetDefinitionElements.pageInfo.hasNextPage,
          totalCount:
            result.data.queryDatasheetDefinitionElements.pageInfo.totalCount,
        },
        results: result.data.queryDatasheetDefinitionElements.edges.map(
          (item) => ({
            rowKey: item.node.id,
            columns: {
              name: () => <Typography>{item.node.name}</Typography>,
              isCollection: () => (
                <Typography>
                  {item.node.isCollection ? t("true") : t("false")}
                </Typography>
              ),
              orderIndex: () => <Typography>{item.node.orderIndex}</Typography>,
              ...item.node.defaultProperties.reduce(
                (
                  obj: NamedColumnComponent<Record<string, string>>,
                  property: DatasheetDefinitionElementPropertyDict
                ) => {
                  obj[property.name] = () => (
                    <Typography>{property.property.value}</Typography>
                  );

                  return obj;
                },
                {}
              ),
            },
            actionComponent: () => (
              <>
                <IconButton>
                  <CreateIcon />
                </IconButton>
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              </>
            ),
          })
        ),
      }));
  }

  return (
    <Box>
      <Typography>{data.findDatasheetDefinition.name}</Typography>
      <PaginatedDataGrid<any>
        fetch={fetch}
        headers={headers}
        displayActionColumn={true}
      />
    </Box>
  );
}

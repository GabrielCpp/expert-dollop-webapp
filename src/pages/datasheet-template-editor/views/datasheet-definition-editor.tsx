import * as Apollo from "@apollo/client";
import {
  Box,
  debounce,
  IconButton,
  TextField,
  Typography,
} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import CreateIcon from "@material-ui/icons/Create";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import { noop } from "lodash";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import {
  PageInfo,
  QueryDatasheetDefinitionElementsDocument,
  QueryDatasheetDefinitionElementsQuery,
  useFindDatasheetDefinitionQuery,
} from "../../../generated";
import { useServices } from "../../../services-def";
import { useLoaderEffect } from "../../../components/loading-frame";

export const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

type NamedColumnComponent = Record<string, () => JSX.Element | null>;

export interface SearchResult {
  columns: NamedColumnComponent;
  rowKey: string;
  actionComponent?: () => JSX.Element;
}

export interface SearchResultSet {
  results: SearchResult[];
  nextPageToken: string | null;
}

export interface SearchGridProps<T> {
  headers: [string, string][];
  document: Apollo.DocumentNode;
  pickPageInfo: (data: T) => PageInfo;
  buildResults: (data: T) => SearchResult[];
  displayActionColumn?: boolean;
  limit?: number;
}

export function SearchGrid<QueryResult>({
  headers,
  document,
  pickPageInfo,
  buildResults,
  displayActionColumn = false,
  limit = 100,
}: SearchGridProps<QueryResult>) {
  const { apollo } = useServices();
  const { t } = useTranslation();
  const classes = useStyles();
  const nextPageToken = useRef<string | null>(null);
  const delayedQuery = useRef(noop);
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<SearchResult[] | undefined>(undefined);
  const [error, setError] = useState<Error | undefined>(undefined);

  function fetch(
    query: string,
    nextPageToken: string | null
  ): Promise<SearchResultSet> {
    return apollo
      .query({
        query: document,
        variables: {
          query,
          first: limit,
          after: nextPageToken,
        },
      })
      .then((result) => {
        const pageInfo = pickPageInfo(result.data);

        return {
          nextPageToken: pageInfo.hasNextPage ? pageInfo.endCursor : null,
          results: buildResults(result.data),
        };
      })
      .catch((error) => {
        setError(error);
        return {
          nextPageToken: null,
          results: [],
        };
      });
  }

  useLoaderEffect(error, results === undefined);

  function fetchResults(query: string) {
    fetch(query, nextPageToken.current).then((resultset) => {
      nextPageToken.current = resultset.nextPageToken;
      setResults(resultset.results);
    });
  }

  function onQueryChange(e: any) {
    setQuery(e.target.value);
    delayedQuery.current(e.target.value);
  }

  if (delayedQuery.current === noop) {
    delayedQuery.current = debounce(fetchResults, 500);
    fetchResults(query);
  }

  return (
    <Box>
      <TextField
        value={query}
        onChange={onQueryChange}
        InputProps={{ endAdornment: <SearchIcon /> }}
      />
      <TableContainer component={Paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              {headers.map(([name, label]) => (
                <TableCell key={name}>{t(label)}</TableCell>
              ))}
              {displayActionColumn && <TableCell />}
            </TableRow>
          </TableHead>
          <TableBody>
            {results &&
              results.map((result) => {
                const ActionComponent = result.actionComponent;

                return (
                  <TableRow key={result.rowKey}>
                    {headers.map(([name]) => {
                      const Component = result.columns[name];

                      return (
                        <TableCell key={name}>
                          <Component />
                        </TableCell>
                      );
                    })}

                    {displayActionColumn && (
                      <TableCell align="right">
                        {ActionComponent && <ActionComponent />}
                      </TableCell>
                    )}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

interface DatasheetDefinitionEditorParam {
  datasheetDefinitionId: string;
}

export function DatasheetDefinitionEditor() {
  const { datasheetDefinitionId } = useParams<DatasheetDefinitionEditorParam>();
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

  const headers: [string, string][] = [
    ["name", "name"],
    ["isCollection", "isCollection"],
    ["orderIndex", "orderIndex"],
    ...data.findDatasheetDefinition.properties.map<[string, string]>((x) => [
      x.name,
      x.name,
    ]),
  ];

  function pickPageInfo(data: QueryDatasheetDefinitionElementsQuery): PageInfo {
    return data.queryDatasheetDefinitionElements.pageInfo;
  }

  function buildResults(
    data: QueryDatasheetDefinitionElementsQuery
  ): SearchResult[] {
    return data.queryDatasheetDefinitionElements.edges.map((item) => ({
      rowKey: item.node.id,
      columns: {
        name: () => <Typography>{item.node.name}</Typography>,
        isCollection: () => (
          <Typography>
            {item.node.isCollection ? t("true") : t("false")}
          </Typography>
        ),
        orderIndex: () => <Typography>{item.node.orderIndex}</Typography>,
        ...item.node.defaultProperties.reduce<NamedColumnComponent>(
          (obj, property) => {
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
    }));
  }

  return (
    <Box>
      <Typography>{data.findDatasheetDefinition.name}</Typography>
      <SearchGrid<QueryDatasheetDefinitionElementsQuery>
        document={QueryDatasheetDefinitionElementsDocument}
        buildResults={buildResults}
        pickPageInfo={pickPageInfo}
        headers={headers}
        displayActionColumn={true}
      />
    </Box>
  );
}

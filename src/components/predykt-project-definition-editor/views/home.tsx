import React, { useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useTranslation } from "react-i18next";
import SearchIcon from "@material-ui/icons/Search";
import { Box, debounce, TextField } from "@material-ui/core";
import { useServices } from "../../../shared/service-context";
import { Services } from "../../../hooks";
import {
  FindProjectDefintionsDocument,
  FindProjectDefintionsQuery,
} from "../../../generated";
import { noop } from "lodash";
import { Link } from "react-router-dom";
import { PROJECT_DEFINITION_EDITOR_MAIN } from "../routes";
import { RouteViewCompoenentProps } from "../../../shared/named-routes";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

interface SearchResult {
  properties: Record<string, string>;
  nextPageToken: string;
  uri: string;
  type: string;
}

interface SearchResultSet {
  results: SearchResult[];
  nextPageToken: string | null;
}

interface SearchGridProps {
  fetch: (
    query: string,
    types: string[],
    nextPageToken: string | null
  ) => Promise<SearchResultSet>;
  headers: [string, string][];
  types: [string, string][];
}

export function SearchGrid({ types, headers, fetch }: SearchGridProps) {
  const { t } = useTranslation();
  const classes = useStyles();
  const nextPageToken = useRef<string | null>(null);
  const delayedQuery = useRef(noop);
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<SearchResult[] | undefined>(undefined);

  function fetchResults(query: string) {
    fetch(
      query,
      types.map(([name]) => name),
      nextPageToken.current
    ).then((resultset) => {
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

  if (results === undefined) {
    return <span>Loading...</span>;
  }

  return (
    <Box>
      <TextField
        label="Standard"
        value={query}
        onChange={onQueryChange}
        InputProps={{ endAdornment: <SearchIcon /> }}
      />
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              {headers.map(([name, label]) => (
                <TableCell key={name}>{t(label)}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {results.map((result) => (
              <TableRow key={result.nextPageToken}>
                {headers.map(([name]) => (
                  <TableCell key={name}>
                    <Link to={result.uri}>{result.properties[name]}</Link>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

interface ProjectDefinitionHomeProps extends RouteViewCompoenentProps {}

export function ProjectDefinitionHome({
  returnUrl,
}: ProjectDefinitionHomeProps) {
  const { apollo, routes } = useServices<Services>();
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

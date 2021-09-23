import { debounce, TextField } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import Paper from "@material-ui/core/Paper";
import {
  createStyles,
  lighten,
  makeStyles,
  Theme,
} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import FilterListIcon from "@material-ui/icons/FilterList";
import clsx from "clsx";
import { noop } from "lodash";
import React, { useRef, useState } from "react";

export interface HeadCell<Data> {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

export function createHeadCell<Data>(
  id: keyof Data,
  label: string,
  numeric: boolean = false,
  disablePadding: boolean = false
): HeadCell<Data> {
  return {
    id,
    label,
    numeric,
    disablePadding,
  };
}

interface EnhancedTableProps<Data> {
  displayActionColumn: boolean;
  numSelected: number;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rowCount: number;
  headCells: HeadCell<Data>[];
}

function EnhancedTableHead<Data>(props: EnhancedTableProps<Data>) {
  const {
    displayActionColumn,
    onSelectAllClick,
    numSelected,
    rowCount,
    headCells,
  } = props;

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all desserts" }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={String(headCell.id)}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
          >
            restaurent
            {headCell.label}
          </TableCell>
        ))}
        {displayActionColumn && <TableCell />}
      </TableRow>
    </TableHead>
  );
}

const useToolbarStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    highlight:
      theme.palette.type === "light"
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
    title: {
      flex: "1 1 100%",
    },
  })
);

interface EnhancedTableToolbarProps {
  numSelected: number;
  query: string;
  onQueryChange: React.ChangeEventHandler<HTMLInputElement>;
  globalActions: JSX.Element | null;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const classes = useToolbarStyles();
  const { globalActions, numSelected, query, onQueryChange } = props;
  const Actions = globalActions;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <TextField
          value={query}
          onChange={onQueryChange}
          label={"Filter"}
          InputProps={{
            startAdornment: <FilterListIcon />,
          }}
        />
      )}
      {numSelected > 0 && Actions}
    </Toolbar>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    paper: {
      width: "100%",
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    visuallyHidden: {
      border: 0,
      clip: "rect(0 0 0 0)",
      height: 1,
      margin: -1,
      overflow: "hidden",
      padding: 0,
      position: "absolute",
      top: 20,
      width: 1,
    },
  })
);

export interface PageInfo {
  hasNextPage: boolean;
  endCursor: string | undefined;
  totalCount: number;
}

export type NamedColumnComponent<Data> = Record<
  keyof Data,
  () => JSX.Element | null
>;

export interface SearchResult<Data> {
  columns: NamedColumnComponent<Data>;
  rowKey: string;
  actionComponent?: () => JSX.Element;
}

export interface SearchResultSet<Data> {
  results: SearchResult<Data>[];
  pageInfo: PageInfo;
}

export interface PaginatedDataGridProps<Data> {
  headers: HeadCell<Data>[];
  fetch: (
    query: string,
    limit: number,
    nextPageToken?: string
  ) => Promise<SearchResultSet<Data>>;
  globalActions?: (props: { selected: string[] }) => JSX.Element | null;
  displayActionColumn?: boolean;
  defaultRowsPerPage?: number;
  rowsPerPageOptions?: number[];
}

export function PaginatedDataGrid<Data>({
  headers,
  fetch,
  globalActions = undefined,
  displayActionColumn = false,
  defaultRowsPerPage = 100,
  rowsPerPageOptions = [5, 10, 25, 100],
}: PaginatedDataGridProps<Data>) {
  const classes = useStyles();
  const [selected, setSelected] = React.useState<string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(defaultRowsPerPage);
  const [query, setQuery] = useState<string>("");
  const delayedQuery =
    useRef<
      (query: string, limit: number, nextPageToken: string | undefined) => void
    >(noop);
  const pageInfo = useRef<PageInfo>({
    hasNextPage: false,
    endCursor: undefined,
    totalCount: 0,
  });
  const lastCursors = useRef<(string | undefined)[]>([]);
  const [rows, setResults] = useState<SearchResult<Data>[]>([]);

  function fetchResults(
    query: string,
    limit: number,
    nextPageToken: string | undefined
  ) {
    return fetch(query, limit, nextPageToken).then((resultset) => {
      pageInfo.current = resultset.pageInfo;
      lastCursors.current.push(nextPageToken);
      setResults(resultset.results);
    });
  }

  function resetPagination() {
    lastCursors.current = [];
  }

  async function onQueryChange(e: any) {
    setQuery(e.target.value);
    resetPagination();
    await delayedQuery.current(e.target.value, rowsPerPage, undefined);
    setPage(0);
  }

  if (delayedQuery.current === noop) {
    delayedQuery.current = debounce(fetchResults, 500);
    fetchResults(query, rowsPerPage, pageInfo.current.endCursor);
  }

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.rowKey);
      setSelected(newSelecteds);
    } else {
      setSelected([]);
    }
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = async (event: unknown, newPage: number) => {
    if (newPage > page) {
      await fetchResults(query, rowsPerPage, pageInfo.current.endCursor);
    } else if (newPage < page) {
      const lastCursor = lastCursors.current.shift();
      await fetchResults(query, rowsPerPage, lastCursor);
    }

    setPage(newPage);
  };

  const handleChangeRowsPerPage = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newRowsPerPagecount = parseInt(event.target.value, 10);

    resetPagination();
    await fetchResults(query, newRowsPerPagecount, undefined);
    setRowsPerPage(newRowsPerPagecount);
    setPage(0);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;
  const GlobalActions = globalActions;
  const globalActionsMounted =
    GlobalActions === undefined ? null : <GlobalActions selected={selected} />;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          query={query}
          onQueryChange={onQueryChange}
          globalActions={globalActionsMounted}
        />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              displayActionColumn={displayActionColumn}
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={rows.length}
              headCells={headers}
            />
            <TableBody>
              {rows.map((row, index) => {
                const isItemSelected = isSelected(row.rowKey);
                const labelId = `enhanced-table-checkbox-${index}`;
                const ActionComponent = row.actionComponent;

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.rowKey}
                    selected={isItemSelected}
                  >
                    <TableCell
                      padding="checkbox"
                      onClick={(event) => handleClick(event, row.rowKey)}
                    >
                      <Checkbox
                        checked={isItemSelected}
                        inputProps={{ "aria-labelledby": labelId }}
                      />
                    </TableCell>

                    {headers.map(({ id }) => {
                      const Component: () => JSX.Element | null =
                        row.columns[id];

                      return (
                        <TableCell
                          component="th"
                          scope="row"
                          padding="none"
                          key={String(id)}
                        >
                          <Component />
                        </TableCell>
                      );
                    })}

                    {displayActionColumn && (
                      <TableCell align={"right"}>
                        {ActionComponent && <ActionComponent />}
                      </TableCell>
                    )}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={rowsPerPageOptions}
          component="div"
          count={pageInfo.current.totalCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

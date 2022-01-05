import { debounce, styled, TextField } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import { createStyles, lighten } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import FilterListIcon from "@mui/icons-material/FilterList";
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
            {headCell.label}
          </TableCell>
        ))}
        {displayActionColumn && <TableCell />}
      </TableRow>
    </TableHead>
  );
}

interface MoreProps {
  highlight: boolean;
}

const ToolbarRoot = styled(Toolbar, {
  shouldForwardProp: (prop) => prop !== "highlight",
})<MoreProps>(({ theme, highlight }) => {
  const styles: Record<string, string> = {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  };

  if (highlight) {
    styles.color = theme.palette.secondary.main;
    styles.backgroundColor = lighten(theme.palette.secondary.light, 0.85);
  }

  return styles;
});

const TitleTypography = styled(Typography)(() => ({
  flex: "1 1 100%",
}));

interface EnhancedTableToolbarProps {
  numSelected: number;
  query: string;
  onQueryChange: React.ChangeEventHandler<HTMLInputElement>;
  globalActions: JSX.Element | null;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const { globalActions, numSelected, query, onQueryChange } = props;
  const Actions = globalActions;

  return (
    <ToolbarRoot highlight={numSelected > 0}>
      {numSelected > 0 ? (
        <TitleTypography color="inherit" variant="subtitle1">
          {numSelected} selected
        </TitleTypography>
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
    </ToolbarRoot>
  );
};

const TableRoot = styled("div")(() => ({
  width: "100%",
}));

const SpacedPaper = styled(Paper)(({ theme }) => ({
  width: "100%",
  marginBottom: theme.spacing(2),
}));

const TableWithMinWidth = styled(Table)(() => ({
  minWidth: 750,
}));

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
    <TableRoot>
      <SpacedPaper>
        <EnhancedTableToolbar
          numSelected={selected.length}
          query={query}
          onQueryChange={onQueryChange}
          globalActions={globalActionsMounted}
        />
        <TableContainer>
          <TableWithMinWidth
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
          </TableWithMinWidth>
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
      </SpacedPaper>
    </TableRoot>
  );
}

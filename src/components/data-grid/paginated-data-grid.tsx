import FilterListIcon from "@mui/icons-material/FilterList";
import {
  Alert,
  ButtonGroup,
  debounce,
  Grid,
  styled,
  TextField,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { last } from "lodash";
import React, { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAsync, useMethods } from "react-use";
import { v4 as uuidv4 } from "uuid";

import { PageFetcher, ResultSet } from "../../shared/async-cursor";
import { theme } from "../../theme";
import {
  AddButtonLink,
  CheckIconButton,
  CloseIconButton,
  DeleteButtonLink,
  EditButtonLink,
} from "../buttons";

export interface HeadCell<Data> {
  id: string;
  label: string;
  render: (props: { id: string; data: Data }) => JSX.Element | null;
  align?: "inherit" | "left" | "right" | "center" | "justify" | undefined;
  padding?: "none" | "normal";
}

export function createHeadCell<Data>(
  id: string,
  label: string,
  render: (props: { data: Data }) => JSX.Element,
  align?: "inherit" | "left" | "right" | "center" | "justify" | undefined,
  padding?: "none" | "normal"
): HeadCell<Data> {
  return {
    id,
    label,
    render,
    align,
    padding,
  };
}

const TitleTypography = styled(Typography)(() => ({
  flex: "1 1 100%",
}));

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

export interface Identified {
  id: string;
}

export interface CrudView<Data extends Identified, NewData> {
  creation?: {
    label: string;
    makeDefaultRow: () => NewData;
    columns: HeadCell<NewData>[];
    create: (id: string, data: NewData) => Promise<boolean>;
  };

  edition?: {
    label: string;
    columns: HeadCell<NewData>[];
    update: (id: string, data: NewData) => Promise<boolean>;
    convertToEditable: (d: Data) => NewData;
  };
  deletion?: {
    label: string;
    delete: (ids: string[]) => Promise<void>;
  };
}

type GlobalActionComponent = (props: {
  selected: string[];
}) => JSX.Element | null;

export interface PaginatedDataGridProps<Data extends Identified, NewData> {
  fetch: PageFetcher<Data>;
  headers: HeadCell<Data>[];
  crud?: CrudView<Data, NewData>;
  globalActions?: GlobalActionComponent;
  defaultRowsPerPage?: number;
  rowsPerPageOptions?: number[];
}

type ViewType = "view" | "creation" | "edition";

interface PageModel<Data extends Identified, NewData> {
  selection: string[];
  columnsViews: {
    view: HeadCell<Data>[];
    creation: HeadCell<NewData>[];
    edition: HeadCell<NewData>[];
  };
  page: {
    lastQuery: string;
    totalCount: number;
    rowsPerPage: number;
    index: number;
    cursors: string[];
    nextPageCursor?: string;
  };
  rows: {
    id: string;
    isSelected: boolean;
    data: Data | NewData;
    viewType: ViewType;
  }[];
}

interface TableReducer<Data extends Identified, NewData> {
  reset(p: {
    result: ResultSet<Data>;
    query: string;
    rowsPerPage: number;
  }): PageModel<Data, NewData>;
  refetch(p: {
    result: ResultSet<Data>;
    rowsPerPage: number;
  }): PageModel<Data, NewData>;
  nextPage(result: ResultSet<Data>): PageModel<Data, NewData>;
  previousPage(result: ResultSet<Data>): PageModel<Data, NewData>;
  switchViews(p: {
    ids: string[];
    viewType: ViewType;
  }): PageModel<Data, NewData>;
  toogleSelection(id: string): PageModel<Data, NewData>;
  toogleSelectAll(allSelected: boolean): PageModel<Data, NewData>;
  prependRowCreationView(data: NewData): PageModel<Data, NewData>;
  removes(ids: string[]): PageModel<Data, NewData>;
  setViewColumns(view: HeadCell<Data>[]): PageModel<Data, NewData>;
}

function createMethods<Data extends Identified, NewData>(
  state: PageModel<Data, NewData>
): TableReducer<Data, NewData> {
  function mapResultsToRows(
    results: ResultSet<Data>["results"]
  ): PageModel<Data, NewData>["rows"] {
    return results.map((r) => ({
      id: r.id,
      data: r,
      isSelected: state.selection.includes(r.id),
      viewType: "view",
    }));
  }

  function updateRowSelection(
    selection: string[]
  ): PageModel<Data, NewData>["rows"] {
    return state.rows.map((r) => ({
      ...r,
      isSelected: selection.includes(r.id),
    }));
  }

  function preprendNewRow(data: NewData): PageModel<Data, NewData>["rows"] {
    const row: PageModel<Data, NewData>["rows"][number] = {
      id: uuidv4(),
      data: data,
      isSelected: false,
      viewType: "creation",
    };

    return [row, ...state.rows];
  }

  function appendCursor(): string[] {
    const { nextPageCursor, cursors } = state.page;

    if (nextPageCursor === undefined) {
      return cursors;
    }

    return [...cursors, nextPageCursor];
  }

  function popCursor(): string[] {
    const { cursors } = state.page;

    if (cursors.length === 0) {
      return cursors;
    }

    return cursors.slice(0, -1);
  }

  function reset({
    result,
    query: lastQuery,
    rowsPerPage,
  }: {
    result: ResultSet<Data>;
    query: string;
    rowsPerPage: number;
  }): PageModel<Data, NewData> {
    const { totalCount, endCursor, hasNextPage } = result.pageInfo;

    return {
      ...state,
      rows: mapResultsToRows(result.results),
      page: {
        lastQuery,
        rowsPerPage,
        index: 0,
        totalCount: totalCount,
        cursors: [],
        nextPageCursor: hasNextPage ? endCursor : undefined,
      },
    };
  }

  function refetch({
    result,
    rowsPerPage,
  }: {
    result: ResultSet<Data>;
    rowsPerPage: number;
  }): PageModel<Data, NewData> {
    const { lastQuery, index } = state.page;
    const { totalCount, endCursor, hasNextPage } = result.pageInfo;

    return {
      ...state,
      rows: mapResultsToRows(result.results),
      page: {
        lastQuery,
        rowsPerPage,
        index,
        totalCount: totalCount,
        cursors: [],
        nextPageCursor: hasNextPage ? endCursor : undefined,
      },
    };
  }

  function nextPage(result: ResultSet<Data>): PageModel<Data, NewData> {
    const { totalCount, endCursor, hasNextPage } = result.pageInfo;
    const { lastQuery, rowsPerPage, index: lastIndex } = state.page;

    return {
      ...state,
      rows: mapResultsToRows(result.results),
      page: {
        lastQuery,
        rowsPerPage,
        totalCount,
        index: lastIndex + 1,
        cursors: appendCursor(),
        nextPageCursor: hasNextPage ? endCursor : undefined,
      },
    };
  }

  function previousPage(result: ResultSet<Data>): PageModel<Data, NewData> {
    const { totalCount, endCursor, hasNextPage } = result.pageInfo;
    const { lastQuery, rowsPerPage, index: lastIndex } = state.page;

    return {
      ...state,
      rows: mapResultsToRows(result.results),
      page: {
        lastQuery,
        rowsPerPage,
        totalCount,
        index: lastIndex > 0 ? lastIndex - 1 : 0,
        cursors: popCursor(),
        nextPageCursor: hasNextPage ? endCursor : undefined,
      },
    };
  }

  function switchViews({
    ids,
    viewType,
  }: {
    ids: string[];
    viewType: ViewType;
  }): PageModel<Data, NewData> {
    return {
      ...state,
      rows: state.rows.map((r) => ({
        ...r,
        viewType: ids.includes(r.id) ? viewType : r.viewType,
      })),
    };
  }

  function toogleSelection(id: string): PageModel<Data, NewData> {
    const selected = state.selection;
    const selectedIndex = selected.indexOf(id);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = [...selected, id];
    } else if (selectedIndex === 0) {
      newSelected = selected.slice(1);
    } else if (selectedIndex === selected.length - 1) {
      newSelected = selected.slice(0, -1);
    } else if (selectedIndex > 0) {
      newSelected = [
        ...selected.slice(0, selectedIndex),
        ...selected.slice(selectedIndex + 1),
      ];
    }

    return {
      ...state,
      selection: newSelected,
      rows: updateRowSelection(newSelected),
    };
  }

  function toogleSelectAll(allSelected: boolean): PageModel<Data, NewData> {
    const s = new Set<string>(state.selection);
    if (allSelected) {
      state.rows.forEach((r) => s.add(r.id));
    } else {
      state.rows.forEach((r) => s.delete(r.id));
    }

    const selection = Array.from(s.values());

    return {
      ...state,
      selection,
      rows: updateRowSelection(selection),
    };
  }

  function prependRowCreationView(data: NewData): PageModel<Data, NewData> {
    return {
      ...state,
      rows: preprendNewRow(data),
    };
  }

  function removes(ids: string[]): PageModel<Data, NewData> {
    return {
      ...state,
      rows: state.rows.filter((r) => !ids.includes(r.id)),
    };
  }

  function setViewColumns(view: HeadCell<Data>[]): PageModel<Data, NewData> {
    return {
      ...state,
      columnsViews: {
        ...state.columnsViews,
        view,
      },
    };
  }

  return {
    reset,
    refetch,
    nextPage,
    previousPage,
    switchViews,
    toogleSelection,
    toogleSelectAll,
    prependRowCreationView,
    removes,
    setViewColumns,
  };
}

function buildInitialState<Data extends Identified, NewData>(
  rowsPerPage: number,
  headers: HeadCell<Data>[],
  crud?: CrudView<Data, NewData>
): PageModel<Data, NewData> {
  return {
    columnsViews: {
      view: headers,
      creation: crud?.creation?.columns || [],
      edition: crud?.edition?.columns || [],
    },
    selection: [],
    page: {
      lastQuery: "",
      totalCount: 0,
      index: 0,
      rowsPerPage,
      cursors: [],
    },
    rows: [],
  };
}

export function useTableReducer<Data extends Identified, NewData = unknown>(
  defaultRowsPerPage: number,
  headers: HeadCell<Data>[],
  crud?: CrudView<Data, NewData>
): [PageModel<Data, NewData>, TableReducer<Data, NewData>] {
  const [inititalState] = useState(() =>
    buildInitialState(defaultRowsPerPage, headers, crud)
  );
  const reducers = useMethods<
    TableReducer<Data, NewData>,
    PageModel<Data, NewData>
  >(createMethods, inititalState) as [
    PageModel<Data, NewData>,
    TableReducer<Data, NewData>
  ];

  return reducers;
}

export function PaginatedDataGrid<Data extends Identified, NewData = unknown>({
  headers,
  fetch,
  globalActions,
  crud,
  defaultRowsPerPage = 100,
  rowsPerPageOptions = [5, 10, 25, 100],
}: PaginatedDataGridProps<Data, NewData>) {
  const [state, methods] = useTableReducer(defaultRowsPerPage, headers, crud);
  const { lastQuery, rowsPerPage, nextPageCursor, cursors } = state.page;
  const nextPage = useCallback(async () => {
    const result = await fetch(lastQuery, rowsPerPage, nextPageCursor);
    methods.nextPage(result);
  }, [methods, fetch, lastQuery, rowsPerPage, nextPageCursor]);

  const previousPage = useCallback(async () => {
    const lastCursor =
      cursors.length <= 1 ? undefined : cursors[cursors.length - 2];
    const result = await fetch(lastQuery, rowsPerPage, lastCursor);
    methods.previousPage(result);
  }, [fetch, methods, lastQuery, rowsPerPage, cursors]);

  const filterByQuery = useCallback(
    async (query: string) => {
      const result = await fetch(query, rowsPerPage);
      methods.reset({
        result,
        query,
        rowsPerPage,
      });
    },
    [fetch, methods, rowsPerPage]
  );
  const refetch = useCallback(
    async (newRowsPerPage?: number) => {
      const lastCursor = cursors.length === 0 ? undefined : last(cursors);
      const result = await fetch(
        lastQuery,
        newRowsPerPage || rowsPerPage,
        lastCursor
      );
      methods.refetch({ result, rowsPerPage });
    },
    [fetch, methods, lastQuery, cursors, rowsPerPage]
  );

  useAsync(async () => {
    const result = await fetch(lastQuery, defaultRowsPerPage);
    methods.refetch({ result, rowsPerPage: defaultRowsPerPage });
  }, [methods, fetch, defaultRowsPerPage]);

  const selectionCount = state.selection.length;

  return (
    <TableRoot>
      <SpacedPaper>
        {selectionCount > 0 && (
          <Grid>
            <Alert severity="warning">
              <TitleTypography color="inherit" variant="subtitle1">
                {selectionCount} selected
              </TitleTypography>
            </Alert>
          </Grid>
        )}
        <EnhancedTableToolbar<Data, NewData>
          selection={state.selection}
          refetch={refetch}
          filterByQuery={filterByQuery}
          globalActions={globalActions}
          methods={methods}
          prependRowCreationView={methods.prependRowCreationView}
          crud={crud}
        />
        <TableContainer>
          <TableWithMinWidth>
            <EnhancedTableHead<Data, NewData>
              state={state}
              toogleSelectAll={methods.toogleSelectAll}
              headers={headers}
            />
            <EnhancedTableBody<Data, NewData>
              rows={state.rows}
              columnsViews={state.columnsViews}
              methods={methods}
              refetch={refetch}
              crud={crud}
            />
          </TableWithMinWidth>
        </TableContainer>
        <EnhancedTablePagination
          nextPage={nextPage}
          previousPage={previousPage}
          refetch={refetch}
          count={state.page.totalCount}
          rowsPerPage={rowsPerPage}
          page={state.page.index}
          rowsPerPageOptions={rowsPerPageOptions}
        />
      </SpacedPaper>
    </TableRoot>
  );
}

interface EnhancedTablePaginationProps {
  nextPage: () => Promise<void>;
  previousPage: () => Promise<void>;
  refetch: (rowsPerPage: number) => Promise<void>;
  count: number;
  rowsPerPage: number;
  page: number;
  rowsPerPageOptions: number[];
}

function EnhancedTablePagination({
  previousPage,
  nextPage,
  refetch,
  count,
  rowsPerPage,
  page,
  rowsPerPageOptions,
}: EnhancedTablePaginationProps) {
  const handleChangePage = useCallback(
    (_: unknown, newPage: number) => {
      if (newPage > page) {
        nextPage();
      } else if (newPage < page) {
        previousPage();
      }
    },
    [nextPage, previousPage, page]
  );

  const handleChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      refetch(parseInt(event.target.value, 10));
    },
    [refetch]
  );

  return (
    <TablePagination
      component="div"
      count={count}
      rowsPerPage={rowsPerPage}
      page={page}
      rowsPerPageOptions={rowsPerPageOptions}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
}

interface EnhancedTableToolbarProps<Data extends Identified, NewData> {
  selection: string[];
  refetch: () => Promise<void>;
  filterByQuery: (query: string) => Promise<void>;
  prependRowCreationView: (newRow: NewData) => void;
  methods: TableReducer<Data, NewData>;
  globalActions?: GlobalActionComponent;
  crud?: CrudView<Data, NewData>;
}

function EnhancedTableToolbar<Data extends Identified, NewData>({
  globalActions: GlobalActions,
  selection,
  refetch,
  filterByQuery,
  prependRowCreationView,
  methods,
  crud,
}: EnhancedTableToolbarProps<Data, NewData>) {
  const [query, setQuery] = useState("");
  const debouncedFilterByQuery = useMemo(
    () => debounce(filterByQuery, 500),
    [filterByQuery]
  );

  const onQueryChange = useCallback(
    (e: any) => {
      setQuery(e.target.value);
      debouncedFilterByQuery(e.target.value);
    },
    [setQuery, debouncedFilterByQuery]
  );

  const addRow = useCallback(() => {
    if (crud?.creation) {
      const newRow = crud.creation.makeDefaultRow();
      prependRowCreationView(newRow);
    }
  }, [prependRowCreationView, crud]);

  const editRows = useCallback(() => {
    if (crud?.edition) {
      methods.switchViews({
        ids: selection,
        viewType: "edition",
      });
      methods.toogleSelectAll(false);
    }
  }, [methods, crud, selection]);

  const deleteRows = useCallback(async () => {
    if (crud?.deletion) {
      await crud.deletion.delete(selection);
      methods.toogleSelectAll(false);
      await refetch();
    }
  }, [methods, refetch, crud, selection]);

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        paddingTop: theme.spacing(1),
      }}
    >
      <Grid container>
        <Grid item>
          {crud &&
            (crud.creation ||
              (crud.deletion && selection.length > 0) ||
              (crud.edition && selection.length > 0)) && (
              <ButtonGroup>
                {crud.creation && (
                  <AddButtonLink label={crud.creation.label} onClick={addRow} />
                )}

                {crud.edition && selection.length > 0 && (
                  <EditButtonLink
                    label={crud.edition.label}
                    onClick={editRows}
                  />
                )}

                {crud.deletion && selection.length > 0 && (
                  <DeleteButtonLink
                    label={crud.deletion.label}
                    onClick={deleteRows}
                  />
                )}
              </ButtonGroup>
            )}
        </Grid>
      </Grid>

      <Grid container justifyContent="flex-end">
        <Grid item>
          <TextField
            size="small"
            sx={{ margin: "auto" }}
            value={query}
            onChange={onQueryChange}
            label={"Filter"}
            InputProps={{
              startAdornment: <FilterListIcon />,
            }}
          />
        </Grid>
      </Grid>

      {GlobalActions && <GlobalActions selected={selection} />}
    </Toolbar>
  );
}

interface EnhancedTableProps<Data extends Identified, NewData> {
  state: PageModel<Data, NewData>;
  toogleSelectAll: (allSelected: boolean) => void;
  headers: HeadCell<Data>[];
}

function EnhancedTableHead<Data extends Identified, NewData>({
  toogleSelectAll,
  state,
  headers,
}: EnhancedTableProps<Data, NewData>) {
  const { t } = useTranslation();
  const selectionCount = state.selection.length;
  const rowCount = state.rows.length;

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={
              rowCount > 0 && selectionCount > 0 && selectionCount < rowCount
            }
            checked={rowCount > 0 && selectionCount === rowCount}
            onChange={(e) => toogleSelectAll(e.target.checked)}
          />
        </TableCell>
        {headers.map((header) => (
          <TableCell
            key={header.id}
            align={header.align}
            padding={header.padding || "normal"}
          >
            {t(header.label)}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface TableBodyProps<Data extends Identified, NewData> {
  rows: PageModel<Data, NewData>["rows"];
  columnsViews: PageModel<Data, NewData>["columnsViews"];
  methods: TableReducer<Data, NewData>;
  refetch: () => Promise<void>;
  crud?: CrudView<Data, NewData>;
}

function EnhancedTableBody<Data extends Identified, NewData>({
  rows,
  methods,
  refetch,
  crud,
  columnsViews,
}: TableBodyProps<Data, NewData>) {
  return (
    <TableBody>
      {rows.map((row) => (
        <EnhancedTableRow
          key={row.id}
          row={row}
          columnsViews={columnsViews}
          methods={methods}
          refetch={refetch}
          crud={crud}
        />
      ))}
    </TableBody>
  );
}

interface EnhancedTableRowProps<Data extends Identified, NewData> {
  row: PageModel<Data, NewData>["rows"][number];
  columnsViews: PageModel<Data, NewData>["columnsViews"];
  methods: TableReducer<Data, NewData>;
  refetch: () => Promise<void>;
  crud?: CrudView<Data, NewData>;
}

type Row<Data extends Identified, NewData> = PageModel<
  Data,
  NewData
>["rows"][number];

function EnhancedTableRow<Data extends Identified, NewData>({
  row,
  refetch,
  methods,
  crud,
  columnsViews,
}: EnhancedTableRowProps<Data, NewData>) {
  const completeCreation = async (row: Row<Data, NewData>) => {
    await crud?.creation?.create(row.id, row.data as NewData);
    await refetch();
  };

  const completeEdition = async (row: Row<Data, NewData>) => {
    await crud?.edition?.update(row.id, row.data as NewData);
    methods.switchViews({ ids: [row.id], viewType: "view" });
  };

  const cancelAction = (row: Row<Data, NewData>) => {
    if (row.viewType === "edition") {
      methods.switchViews({ ids: [row.id], viewType: "view" });
    } else if (row.viewType === "creation") {
      methods.removes([row.id]);
    }
  };

  const data: Data | NewData | undefined =
    row.viewType === "edition"
      ? crud?.edition?.convertToEditable(row.data as Data)
      : row.data;

  if (data === undefined) {
    return null;
  }

  return (
    <TableRow
      hover
      aria-checked={row.isSelected}
      tabIndex={-1}
      selected={row.isSelected}
    >
      {row.viewType === "view" && (
        <TableCell
          key={row.viewType}
          padding="checkbox"
          onClick={() => methods.toogleSelection(row.id)}
        >
          <Checkbox checked={row.isSelected} />
        </TableCell>
      )}

      {row.viewType === "creation" && (
        <TableCell key={row.viewType} padding="checkbox">
          <CheckIconButton onClick={() => completeCreation(row)} />
          <CloseIconButton onClick={() => cancelAction(row)} />
        </TableCell>
      )}

      {row.viewType === "edition" && (
        <TableCell key={row.viewType} padding="checkbox">
          <CheckIconButton onClick={() => completeEdition(row)} />
          <CloseIconButton onClick={() => cancelAction(row)} />
        </TableCell>
      )}

      {columnsViews[row.viewType].map(
        ({ id, render: Component, padding, align }) => (
          <TableCell scope="row" padding={padding} align={align} key={id}>
            <Component id={row.id} data={data as Data & NewData} />
          </TableCell>
        )
      )}
    </TableRow>
  );
}

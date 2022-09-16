import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
  Box,
  CircularProgress,
  ClickAwayListener,
  debounce,
  Grid,
  Grow,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Popper,
  TablePagination,
  TextField,
} from "@mui/material";
import { identity } from "lodash";
import {
  ChangeEvent,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useObservable, usePreviousDistinct } from "react-use";
import {
  FetchedPage,
  makeDefaultEmptyPage,
  PageFetcher,
  PageInfo,
} from "../../../shared/async-cursor";
import { ObservableValue } from "../../../shared/redux-db";
import { FieldChildren, SelectOption } from "../form-field-record";

interface RemoteReferencePickerFieldProps extends FieldChildren {
  label: string;
  title?: string;
  endAdornment?: ReactNode;
  fetchPage: PageFetcher<SelectOption>;
  findById: (id: string) => Promise<SelectOption | null | undefined>;
  limit?: number;
}

export function remoteReferencePickerField(
  props: RemoteReferencePickerFieldProps
) {
  return <ControlledAutocomplete {...props}></ControlledAutocomplete>;
}

interface UseSearchParams {
  fetchPage: PageFetcher<SelectOption>;
  throttleTimeMsc?: number;
  limit?: number;
}

interface ExtendedPageInfo extends PageInfo {
  pageIndex: number;
  options: SelectOption[];
  limit: number;
}

interface UseSearchResult {
  loading: boolean;
  search: (newQuery: string) => void;
  throttledSearch: (newQuery: string) => void;
  page$: ObservableValue<ExtendedPageInfo>;
  nextPage(): Promise<void>;
  previousPage(): Promise<void>;
}

function useSearch({
  fetchPage,
  throttleTimeMsc = 200,
  limit = 100,
}: UseSearchParams): UseSearchResult {
  const lastQuery = useRef("");
  const [loading, setLoading] = useState(false);
  const [fetchedPage, setFetchedPage] =
    useState<FetchedPage<SelectOption>>(makeDefaultEmptyPage);
  const lastCursor = usePreviousDistinct(fetchedPage.pageInfo.endCursor);
  const page = useRef<ObservableValue<ExtendedPageInfo>>();
  if (page.current === undefined) {
    page.current = new ObservableValue<ExtendedPageInfo>({
      ...fetchedPage.pageInfo,
      pageIndex: 0,
      options: [],
      limit,
    });
  }

  const search = useCallback(
    async (
      newQuery: string,
      cursor?: string,
      getPage: (pageIndex: number) => number = identity
    ) => {
      const isSameQuery = lastQuery.current === newQuery;
      setLoading(true);
      const newFetchedPage = await fetchPage(newQuery, limit, cursor);
      setLoading(false);
      setFetchedPage(newFetchedPage);
      lastQuery.current = newQuery;
      page.current?.next({
        ...newFetchedPage.pageInfo,
        options: newFetchedPage.edges.map((edge) => edge.node),
        pageIndex: isSameQuery
          ? getPage(page.current?.value.pageIndex || 0)
          : 0,
        limit,
      });
    },
    [fetchPage, limit, setFetchedPage]
  );

  const debouncedSearch = useMemo(
    () => debounce(search, throttleTimeMsc),
    [search, throttleTimeMsc]
  );

  const throttledSearch = useCallback(
    (newQuery: string, cursor?: string) => {
      setLoading(true);
      debouncedSearch(newQuery, cursor);
    },
    [debouncedSearch]
  );

  const nextPage = useCallback(async () => {
    await search(
      lastQuery.current,
      fetchedPage.pageInfo.endCursor,
      (i) => i + 1
    );
  }, [fetchedPage, search]);

  const previousPage = useCallback(async () => {
    await search(lastQuery.current, lastCursor, (i) => Math.max(i - 1, 0));
  }, [lastCursor, search]);

  return {
    loading,
    search,
    throttledSearch,
    nextPage,
    previousPage,
    page$: page.current,
  };
}

function ControlledAutocomplete({
  id,
  value,
  name,
  label,
  errors,
  title,
  endAdornment,
  limit = 100,
  fetchPage,
  findById,
  onChange,
  t,
}: RemoteReferencePickerFieldProps) {
  const [isInitializing, setInitializing] = useState(true);
  const [query, setQuery] = useState<string>("");
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLElement | null>(null);
  const {
    throttledSearch,
    loading: isSearching,
    page$,
    nextPage,
    previousPage,
  } = useSearch({ fetchPage, limit });

  const handleToggle = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setOpen((prevOpen) => !prevOpen);
    },
    [setOpen]
  );

  const handleClose = useCallback(
    (event: Event | React.SyntheticEvent) => {
      setOpen(false);
    },
    [setOpen]
  );

  const selectOption = useCallback(
    (optionId: string) => () => {
      const option = page$.value.options.find((o) => o.id === optionId);

      if (option) {
        onChange(option.id);
        setQuery(option.label);
        setOpen(false);
      }
    },
    [onChange, setQuery, setOpen, page$]
  );

  const updateTransientValue = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      const option = page$.value.options.find(
        (o) => o.label === event.target.value
      );
      if (option !== undefined) {
        onChange(option.id);
        setOpen(false);
      }

      setQuery(event.target.value);
      throttledSearch(event.target.value);
    },
    [onChange, setOpen, setQuery, throttledSearch, page$]
  );

  useEffect(() => {
    if (value === "") {
      throttledSearch(value);
      setInitializing(false);
    } else {
      findById(value as string).then((option) => {
        if (option) {
          setQuery(option.label);
          throttledSearch(option.label);
        }

        setInitializing(false);
      });
    }
  }, [findById, throttledSearch, value]);

  const loading = isSearching || isInitializing;

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <Box>
        <TextField
          id={id}
          style={{ width: "100%" }}
          disabled={isInitializing}
          label={t(label)}
          value={query}
          onChange={updateTransientValue}
          InputProps={{
            ref: anchorRef,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                <IconButton onClick={handleToggle}>
                  <ArrowDropDownIcon />
                </IconButton>
                {endAdornment}
              </>
            ),
          }}
        />
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          style={{
            zIndex: "999",
            width:
              anchorRef.current === null
                ? undefined
                : anchorRef.current.clientWidth,
            height:
              anchorRef.current === null
                ? undefined
                : anchorRef.current.clientHeight,
          }}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom-start" ? "left top" : "left bottom",
              }}
            >
              <Paper>
                <PaginatedList
                  loading={loading}
                  page$={page$}
                  selectOption={selectOption}
                  nextPage={nextPage}
                  previousPage={previousPage}
                />
              </Paper>
            </Grow>
          )}
        </Popper>
      </Box>
    </ClickAwayListener>
  );
}

interface PaginatedListProps {
  loading: boolean;
  page$: ObservableValue<ExtendedPageInfo>;
  selectOption(optionId: string): () => void;
  previousPage(): Promise<void>;
  nextPage(): Promise<void>;
}

function PaginatedList({
  loading,
  selectOption,
  previousPage,
  nextPage,
  page$,
}: PaginatedListProps) {
  const page = useObservable(page$, page$.value);
  const handleChangePage = useCallback(
    (
      event: React.MouseEvent<HTMLButtonElement> | null,
      newPage: number
    ): void => {
      if (newPage < page.pageIndex) {
        previousPage();
      } else {
        nextPage();
      }
    },
    [previousPage, nextPage, page]
  );

  if (loading) {
    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{
          width: "100%",
          height: "200px",
          maxHeight: "200px",
          overflow: "auto",
        }}
      >
        <Grid item>
          <CircularProgress />
        </Grid>
      </Grid>
    );
  }

  return (
    <div>
      <List style={{ maxHeight: 200, overflow: "auto" }} dense={true}>
        {page.options.map((option) => (
          <ListItemButton onClick={selectOption(option.id)} key={option.id}>
            <ListItemText primary={option.label} />
          </ListItemButton>
        ))}
      </List>
      <TablePagination
        component="div"
        count={page.totalCount}
        page={page.pageIndex}
        onPageChange={handleChangePage}
        rowsPerPage={page.limit}
        rowsPerPageOptions={[]}
      />
    </div>
  );
}

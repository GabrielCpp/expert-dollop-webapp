import {
  PaginatedDataGrid,
  PaginatedDataGridProps,
  SearchResult,
  SearchResultSet,
} from "./paginated-data-grid";

export interface InMemoryDataGridProps<Data>
  extends Omit<PaginatedDataGridProps<Data>, "fetch"> {
  rows: Data[];
  searchRow: (query: string, x: Data) => boolean;
  buildRow: (x: Data) => SearchResult<Data>;
}

export function InMemoryDataGrid<Data>(props: InMemoryDataGridProps<Data>) {
  const { rows, searchRow, buildRow } = props;

  function fetch(
    query: string,
    limit: number,
    nextPageToken?: string
  ): Promise<SearchResultSet<Data>> {
    const startOffset = Number(nextPageToken || 0);
    const queries = rows.filter((x) => searchRow(query, x) || query === "");

    const results = queries
      .slice(startOffset, startOffset + limit)
      .map((x) => buildRow(x));

    return Promise.resolve({
      results,
      pageInfo: {
        endCursor: String(startOffset + limit),
        hasNextPage: startOffset + limit < 1000,
        totalCount: queries.length,
      },
    });
  }

  return <PaginatedDataGrid<Data> {...props} fetch={fetch} />;
}

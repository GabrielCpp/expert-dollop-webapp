import {
  PaginatedDataGrid,
  PaginatedDataGridProps,
  ResultSet,
} from "./paginated-data-grid";

export interface InMemoryDataGridProps<Data>
  extends Omit<PaginatedDataGridProps<Data>, "fetch"> {
  rows: Data[];
  searchRow: (query: string, x: Data) => boolean;
}

export function InMemoryDataGrid<Data>(props: InMemoryDataGridProps<Data>) {
  const { rows, searchRow } = props;

  function fetch(
    query: string,
    limit: number,
    nextPageToken?: string
  ): Promise<ResultSet<Data>> {
    const startOffset = Number(nextPageToken || 0);
    const queries = rows.filter((x) => searchRow(query, x) || query === "");

    const edges = queries
      .slice(startOffset, startOffset + limit)
      .map((node, index) => ({
        node,
        cursor: String(index),
      }));

    return Promise.resolve({
      edges,
      pageInfo: {
        endCursor: String(startOffset + limit),
        hasNextPage: startOffset + limit < 1000,
        totalCount: queries.length,
      },
    });
  }

  return <PaginatedDataGrid<Data> {...props} fetch={fetch} />;
}

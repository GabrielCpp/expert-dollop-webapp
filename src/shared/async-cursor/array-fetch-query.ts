import { PageFetcher, ResultSet } from "./apollo-fetch-query";

interface UseArrayFetchProps<Data> {
  rows: Data[];
  match: (query: string, x: Data) => boolean;
}

export function useArrayFetch<Data>({
  rows,
  match,
}: UseArrayFetchProps<Data>): PageFetcher<Data> {
  function fetch(
    query: string,
    limit: number,
    nextPageToken?: string
  ): Promise<ResultSet<Data>> {
    query = query.trim();
    const startOffset = Number(nextPageToken || 0);
    const queries = query === "" ? rows : rows.filter((x) => match(query, x));

    return Promise.resolve({
      results: queries.slice(startOffset, startOffset + limit),
      pageInfo: {
        endCursor: String(startOffset + limit),
        hasNextPage: startOffset + limit < queries.length,
        totalCount: queries.length
      },
    });
  }

  return fetch;
}

import { ApolloClient, DocumentNode, NormalizedCacheObject } from "@apollo/client";
import { useCallback } from "react";

export interface Edge<Data> {
  node: Data;
  cursor: string;
}

export interface PageInfo {
  hasNextPage: boolean;
  endCursor: string | undefined;
  totalCount: number;
}

export interface FetchedPage<Data> {
  edges: Edge<Data>[];
  pageInfo: PageInfo;
}

export type PageFetcher<Data> = (
  query: string,
  first: number,
  nextPageToken?: string
) => Promise<FetchedPage<Data>>;

export function makeDefaultEmptyPage<Data>(): FetchedPage<Data> {
  return {
    edges: [],
    pageInfo: {
      endCursor: undefined,
      hasNextPage: true,
      totalCount: 0
    }
  }
}

interface UseApolloFetchParams<Args> {
  apollo: ApolloClient<NormalizedCacheObject>,
  document: DocumentNode,
  onError: (error?: Error) => void,
  variables?: Omit<Args, "query" | "first" | "after">
}

export function useApolloPageFetch<Data, Result extends { results: FetchedPage<Data> }, Args={}>({ apollo, document, onError, variables }: UseApolloFetchParams<Args>) {
  const fetcher = useCallback((
    query: string,
    first: number,
    nextPageToken?: string
  ): Promise<FetchedPage<Data>> => {
    return apollo
      .query<Result>({
        query: document,
        variables: {
          ...(variables || {}),
          query,
          first,
          after: nextPageToken,
        },
      })
      .then((resultset) => resultset.data.results)
      .catch((error) => {
        onError(error);
        return {
          edges: [],
          pageInfo: {
            totalCount: 0,
            endCursor: "",
            hasNextPage: false,
          },
        };
      }) 
    }, 
    [apollo, document, onError, variables]
  )

  return fetcher
}
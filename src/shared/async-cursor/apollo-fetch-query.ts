import { useCallback } from "react";
import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { DocumentNode } from "graphql";

export type PageFetcher<Data> = (
  query: string,
  first: number,
  nextPageToken?: string
) => Promise<ResultSet<Data>>;

export interface ResultSet<Data> {
  results: Data[];
  pageInfo: PageInfo;
}

export interface PageInfo {
  hasNextPage: boolean;
  endCursor?: string;
  totalCount: number;
}

interface Variables {
  first: number 
  after?: string | null
  query: string
}

interface QuerySchema<Data> {
  results: {
    pageInfo: PageInfo
    edges: {
      node: Data
      cursor: string
    }[]
  }  
}

interface UseApolloPageFetchParams<Args extends Variables> {
  apollo: ApolloClient<NormalizedCacheObject>;
  document: DocumentNode;
  onError: (error?: Error) => void;
  variables?: Omit<Args, "query" | "first" | "after">;
}


export function useApolloPageFetch<Data, Query extends QuerySchema<Data>, Args extends Variables>({
  apollo,
  document,
  onError,
  variables,
}: UseApolloPageFetchParams<Args>): PageFetcher<Data> {
  const fetcher = useCallback(
    (query: string, first: number, nextPageToken?: string) => {
      const v = {
        ...(variables || {}),
        query,
        first,
        after: nextPageToken || undefined,
      }

      return apollo
        .query<Query, Args>({
          query: document,
          variables: v as Args,
        })
        .then((resultset) => mapQueryResult(resultset.data))
        .catch((error) => {
          onError(error);
          return {
            results: [],
            pageInfo: {
              totalCount: 0,
              endCursor: "",
              hasNextPage: false,
            },
          };
        });
    },
    [apollo, document, onError, variables]
  );

  return fetcher;
}

export function createEmptyPage<Data>():ResultSet<Data> {
  return {
    results: [],
    pageInfo: {
      totalCount: 0,
      endCursor: "",
      hasNextPage: false,
    },
  }
}

function mapQueryResult<Data>(data: QuerySchema<Data>): ResultSet<Data> {
  return {
    pageInfo: data.results.pageInfo,
    results: data.results.edges.map(x => x.node)
  }
}
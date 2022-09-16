import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { DocumentNode } from "graphql";
import { useCallback } from "react";


interface ItemResult<Data> {
  result?: Data | null
}

interface UseApolloFetchItemParams<Args, K extends keyof Args> {
  apollo: ApolloClient<NormalizedCacheObject>,
  document: DocumentNode,
  onError: (error?: Error) => void,
  variables?: Omit<Args, K>
  idKey: K
}

export function useApolloFetchItem<Data, Result extends ItemResult<Data>, Args, K extends keyof Args> ({apollo, document, onError, variables, idKey}: UseApolloFetchItemParams<Args, K>) {
  const fetcher = useCallback((
    id: string
  ): Promise<ItemResult<Data>["result"]> => {
    return apollo
      .query<Result>({
        query: document,
        variables: {
          ...(variables || {}),
          [idKey]: id
        },
      })
      .then((resultset) => resultset.data.result)
      .catch((error) => {
        onError(error);
        return undefined
      }) 
    }, 
    [apollo, document, onError, variables, idKey]
  )

  return fetcher
}
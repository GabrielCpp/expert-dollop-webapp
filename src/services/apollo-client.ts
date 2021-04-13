import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";

export function createApolloClient(): ApolloClient<NormalizedCacheObject> {
  const getUrl = window.location;
  const uri = getUrl.protocol + "//" + getUrl.host + "/graphql";

  const apollo = new ApolloClient({
    uri,
    cache: new InMemoryCache(),
  });

  return apollo;
}

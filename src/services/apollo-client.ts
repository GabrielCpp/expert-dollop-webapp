import {
  ApolloClient,
  ApolloLink,
  FetchResult,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
  Observable,
  from,
} from "@apollo/client";
import { Services } from "../services-def";
import { onError } from "@apollo/client/link/error";
import { RetryLink } from "@apollo/client/link/retry";
import { persistCache, LocalStorageWrapper } from "apollo3-cache-persist";

export async function createApolloClient(
  getServices: () => Services
): Promise<ApolloClient<NormalizedCacheObject>> {
  const getUrl = window.location;
  const uri = getUrl.protocol + "//" + getUrl.host + "/graphql";
  const httpLink = new HttpLink({ uri });
  const authLink = new ApolloLink((operation, forward) => {
    const services = getServices();
    return new Observable<FetchResult>((observable) => {
      let sub: ReturnType<ReturnType<typeof forward>["subscribe"]> | null =
        null;

      services.auth0.getToken().then((token) => {
        if(token !== undefined && token !== '') {
          operation.setContext({
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        }

        sub = forward(operation).subscribe(observable);
      });

      return () => (sub ? sub.unsubscribe() : null);
    });
  });

  const errorLink = onError(({ graphQLErrors, networkError, response }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      );
    }

    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
    }
  });

  const retryLink = new RetryLink({
    delay: {
      initial: 300,
      max: Infinity,
      jitter: true,
    },
    attempts: {
      max: 5,
      retryIf: (error, _operation) => !!error,
    },
  });

  const cache = new InMemoryCache();

  if(false) {
    await persistCache({
      cache,
      storage: new LocalStorageWrapper(window.localStorage),
      maxSize: false,
      debug: true,
    });
  }


  const apollo = new ApolloClient({
    cache,
    link: from([errorLink, retryLink, authLink, httpLink]),
  });

  return apollo;
}

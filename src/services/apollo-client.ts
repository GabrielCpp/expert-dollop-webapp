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

export function createApolloClient(
  getServices: () => Services
): ApolloClient<NormalizedCacheObject> {
  const getUrl = window.location;
  const uri = getUrl.protocol + "//" + getUrl.host + "/graphql";
  const httpLink = new HttpLink({ uri });
  const authLink = new ApolloLink((operation, forward) => {
    const services = getServices();
    return new Observable<FetchResult>((observable) => {
      let sub: ZenObservable.Subscription | null = null;

      services.auth0.getToken().then((token) => {
        operation.setContext({
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

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

  const apollo = new ApolloClient({
    cache: new InMemoryCache(),
    link: from([errorLink, retryLink, authLink, httpLink]),
  });

  return apollo;
}

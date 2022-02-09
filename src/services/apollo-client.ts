import {
  ApolloClient,
  ApolloLink,
  FetchResult,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
  Observable,
} from "@apollo/client";
import { Services } from "../services-def";

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

  const apollo = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
  });

  return apollo;
}

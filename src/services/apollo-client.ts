import {
  ApolloClient,
  ApolloLink,
  concat,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { Services } from "../services-def";

export function createApolloClient(
  getServices: () => Services
): ApolloClient<NormalizedCacheObject> {
  const getUrl = window.location;
  const uri = getUrl.protocol + "//" + getUrl.host + "/graphql";

  const httpLink = new HttpLink({ uri });
  const authLink = new ApolloLink((operation, forward) => {
    operation.setContext(async ({ headers }: { headers: any }) => {
      const services = getServices();
      let token: string | undefined = await services.auth0.getToken();

      return {
        headers: {
          ...headers,
          authorization: "Bearer" + token,
        },
      };
    });
    return forward(operation);
  });

  const apollo = new ApolloClient({
    cache: new InMemoryCache(),
    link: concat(authLink, httpLink),
  });

  return apollo;
}

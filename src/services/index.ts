import { createApolloClient } from "./apollo-client";
import { createNamedRouteService } from "./named-routes";
import { createReduxDb } from "./redux-db";
import { AjvWithError } from "./ajv";
import { LoaderService } from "./loader-service";
import { Services } from "../services-def";
import { createAuth0Wrapper } from "./auth0-wrapper";
import { ObservableFeed } from "../shared/feed";
import { HttpApi } from "./api-service";

export const services: Services = {
  auth0: createAuth0Wrapper(),
  apollo: createApolloClient(() => services),
  api: new HttpApi(),
  routes: createNamedRouteService(),
  reduxDb: createReduxDb(),
  ajv: new AjvWithError(),
  loader: new LoaderService(),
  feeds: new ObservableFeed(),
};

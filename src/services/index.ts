import { createApolloClient } from "./apollo-client";
import { createNamedRouteService } from "./named-routes";
import { createReduxDb } from "./redux-db";
import { AjvWithError } from "./ajv";
import { LoaderService } from "./loader-service";
import { Services } from "../services-def";
import { Auth0Wrapper } from "./auth0-wrapper";
import { HttpApi } from "./api-service";
import { HttpFetchService } from "./http-service";

export async function createServices(): Promise<Services> {
  const getServices = () => services
  const services: Services = {
    auth0: new Auth0Wrapper(getServices),
    apollo: await createApolloClient(getServices),
    api: new HttpApi(getServices),
    routes: createNamedRouteService(),
    reduxDb: createReduxDb(),
    ajv: new AjvWithError(),
    loader: new LoaderService(),
    http: new HttpFetchService(getServices),
  };

  return services;
}

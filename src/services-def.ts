import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { NamedRoutes } from "./shared/named-routes";
import { ReduxDatabase } from "./shared/redux-db/database";
import { JSONSchemaType, Schema, ValidateFunction } from "ajv";
import { useServices as useServicesGlobal } from "./shared/service-context";
import { Auth0ContextInterface, useAuth0, User } from "@auth0/auth0-react";
import { FeedMediator } from "./shared/feed";

export interface AjvFactory {
  forSchema<T>(schema: Schema | JSONSchemaType<T>): ValidateFunction<T>;
}

export interface LoaderNotifier {
  lastLoadingState: boolean;
  lastErrorState?: Error;
  addHandler(handler: (isLoading: boolean, error?: Error) => void): () => void;
  onLoading(id: string, isLoading: boolean, error?: Error): void;
  onError(error?: Error): void;
  notify(): void;
  deleteEmitter(id: string): void;
}

export interface Auth0Context {
  setContext(auht0: Auth0ContextInterface<User> | undefined): void;
  getToken(): Promise<string | undefined>;
}

export interface ApiService {
  loadTranslations(
    ressourceId: string,
    language: string,
    force?: boolean
  ): Promise<Record<string, string>>;
}

export interface HttpRequestService {
  get(url: string): Promise<Response>;
  post(url: string, body: BodyInit): Promise<Response>;
}

export interface Services {
  apollo: ApolloClient<NormalizedCacheObject>;
  api: ApiService;
  routes: NamedRoutes;
  reduxDb: ReduxDatabase;
  ajv: AjvFactory;
  loader: LoaderNotifier;
  auth0: Auth0Context;
  feeds: FeedMediator;
  http: HttpRequestService;
}

let useAuth0Wrapper: () => Auth0ContextInterface<User> | undefined = useAuth0;

if (process.env.REACT_APP_AUTH0_DEV_TOKEN) {
  useAuth0Wrapper = () => undefined;
}

export const useServices: () => Services = () => {
  const auth0 = useAuth0Wrapper();
  const services = useServicesGlobal<Services>();
  services.auth0.setContext(auth0);
  return services;
};

import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { NamedRoutes } from "./shared/named-routes";
import { ReduxDatabase } from "./shared/redux-db/database";
import { AnySchema, ValidateFunction } from "ajv";
import { useServices as useServicesGlobal } from "./shared/service-context";
import { Auth0ContextInterface, useAuth0 } from "@auth0/auth0-react";
import { User } from "./generated";

export interface AjvFactory {
  forSchema<T>(schema: AnySchema): ValidateFunction<T>;
}

export interface LoaderNotifier {
  lastLoadingState: boolean;
  lastErrorState?: Error;
  addHandler(handler: (isLoading: boolean, error?: Error) => void): () => void;
  onLoading(id: string, isLoading: boolean, error?: Error): void;
  onError(error?: Error): void;
  notify(): void;
  deleteEmitter(id: string): void;
  waitOnPromise<T>(p: Promise<T>): Promise<void | T>;
}

export interface Auth0Context {
  setContext(auht0: Auth0ContextInterface<User> | undefined): void;
  getToken(): Promise<string | undefined>;
  observeCurrentUser(): { subscribe: (listener: (value: User) => void) => { unsubscribe: () => void } }
  reloadUser(token: string | undefined): Promise<void>
  currentUser: User
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

export interface Message {
  topic: string 
  recipient: string 
  payload: Record<string, unknown>
}


export interface Messaging {
  send(message: Message): Promise<void>
  listenFor(options: { topic: string, recipient?: string[], handler: (message: Message) => Promise<void> }): () => void
}

export interface Services {
  apollo: ApolloClient<NormalizedCacheObject>;
  api: ApiService;
  routes: NamedRoutes;
  reduxDb: ReduxDatabase;
  ajv: AjvFactory;
  loader: LoaderNotifier;
  auth0: Auth0Context;
  http: HttpRequestService;
  messaging: Messaging
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

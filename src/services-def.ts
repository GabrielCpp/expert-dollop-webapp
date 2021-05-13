import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { AxiosInstance } from "axios";
import { NamedRoutes } from "./shared/named-routes";
import { ReduxDatabase } from "./shared/redux-db/database";
import { JSONSchemaType, Schema, ValidateFunction } from "ajv";
import { useServices as useServicesGlobal } from "./shared/service-context";

export interface AjvFactory {
  forSchema<T>(schema: Schema | JSONSchemaType<T>): ValidateFunction<T>;
}

export interface LoaderNotifier {
  setEffect(handler: (isLoading: boolean, error?: Error) => void): void;
  getEmitter(id: string): (isLoading: boolean, error?: Error) => void;
  notify(): void;
  deleteEmitter(id: string): void;
}

export interface Services {
  apollo: ApolloClient<NormalizedCacheObject>;
  axios: AxiosInstance;
  routes: NamedRoutes;
  reduxDb: ReduxDatabase;
  ajv: AjvFactory;
  loader: LoaderNotifier;
}

export const useServices: () => Services = useServicesGlobal;

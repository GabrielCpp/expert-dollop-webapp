import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { AxiosInstance } from "axios";
import { NamedRoutes } from "../shared/named-routes";
import { ReduxDatabase } from "../shared/redux-db/database";
import { JSONSchemaType, Schema, ValidateFunction } from "ajv";

export interface AjvFactory {
  forSchema<T>(schema: Schema | JSONSchemaType<T>): ValidateFunction<T>;
}

export interface Services {
  apollo: ApolloClient<NormalizedCacheObject>;
  axios: AxiosInstance;
  routes: NamedRoutes;
  reduxDb: ReduxDatabase;
  ajv: AjvFactory;
}

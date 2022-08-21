import { ErrorObject, JSONSchemaType, Schema } from "ajv";
import { isEqual, map, omit, set, sortBy, startsWith, tail } from "lodash";
import { AjvFactory } from "../../services-def";

import {
  ops,
  Query,
  QueryBuilder,
  queryParam,
  recordParam,
  TableRecord,
} from "../../shared/redux-db";
import { ReduxDatabase } from "../../shared/redux-db/database";

export const FormFieldTableName = "form-field";
export type FormFieldError = ErrorObject<string, Record<string, any>, unknown>;
export type TranslatableString = string | (() => JSX.Element) | JSX.Element;
export type Translator = (key?: string | null) => TranslatableString;
export interface FieldChildren {
  id: string;
  name: string;
  value: unknown;
  errors: FormFieldError[];
  onChange: (value: unknown) => void;
  t: Translator;
}


export interface FormFieldRecord extends TableRecord {
  path: string[];
  name: string;
  value: unknown;
  viewValue: string;
  errors: FormFieldError[];
  jsonSchemaValidator: Schema | JSONSchemaType<any>;
  fullPath: string[]
  metadata?: unknown
}

export function createFormFieldRecord(
  jsonSchemaValidator: Schema | JSONSchemaType<any>,
  path: string[],
  name: string,
  value: unknown,
  viewValue: string,
  id: string,
  errors: FormFieldError[],
  metadata?: unknown
): FormFieldRecord {
  return {
    jsonSchemaValidator,
    path,
    name,
    id,
    value,
    viewValue,
    errors,
    fullPath: [...path, id],
    metadata
  };
}

export function queryPathByName(name: string, path: string[]): Query {
  return QueryBuilder.fromTable(FormFieldTableName)
    .where(
      ops(
        "and",
        ops("isEqual", recordParam("path"), queryParam("path")),
        ops("isEqual", recordParam("name"), queryParam("name"))
      )
    )
    .bindParameters({
      path,
      name,
    }).query;
}

export function queryDirectChildrenOf(path: string[]): Query {
  return QueryBuilder.fromTable(FormFieldTableName)
    .where(ops("isEqual", recordParam("path"), queryParam("path")))
    .bindParameters({
      path,
    }).query;
}

export function queryChildrenOf(path: string[]): Query {
  return QueryBuilder.fromTable(FormFieldTableName)
    .where(ops("arrayStartWith", recordParam("path"), queryParam("path")))
    .bindParameters({
      path,
    }).query;
}

export function queryChildrenOfWithErrors(path: string[]): Query {
  return QueryBuilder.fromTable(FormFieldTableName)
    .where(
      ops(
        "and",
        ops("arrayStartWith", recordParam("path"), queryParam("path")),
        ops("gt", ops("len", recordParam("errors")), queryParam("zero"))
      )
    )
    .bindParameters({
      path,
      zero: 0,
    }).query;
}

export function upsertFormFieldRecord(
  database: ReduxDatabase,
  records: FormFieldRecord[]
): void {
  database.getTable(FormFieldTableName).upsertMany(records);
}

export function deleteFormFieldRecords(
  database: ReduxDatabase,
  path: string[]
): void {
  const table = database.getTable(FormFieldTableName);
  const records = table.where<FormFieldRecord>((record) =>
    startsWith(record.path.join("."), path.join("."))
  );
  table.removeMany(records);
}

export function deleteChildFormFieldRecords(
  database: ReduxDatabase,
  path: string[]
): void {
  const table = database.getTable(FormFieldTableName);
  const records = table.where<FormFieldRecord>((record) => {
    const lhs = record.path.join(".");
    const rhs = path.join(".");

    return lhs !== rhs && startsWith(lhs, rhs);
  });

  table.removeMany(records);
}

export const EMAIL_VALIDATOR = {
  type: "string",
  "format": "email"
};

export const STRING_VALIDATOR = {
  type: "string",
  minLength: 1,
  pattern: "[^\\s]+",
};
export const BOOLEAN_VALIDATOR = { type: "boolean" };
export const INT_VALIDATOR = { type: "integer" };

export function setupFormTables(database: ReduxDatabase): void {
  database.addTable(FormFieldTableName);
}

export function buildFieldByNameMap(
  records: FormFieldRecord[]
): Map<string, FormFieldRecord> {
  const fieldMap = new Map<string, FormFieldRecord>();

  for (const record of records) {
    fieldMap.set(record.name, record);
  }

  return fieldMap;
}

interface IndexedRecord extends Record<string, unknown> {
  index: number;
}

export function indexRecords<T>(
  objectArray: Record<string, IndexedRecord>
): T[] {
  const tuples: [number, unknown][] = map(objectArray, (x) => [
    x.index,
    omit(x, "index"),
  ]);
  const sortedArray = sortBy(tuples, (x) => x[0]).map((x) => x[1]);
  return sortedArray as T[];
}

export function buildFormMapById(
  database: ReduxDatabase,
  rootPath: string[]
): Map<string, FormFieldRecord> {
  const fields = new Map<string, FormFieldRecord>();
  const records = database.query<FormFieldRecord>(queryChildrenOf(rootPath));

  for (const record of records) {
    fields.set(record.id, record);
  }

  return fields;
}

export const hydrateForm = <T>(database: ReduxDatabase, rootPath: string[], usename = true): T => {
    function getPathLength(x: [string[], unknown]): number {
      return x[0].length;
    }

    const records = database.query<FormFieldRecord>(queryChildrenOf(rootPath));
    const valuePaths: Array<[string[], unknown]> = sortBy(
      records.map((record) => [
        [
          ...tail(record.path),
          usename ? record.name : record.id,
        ],
        record.value,
      ]),
      getPathLength
    );

    const result = {};

    for (const [path, value] of valuePaths) {
      set(result, path.join("."), value);
    }

    return result as T;
  };

export const validateForm =
  (database: ReduxDatabase, ajvFactory: AjvFactory) =>
  (rootPath: string[]): boolean => {
    const records = database.query<FormFieldRecord>(queryChildrenOf(rootPath));
    const recordToUpdates: FormFieldRecord[] = [];
    let isValidForm = true;

    for (const record of records) {
      const validator = ajvFactory.forSchema(record.jsonSchemaValidator);
      validator(record.value);

      const errors = validator.errors || [];

      if (errors.length > 0) {
        isValidForm = false;
      }

      if (!isEqual(record.errors, errors)) {
        recordToUpdates.push({
          ...record,
          errors,
        });
      }
    }

    upsertFormFieldRecord(database, recordToUpdates);

    return isValidForm;
  };

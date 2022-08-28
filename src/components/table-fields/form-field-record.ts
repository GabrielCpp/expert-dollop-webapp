import { ErrorObject, AnySchema } from "ajv";
import { flatten, isEqual, set, sortBy, startsWith, tail } from "lodash";
import { AjvFactory } from "../../services-def";
import {
  ops,
  Query,
  QueryBuilder,
  queryParam,
  recordParam,
  TableRecord
} from "../../shared/redux-db";
import { ReduxDatabase } from "../../shared/redux-db/database";

export const FormFieldTableName = "form-field";
export type FormFieldError = ErrorObject<string, Record<string, any>, unknown>;
export type TranslatedString = string | (() => JSX.Element) | JSX.Element;
export type Translator = (key?: string | null) => TranslatedString;
export interface FieldChildren {
  id: string;
  name: string;
  value: unknown;
  errors: FormFieldError[];
  onChange: (value: unknown) => void;
  t: Translator;
}

export interface SelectOption {
  id: string;
  label: string;
  title?: string;
}

export interface FormFieldRecord extends TableRecord {
  path: string[];
  name: string;
  value: unknown;
  viewValue: unknown;
  errors: FormFieldError[];
  jsonSchemaValidator: AnySchema;
  fullPath: string[]
  metadata?: unknown
}

export function setupFormTables(database: ReduxDatabase): void {
  database.addTable(FormFieldTableName);
}

export function createFormFieldRecord(
  jsonSchemaValidator: AnySchema,
  path: string[],
  name: string,
  value: unknown,
  viewValue: unknown,
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

export function getFieldValue(
  database: ReduxDatabase,
  id: string,
  defaultValue?: unknown
): unknown {
  const record = database.getTable(FormFieldTableName).findRecord(id)

  if(record === undefined) {
    return defaultValue
  }

  return record.value;
}

export function patchFormField(
  database: ReduxDatabase,
  id: string,
  patchRecord: Partial<FormFieldRecord>
): void {
  const record = database.getTable(FormFieldTableName).findRecord(id)

  if(record !== undefined) {
    database.getTable(FormFieldTableName).upsertMany([{...record, ...patchRecord}])
  }


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

export const hydrateForm = <T>(database: ReduxDatabase, rootPath: string[]): T => {
    function getPathLength(x: [string[], unknown]): number {
      return x[0].length;
    }
    function getOrdinal(metadata?: unknown): number[] {
      const withOrdinal = metadata as { ordinal: number} | undefined

      if(withOrdinal?.ordinal === undefined) {
        return []
      }

      return [withOrdinal.ordinal]
    }

    function makeAssignationPath(record: FormFieldRecord): Array<string | number> {
      return [
        ...flatten(tail(record.path).map(id => idToName.get(id) || [])),
        ...(idToName.get(record.id) || [])
      ]
    }

    const records = database.query<FormFieldRecord>(queryChildrenOf(rootPath));
    const idToName = new Map<string, readonly (string | number)[]>(records.map(record => [record.id, [record.name, ...getOrdinal(record.metadata)]]))

    const targetValues: [Array<string | number>, unknown][] = records.map((record) => [
      makeAssignationPath(record),
      record.value,
    ])
    const valuePaths = sortBy(
      targetValues,
      getPathLength
    ) as [Array<string | number>, unknown][];

    const result = {};
    for (const [path, value] of valuePaths) {
      set(result, path, value);
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

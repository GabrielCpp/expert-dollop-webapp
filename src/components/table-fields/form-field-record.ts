import { ErrorObject, AnySchema } from "ajv";
import { flatten, isEqual, isString, set, sortBy, startsWith, tail } from "lodash";
import { ReactNode } from "react";
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
import { FormTheme } from "./form-theme-context";
import { SelectOption } from "@mui/base";

export const FormFieldTableName = "form-field";
export const FormFieldOptionTableName = "form-field-option";
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
  formTheme: FormTheme;
}

export function applyT(t: Translator, n:ReactNode): NonNullable<ReactNode> {
  if(isString(n)) {
    return t(n)
  }

  return n || ""
}

export interface OptionRecord extends SelectOption<string>, TableRecord {
  title?: ReactNode;
  tag?: string
}

export interface FormFieldRecord extends TableRecord {
  path: string[];
  name: string;
  value: unknown;
  viewValue: unknown;
  errors: FormFieldError[];
  jsonSchemaValidator: AnySchema;
  fullPath: string[];
  metadata: Record<string, unknown>;
}

export function setupFormTables(database: ReduxDatabase): void {
  database.addTable(FormFieldTableName);
  database.addTable(FormFieldOptionTableName);
}

export function createFormFieldRecord(
  jsonSchemaValidator: AnySchema,
  path: string[],
  name: string,
  value: unknown,
  viewValue: unknown,
  id: string,
  errors: FormFieldError[],
  metadata?: Record<string, unknown>
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
    metadata: metadata || {},
  };
}



export function queryFieldsByTag(tag: string): Query {
  return QueryBuilder.fromTable(FormFieldTableName)
    .where(ops("eq", recordParam("metadata.tag"), queryParam("tag")))
    .bindParameters({
      tag,
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
  const record = database.getTable(FormFieldTableName).findRecord(id);

  if (record === undefined) {
    return defaultValue;
  }

  return record.value;
}

export function patchFormField(
  database: ReduxDatabase,
  id: string,
  patchRecord: Partial<FormFieldRecord>
): void {
  const record = database.getTable(FormFieldTableName).findRecord(id);

  if (record !== undefined) {
    database
      .getTable(FormFieldTableName)
      .upsertMany([{ ...record, ...patchRecord }]);
  }
}

export function patchFormFields(
  database: ReduxDatabase,
  patchs: Record<string, unknown>
): void {
  const records: TableRecord[] = [];

  Object.entries(patchs).forEach(([id, value]) => {
    const record = database.getTable(FormFieldTableName).findRecord(id);

    if (record !== undefined) {
      records.push({
        ...record,
        value,
      });
    }
  });

  database.getTable(FormFieldTableName).upsertMany(records);
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

export const hydrateForm = <T>(
  database: ReduxDatabase,
  rootPath: string[]
): T => {
  function getPathLength(x: [string[], unknown]): number {
    return x[0].length;
  }
  function getOrdinal(metadata?: unknown): number[] {
    const withOrdinal = metadata as { ordinal: number } | undefined;

    if (withOrdinal?.ordinal === undefined) {
      return [];
    }

    return [withOrdinal.ordinal];
  }

  function makeAssignationPath(
    record: FormFieldRecord
  ): Array<string | number> {
    return [
      ...flatten(tail(record.path).map((id) => idToName.get(id) || [])),
      ...(idToName.get(record.id) || []),
    ];
  }

  const records = database.query<FormFieldRecord>(queryChildrenOf(rootPath));
  const idToName = new Map<string, readonly (string | number)[]>(
    records.map((record) => [
      record.id,
      [record.name, ...getOrdinal(record.metadata)],
    ])
  );
  const targetValues: [Array<string | number>, unknown][] = records.map(
    (record) => [makeAssignationPath(record), record.value]
  );
  const valuePaths = sortBy(targetValues, getPathLength) as [
    Array<string | number>,
    unknown
  ][];

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


  export function upsertFormFieldOpionsRecord(
    database: ReduxDatabase,
    records: OptionRecord[]
  ): void {
    database.getTable(FormFieldOptionTableName).upsertMany(records);
  }
  

  export function deleteFormFieldOpionsRecord(
    database: ReduxDatabase,
    records: OptionRecord[]
  ): void {
    database.getTable(FormFieldOptionTableName).removeMany(records);
  }
  
  export function queryFieldOptionsByTag(tag: string): Query {
    return QueryBuilder.fromTable(FormFieldOptionTableName)
      .where(ops("eq", recordParam("tag"), queryParam("tag")))
      .bindParameters({
        tag,
      }).query;
  }
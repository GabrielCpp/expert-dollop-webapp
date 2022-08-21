import { JSONSchemaType, Schema } from "ajv";
import { isBoolean } from "lodash";
import { useCallback, useEffect } from "react";
import { useServices } from "../../../services-def";
import { useId, useTableRecord } from "../../../shared/redux-db";
import { createFormFieldRecord, FormFieldRecord, FormFieldTableName } from "../form-field-record";

interface UseFieldHookParams {
  path: string[],
  name: string,
  defaultValue: unknown,
  validator: Schema | JSONSchemaType<any>,
  unmount: boolean,
  formatter: (original: string) => string
  id?: string,
  metadata?: unknown
}


interface UseFieldHook {
  onChange: (e: any) => void;
  record: FormFieldRecord;
}


export function useField({
  path,
  name,
  defaultValue,
  validator,
  unmount,
  id,
  formatter,
  metadata
}:UseFieldHookParams): UseFieldHook {
  const { ajv, reduxDb } = useServices();
  const fieldId = useId(id);

  const makeDefaultRecord = useCallback(() => {
    const defaultRecord = createFormFieldRecord(
      validator,
      path,
      name,
      defaultValue,
      formatter(String(defaultValue)),
      fieldId,
      [],
      metadata
    );
    return reduxDb
      .getTable(FormFieldTableName)
      .findRecordOrDefault(fieldId, defaultRecord);
  }, [reduxDb, formatter, validator, path, name, defaultValue, fieldId, metadata]);

  const [record, updateRecord] = useTableRecord<FormFieldRecord>(
    FormFieldTableName,
    fieldId,
    makeDefaultRecord
  );

  useEffect(() => {
    reduxDb
      .getTable(FormFieldTableName)
      .initRecord(fieldId, makeDefaultRecord());

      if(unmount) {
        return () => {
          reduxDb.getTable(FormFieldTableName).removeManyByKey([fieldId]);
        };
      }
  }, [reduxDb, makeDefaultRecord, unmount, fieldId]);

  const onChange = useCallback(
    (e: any) => {
      const [value, viewValue] = cast(validator, formatter, e);
      const validate = ajv.forSchema(validator);
      validate(value);

      updateRecord({
        ...record,
        value: value,
        viewValue,
        errors: validate.errors || [],
      });
    },
    [ajv, updateRecord, formatter, record, validator]
  );

  return { onChange, record };
}

function cast(
  validator: Schema | JSONSchemaType<any>,
  formatter: (x: string) => string,
  e: any
): [string | number | boolean, string] {
  const type = isBoolean(validator) ? "string" : validator.type;
  let value: string | number | boolean  = String(e.target.value)
  let viewValue: string = value

  if (type === "number" || type === "integer") {
    viewValue = formatter(e.target.value)
    value = Number(viewValue);
  } else if (type === "boolean") {
    value =  Boolean(e.target.checked);
    viewValue = formatter(String(value))
  }

  return [value, viewValue]
}
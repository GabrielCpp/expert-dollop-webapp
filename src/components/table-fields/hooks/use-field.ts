import { AnySchema } from "ajv";
import { isBoolean } from "lodash";
import { useCallback, useEffect } from "react";
import { useServices } from "../../../services-def";
import { useId, useTableRecord } from "../../../shared/redux-db";
import { createFormFieldRecord, FormFieldRecord, FormFieldTableName } from "../form-field-record";

export type ViewValueFormatter = (x: unknown) => string | boolean | number
export type ValueToFormModel = (previous: unknown, current: unknown) => unknown

interface UseFieldHookParams {
  path: string[],
  name: string,
  defaultValue: unknown,
  validator: AnySchema,
  unmount: boolean,
  formatter: ViewValueFormatter
  valueToFormModel: ValueToFormModel
  id?: string,
  metadata?: unknown
}


interface UseFieldHook {
  onChange: (e: any) => void;
  record: FormFieldRecord;
}

export const DefaultEmptyId = "<null>"

export function useField({
  path,
  name,
  defaultValue,
  validator,
  unmount,
  id,
  formatter,
  valueToFormModel,
  metadata
}: UseFieldHookParams): UseFieldHook {
  const { ajv, reduxDb } = useServices();
  const fieldId = useId(id);

  const makeDefaultRecord = useCallback(() => {
    const defaultRecord = createFormFieldRecord(
      validator,
      path,
      name,
      defaultValue,
      formatter(defaultValue),
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
      let value: unknown
      let viewValue: unknown

      if (!isBoolean(validator) && validator.type === "boolean") {
        value =  valueToFormModel(record.value, e.target.checked);
        viewValue = formatter(value)
      }
      else {
        value =  valueToFormModel(record.value, e.target.value);
        viewValue = formatter(value)
      }

      const validate = ajv.forSchema(validator);
      validate(value);

      updateRecord({
        ...record,
        value,
        viewValue,
        errors: validate.errors || [],
      });
    },
    [ajv, updateRecord, formatter, valueToFormModel, record, validator]
  );

  return { onChange, record };
}


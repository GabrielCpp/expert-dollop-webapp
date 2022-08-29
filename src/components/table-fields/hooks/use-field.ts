import { AnySchema } from "ajv";
import { isBoolean } from "lodash";
import { useCallback } from "react";
import { useServices } from "../../../services-def";
import { useId, useTableRecord } from "../../../shared/redux-db";
import { createFormFieldRecord, FormFieldRecord, FormFieldTableName } from "../form-field-record";

export type ViewValueFormatter = (x: unknown, record: FormFieldRecord ) => string | boolean | number
export type ValueToFormModel = (current: unknown, componentId: string | undefined, record: FormFieldRecord) => unknown

interface UseFieldHookParams {
  path: string[],
  name: string,
  defaultValue: unknown,
  validator: AnySchema,
  formatter: ViewValueFormatter
  valueToFormModel: ValueToFormModel
  id?: string,
  metadata?: unknown
  componentId?: string,
  sideEffect?: (r: FormFieldRecord) => void
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
  id,
  formatter,
  valueToFormModel,
  metadata,
  componentId,
  sideEffect
}: UseFieldHookParams): UseFieldHook {
  const { ajv, reduxDb } = useServices();
  const fieldId = useId(id);

  const makeDefaultRecord = useCallback(() => {
    const existingRecord = reduxDb
      .getTable(FormFieldTableName)
      .findRecord<FormFieldRecord>(fieldId);

    if(existingRecord === undefined) {
      const defaultRecord = createFormFieldRecord(
        validator,
        path,
        name,
        undefined,
        "",
        fieldId,
        [],
        metadata
      );

      defaultRecord.value = valueToFormModel(defaultValue, componentId, defaultRecord)
      defaultRecord.viewValue = formatter(defaultRecord.value , defaultRecord)
      return defaultRecord
    }

    return existingRecord;
  }, [reduxDb, formatter, valueToFormModel, validator, path, name, defaultValue, fieldId, metadata, componentId]);

  const [record, updateRecord] = useTableRecord<FormFieldRecord>(
    FormFieldTableName,
    fieldId,
    makeDefaultRecord
  );

  const onChange = useCallback(
    (e: any) => {
      let value: unknown
      let viewValue: unknown

      if (!isBoolean(validator) && validator.type === "boolean") {
        value =  valueToFormModel(e.target.checked, componentId, record);
        viewValue = formatter(value,record)
      }
      else {
        value =  valueToFormModel(e.target.value, componentId, record);
        viewValue = formatter(value, record)
      }

      const validate = ajv.forSchema(validator);
      validate(value);

      const newRecord = {
        ...record,
        value,
        viewValue,
        errors: validate.errors || [],
      }

      updateRecord(newRecord);

      if(sideEffect) {
        sideEffect(newRecord)
      }
    },
    [ajv, updateRecord, formatter, valueToFormModel, record, validator, componentId, sideEffect]
  );

  return { onChange, record };
}


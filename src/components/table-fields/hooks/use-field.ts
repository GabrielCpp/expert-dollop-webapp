import { AnySchema } from "ajv";
import { isBoolean } from "lodash";
import { useCallback, useEffect } from "react";
import { useServices } from "../../../services-def";
import { useId, useTableRecord } from "../../../shared/redux-db";
import { createFormFieldRecord, FormFieldRecord, FormFieldTableName } from "../form-field-record";

export type ViewValueFormatter = (x: unknown) => string | boolean | number
export type ValueToFormModel = (current: unknown, componentId?: string) => unknown

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
  unmount,
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
    const previousRecord = reduxDb
      .getTable(FormFieldTableName)
      .findRecord<FormFieldRecord>(fieldId);
    const value = valueToFormModel(previousRecord?.value || defaultValue)
    const defaultRecord = createFormFieldRecord(
      validator,
      path,
      name,
      value,
      formatter(value),
      fieldId,
      [],
      metadata
    );

    return previousRecord || defaultRecord;
  }, [reduxDb, formatter, valueToFormModel, validator, path, name, defaultValue, fieldId, metadata]);

  const [record, updateRecord] = useTableRecord<FormFieldRecord>(
    FormFieldTableName,
    fieldId,
    makeDefaultRecord
  );

  useEffect(() => {
      if(unmount) {
        return () => {
          reduxDb.getTable(FormFieldTableName).removeManyByKey([fieldId]);
        };
      }
  }, [reduxDb, unmount, fieldId]);

  const onChange = useCallback(
    (e: any) => {
      let value: unknown
      let viewValue: unknown

      if (!isBoolean(validator) && validator.type === "boolean") {
        value =  valueToFormModel(e.target.checked, componentId);
        viewValue = formatter(value)
      }
      else {
        value =  valueToFormModel(e.target.value, componentId);
        viewValue = formatter(value)
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


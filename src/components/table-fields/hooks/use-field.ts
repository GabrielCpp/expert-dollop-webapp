import { AnySchema } from "ajv";
import { useCallback } from "react";
import { useServices } from "../../../services-def";
import { useId, useTableRecord } from "../../../shared/redux-db";
import {
  createFormFieldRecord,
  FormFieldRecord,
  FormFieldTableName,
} from "../form-field-record";

export type ViewValueFormatter = (
  x: unknown,
  record: FormFieldRecord
) => string | boolean | number;
export type ValueToFormModel = (
  current: unknown,
  componentId: string | undefined,
  record: FormFieldRecord
) => unknown;

interface UseFieldHookParams {
  path: string[];
  name: string;
  defaultValue: unknown;
  validator: AnySchema;
  formatter: ViewValueFormatter;
  valueToFormModel: ValueToFormModel;
  id?: string;
  metadata?: Record<string, unknown>;
  componentId?: string;
  sideEffect?: (r: FormFieldRecord) => void;
}

interface UseFieldHook {
  onChange: (e: any) => void;
  record: FormFieldRecord;
}

export const DefaultEmptyId = "<null>";

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
  sideEffect,
}: UseFieldHookParams): UseFieldHook {
  const { ajv, reduxDb } = useServices();
  const fieldId = useId(id);

  const makeDefaultRecord = useCallback(() => {
    let existingRecord = reduxDb
      .getTable(FormFieldTableName)
      .findRecord<FormFieldRecord>(fieldId);

    if (existingRecord === undefined) {
      const defaultRecord = createFormFieldRecord(
        validator,
        path,
        name,
        undefined,
        "",
        fieldId,
        [],
        { defaultValue: undefined, ...metadata }
      );

      defaultRecord.value = valueToFormModel(
        defaultValue,
        componentId,
        defaultRecord
      );
      defaultRecord.viewValue = formatter(defaultRecord.value, defaultRecord);
      existingRecord = defaultRecord;
    }
    
    existingRecord.metadata.defaultValue = existingRecord.value;
    
    return existingRecord;
  }, [
    reduxDb,
    formatter,
    valueToFormModel,
    validator,
    path,
    name,
    defaultValue,
    fieldId,
    metadata,
    componentId,
  ]);

  const [record, updateRecord] = useTableRecord<FormFieldRecord>(
    FormFieldTableName,
    fieldId,
    makeDefaultRecord
  );

  const onChange = useCallback(
    (viewValue: unknown) => {
      const newValue = valueToFormModel(viewValue, componentId, record);
      const newViewValue = formatter(newValue, record);
      const validate = ajv.forSchema(validator);
      validate(newValue);

      const newRecord = {
        ...record,
        value: newValue,
        viewValue: newViewValue,
        errors: validate.errors || [],
      };

      updateRecord(newRecord);

      if (sideEffect) {
        sideEffect(newRecord);
      }
    },
    [
      ajv,
      updateRecord,
      formatter,
      valueToFormModel,
      record,
      validator,
      componentId,
      sideEffect,
    ]
  );

  return { onChange, record };
}

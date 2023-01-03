import { AnySchema } from "ajv";
import { identity, isBoolean } from "lodash";
import { useCallback, useContext } from "react";
import { useTranslation } from "react-i18next";
import { FormThemeContext } from "..";
import { useServices } from "../../../services-def";
import { useId, useTableRecord } from "../../../shared/redux-db";
import {
  createFormFieldRecord,
  FieldChildren,
  FormFieldRecord,
  FormFieldTableName,
  Translator,
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

export interface UseFieldHookParams {
  name: string;
  path: string[];
  defaultValue: unknown;
  validator: AnySchema;
  formatter?: ViewValueFormatter;
  valueToFormModel?: ValueToFormModel;
  id?: string;
  metadata?: Record<string, unknown>;
  componentId?: string;
  sideEffect?: (r: FormFieldRecord) => void;
  t?: Translator;
}

interface UseFieldHook {
  onChange: (e: any) => void;
  record: FormFieldRecord;
  field: FieldChildren;
}

export const DefaultEmptyId = "<null>";

export function useField({
  name,
  path,
  defaultValue,
  validator,
  formatter = identity,
  valueToFormModel = selectValueToFormModel(validator),
  id,
  metadata,
  componentId,
  sideEffect,
  t,
}: UseFieldHookParams): UseFieldHook {
  const formTheme = useContext(FormThemeContext);
  const { t: i18nT } = useTranslation();
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

  return {
    onChange,
    record,
    field: {
      id: record.id,
      name: record.name,
      value: formatter !== identity ? record.viewValue : record.value,
      errors: record.errors,
      onChange,
      t: t || i18nT,
      formTheme,
    },
  };
}

const toNumber: ValueToFormModel = (c) => Number(c);
const toBoolean: ValueToFormModel = (c) => Boolean(c);
const toString: ValueToFormModel = (c) => String(c);

function selectValueToFormModel(validator: AnySchema): ValueToFormModel {
  const type = isBoolean(validator) ? "string" : validator.type;

  if (type === "number" || type === "integer") {
    return toNumber;
  }

  if (type === "boolean") {
    return toBoolean;
  }

  return toString;
}

import { JSONSchemaType, Schema } from "ajv";
import { isBoolean } from "lodash";
import { useEffect, useRef } from "react";
import { useId, useTableRecord } from "../../shared/redux-db";
import { useServices } from "../../shared/service-context";
import {
  buildFormFieldRecordPk,
  createFormFieldRecord,
  FormFieldError,
  FormFieldRecord,
  FormFieldTableName,
} from "./form-field-record";

export interface FieldChildren {
  id: string;
  value: any;
  name: string;
  errors: FormFieldError[];
  onChange: (value: any) => void;
  getType: () => string;
}

export interface FieldProps extends Record<string, unknown> {
  path: string[];
  name: string;
  defaultValue: unknown;
  id?: string;
  validator: Schema | JSONSchemaType<any>;
  component: (props: any) => JSX.Element;
  children?: (props: FieldChildren) => JSX.Element;
}

export function Field({
  validator,
  path,
  name,
  defaultValue,
  id,
  children,
  component,
  ...others
}: FieldProps) {
  const { ajv, reduxDb } = useServices();
  const fieldId = useId(id);
  const fieldDetailsRef = useRef(
    createFormFieldRecord(validator, path, name, defaultValue, fieldId)
  );
  const fieldDetails = fieldDetailsRef.current;
  const primaryKey = buildFormFieldRecordPk(fieldDetails);
  const [item, updateItem, updateLocalItem] = useTableRecord<FormFieldRecord>(
    FormFieldTableName,
    primaryKey,
    fieldDetails
  );

  useEffect(() => {
    const record = fieldDetailsRef.current;
    reduxDb.getTable(FormFieldTableName).upsertMany([fieldDetailsRef.current]);

    return () => {
      reduxDb.getTable(FormFieldTableName).removeMany([record]);
    };
  }, [reduxDb]);

  function getType(): "number" | "integer" | "string" | "boolean" {
    if (isBoolean(fieldDetails.jsonSchemaValidator)) {
      return "string";
    }

    return fieldDetails.jsonSchemaValidator.type;
  }

  function cast(e: any): string | number | boolean {
    const type = getType();

    if (type === "number" || type === "integer") {
      return Number(e.target.value);
    } else if (type === "boolean") {
      return Boolean(e.target.checked);
    }

    return String(e.target.value);
  }

  function onChange(e: any) {
    const value = cast(e);
    const validate = ajv.forSchema(fieldDetails.jsonSchemaValidator);
    validate(value);

    if (validate.errors) {
      updateLocalItem({
        ...fieldDetails,
        ...item,
        value,
        errors: validate.errors,
      });
    } else {
      updateItem({
        ...fieldDetails,
        ...item,
        value,
        errors: [],
      });
    }
  }

  if (item === undefined) {
    return null;
  }

  const props = {
    onChange,
    name,
    value: item.value,
    errors: item.errors,
    id: item.fieldId,
    getType,
    ...others,
  };

  if (component !== undefined) {
    const Component = component;
    return <Component {...props} />;
  }

  if (children !== undefined) {
    return children(props);
  }

  return null;
}

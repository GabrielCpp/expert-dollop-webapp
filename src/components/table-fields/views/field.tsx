import { AnySchema } from "ajv";
import { identity, isBoolean } from "lodash";
import { FieldChildren, Translator } from "../form-field-record";
import {
  useField,
  ViewValueFormatter,
  ValueToFormModel,
} from "../hooks/use-field";

export interface FieldProps<T extends FieldChildren> {
  id?: string;
  path: string[];
  name: string;
  defaultValue: unknown;
  validator: AnySchema;
  unmount?: boolean;
  metadata?: unknown;
  t: Translator;
  component?: (props: T) => JSX.Element;
  children?: (props: T) => JSX.Element;
  formatter?: ViewValueFormatter;
  valueToFormModel?: ValueToFormModel;
}

export function Field<T extends FieldChildren>({
  path,
  name,
  defaultValue,
  validator,
  id,
  component,
  children,
  t,
  metadata,
  formatter = identity,
  valueToFormModel = selectValueToFormModel(validator),
  unmount = true,
  ...others
}: FieldProps<T> & Omit<T, keyof FieldChildren>) {
  const { onChange, record } = useField({
    path,
    name,
    defaultValue,
    validator,
    unmount,
    id,
    formatter,
    valueToFormModel,
    metadata,
  });

  if (record === undefined) {
    return null;
  }

  const childProps: unknown = {
    id: record.id,
    name: record.name,
    value: formatter !== identity ? record.viewValue : record.value,
    errors: record.errors,
    onChange,
    t,
    ...others,
  };

  if (component !== undefined) {
    const Component = component;
    return <Component {...(childProps as T)} />;
  }

  if (children !== undefined) {
    return children(childProps as T);
  }

  return null;
}

const toNumber: ValueToFormModel = (_, c) => Number(c);
const toBoolean: ValueToFormModel = (_, c) => Boolean(c);
const toString: ValueToFormModel = (_, c) => String(c);

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

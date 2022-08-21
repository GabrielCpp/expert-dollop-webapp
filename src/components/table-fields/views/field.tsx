import { JSONSchemaType, Schema } from "ajv";
import { identity } from "lodash";
import { FieldChildren, Translator } from "../form-field-record";
import { useField } from "../hooks/use-field";

export interface FieldProps<T extends FieldChildren> {
  id?: string;
  path: string[];
  name: string;
  defaultValue: unknown;
  validator: Schema | JSONSchemaType<any>;
  unmount?: boolean;
  metadata?: unknown;
  t: Translator;
  component?: (props: T) => JSX.Element;
  children?: (props: T) => JSX.Element;
  formatter?: (x: string) => string;
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

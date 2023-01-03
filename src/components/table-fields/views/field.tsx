import { FieldChildren } from "../form-field-record";
import { useField, UseFieldHookParams } from "../hooks/use-field";

export interface FieldProps<T extends FieldChildren> {
  component: (props: T) => JSX.Element;
}

export function Field<T extends FieldChildren>({
  component: Component,
  path,
  name,
  defaultValue,
  validator,
  formatter,
  valueToFormModel,
  id,
  metadata,
  componentId,
  sideEffect,
  t,
  ...props
}: FieldProps<T> & UseFieldHookParams & Omit<T, keyof FieldChildren>) {
  const { record, field } = useField({
    path,
    name,
    defaultValue,
    validator,
    formatter,
    valueToFormModel,
    id,
    metadata,
    componentId,
    sideEffect,
    t,
  });

  if (record === undefined) {
    return null;
  }

  const params: unknown = {
    ...props,
    ...field,
  };

  if (Component !== undefined) {
    return <Component {...(params as T)} />;
  }

  return null;
}

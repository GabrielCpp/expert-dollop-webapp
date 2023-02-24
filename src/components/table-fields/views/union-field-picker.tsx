import { SelectOption } from "@mui/base";
import { useForm, useFormFieldValueRef, useHiddenField } from "../hooks";

interface UnionField {
  kind: string;
}

export interface UnionFieldValueProps<
  K extends keyof Omit<UnionType, "kind">,
  UnionType extends UnionField
> {
  value: NonNullable<UnionType[K]>;
  name: string;
  parentPath: string[];
}

export interface UnionOptionDetails<UnionType extends UnionField>
  extends SelectOption<string> {
  fieldName: keyof Omit<UnionType, "kind">;
  component: <K extends keyof Omit<UnionType, "kind">>(
    p: UnionFieldValueProps<K, UnionType>
  ) => JSX.Element | null;
}

interface UnionFieldPickerProps<UnionType extends UnionField> {
  name: string;
  parentPath: string[];
  options: UnionOptionDetails<UnionType>[];
  value: UnionType;
}

interface StaticUnionFieldProps<
  K extends keyof Omit<UnionType, "kind">,
  UnionType extends UnionField
> {
  name: string;
  parentPath: string[];
  value: UnionType;
  fieldName: K;
  component: (p: UnionFieldValueProps<K, UnionType>) => JSX.Element | null;
}

export function StaticUnionField<
  K extends keyof Omit<UnionType, "kind">,
  UnionType extends UnionField
>({
  name,
  parentPath,
  value,
  fieldName,
  component: Component,
}: StaticUnionFieldProps<K, UnionType>) {
  const { formPath } = useForm({ name, parentPath });

  useHiddenField({
    name: "kind",
    parentPath: formPath,
    value: value.kind,
  });

  if (value[fieldName] === undefined || value[fieldName] === null) {
    return null;
  }

  return (
    <Component
      name={String(fieldName)}
      parentPath={formPath}
      value={value[fieldName] as NonNullable<UnionType[K]>}
    />
  );
}

export function UnionFieldPicker<UnionType extends UnionField>({
  name,
  parentPath,
  value,
  options,
}: UnionFieldPickerProps<UnionType>) {
  const { formPath } = useForm({ name, parentPath });
  const { value: kind, id: configTypeId } = useFormFieldValueRef(value.kind);
  const unionKind = options.find((o) => o.value === kind);

  if (unionKind === undefined) {
    return null;
  }

  const { fieldName, component: Component } = unionKind;

  if (value[fieldName] === undefined || value[fieldName] === null) {
    return null;
  }

  return (
    <Component
      name={String(fieldName)}
      parentPath={formPath}
      value={
        value[fieldName] as NonNullable<
          UnionType[keyof Omit<UnionType, "kind">]
        >
      }
    />
  );
}

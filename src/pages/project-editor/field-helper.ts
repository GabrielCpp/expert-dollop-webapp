import { FieldValueInput, FieldValueType } from "../../generated";

export type WrappedFieldKind = "BoolFieldValue" | "DecimalFieldValue" | "IntFieldValue" | "ReferenceId" | "StringFieldValue" 
const conversionMappings = new Map<WrappedFieldKind, (value: unknown) => FieldValueInput>([
  ["BoolFieldValue", wrapBoolean],
  ["IntFieldValue" , wrapInteger],
  ["DecimalFieldValue", wrapDecimal],
  ["StringFieldValue" , wrapString]
])

function wrapBoolean(value: unknown): FieldValueInput {
  return {
    kind: FieldValueType.BOOL_FIELD_VALUE,
    bool: {
      enabled: value as boolean,
    },
  }
}

function wrapInteger(value: unknown): FieldValueInput {
  return {
    kind: FieldValueType.INT_FIELD_VALUE,
    int: {
      integer: value as number,
    },
  }
}

function wrapDecimal(value: unknown): FieldValueInput {
  return {
    kind: FieldValueType.DECIMAL_FIELD_VALUE,
    decimal: {
      numeric: value as number,
    },
  }
}

function wrapString(value: unknown): FieldValueInput {
  return {
    kind: FieldValueType.STRING_FIELD_VALUE,
    string: {
      text: value as string,
    },
  }
}

export function convertToFieldValue(value: unknown, metadata?: WrappedFieldKind): FieldValueInput {
  if(metadata !== undefined) {
    const cast = conversionMappings.get(metadata)

    if(cast !== undefined) {
      return cast(value)
    }
  }

  throw new Error(`Unkown value type for metadata ${metadata}`);
}

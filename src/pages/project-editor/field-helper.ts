import { isBoolean, isInteger, isNumber, isString } from "lodash";
import { FieldValueInput, FieldValueType } from "../../generated";

export function convertToFieldValue(value: unknown): FieldValueInput {
  if (isBoolean(value)) {
    return {
      kind: FieldValueType.BOOL_FIELD_VALUE,
      bool: {
        enabled: value as boolean,
      },
    };
  }

  if (isInteger(value)) {
    return {
      kind: FieldValueType.INT_FIELD_VALUE,
      int: {
        integer: value as number,
      },
    };
  }

  if (isNumber(value)) {
    return {
      kind: FieldValueType.DECIMAL_FIELD_VALUE,
      decimal: {
        numeric: value as number,
      },
    };
  }

  if (isString(value)) {
    return {
      kind: FieldValueType.STRING_FIELD_VALUE,
      string: {
        text: value as string,
      },
    };
  }

  throw new Error("Unkown value type");
}

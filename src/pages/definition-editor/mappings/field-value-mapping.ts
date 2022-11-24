import {
  BoolFieldValue,
  DecimalFieldValue,
  IntFieldValue,
  ReferenceId,
  StringFieldValue,
  FieldValueInput,
  FieldValueType,
} from "../../../generated";

export const FIELD_VALUE_TO_INPUT: Record<
  | "BoolFieldValue"
  | "DecimalFieldValue"
  | "IntFieldValue"
  | "ReferenceId"
  | "StringFieldValue",
  (
    v:
      | BoolFieldValue
      | DecimalFieldValue
      | IntFieldValue
      | ReferenceId
      | StringFieldValue
  ) => FieldValueInput
> = {
  BoolFieldValue: (v) => ({
    kind: FieldValueType.BOOL_FIELD_VALUE,
    bool: {
      enabled: (v as BoolFieldValue).enabled,
    },
  }),
  DecimalFieldValue: (v) => ({
    kind: FieldValueType.DECIMAL_FIELD_VALUE,
    decimal: {
      numeric: (v as DecimalFieldValue).numeric,
    },
  }),
  IntFieldValue: (v) => ({
    kind: FieldValueType.INT_FIELD_VALUE,
    int: {
      integer: (v as IntFieldValue).integer,
    },
  }),
  ReferenceId: (v) => ({
    kind: FieldValueType.REFERENCE_FIELD_VALUE,
    reference: {
      uuid: (v as ReferenceId).uuid,
    },
  }),
  StringFieldValue: (v) => ({
    kind: FieldValueType.STRING_FIELD_VALUE,
    string: {
      text: (v as StringFieldValue).text,
    },
  }),
};

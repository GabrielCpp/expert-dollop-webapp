import { SelectOption } from "./form-field-record";
import { AnySchema } from "ajv";


export const EMAIL_VALIDATOR = {
  type: "string",
  "format": "email"
};
export const USER_STRING_VALIDATOR = {
  type: "string",
  minLength: 1,
  maxLength: 200
};
export const STRING_VALIDATOR = {
  type: "string",
  minLength: 1,
  pattern: "[^\\s]+",
};

export const ANY_STRING_VALIDATOR = {
  type: "string"
};
export const STRING_OR_NULL_VALIDATOR = {
  type: ["string", "null"]
};
export const BOOLEAN_VALIDATOR = { type: "boolean" };
export const INT_VALIDATOR = { type: "integer" };
export const DECIMAL_VALIDATOR = { type: "number" };

export function makeEnumValidator(options: SelectOption[]): AnySchema {
  return {
    type: ["string", "null"],
    enum: options.filter(o=>o.id !== undefined).map(o => o.id)
  }
}
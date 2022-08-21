

export const EMAIL_VALIDATOR = {
  type: "string",
  "format": "email"
};

export const STRING_VALIDATOR = {
  type: "string",
  minLength: 1,
  pattern: "[^\\s]+",
};
export const BOOLEAN_VALIDATOR = { type: "boolean" };
export const INT_VALIDATOR = { type: "integer" };

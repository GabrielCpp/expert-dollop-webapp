export const NAME_VALIDATOR = {
  type: "string",
  minLength: 1,
  maxLength: 64,
  pattern: "^[a-z_][a-z0-9_]*$",
  errorMessage: {
    pattern: "field_validation.name.pattern",
    minLength: "field_validation.name.length",
    maxLength: "field_validation.name.length",
  },
};

import { SelectOption } from "@mui/base";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { ReactNode } from "react";
import { applyT, FieldChildren } from "../form-field-record";
import { DefaultEmptyId } from "../hooks/use-field";

interface SelectProps extends FieldChildren {
  options: SelectOption<string>[];
  label?: ReactNode;
  title?: ReactNode;
  fallbackSelection?: Omit<SelectOption<string>, "id" | "value">;
}

export function SelectField({
  id,
  value,
  name,
  label,
  errors,
  title,
  fallbackSelection,
  onChange,
  t,
  options,
  formTheme,
}: SelectProps) {
  const isValueInOptions = options.some((o) => o.value === value);

  if (fallbackSelection === undefined && !isValueInOptions) {
    return <></>;
  }

  return (
    <FormControl error={errors.length > 0} fullWidth>
      <InputLabel shrink id={id}>
        {applyT(t, label)}
      </InputLabel>
      <Select
        value={isValueInOptions ? value : DefaultEmptyId}
        onChange={(e) => onChange(e.target.value)}
        label={applyT(t, label)}
        labelId={id}
        id={id}
        size={formTheme.size}
      >
        {fallbackSelection && !isValueInOptions && (
          <MenuItem key={DefaultEmptyId} value={DefaultEmptyId}>
            {fallbackSelection.label}
          </MenuItem>
        )}
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

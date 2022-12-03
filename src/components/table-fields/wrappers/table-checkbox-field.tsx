import { Checkbox, FormControlLabel, Typography, Tooltip } from "@mui/material";
import { ReactNode } from "react";
import { theme } from "../../../theme";
import { FieldChildren } from "../form-field-record";
import { FieldLabel } from "../views";

interface CheckboxFieldProps extends FieldChildren {
  label?: string;
  title?: string;
  endAdornment?: ReactNode;
  checkboxProps?: Parameters<typeof Checkbox>[0];
}

export function checkboxField({
  id,
  value,
  name,
  label,
  errors,
  title,
  endAdornment,
  onChange,
  t,
  checkboxProps,
}: CheckboxFieldProps) {
  return (
    <>
      <FormControlLabel
        control={
          <Checkbox
            id={id}
            name={name}
            checked={Boolean(value)}
            onChange={(e) => onChange(e.target.checked)}
            color="primary"
            {...checkboxProps}
            sx={{ paddingTop: theme.spacing(0.5) }}
          />
        }
        label={
          label && (
            <FieldLabel title={title} label={label} t={t}>
              {endAdornment}
            </FieldLabel>
          )
        }
      />
      {errors?.length > 0 &&
        errors
          ?.filter((e) => e.message !== undefined)
          .map((e, index) => (
            <span key={index}>
              {t(e.message as string)}
              <br />
            </span>
          ))}
    </>
  );
}

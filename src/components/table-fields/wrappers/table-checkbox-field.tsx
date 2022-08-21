import { Checkbox, FormControlLabel, Typography, Tooltip } from "@mui/material";
import { ReactNode } from "react";
import { theme } from "../../../theme";
import { FieldChildren } from "../form-field-record";

interface CheckboxFieldProps extends FieldChildren {
  label: string;
  title?: string;
  endAdornment?: ReactNode;
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
}: CheckboxFieldProps) {
  return (
    <>
      <FormControlLabel
        control={
          <Checkbox
            checked={Boolean(value)}
            onChange={onChange}
            name={name}
            color="primary"
            sx={{ padding: theme.spacing(0.5) }}
          />
        }
        label={
          title !== undefined ? (
            <Tooltip title={t(title)}>
              <Typography>
                {t(label)}
                {endAdornment}
              </Typography>
            </Tooltip>
          ) : (
            <Typography>
              {t(label)}
              {endAdornment}
            </Typography>
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

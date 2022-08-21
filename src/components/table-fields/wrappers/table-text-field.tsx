import { InputAdornment, TextField, Typography, Tooltip } from "@mui/material";
import { ReactNode } from "react";
import { FieldChildren } from "../form-field-record";

export interface TextFieldProps extends FieldChildren {
  label?: string;
  title?: string;
  unit?: string;
  startAdornment?: ReactNode;
}

export function textField({
  id,
  value,
  name,
  label,
  errors,
  title,
  onChange,
  unit,
  startAdornment,
  t,
}: TextFieldProps): JSX.Element {
  return (
    <TextField
      style={{ width: "100%" }}
      InputLabelProps={{ style: { pointerEvents: "auto" }, shrink: true }}
      type="text"
      label={
        title !== undefined ? (
          <Tooltip title={t(title)}>
            <Typography>{t(label)}</Typography>
          </Tooltip>
        ) : (
          t(label)
        )
      }
      id={id}
      value={value}
      onChange={onChange}
      helperText={errors
        ?.filter((e) => e.message !== undefined)
        .map((e, index) => (
          <span key={index}>
            {t(e.message as string)}
            <br />
          </span>
        ))}
      error={errors?.length > 0}
      InputProps={{
        endAdornment: unit && (
          <InputAdornment position="end">{t(unit)}</InputAdornment>
        ),
        startAdornment: startAdornment,
      }}
    />
  );
}

import { InputAdornment, TextField } from "@mui/material";
import { ReactNode } from "react";
import { FieldChildren } from "../form-field-record";
import { FieldLabel } from "../views";

export interface TextFieldProps extends FieldChildren {
  label?: ReactNode;
  title?: string;
  unit?: string;
  startAdornment?: ReactNode;
  textProps?: Parameters<typeof TextField>[0];
}

export function InlineTextField({
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
  textProps,
  formTheme,
}: TextFieldProps): JSX.Element {
  return (
    <TextField
      id={id}
      name={name}
      type="text"
      label={label && <FieldLabel title={title} label={label} t={t} />}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      helperText={errors
        ?.filter((e) => e.message !== undefined)
        .map((e, index) => (
          <span key={index}>
            {t(e.message as string)}
            <br />
          </span>
        ))}
      error={errors?.length > 0}
      size={formTheme.size}
      {...textProps}
      style={{ width: "100%" }}
      InputLabelProps={{ style: { pointerEvents: "auto" }, shrink: true }}
      InputProps={{
        endAdornment: unit && (
          <InputAdornment position="end">{t(unit)}</InputAdornment>
        ),
        startAdornment: startAdornment,
      }}
    />
  );
}

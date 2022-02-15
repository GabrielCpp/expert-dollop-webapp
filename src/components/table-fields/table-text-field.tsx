import { InputAdornment, TextField, Typography, Tooltip } from "@mui/material";
import { Namespace, TFunction } from "react-i18next";
import { FieldChildren } from "./field";

interface TextFieldProps extends FieldChildren {
  t: (key: string) => string;
  label: string;
  title?: string;
  unit?: string;
  translationProvider?: TFunction<Namespace>;
}

export function textField({
  id,
  value,
  name,
  label,
  errors,
  title,
  getType,
  onChange,
  unit,
  t,
}: TextFieldProps) {
  return (
    <TextField
      style={{ width: "100%" }}
      InputLabelProps={{ style: { pointerEvents: "auto" }, shrink: true }}
      type={getType() === "string" ? "text" : "number"}
      label={
        title !== undefined ? (
          <Tooltip title={title}>
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
      }}
    />
  );
}

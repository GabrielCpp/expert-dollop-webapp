import { Checkbox, FormControlLabel, Typography, Tooltip } from "@mui/material";
import { FieldChildren } from "./field";

interface CheckboxFieldProps extends FieldChildren {
  t: (key: string) => string;
  label: string;
  title?: string;
}

export function checkboxField({
  id,
  value,
  name,
  label,
  errors,
  title,
  getType,
  onChange,
  t,
}: CheckboxFieldProps) {
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={Boolean(value)}
          onChange={onChange}
          name={name}
          color="primary"
        />
      }
      label={
        title !== undefined ? (
          <Tooltip title={t(title)}>
            <Typography>{t(label)}</Typography>
          </Tooltip>
        ) : (
          t(label)
        )
      }
    />
  );
}

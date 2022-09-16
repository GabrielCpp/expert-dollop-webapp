import {
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
  Tooltip,
} from "@mui/material";
import { ReactNode } from "react";
import { FieldChildren, SelectOption } from "../form-field-record";

interface RadiodProps extends FieldChildren {
  options: SelectOption[];
  label?: string;
  title?: string;
  startAdornment?: ReactNode;
}

export function radioField({
  id,
  value,
  name,
  label,
  errors,
  title,
  onChange,
  startAdornment,
  t,
  options,
}: RadiodProps) {
  const translatedLabel = t(label);

  return (
    <fieldset>
      {translatedLabel !== "" && (
        <legend>
          {startAdornment}
          <FormLabel>{translatedLabel}</FormLabel>
        </legend>
      )}
      <RadioGroup
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        id={id}
      >
        {options.map((option) => (
          <FormControlLabel
            key={option.id}
            value={option.id}
            control={<Radio />}
            label={
              option.title === undefined ? (
                <Typography>{t(option.label)}</Typography>
              ) : (
                <Tooltip title={t(option.title)}>
                  <Typography>{t(option.label)}</Typography>
                </Tooltip>
              )
            }
          />
        ))}
      </RadioGroup>
    </fieldset>
  );
}

import {
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
  Tooltip,
} from "@mui/material";
import { ReactNode } from "react";
import { FieldChildren } from "../form-field-record";

export interface TableRadioFieldOption {
  id: string;
  label: string;
  helpText?: string;
}

interface RadiodProps extends FieldChildren {
  options: TableRadioFieldOption[];
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
      <RadioGroup name={name} value={value} onChange={onChange} id={id}>
        {options.map((option) => (
          <FormControlLabel
            key={option.id}
            value={option.id}
            control={<Radio />}
            label={
              option.helpText === undefined ? (
                <Typography>{t(option.label)}</Typography>
              ) : (
                <Tooltip title={t(option.helpText)}>
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

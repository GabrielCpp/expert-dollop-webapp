import {
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
  Tooltip,
} from "@mui/material";
import { Namespace, TFunction } from "react-i18next";
import { FieldChildren } from "./field";

export interface TableRadioFieldOption {
  id: string;
  label: string;
  helpText?: string;
}

interface RadiodProps extends FieldChildren {
  t: (key: string) => string;
  label: string;
  options: TableRadioFieldOption[];
  title?: string;
  translationProvider?: TFunction<Namespace>;
}

export function radioField({
  id,
  value,
  name,
  label,
  errors,
  title,
  getType,
  onChange,
  t,
  options,
}: RadiodProps) {
  const translatedLabel = t(label);

  return (
    <fieldset>
      {translatedLabel !== "" && (
        <legend>
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

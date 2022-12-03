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
import { FieldLabel } from "../views";

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
          <FieldLabel
            title={title}
            label={translatedLabel}
            t={t}
            translated={true}
            component={FormLabel}
          />
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
              option.label && (
                <FieldLabel title={option.title} label={option.label} t={t} />
              )
            }
          />
        ))}
      </RadioGroup>
      {errors?.length > 0 &&
        errors
          ?.filter((e) => e.message !== undefined)
          .map((e, index) => (
            <span key={index}>
              {t(e.message as string)}
              <br />
            </span>
          ))}
    </fieldset>
  );
}

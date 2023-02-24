import { FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import { ReactNode } from "react";
import { applyT, FieldChildren } from "../form-field-record";
import { FieldLabel } from "../views";
import { SelectOption } from "@mui/base";

interface RadiodProps extends FieldChildren {
  options: SelectOption<string>[];
  label?: ReactNode;
  title?: ReactNode;
  startAdornment?: ReactNode;
}

export function RadioField({
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
  const translatedLabel = applyT(t, label);

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
            key={option.value}
            value={option.value}
            control={<Radio />}
            label={option.label}
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

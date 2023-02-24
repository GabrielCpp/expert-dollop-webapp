import { FormControlLabel, FormGroup, Switch } from "@mui/material";
import { ReactNode } from "react";
import { FieldChildren } from "../form-field-record";
import { FieldLabel } from "../views";

interface SwitchFieldProps extends FieldChildren {
  label?: ReactNode;
  title?: ReactNode;
  switchProps?: Parameters<typeof Switch>[0];
}

export function switchField({
  id,
  value,
  name,
  label,
  errors,
  title,
  onChange,
  t,
  switchProps,
}: SwitchFieldProps) {
  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Switch
            id={id}
            name={name}
            value={value as boolean}
            onChange={onChange}
            {...switchProps}
          />
        }
        label={label && <FieldLabel title={title} label={label} t={t} />}
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
    </FormGroup>
  );
}

import {
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@material-ui/core";
import React from "react";
import { Namespace, TFunction } from "react-i18next";

import { MouseOverPopover, MouseOverPopoverProps } from "../mouse-over-popover";
import { FieldChildren } from "./field";

export interface TableRadioFieldOption {
  id: string;
  label: string;
  popover?: MouseOverPopoverProps;
}

interface RadiodProps extends FieldChildren {
  t: (key: string) => string;
  label: string;
  options: TableRadioFieldOption[];
  popover?: Omit<MouseOverPopoverProps, "children" | "name">;
  translationProvider?: TFunction<Namespace>;
}

export function radioField({
  id,
  value,
  name,
  label,
  errors,
  popover,
  getType,
  onChange,
  t,
  options,
}: RadiodProps) {
  return (
    <fieldset>
      <legend>
        <FormLabel>{t(label)}</FormLabel>
      </legend>
      <RadioGroup name={name} value={value} onChange={onChange} id={id}>
        {options.map((option) => (
          <FormControlLabel
            key={option.id}
            value={option.id}
            control={<Radio />}
            label={
              option.popover === undefined ? (
                <Typography>{t(option.label)}</Typography>
              ) : (
                <MouseOverPopover {...option.popover} name={`${name}-popover`}>
                  {(props) => (
                    <Typography {...props}>{t(option.label)}</Typography>
                  )}
                </MouseOverPopover>
              )
            }
          />
        ))}
      </RadioGroup>
    </fieldset>
  );
}

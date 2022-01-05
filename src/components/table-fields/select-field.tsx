import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React from "react";
import { Namespace, TFunction } from "react-i18next";

import { MouseOverPopover, MouseOverPopoverProps } from "../mouse-over-popover";
import { FieldChildren } from "./field";

export interface TableSelectFieldOption {
  id: string;
  label: string;
  popover?: MouseOverPopoverProps;
}

interface SelectProps extends FieldChildren {
  t: (key: string) => string;
  label: string;
  options: TableSelectFieldOption[];
  popover?: Omit<MouseOverPopoverProps, "children" | "name">;
  translationProvider?: TFunction<Namespace>;
}

export function selectField({
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
}: SelectProps) {
  return (
    <FormControl>
      <InputLabel shrink>{t(label)}</InputLabel>
      <Select name={name} value={value} onChange={onChange} id={id}>
        {options.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.popover === undefined ? (
              <Typography>{t(option.label)}</Typography>
            ) : (
              <MouseOverPopover {...option.popover} name={`${name}-popover`}>
                {(props) => (
                  <Typography {...props}>{t(option.label)}</Typography>
                )}
              </MouseOverPopover>
            )}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

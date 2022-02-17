import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Tooltip,
} from "@mui/material";
import { Namespace, TFunction } from "react-i18next";
import { FieldChildren } from "./field";

export interface TableSelectFieldOption {
  id: string;
  label: string;
  title?: string;
}

interface SelectProps extends FieldChildren {
  t: (key: string) => string;
  label: string;
  options: TableSelectFieldOption[];
  title?: string;
  translationProvider?: TFunction<Namespace>;
}

export function selectField({
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
}: SelectProps) {
  return (
    <FormControl>
      <InputLabel shrink>{t(label)}</InputLabel>
      <Select name={name} value={value} onChange={onChange} id={id}>
        {options.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.title === undefined ? (
              <Typography>{t(option.label)}</Typography>
            ) : (
              <Tooltip title={t(option.title)}>
                <Typography>{t(option.label)}</Typography>
              </Tooltip>
            )}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

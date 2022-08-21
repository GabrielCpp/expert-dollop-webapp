import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Tooltip,
} from "@mui/material";
import { FieldChildren } from "../form-field-record";

export interface TableSelectFieldOption {
  id: string;
  label: string;
  title?: string;
}

interface SelectProps extends FieldChildren {
  label: string;
  options: TableSelectFieldOption[];
  title?: string;
}

export function selectField({
  id,
  value,
  name,
  label,
  errors,
  title,
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

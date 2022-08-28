import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Tooltip,
} from "@mui/material";
import { FieldChildren, SelectOption } from "../form-field-record";
import { DefaultEmptyId } from "../hooks/use-field";

interface SelectProps extends FieldChildren {
  label: string;
  options: SelectOption[];
  title?: string;
  fallbackSelection?: Omit<SelectOption, "id">;
}

export function selectField({
  id,
  value,
  name,
  label,
  errors,
  title,
  fallbackSelection,
  onChange,
  t,
  options,
}: SelectProps) {
  const isValueInOptions = options.some((o) => o.id === value);

  if (fallbackSelection === undefined && !isValueInOptions) {
    return <></>;
  }

  return (
    <FormControl error={errors.length > 0} fullWidth>
      <InputLabel shrink id={id}>
        {t(label)}
      </InputLabel>
      <Select
        value={isValueInOptions ? value : DefaultEmptyId}
        onChange={onChange}
        label={t(label)}
        labelId={id}
        id={id}
      >
        {fallbackSelection && !isValueInOptions && (
          <MenuItem key={DefaultEmptyId} value={DefaultEmptyId}>
            {fallbackSelection.title === undefined ? (
              <Typography>{t(fallbackSelection.label)}</Typography>
            ) : (
              <Tooltip title={t(fallbackSelection.title)}>
                <Typography>{t(fallbackSelection.label)}</Typography>
              </Tooltip>
            )}
          </MenuItem>
        )}
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

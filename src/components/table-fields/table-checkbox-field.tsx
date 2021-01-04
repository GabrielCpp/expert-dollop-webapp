import React from 'react'
import { useTranslation } from "react-i18next";
import { FormControlLabel, Checkbox } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { MouseOverPopover, MouseOverPopoverProps } from '../mouse-over-popover'
import { useTableRecord } from '../../common/query-hook';

export interface TableCheckboxFieldProps {
    fieldTableName: string;
    name: string;
    label: string;
    popover: Omit<MouseOverPopoverProps, 'children' | 'name'>;
}

export function TableCheckboxField({ fieldTableName, name, label, popover }: TableCheckboxFieldProps) {
    const { t } = useTranslation();
    const [state, setState] = useTableRecord<Record<string, unknown>>(fieldTableName, name)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, id: name, value: Boolean(event.target.checked) });
    };
    
    return (
      <FormControlLabel
        control={
          <Checkbox
            checked={Boolean(state?.value)}
            onChange={handleChange}
            name={name}
            color="primary"
          />
        }
        label={
            <MouseOverPopover {...popover} name={`${name}-popover`}>
                <Typography>{t(label)}</Typography>  
            </MouseOverPopover>
        }
      />
    )
}
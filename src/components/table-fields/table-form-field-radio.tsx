import React from 'react'
import { useTranslation } from "react-i18next";
import { FormControlLabel, FormControl, FormLabel, RadioGroup, Radio } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { MouseOverPopover, MouseOverPopoverProps } from '../mouse-over-popover'
import { useTableRecord } from '../../common/query-hook';

export interface FormFieldRadioOption {
    id: string;
    label: string;
    popover: MouseOverPopoverProps
}

export interface FormFieldRadioProps {
    fieldTableName: string;
    legend: string;
    name: string;
    options: FormFieldRadioOption[];
}

export function FormFieldRadio({ fieldTableName, legend, name, options }: FormFieldRadioProps ) {
    const { t } = useTranslation();
    const [value, setValue] = useTableRecord<Record<string, unknown>>(fieldTableName, name)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue({ id: name, value: (event.target as HTMLInputElement).value });
    };

    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">{t(legend)}</FormLabel>
            <RadioGroup aria-label="gender" name={name} value={value} onChange={handleChange}>
                {options.map(option => (
                    <FormControlLabel value={option.id} control={<Radio />}         label={
                        <MouseOverPopover {...option.popover} name={`${name}-popover`}>
                            <Typography>{t(option.label)}</Typography>    
                        </MouseOverPopover>
                    } />
                ))}                
            </RadioGroup>
        </FormControl>
    )
}
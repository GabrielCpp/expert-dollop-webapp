import { InputAdornment, TextField, Typography } from '@material-ui/core';
import React from 'react';
import { Namespace, TFunction } from 'react-i18next';

import { MouseOverPopover, MouseOverPopoverProps } from '../mouse-over-popover';
import { FieldChildren } from './field';


interface TextFieldProps extends FieldChildren {
    t: (key: string) => string;
    label: string;
    endAdornmentLabel?: string;
    popover?: Omit<MouseOverPopoverProps, 'children' | 'name'>;
    translationProvider?: TFunction<Namespace>;
}

export function textField({ id, value, name, label, errors, endAdornmentLabel, popover, getType, onChange, t }: TextFieldProps) {
    return (
        <TextField 
            InputLabelProps={{ style: { pointerEvents: "auto" }, shrink: true }}
            type={getType() === "string" ? "text" : "number"}  
            label={popover !== undefined ?
            <MouseOverPopover {...popover} name={`${name}-popover`}>
                <Typography>{t(label)}</Typography>   
            </MouseOverPopover> : t(label)   
            }
            id={id} 
            value={value} 
            onChange={onChange} 
            helperText={errors?.filter(e => e.message !== undefined).map((e, index) => (<span key={index}>{t(e.message as string)}<br/></span>))}
            error={errors?.length > 0}
            InputProps={{
                endAdornment: endAdornmentLabel && <InputAdornment position="end">{t(endAdornmentLabel)}</InputAdornment>
            }}
        />
    )
}

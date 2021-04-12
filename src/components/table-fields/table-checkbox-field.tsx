import { Checkbox, FormControlLabel, Typography } from '@material-ui/core';
import React from 'react';

import { MouseOverPopover, MouseOverPopoverProps } from '../mouse-over-popover';
import { FieldChildren } from './field';

interface CheckboxFieldProps extends FieldChildren {
    t: (key: string) => string;
    label: string;
    popover?: Omit<MouseOverPopoverProps, 'children' | 'name'>;
}

export function checkboxField({ id, value, name, label, errors, popover, getType, onChange, t }: CheckboxFieldProps) {
    return (
      <FormControlLabel
        control={
          <Checkbox
            checked={Boolean(value)}
            onChange={onChange}
            name={name}
            color="primary"
          />
        }
        label={
            popover !== undefined ?
            <MouseOverPopover {...popover} name={`${name}-popover`}>
                <Typography>{t(label)}</Typography>  
            </MouseOverPopover> : t(label)
        }
      />
    )
}
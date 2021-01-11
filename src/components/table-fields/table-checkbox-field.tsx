import React from 'react'
import { useTranslation } from "react-i18next";
import { FormControlLabel, Checkbox } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { MouseOverPopover, MouseOverPopoverProps } from '../mouse-over-popover'
import { useTableRecord } from '../../common/query-hook';
import { buildFormFieldRecordPk, FormFieldRecord, FormFieldTableName } from './form-field-record';

export interface TableCheckboxFieldProps {
    fieldDetails: FormFieldRecord;
    label: string;
    popover?: Omit<MouseOverPopoverProps, 'children' | 'name'>;
}

export function TableCheckboxField({ 
    fieldDetails,
    label,
    popover,
}: TableCheckboxFieldProps) {
    const { t } = useTranslation();
    const primaryKey = buildFormFieldRecordPk(fieldDetails)
    const [state, setState] = useTableRecord<Record<string, unknown>>(FormFieldTableName, primaryKey, fieldDetails)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({ ...fieldDetails, ...state, value: Boolean(event.target.checked) });
    };
    
    return (
      <FormControlLabel
        control={
          <Checkbox
            checked={Boolean(state?.value)}
            onChange={handleChange}
            name={fieldDetails.fieldName}
            color="primary"
          />
        }
        label={
            popover !== undefined ?
            <MouseOverPopover {...popover} name={`${fieldDetails.fieldName}-popover`}>
                <Typography>{t(label)}</Typography>  
            </MouseOverPopover> : t(label)
        }
      />
    )
}
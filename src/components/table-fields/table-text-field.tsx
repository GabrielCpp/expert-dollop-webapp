import React from 'react'
import { Namespace, TFunction, useTranslation } from "react-i18next";
import { Typography, TextField, InputAdornment } from '@material-ui/core';
import { useInject } from '../../common/container-context'
import { AJV_CUSTOM_ERROR, AjvFactory } from '../../services'
import { MouseOverPopover, MouseOverPopoverProps } from '../mouse-over-popover'
import { useTableRecord } from '../../common/query-hook';
import { buildFormFieldRecordPk, FormFieldRecord, FormFieldTableName } from './form-field-record';
import { isBoolean } from 'lodash';

export interface TableTextFieldProps {
    fieldDetails: FormFieldRecord
    label: string;
    endAdornmentLabel?: string;
    popover?: Omit<MouseOverPopoverProps, 'children' | 'name'>;
    translationProvider?: TFunction<Namespace>;
}

export function TableTextField({ 
    fieldDetails,
    label, 
    popover, 
    endAdornmentLabel,
    translationProvider,
}: TableTextFieldProps) {
    const { t } = useTranslation();
    const primaryKey = buildFormFieldRecordPk(fieldDetails)
    const [item, updateItem, updateLocalItem] = useTableRecord<FormFieldRecord>(FormFieldTableName, primaryKey, fieldDetails)
    const validate = useInject<AjvFactory>(AJV_CUSTOM_ERROR).forSchema(fieldDetails.jsonSchemaValidator)
    const trans = translationProvider || t

    function getType(): 'number' | 'integer' | 'string' {
        if(isBoolean(fieldDetails.jsonSchemaValidator)) {
            return "string"
        }

        return fieldDetails.jsonSchemaValidator.type;
    }

    function cast(value: string): string | number {
        const type = getType();

        if(type === 'number' || type === 'integer') {
            return Number(value);
        }

        return String(value);
    }

    function onValueChange(e: any) {
        const value = cast(e.target.value);
        validate(value)
    
        if(validate.errors) {            
            updateLocalItem({
                ...fieldDetails,
                ...item,
                value,
                errors: validate.errors
            })
        }
        else {
            updateItem({
                ...fieldDetails,
                ...item,
                value,
                errors: []
            })
        }
    }

    if(item === undefined) {
        return null;
    }

    return (
        <TextField 
            InputLabelProps={{ style: { pointerEvents: "auto" }, shrink: true }}
            type={getType() === "string" ? "text" : "number"}  
            label={popover !== undefined ?
            <MouseOverPopover {...popover} name={`${fieldDetails.fieldName}-popover`}>
                <Typography>{trans(label)}</Typography>   
            </MouseOverPopover> : trans(label)   
            }
            id={fieldDetails.fieldName} value={item.value === undefined  ? fieldDetails.value : item.value} 
            onChange={onValueChange} 
            helperText={item?.errors?.filter(e => e.message !== undefined).map((e, index) => (<span key={index}>{t(e.message as string)}<br/></span>))}
            error={item?.errors?.length > 0}
            InputProps={{
                endAdornment: endAdornmentLabel && <InputAdornment position="end">{t(endAdornmentLabel)}</InputAdornment>
            }}
        />
    )
}

import React from 'react'
import { useTranslation } from "react-i18next";
import { Typography, TextField, InputAdornment } from '@material-ui/core';
import { JSONSchemaType, Schema } from 'ajv'
import { useInject } from '../../common/container-context'
import { AJV_CUSTOM_ERROR, AjvFactory } from '../../services'
import { MouseOverPopover, MouseOverPopoverProps } from '../mouse-over-popover'
import { useRefResult, useTableRecord } from '../../common/query-hook';
import { buildFormFieldPk, createEmptyFormFieldRecord, FormFieldRecord, FormFieldTableName } from './form-field-record';

export const STRING_JSON_VALIDATOR = { "type": "string" }

export interface TableTextFieldProps {
    name: string;
    formId?: string;
    fieldId?: string;
    defaultValue?: string;
    endAdornmentLabel?: string;
    label: string;
    fieldTableName?: string;
    popover?: Omit<MouseOverPopoverProps, 'children' | 'name'>;
    jsonSchemaValidator?: Schema | JSONSchemaType<any>;
    cast?: (p: string) => unknown;
}


export function TableTextField({ 
    name, 
    label, 
    popover, 
    fieldId,
    endAdornmentLabel,
    defaultValue='', 
    jsonSchemaValidator=STRING_JSON_VALIDATOR, 
    cast = String, 
    formId= '', 
    fieldTableName=FormFieldTableName 
}: TableTextFieldProps) {
    const { t } = useTranslation();
    const defaultInstance = useRefResult(createEmptyFormFieldRecord, formId, name, fieldId, defaultValue)
    const primaryKey = buildFormFieldPk(formId, name, defaultInstance.fieldId)
    const [item, updateItem, updateLocalItem] = useTableRecord<FormFieldRecord>(fieldTableName, primaryKey, defaultInstance)
    const validate = useInject<AjvFactory>(AJV_CUSTOM_ERROR).forSchema(jsonSchemaValidator)

    function onValueChange(e: any) {
        validate(e.target.value)
    
        if(validate.errors) {            
            updateLocalItem({
                ...defaultInstance,
                ...item,
                value: e.target.value,
                errors: validate.errors
            })
        }
        else {
            updateItem({
                ...defaultInstance,
                ...item,
                value: cast(e.target.value),
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
            type={cast === Number ? "number" : "text"}  
            label={popover !== undefined ?
            <MouseOverPopover {...popover} name={`${name}-popover`}>
                <Typography>{t(label)}</Typography>   
            </MouseOverPopover> : t(label)   
            }
            id={name} value={item.value === undefined  ? defaultValue : item.value} 
            onChange={onValueChange} 
            helperText={item?.errors?.map(e => e.message)}
            error={item?.errors?.length > 0}
            InputProps={{
                endAdornment: endAdornmentLabel && <InputAdornment position="end">{t(endAdornmentLabel)}</InputAdornment>
            }}
        />
    )
}

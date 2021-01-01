import React, { useRef } from 'react'
import {  useInject } from '../common/container-context'
import { useTranslation } from "react-i18next";
import { FormControlLabel, Checkbox, FormControl, FormLabel, RadioGroup, Radio } from '@material-ui/core';
import { Typography, TextField } from '@material-ui/core';
import { ErrorObject, JSONSchemaType } from 'ajv'
import { AJV_CUSTOM_ERROR, AjvFactory } from '../services'
import { MouseOverPopover, MouseOverPopoverProps } from './mouse-over-popover'
import { useTableRecord } from '../common/query-hook';
import { v4 as uuidv4 } from 'uuid';


export interface FormFieldProps {
    name: string;
    fieldTableName: string;
    label: string;
    popover: Omit<MouseOverPopoverProps, 'children' | 'name'>;
    defaultValue: string;
    jsonSchemaValidator: JSONSchemaType<any, false>;
    cast: (p: string) => unknown;
}

interface FormField {
    id: string;
    value: unknown;
    errors: ErrorObject<string, Record<string, any>, unknown>[]
}

function createEmptyFormField(defaultValue: string) {
    return {
        id: uuidv4(),
        value: defaultValue,
        errors: []
    };
}

function useRefResult<T>(fn: (...p: any[]) => T, ...p: unknown[]): T {
    const value = useRef<T | undefined>(undefined);

    if(value.current === undefined) {
        value.current = fn(...p);
    }

    return value.current
}

export function TextBox({ name, fieldTableName, defaultValue, jsonSchemaValidator, label, popover, cast }: FormFieldProps) {
    const { t } = useTranslation();
    const defaultInstance = useRefResult(createEmptyFormField, defaultValue)
    const [item, updateItem, updateLocalItem] = useTableRecord<FormField>(fieldTableName, name, defaultInstance)
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
            variant="outlined"
            InputLabelProps={{ style: { pointerEvents: "auto" }, shrink: true }}
            type="number"  
            label={
            <MouseOverPopover {...popover} name={`${name}-popover`}>
                {props => (
                    <Typography {...props}>{t(label)}</Typography>                    
                )}  
            </MouseOverPopover>
            }
            id={name} value={item.value === undefined  ? defaultValue : item.value} 
            onChange={onValueChange} 
            helperText={item?.errors?.map(e => e.message)}
            error={item?.errors?.length > 0}
        />
    )
}

export interface FormFieldCheckboxProps {
    fieldTableName: string;
    name: string;
    label: string;
    popover: Omit<MouseOverPopoverProps, 'children' | 'name'>;
}

export function FormFieldCheckbox({ fieldTableName, name, label, popover }: FormFieldCheckboxProps) {
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
                {props => (
                    <Typography {...props}>{t(label)}</Typography>                    
                )}  
            </MouseOverPopover>
        }
      />
    )
}

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
                            {props => (
                                <Typography {...props}>{t(option.label)}</Typography>                    
                            )}  
                        </MouseOverPopover>
                    } />
                ))}                
            </RadioGroup>
        </FormControl>
    )
}

export function FormFieldNativeSelect() {

}

export function FormFieldAutoComplete() {

}









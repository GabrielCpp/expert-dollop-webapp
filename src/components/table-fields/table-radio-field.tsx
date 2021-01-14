import React from 'react'
import { Namespace, TFunction, useTranslation } from "react-i18next";
import { FormControlLabel, FormControl, FormLabel, RadioGroup, Radio } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { MouseOverPopover, MouseOverPopoverProps } from '../mouse-over-popover'
import { useTableRecord } from '../../common/query-hook';
import { FormFieldRecord } from '.';
import { buildFormFieldRecordPk, FormFieldTableName } from './form-field-record';
import { useInject } from '../../common/container-context';
import { AjvFactory, AJV_CUSTOM_ERROR } from '../../services';

export interface TableRadioFieldOption {
    id: string;
    label: string;
    popover?: MouseOverPopoverProps
}

export interface FormFieldRadioProps {
    fieldDetails: FormFieldRecord;
    label: string;
    popover?: Omit<MouseOverPopoverProps, 'children' | 'name'>;
    translationProvider?: TFunction<Namespace>;
    options: TableRadioFieldOption[];
}

export function TableRadioField({ 
    fieldDetails,
    label,
    popover,
    translationProvider,
    options 
}: FormFieldRadioProps ) {
    const { t } = useTranslation();
    const primaryKey = buildFormFieldRecordPk(fieldDetails)
    const [selectedItem, updateSelectedItem, updateLocalSelectedItem] = useTableRecord<Record<string, unknown>>(FormFieldTableName, primaryKey, fieldDetails)
    const validate = useInject<AjvFactory>(AJV_CUSTOM_ERROR).forSchema(fieldDetails.jsonSchemaValidator)
    const trans = translationProvider || t;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        validate(value)
    
        if(validate.errors) {            
            updateLocalSelectedItem({
                ...fieldDetails,
                ...selectedItem,
                value,
                errors: validate.errors
            })
        }
        else {
            updateSelectedItem({
                ...fieldDetails,
                ...selectedItem,
                value,
                errors: []
            })
        }
    };

    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">{trans(label)}</FormLabel>
            <RadioGroup name={fieldDetails.fieldName} value={selectedItem?.value} onChange={handleChange}>
                {options.map(option => (
                    <FormControlLabel 
                        key={option.id}
                        value={option.id} 
                        control={<Radio />}         
                        label={
                            option.popover === undefined ? 
                                <Typography>{t(option.label)}</Typography> : 
                                <MouseOverPopover {...option.popover} name={`${fieldDetails.fieldName}-popover`}>
                                    <Typography>{t(option.label)}</Typography>    
                                </MouseOverPopover>
                        }
                    />
                ))}                
            </RadioGroup>
        </FormControl>
    )
}
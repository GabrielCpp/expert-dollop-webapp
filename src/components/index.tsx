import React, { useMemo } from 'react'
import { useTableItemProvider } from '../redux-db'
import { useInject } from '../container-context'
import { useTranslation } from "react-i18next";
import { ExpandMore as ExpandMoreIcon} from '@material-ui/icons';
import { AccordionDetails, FormControlLabel, Checkbox, FormControl, FormLabel, RadioGroup, Radio } from '@material-ui/core';
import { Accordion, AccordionSummary, Typography, TextField } from '@material-ui/core';
import { ErrorObject, JSONSchemaType } from 'ajv'
import { AJV_CUSTOM_ERROR, AjvFactory } from '../services'
import { MouseOverPopover, MouseOverPopoverProps } from './mouse-over-popover'

export interface FormFieldProps {
    name: string;
    fieldTableName: string;
    errorTableName: string;
    label: string;
    popover: Omit<MouseOverPopoverProps, 'children' | 'name'>;
    defaultValue: string;
    jsonSchemaValidator: JSONSchemaType<any, false>;
    cast: (p: string) => unknown;
}

interface ErrorTable {
    name: string;
    errors: ErrorObject<string, Record<string, any>, unknown>[]
}

export function FormField({ name, fieldTableName, errorTableName, defaultValue, jsonSchemaValidator, label, popover, cast }: FormFieldProps) {
    const { t } = useTranslation();
    const [item, updateItem, updateLocalItem] = useTableItemProvider<Record<string, unknown>>(fieldTableName, name)
    const [fieldError, setErrors] = useTableItemProvider<ErrorTable>(errorTableName, name)
    const validate = useInject<AjvFactory>(AJV_CUSTOM_ERROR).forSchema(jsonSchemaValidator)

    function onValueChange(e: any) {
        validate(e.target.value)
        setErrors({...fieldError, errors: validate.errors || []})
    
        if(validate.errors) {            
            updateLocalItem({
                ...item,
                value: e.target.value
            })
        }
        else {
            updateItem({
                ...item,
                value: cast(e.target.value)
            })   
        }
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
            helperText={fieldError?.errors?.map(e => e.message)}
            error={fieldError?.errors?.length > 0}
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
    const [state, setState] = useTableItemProvider<Record<string, unknown>>(fieldTableName, name)

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
    const [value, setValue] = useTableItemProvider<Record<string, unknown>>(fieldTableName, name)

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

export interface FieldGroup {
    i18DisplayName: string;
    i18nTooltip: string;
    isAccordion: boolean;
    name: string;
    fields: FormFieldProps[]
}

export interface FieldGroupFormProps {
    groups: FieldGroup[]
}

export function FieldGroupForm({ groups }: FieldGroupFormProps) {
    function renderAccordion(group: FieldGroup) {
        return (
            <Accordion key={group.name}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
                <Typography>Accordion 1</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                    sit amet blandit leo lobortis eget.
                </Typography>
                </AccordionDetails>
            </Accordion>
        )
    }
    return (
        <>
        {groups.map(group => group.isAccordion ? renderAccordion(group) : renderAccordion(group))}
        </>
    )
}


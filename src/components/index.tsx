import React, { useRef, useState } from 'react'
import { useContainer, useInject } from '../common/container-context'
import { useTranslation } from "react-i18next";
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';
import { AccordionDetails, FormControlLabel, Checkbox, FormControl, FormLabel, RadioGroup, Radio } from '@material-ui/core';
import { Accordion, AccordionSummary, Typography, TextField } from '@material-ui/core';
import { ErrorObject, JSONSchemaType } from 'ajv'
import { AJV_CUSTOM_ERROR, AjvFactory, ProjectContainerDefinitionService } from '../services'
import { MouseOverPopover, MouseOverPopoverProps } from './mouse-over-popover'
import { useTableQuery, useTableRecord } from '../common/query-hook';
import { v4 as uuidv4 } from 'uuid';
import { interfaces } from 'inversify';
import { ProjectDefinitionService } from '../services/api/project-definition-service';
import { TableRecord } from '../common/redux-db/table-record';
import { Database } from '../common/redux-db/database';
import { noop } from 'lodash';
import { ProjectDefinition } from '../models';
import { ProjectContainerDefinition } from '../models/project-container.definition';
import { concatAll } from '../common/async-cursor';
import { QueryBuilder } from '../common/redux-db/query-builder';

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

interface TableProvider {
    service: interfaces.ServiceIdentifier<unknown>;
    fetch(p: any): Promise<TableRecord[]>

}

function useTableProvider(tableProviders: Record<string, TableProvider>, onSuccess: () => void=noop) {
    const container = useContainer();
    const [isLoading, setIsLoading] = useState(true);
    const [errors, setErrors] = useState<Error[]>([]);
    const isInitialized = useRef(false);

    if(isInitialized.current === false) {
        isInitialized.current = true;

        const tableNames: string[] = []
        const promises: Promise<TableRecord[]>[] = []

        for(const [ tableName, provider ] of Object.entries(tableProviders)) {
            const service = container.get(provider.service)

            tableNames.push(tableName)
            promises.push(provider.fetch(service))            
        }

        const database = container.get(Database);
        Promise.all(promises).then(results => results.forEach(((resultset, index) => {
            const tableName = tableNames[index];
            database.getTable(tableName).upsertMany(resultset)
        }))).then(_ => {
            setIsLoading(false)
            onSuccess()
        }).catch(reason => {
            setErrors([reason as Error])
        })
    }

    return { isLoading, errors }
}

interface ProjectDefinitionEditorProps {
    projectDefinitionId: string
}


const query = QueryBuilder
    .fromTable("project-container-definition-table")
    .binding;



// GET /api/project_definition/<projectDefinitionId>
// GET /api/project_definition_container/<projectDefinitionId>
export function ProjectDefinitionEditor({ projectDefinitionId }: ProjectDefinitionEditorProps) {
    const { isLoading, errors } = useTableProvider({
        "project-definition-table": {
            service: ProjectDefinitionService,
            async fetch(x: ProjectDefinitionService): Promise<ProjectDefinition[]> {
                return [await x.getProjectDefinition(projectDefinitionId)]
            }
        },
        "project-container-definition-table": {
            service: ProjectDefinitionService,
            async fetch(x: ProjectContainerDefinitionService): Promise<ProjectContainerDefinition[]> {
                return await concatAll(x.getProjectContainerDefinitions(projectDefinitionId))
            }
        }
    })

    const results = useTableQuery<ProjectContainerDefinition>(query({
        projectDefinitionId
    }))

    if(isLoading) return (<span>{'Loading..'}</span>)
    if(errors.length > 0) return (<span>{errors}</span>)

    return (
        <ul>
            {results.map(r => (
                <li>
                    {r.id}
                </li>
            ))}
        </ul>
    )
} 
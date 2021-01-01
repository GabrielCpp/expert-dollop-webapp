import React from 'react'
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';
import { Accordion, AccordionSummary, Typography, AccordionDetails } from '@material-ui/core';
import { MouseOverPopoverProps } from '../mouse-over-popover';
import { JSONSchemaType } from 'ajv';

interface FormFieldProps {
    name: string;
    fieldTableName: string;
    label: string;
    popover: Omit<MouseOverPopoverProps, 'children' | 'name'>;
    defaultValue: string;
    jsonSchemaValidator: JSONSchemaType<any, false>;
    cast: (p: string) => unknown;
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

export function FormDefinitionEditor({ groups }: FieldGroupFormProps) {
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

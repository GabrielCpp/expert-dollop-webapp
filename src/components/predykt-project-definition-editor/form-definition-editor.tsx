import React from 'react'
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';
import { Accordion, AccordionSummary, Typography, AccordionDetails } from '@material-ui/core';
import { ProjectContainerDefinitionTree } from '../../models';
import { MouseOverPopover, MouseOverPopoverProps } from '../mouse-over-popover';
import { JSONSchemaType } from 'ajv';


export interface FieldGroupFormProps {
    formNode: ProjectContainerDefinitionTree
}

export function FormDefinitionEditor({ formNode }: FieldGroupFormProps) {
    function renderAccordion(container: ProjectContainerDefinitionTree) {
        return (
            <Accordion key={container.name}>
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

    function renderSection(container: ProjectContainerDefinitionTree) {
        return (
            <fieldset key={container.name}>
                <legend>
                    <MouseOverPopover name={container.name} text={container.name}>
                        <Typography>
                            {container.name}
                        </Typography>
                    </MouseOverPopover>
                </legend>
                {container.children.map(field => (
                    renderField(field)
                ))}
            </fieldset>
        )
    }

    function renderField(field: ProjectContainerDefinitionTree) {
        return (
            <div key={field.name}>
                {field.name}
            </div>
        )
    }

    return (
        <>
        <MouseOverPopover name={formNode.name} text={formNode.name}>
            <Typography>
                {formNode.name}
            </Typography>
        </MouseOverPopover>
        {formNode.children.map(node => Boolean(node.customAttributes["is_collapsible"]) ? renderAccordion(node) : renderSection(node))}
        </>
    )
}

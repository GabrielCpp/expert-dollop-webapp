import React from 'react'
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';
import { Accordion, AccordionSummary, Typography, AccordionDetails, Grid } from '@material-ui/core';
import { ProjectDefinitionNode } from '../../../generated';
import { MouseOverPopover } from '../../mouse-over-popover';
import { createFormFieldRecord, TableCheckboxField, TableRadioField, TableTextField, TableRadioFieldOption } from '../../table-fields';
import { JSONSchemaType } from 'ajv';
import { useDbTranslation } from '../../translation';

interface StaticChoiceOption {
    id: string;
    label: string;
    helpText: string;
}

interface FieldValueConfig {
    validator: JSONSchemaType<any>
    options?: StaticChoiceOption[]
}
interface ContainerValueType {
    isCollapsible: boolean
}

export interface FieldGroupFormProps {
    projectDefinitionId: string;
    formNode: ProjectDefinitionNode | undefined;
}

export function FormDefinitionEditor({ formNode, projectDefinitionId }: FieldGroupFormProps) {
    const { labelTrans, helpTextTrans } = useDbTranslation(projectDefinitionId)

    function renderFormSection(container: ProjectDefinitionNode) {
        const valueType = container.config?.valueType
        const valueTypeConfig = valueType as ContainerValueType | undefined

        if(valueTypeConfig !== undefined && valueTypeConfig.isCollapsible) {
            return renderAccordion(container)
        }

        return renderSection(container)
    }

    function renderAccordion(container: ProjectDefinitionNode) {
        return (
            <Accordion key={container.name}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <MouseOverPopover name={container.name} text={helpTextTrans(container.name)}>
                        <Typography>
                            {labelTrans(container.name)}
                        </Typography>
                    </MouseOverPopover>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container direction="column">
                    {container.children.map(field => (
                        <Grid item key={field.name}>
                        {renderField(field)}
                        </Grid>
                    ))}
                    </Grid>
                </AccordionDetails>
            </Accordion>
        )
    }

    function renderSection(container: ProjectDefinitionNode) {
        return (
            <fieldset key={container.name}>
                <legend>
                    <MouseOverPopover name={container.name} text={helpTextTrans(container.name)}>
                        <Typography>
                            {labelTrans(container.name)}
                        </Typography>
                    </MouseOverPopover>
                </legend>
                <Grid container direction="column">
                {container.children.map(field => (
                    <Grid item key={field.name}>
                    {renderField(field)}
                    </Grid>
                ))}
                </Grid>
            </fieldset>
        )
    }

    function renderField(field: ProjectDefinitionNode) {
        const valueType = field.config?.valueType
        const { text, numeric, enabled, integer } = {
            text: null,
            numeric: null, 
            enabled: null,
            integer: null,
            ...field.defaultValue
        }
        const value = [text, numeric, enabled, integer].find(x => x != null)
        const valueTypeConfig = valueType as FieldValueConfig;
        const fieldDetails = createFormFieldRecord(
            valueTypeConfig.validator,
            field.path,
            field.name,
            value as string | number | boolean,
            field.id
        )

        if(field.valueType === "STRING" || field.valueType === "INT" || field.valueType === "DECIMAL") {
            return <TableTextField fieldDetails={fieldDetails} label={(field.name)} translationProvider={labelTrans} />
        }

        if(field.valueType === "BOOL") {
            return <TableCheckboxField fieldDetails={fieldDetails} label={(field.name)} translationProvider={labelTrans}  />
        }

        if(field.valueType === "STATIC_CHOICE" && valueTypeConfig.options) {
            const options: TableRadioFieldOption[] = valueTypeConfig.options.map(options => ({
                id: options.id,
                label: options.label
            }));
            return <TableRadioField options={options} fieldDetails={fieldDetails} label={(field.name)} translationProvider={labelTrans}></TableRadioField>
        }

        return (
            <div key={field.name}>
                {field.name}
            </div>
        )
    }

    return (
        <Grid item xs={12}>
        {formNode && <MouseOverPopover name={formNode.name} text={helpTextTrans(formNode.name)}>
            <Typography component="h2">
                {labelTrans(formNode.name)}
            </Typography>
        </MouseOverPopover>}
        <form>
            <Grid container direction="column">
                {formNode && formNode.children.map(node => (
                    <Grid item key={node.name} xs={6}>
                    {renderFormSection(node)}
                    </Grid> 
                ))}
            </Grid>        
        </form>
        </Grid>
    )
}

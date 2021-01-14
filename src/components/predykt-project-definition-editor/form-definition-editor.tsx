import React from 'react'
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';
import { Accordion, AccordionSummary, Typography, AccordionDetails, Grid } from '@material-ui/core';
import { ProjectContainerDefinitionTree } from '../../models';
import { MouseOverPopover } from '../mouse-over-popover';
import { getI18nHelpTextKey, getI18nLabelKey, useDbTranslation } from '../../reducers';
import { createFormFieldRecord, TableCheckboxField, TableRadioField, TableTextField, TableRadioFieldOption } from '../table-fields';
import { JSONSchemaType } from 'ajv';

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
    formNode: ProjectContainerDefinitionTree | undefined;
}

export function FormDefinitionEditor({ formNode, projectDefinitionId }: FieldGroupFormProps) {
    const { dbTrans } = useDbTranslation(projectDefinitionId)

    function renderFormSection(container: ProjectContainerDefinitionTree) {
        const valueTypeConfig = container.customAttributes.valueType as ContainerValueType | undefined

        if(valueTypeConfig !== undefined && valueTypeConfig.isCollapsible) {
            return renderAccordion(container)
        }

        return renderSection(container)
    }

    function renderAccordion(container: ProjectContainerDefinitionTree) {
        return (
            <Accordion key={container.name}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <MouseOverPopover name={container.name} text={dbTrans(getI18nHelpTextKey(container.name))}>
                        <Typography>
                            {dbTrans(getI18nLabelKey(container.name))}
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

    function renderSection(container: ProjectContainerDefinitionTree) {
        return (
            <fieldset key={container.name}>
                <legend>
                    <MouseOverPopover name={container.name} text={dbTrans(getI18nHelpTextKey(container.name))}>
                        <Typography>
                            {dbTrans(getI18nLabelKey(container.name))}
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

    function renderField(field: ProjectContainerDefinitionTree) {
        const valueTypeConfig = field.customAttributes.valueType as FieldValueConfig;
        const fieldDetails = createFormFieldRecord(
            valueTypeConfig.validator,
            field.path,
            field.name,
            field.defaultValue["value"] as string | number | boolean,
            field.id
        )

        if(field.valueType === "STRING" || field.valueType === "INT" || field.valueType === "DECIMAL") {
            return <TableTextField fieldDetails={fieldDetails} label={getI18nLabelKey(field.name)} translationProvider={dbTrans} />
        }

        if(field.valueType === "BOOL") {
            return <TableCheckboxField fieldDetails={fieldDetails} label={getI18nLabelKey(field.name)} translationProvider={dbTrans}  />
        }

        if(field.valueType === "STATIC_CHOICE" && valueTypeConfig.options) {
            const options: TableRadioFieldOption[] = valueTypeConfig.options.map(options => ({
                id: options.id,
                label: options.label
            }));
            return <TableRadioField options={options} fieldDetails={fieldDetails} label={getI18nLabelKey(field.name)} translationProvider={dbTrans}></TableRadioField>
        }

        return (
            <div key={field.name}>
                {field.name}
            </div>
        )
    }

    return (
        <Grid item xs={12}>
        {formNode && <MouseOverPopover name={formNode.name} text={dbTrans(getI18nHelpTextKey(formNode.name))}>
            <Typography component="h2">
                {dbTrans(getI18nLabelKey(formNode.name))}
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

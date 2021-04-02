import { Accordion, AccordionDetails, AccordionSummary, Grid, Typography } from '@material-ui/core';
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';
import React from 'react';
import { useParams } from 'react-router-dom';

import {
    CollapsibleContainerFieldConfig,
    DecimalFieldConfig,
    IntFieldConfig,
    ProjectDefinitionNode,
    ProjectDefinitionTreeNode,
    StaticChoiceFieldConfig,
    StringFieldConfig,
    useFindProjectDefinitionFormContentQuery,
} from '../../../generated';
import { MouseOverPopover } from '../../mouse-over-popover';
import {
    createFormFieldRecord,
    TableCheckboxField,
    TableRadioField,
    TableTextField,
} from '../../table-fields';
import { useDbTranslation } from '../../translation';
import { splitPath } from '../helpers';
import { JSONSchemaType } from 'ajv';

interface FormProps {
    node: ProjectDefinitionTreeNode;
}

function getJsonSchema(node: ProjectDefinitionNode): JSONSchemaType<any> {
    if(node.valueType === "STRING" || node.valueType === "INT" || node.valueType === "DECIMAL" || node.valueType === "STATIC_CHOICE") {
        const valueType = node.config?.valueType as IntFieldConfig | DecimalFieldConfig | StringFieldConfig | StaticChoiceFieldConfig
        return JSON.parse(valueType.validator) as JSONSchemaType<any>
    }

    if(node.valueType === "BOOLEAN") {
        return { type: "boolean" }
    }

    throw new Error("Bad config")
}

function getFieldValue(node: ProjectDefinitionNode): string | number | boolean {
    const { text, numeric, enabled, integer } = {
        text: null,
        numeric: null, 
        enabled: null,
        integer: null,
        ...node.defaultValue
    }

    const value = [text, numeric, enabled, integer].find(x => x != null)

    if(value === null || value === undefined) {
        throw new Error("Bad value")
    }

    return value
}

function FormField({ node }: FormProps): JSX.Element {
    const { labelTrans } = useDbTranslation(node.definition.projectDefId)

    if(node.definition.config === null ||  node.definition.config === undefined) {
        throw new Error("Bad config")
    }

    const { valueType } = node.definition.config;
    const value = getFieldValue(node.definition)
    const fieldDetails = createFormFieldRecord(
        getJsonSchema(node.definition),
        node.definition.path,
        node.definition.name,
        value as string | number | boolean,
        node.definition.id
    )

    if(node.definition.valueType === "STRING" || node.definition.valueType === "INT" || node.definition.valueType === "DECIMAL") {
        return <TableTextField fieldDetails={fieldDetails} label={(node.definition.name)} translationProvider={labelTrans} />
    }

    if(node.definition.valueType === "BOOLEAN") {
        return <TableCheckboxField fieldDetails={fieldDetails} label={(node.definition.name)} translationProvider={labelTrans}  />
    }

    if(node.definition.valueType === "STATIC_CHOICE") {
        const choices = valueType as StaticChoiceFieldConfig
        return <TableRadioField options={choices.options} fieldDetails={fieldDetails} label={(node.definition.name)} translationProvider={labelTrans}></TableRadioField>
    }

    return (
        <div key={node.definition.name}>
            {node.definition.name}
        </div>
    )
}


function FormAccordionSection({ node }: FormProps): JSX.Element {
    const { labelTrans, helpTextTrans } = useDbTranslation(node.definition.projectDefId)

    return (
        <Accordion key={node.definition.name}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <MouseOverPopover name={node.definition.name} text={helpTextTrans(node.definition.name)}>
                    <Typography>
                        {labelTrans(node.definition.name)}
                    </Typography>
                </MouseOverPopover>
            </AccordionSummary>
            <AccordionDetails>
                <Grid container direction="column">
                {node.children.map(child => (
                    <Grid item key={child.definition.name}>
                        <FormField node={child} />
                    </Grid>
                ))}
                </Grid>
            </AccordionDetails>
        </Accordion>
    )
}

function FornInlineSection({ node }: FormProps): JSX.Element {
    const { labelTrans, helpTextTrans } = useDbTranslation(node.definition.projectDefId)

    return (
        <fieldset key={node.definition.name}>
            <legend>
                <MouseOverPopover name={node.definition.name} text={helpTextTrans(node.definition.name)}>
                    <Typography>
                        {labelTrans(node.definition.name)}
                    </Typography>
                </MouseOverPopover>
            </legend>
            <Grid container direction="column">
            {node.children.map(child => (
                <Grid item key={child.definition.name}>
                    <FormField node={child} />
                </Grid>
            ))}
            </Grid>
        </fieldset>
    )
}

function FormSection({ node }: FormProps): JSX.Element {
    const valueType = node.definition.config?.valueType as CollapsibleContainerFieldConfig;

    if(valueType !== null && valueType !== undefined && valueType.isCollapsible) {
        return <FormAccordionSection node={node} />
    }

    return <FornInlineSection node={node} />
}

interface FormDefinitionEditorParams extends Record<string, string> {
    projectDefinitionId: string
    selectedPath: string;
}

export function FormDefinitionEditor() {
    const { projectDefinitionId, selectedPath } = useParams<FormDefinitionEditorParams>()
    const { labelTrans, helpTextTrans } = useDbTranslation(projectDefinitionId)
    const [ , , formId ] = splitPath(selectedPath);
    const { loading, data } = useFindProjectDefinitionFormContentQuery({
        variables: {
            id: projectDefinitionId,
            formId
        }
    })

    if(loading) {
        return <span>Loading...</span>
    }
    const formNode = data?.findProjectDefinitionNode
    const formContent = data?.findProjectDefinitionFormContent.roots

    return (
        <Grid item xs={12}>
        {formNode && <MouseOverPopover name={formNode.name} text={helpTextTrans(formNode.name)}>
            <Typography component="h2">
                {labelTrans(formNode.name)}
            </Typography>
        </MouseOverPopover>}
        <form>
            <Grid container direction="column">
                {formContent && formContent.map(node => (
                    <Grid item key={node.definition.name} xs={6}>
                        <FormSection node={node as ProjectDefinitionTreeNode} />
                    </Grid> 
                ))}
            </Grid>        
        </form>
        </Grid>
    )
}

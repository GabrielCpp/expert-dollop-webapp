import { Accordion, AccordionDetails, AccordionSummary, Grid, Typography } from '@material-ui/core';
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';
import React from 'react';
import { useParams } from 'react-router-dom';

import {
    CollapsibleContainerFieldConfig,
    ProjectDefinitionNode,
    ProjectDefinitionTreeNode,
    StaticChoiceFieldConfig,
    useFindProjectDefinitionFormContentQuery,
} from '../../../generated';
import { MouseOverPopover } from '../../mouse-over-popover';
import { Field, radioField, textField } from '../../table-fields';
import { checkboxField } from '../../table-fields/table-checkbox-field';
import { useDbTranslation } from '../../translation';
import { splitPath } from '../helpers';

interface FormProps {
    node: ProjectDefinitionTreeNode;
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

    if(node.definition.config.fieldDetails === null ||  node.definition.config.fieldDetails === undefined) {
        throw new Error("Bad config")
    }

    const { __typename: fieldType } = node.definition.config.fieldDetails;
    const value = getFieldValue(node.definition)
    const validator = JSON.parse(node.definition.config.valueValidator)

    if(fieldType === "StringFieldConfig" || fieldType === "IntFieldConfig" || fieldType === "DecimalFieldConfig") {
        return <Field validator={validator} path={node.definition.path} name={node.definition.name} defaultValue={value} id={node.definition.id} label={(node.definition.name)} t={labelTrans} component={textField} />
    }

    if(fieldType=== "BoolFieldConfig") {
        return <Field validator={validator} path={node.definition.path} name={node.definition.name} defaultValue={value} id={node.definition.id} label={(node.definition.name)} translationProvider={labelTrans}   component={checkboxField} />
    }

    if(fieldType === "StaticChoiceFieldConfig") {
        const choices = node.definition.config.fieldDetails as StaticChoiceFieldConfig
        return <Field options={choices.options} validator={validator} path={node.definition.path} name={node.definition.name} defaultValue={value} id={node.definition.id} label={(node.definition.name)} translationProvider={labelTrans} component={radioField} />
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
    const valueType = node.definition.config.fieldDetails as CollapsibleContainerFieldConfig;

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

import { Button, Grid } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { FieldDetailsType, ProjectDefinitionNodeInput } from '../../../generated';
import { Services } from '../../../hooks';
import { RouteViewCompoenentProps } from '../../../shared/named-routes';
import { useServices } from '../../../shared/service-context';
import {
    BOOLEAN_VALIDATOR,
    checkboxField,
    Field,
    FixedTabDisplay,
    hydrateForm,
    INT_VALIDATOR,
    STRING_VALIDATOR,
    textField,
    useForm,
    validateForm,
} from '../../table-fields';




export interface FieldTranslationProps {
    path: string[]
    name: string
}


export function FieldTranslation({ path, name }: FieldTranslationProps) {
    const { t } = useTranslation()
    const formPath = useForm(name, path)

    return (
        <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="flex-start"
        >
            <Field validator={STRING_VALIDATOR} path={formPath} defaultValue={''} name="label" component={textField} label="label" t={t}/>
            <Field validator={STRING_VALIDATOR} path={formPath} defaultValue={''} name="helpText" component={textField} label="help_text" t={t}/>
        </Grid>
    );
}

interface ConfigFormProps {
    configType: FieldDetailsType
    name: string
    path: string[]
}

function ConfigForm({ name, path, configType }: ConfigFormProps) {
    const { t } = useTranslation()
    const formPath = useForm(name, path)

    if(configType === FieldDetailsType.COLLAPSIBLE_CONTAINER_FIELD_CONFIG) {
        return <Field validator={BOOLEAN_VALIDATOR} defaultValue={true} path={formPath} name="isCollapsible" component={checkboxField} label="is_collapsible" t={t}/>
    }

    return <span></span>
}


export interface AddContainerFormProps extends RouteViewCompoenentProps {
    configType: FieldDetailsType
}

export function AddContainerForm({ navigateBack, configType }: AddContainerFormProps) {
    const { reduxDb, ajv } = useServices<Services>();
    const { t } = useTranslation()
    const path = useForm()


    function onSubmit() {
        if(validateForm(reduxDb, ajv)(path) === false) {
            return;
        }

        const form = hydrateForm<ProjectDefinitionNodeInput>(reduxDb)(path)

        console.log(form)

        if (false) {
        navigateBack()

        }
    }

    return (
        <form>
            <Grid
                container
                direction="column"
                justify="flex-start"
                alignItems="flex-start"
            >
                <Field validator={NAME_VALIDATOR} path={path} defaultValue={''} name="name" component={textField} label="name" t={t}/>
                <Field validator={BOOLEAN_VALIDATOR} path={path} defaultValue={false} name="isCollection" component={checkboxField} label="is_collection" t={t}/>
                <Field validator={BOOLEAN_VALIDATOR} path={path} defaultValue={true} name="instanciateByDefault" component={checkboxField} label="instanciate_by_default" t={t}/>
                <Field validator={INT_VALIDATOR} path={path} defaultValue={0} name="orderIndex" component={textField} label="order_index" t={t}/>
                <FixedTabDisplay path={path} defaultSelectedField={'fr'} tabs={[['fr', 'french'], ['en', 'english']]}>
                    {FieldTranslation}
                </FixedTabDisplay>
                <ConfigForm path={path} name="config" configType={FieldDetailsType.COLLAPSIBLE_CONTAINER_FIELD_CONFIG} />                
                <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-start"
                >
                    <Button onClick={onSubmit}>Add</Button>
                    <Button onClick={navigateBack}>Cancel</Button>
                </Grid>
                
            </Grid>
        </form>
    )
}


export function AddContainerView({ navigateBack }: RouteViewCompoenentProps) {
    return <AddContainerForm navigateBack={navigateBack} configType={FieldDetailsType.COLLAPSIBLE_CONTAINER_FIELD_CONFIG} />
}

const NAME_VALIDATOR = {
    "type": "string",
    "minLength": 1,
    "maxLength": 64,
    "pattern": "^[a-z_][a-z0-9_]*$"
}


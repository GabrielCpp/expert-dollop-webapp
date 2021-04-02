import { Button, Grid } from '@material-ui/core';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import { Services } from '../../../hooks';
import { RouteViewCompoenentProps } from '../../../shared/named-routes';
import { useTableLifetime, useTableQuery } from '../../../shared/redux-db';
import { useServices } from '../../../shared/service-context';
import {
    BOOLEAN_VALIDATOR,
    buildFieldByNameMap,
    createFormFieldRecord,
    deleteFormFieldRecords,
    FixedTabDisplay,
    getField,
    HydratedFormNode,
    INT_VALIDATOR,
    queryDirectChildrenOf,
    STRING_VALIDATOR,
    TableCheckboxField,
    TableTextField,
    upsertFormFieldRecord,
    validateForm,
} from '../../table-fields';


export interface FieldTranslationProps {
    path: string[]
}


export function FieldTranslation({ path }: FieldTranslationProps) {
    const fieldMap = useTableQuery(queryDirectChildrenOf(path), buildFieldByNameMap)

    return (
        <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="flex-start"
        >
            <TableTextField fieldDetails={getField(fieldMap,'label')} label="label"></TableTextField>
            <TableTextField fieldDetails={getField(fieldMap,'helpText')} label="help_text"></TableTextField>
        </Grid>
    );
}



export interface AddContainerFormProps extends RouteViewCompoenentProps {
    empty?: string
}

export function AddContainerForm({ navigateBack }: RouteViewCompoenentProps) {
    const { reduxDb, ajv } = useServices<Services>();
    const [path] = useTableLifetime(createAddContainerForm, ([ id ]: string[]) => {
            deleteFormFieldRecords(reduxDb, id)
    });

    const fieldMap = useTableQuery(queryDirectChildrenOf(path), buildFieldByNameMap)

    function createAddContainerForm(): string[]  {
        const formId = uuidv4();
        const frTabId = uuidv4();
        const enTabId = uuidv4();

        upsertFormFieldRecord(reduxDb, [
            createFormFieldRecord(NAME_VALIDATOR, [formId], 'name', ''),
            createFormFieldRecord(BOOLEAN_VALIDATOR, [formId], 'isCollection', false),
            createFormFieldRecord(BOOLEAN_VALIDATOR, [formId], 'instanciateByDefault', true),
            createFormFieldRecord(INT_VALIDATOR, [formId], 'orderIndex', 0),
            createFormFieldRecord(true, [formId], 'fr', null, frTabId),
            createFormFieldRecord(true, [formId], 'en', null, enTabId),
            createFormFieldRecord(STRING_VALIDATOR, [formId, frTabId], 'label', ''),
            createFormFieldRecord(STRING_VALIDATOR, [formId, frTabId], 'helpText', ''),
            createFormFieldRecord(STRING_VALIDATOR, [formId, enTabId], 'label', ''),
            createFormFieldRecord(STRING_VALIDATOR, [formId, enTabId], 'helpText', ''),
        ]);

        return [formId]
    }

    function onSubmit() {
        if(validateForm(reduxDb, ajv)(path) === false) {
            return;
        }

        navigateBack()
    }
    

    return (
        <form>
            <Grid
                container
                direction="column"
                justify="flex-start"
                alignItems="flex-start"
            >
                <TableTextField fieldDetails={getField(fieldMap, 'name')} label="name"></TableTextField>
                <TableCheckboxField fieldDetails={getField(fieldMap,'isCollection')} label="is_collection" ></TableCheckboxField>
                <TableCheckboxField fieldDetails={getField(fieldMap, 'instanciateByDefault')} label="instanciate_by_default" ></TableCheckboxField>
                <TableTextField fieldDetails={getField(fieldMap, 'orderIndex')} label="order_index" ></TableTextField>
                <FixedTabDisplay path={path} getField={(name) => getField(fieldMap, name)} defaultSelectedField={'fr'}>
                    {() => [
                        { name: 'fr', label: 'french', component: (path, key) => <FieldTranslation key={key} path={path} /> },
                        { name: 'en', label: 'english', component: (path, key) => <FieldTranslation key={key} path={path} /> }
                    ]}
                </FixedTabDisplay>

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


    return <AddContainerForm navigateBack={navigateBack}/>
}

export interface ContainerTranslationViewModel extends HydratedFormNode<null> {
    label: HydratedFormNode<string>;
    helpText: HydratedFormNode<string>;
}

export interface AddContainerViewModel {
    name: HydratedFormNode<string>;
    isCollection: HydratedFormNode<boolean>
    instanciateByDefault: HydratedFormNode<boolean>
    orderIndex: HydratedFormNode<number>;
    fr: ContainerTranslationViewModel;
    en: ContainerTranslationViewModel;
}

const NAME_VALIDATOR = {
    "type": "string",
    "minLength": 1,
    "maxLength": 64,
    "pattern": "^[a-z_][a-z0-9_]*$"
}


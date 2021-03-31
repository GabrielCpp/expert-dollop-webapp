import { Button, Grid, Tab, Tabs } from '@material-ui/core';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';

import { Services } from '../../../hooks';
import { RouteViewCompoenentProps } from '../../../shared/named-routes';
import { createAbortFlowError, ReduxDatabase, useTableQuery } from '../../../shared/redux-db';
import { useServices } from '../../../shared/service-context';
import {
    BOOLEAN_VALIDATOR,
    buildFieldByNameMap,
    createFormFieldRecord,
    FormFieldRecord,
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

export interface TabCollectionItem {
    label: string;
    name: string;
    component: (path: string[], key: string) => React.ReactNode
}

export interface TabTableCollectionProps {
    path: string[];
    getField: (name: string) => FormFieldRecord;
    defaultSelectedField: string;
    children: () => TabCollectionItem[]
}

export function FixedTabDisplay({ path, getField, defaultSelectedField, children }: TabTableCollectionProps) {
    const { t } = useTranslation()
    const [selectedTab, setSelectedTab] = React.useState(defaultSelectedField);
    const [avaiablesComponents] = useState(children)

    const handleChange = (_: React.ChangeEvent<{}>, newValue: string) => {
        setSelectedTab(newValue);
    };

    return (
        <>
            <Tabs value={selectedTab} onChange={handleChange} aria-label="simple tabs example">
                {avaiablesComponents.map(({ name, label }) => (
                    <Tab key={name} label={t(label)} value={name} />
                ))}
            </Tabs>
            {avaiablesComponents.filter(({ name }) => name === selectedTab).map(({ component, name }) => component([ ...path, getField(name).fieldId], name))}
        </>
    )
}

export interface AddContainerFormProps extends RouteViewCompoenentProps {
    path: string[];
    onSubmit: () => void
}

export function AddContainerForm({ navigateBack, path, onSubmit }: AddContainerFormProps) {
    const fieldMap = useTableQuery(queryDirectChildrenOf(path), buildFieldByNameMap)

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
    const { reduxDb, ajv } = useServices<Services>();
    const [path] = useState(createAddContainerForm(reduxDb));

    function onSubmit() {
        if(validateForm(reduxDb, ajv)(path) === false) {
            throw createAbortFlowError();
        }

        navigateBack()
    }

    return <AddContainerForm navigateBack={navigateBack} path={path} onSubmit={onSubmit}/>
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

export const createAddContainerForm = (database: ReduxDatabase) => (): string[] => {
    const formId = uuidv4();
    const frTabId = uuidv4();
    const enTabId = uuidv4();

    upsertFormFieldRecord(database, [
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
import React, { useState } from "react"
import { Button, Grid, Tabs, Tab } from "@material-ui/core"
import { useParams } from "react-router-dom";
import { useNavigate } from "../../common/named-routes";
import { TableCheckboxField, TableTextField, queryDirectChildrenOf, buildFieldByNameMap } from "../table-fields";
import { useDatabase, useTableQuery } from "../../common/query-hook";
import { useTranslation } from 'react-i18next';
import { getField, HydratedFormNode } from '../table-fields/form-field-record';
import { head } from "lodash";
import { v4 as uuidv4 } from 'uuid';
import { createFormFieldRecord, BOOLEAN_VALIDATOR, STRING_VALIDATOR, upsertFormFieldRecord, queryChildrenOf, FormFieldRecord } from "../table-fields";
import { ReduxDatabase } from "../../common/redux-db";


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

export interface AddContainerFormProps {
    path: string[];
    returnViewHandler: () => void;
    onSubmit: () => void
}

export function AddContainerForm({ returnViewHandler, path, onSubmit }: AddContainerFormProps) {
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
                    <Button onClick={returnViewHandler}>Cancel</Button>
                </Grid>
                
            </Grid>
        </form>
    )
}

export interface AddContainerViewProps {
    returnRouteName: string;
    onSubmit: (formId: string) => void;
}

export function AddContainerView({ returnRouteName, onSubmit }: AddContainerViewProps) {
    const params = useParams();
    const database = useDatabase()
    const [path] = useState(createAddContainerForm(database));
    const { navigate } = useNavigate();
    
    return <AddContainerForm path={path} onSubmit={() => onSubmit(head(path) as string)} returnViewHandler={() => navigate(returnRouteName, params)} />
}

export interface ContainerTranslationViewModel extends HydratedFormNode<null> {
    label: HydratedFormNode<string>;
    helpText: HydratedFormNode<string>;
}

export interface AddContainerViewModel {
    name: HydratedFormNode<string>;
    isCollection: HydratedFormNode<boolean>
    instanciateByDefault: HydratedFormNode<boolean>
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
        createFormFieldRecord(true, [formId], 'fr', null, frTabId),
        createFormFieldRecord(true, [formId], 'en', null, enTabId),
        createFormFieldRecord(STRING_VALIDATOR, [formId, frTabId], 'label', ''),
        createFormFieldRecord(STRING_VALIDATOR, [formId, frTabId], 'helpText', ''),
        createFormFieldRecord(STRING_VALIDATOR, [formId, enTabId], 'label', ''),
        createFormFieldRecord(STRING_VALIDATOR, [formId, enTabId], 'helpText', ''),
    ]);

    return [formId]
}
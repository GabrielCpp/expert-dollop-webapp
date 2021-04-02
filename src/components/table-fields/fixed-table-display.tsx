import { Tab, Tabs } from '@material-ui/core';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FormFieldRecord } from './form-field-record';

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
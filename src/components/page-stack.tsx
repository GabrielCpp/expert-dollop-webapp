import { Container } from 'inversify';
import React from 'react';
import { useContainer } from '../common/container-context';
import { useTableRecord } from '../common/query-hook';
import { ReduxDatabase } from '../common/redux-db/database';

export const DEFAULT_VIEW = Symbol.for('default');

export interface PageStackProps {
    children: React.ReactNode;
}

interface PageStackSettingRecord {
    id: string;
    value: symbol;
}

const defaultRecord: PageStackSettingRecord = {
    id: 'page-stack',
    value:  DEFAULT_VIEW,
};

export function PageStack({ children }: PageStackProps) {
    const container = useContainer()
    let [selectedDisplay] = useTableRecord<PageStackSettingRecord>('settings', 'page-stack', defaultRecord)
    
    if(selectedDisplay === undefined) {
        selectedDisplay = defaultRecord;
    }

    const SubView = selectedDisplay.value === DEFAULT_VIEW ? null : container.get<() => JSX.Element>(selectedDisplay.value);

    return (
        <>
        <div style={{ 'display': selectedDisplay.value === DEFAULT_VIEW ? 'block' : 'none' }}>
            {children}
        </div>
        {SubView && <SubView />}
        </>
    );
}

export function setView(viewName: symbol=DEFAULT_VIEW) {
    return (container: Container) => {
        const database = container.get(ReduxDatabase);
        database.getTable('settings').upsertMany([
            {...defaultRecord, value: viewName }
        ])
    }
}
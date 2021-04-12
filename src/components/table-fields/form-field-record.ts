import { ErrorObject, JSONSchemaType, Schema } from 'ajv';
import { head, isEqual, reverse, sortBy, startsWith } from 'lodash';
import { v4 as uuidv4 } from 'uuid';

import { AjvFactory } from '../../hooks';
import {
    ops,
    PrimaryIndex,
    PrimaryKey,
    Query,
    QueryBuilder,
    queryParam,
    recordParam,
    TableRecord,
} from '../../shared/redux-db';
import { ReduxDatabase } from '../../shared/redux-db/database';


export const FormFieldTableName = 'form-field'
export type FormFieldError = ErrorObject<string, Record<string, any>, unknown>
export type FormFieldRecordValue = unknown

export interface FormFieldRecord extends TableRecord {
    fieldPath: string[];
    fieldName: string;
    fieldId: string;
    value: FormFieldRecordValue;
    errors: FormFieldError[]
    jsonSchemaValidator: Schema | JSONSchemaType<any>;
}


export function createFormFieldRecord(
    jsonSchemaValidator: Schema | JSONSchemaType<any>,
    fieldPath: string[],
    fieldName: string,
    value: FormFieldRecordValue,
    fieldId: string=uuidv4(),
    errors: FormFieldError[]=[]
): FormFieldRecord {
    return {
        jsonSchemaValidator,
        fieldPath,
        fieldName,
        fieldId,
        value,
        errors
    };
}

export function queryDirectChildrenOf(path: string[]): Query {
    return QueryBuilder
        .fromTable(FormFieldTableName)
        .where(ops(
            "isEqual", 
            recordParam('fieldPath'), 
            queryParam('path')
        ))
        .bindParameters({
            path
        })
        .query
}

export function queryChildrenOf(path: string[]): Query {
    return QueryBuilder
        .fromTable(FormFieldTableName)
        .where(ops(
            "arrayStartWith", 
            recordParam('fieldPath'), 
            queryParam('path')
        ))
        .bindParameters({
            path
        })
        .query
}

export function upsertFormFieldRecord(database: ReduxDatabase, records: FormFieldRecord[]): void {
    database.getTable(FormFieldTableName).upsertMany(records)
}

export function deleteFormFieldRecords(database: ReduxDatabase, path: string[]): void {
    const table = database.getTable(FormFieldTableName);
    const records = table.where<FormFieldRecord>(record => startsWith(record.fieldPath.join('.'), path.join('.')));
    table.removeMany(records);
}

export function deleteChildFormFieldRecords(database: ReduxDatabase, path: string[]): void {
    const table = database.getTable(FormFieldTableName);
    const records = table.where<FormFieldRecord>(record => {
        const lhs =  record.fieldPath.join('.');
        const rhs = path.join('.');

        return lhs !== rhs && startsWith(lhs, rhs);        
    });

    table.removeMany(records);
}


export const STRING_VALIDATOR = { "type": "string", "minLength": 1, "pattern": "[^\\s]+"}
export const BOOLEAN_VALIDATOR = { "type": "boolean" }
export const INT_VALIDATOR = { "type": "integer" }


export function buildFormFieldRecordPk(record: FormFieldRecord): PrimaryKey {
    return `${record.fieldPath.join('.')}.${record.fieldName}.${record.fieldId}`
}

export function addFormFieldRecordTable(database: ReduxDatabase): void {
    const primaryKey = new PrimaryIndex(buildFormFieldRecordPk as ((r: TableRecord) => PrimaryKey));
    database.addTable(FormFieldTableName, primaryKey)
}

export function buildFieldByNameMap(records: FormFieldRecord[]): Map<string, FormFieldRecord> {
    const fieldMap = new Map<string, FormFieldRecord>();

    for(const record of records) {
        fieldMap.set(record.fieldName, record);
    }

    return fieldMap
}

export interface HydratedFormNode<T extends FormFieldRecordValue> {
    id: string;
    name: string;
    value: T;
}

export const hydrateForm = <T>(database: ReduxDatabase) => (rootPath: string[]): T => {
    const records = database.query<FormFieldRecord>(queryChildrenOf(rootPath))  
    const sortedRecords = reverse(sortBy(records, [ o => o.fieldPath.length, o => o.fieldPath.join('.') ]))
    const treeOfChildren = new Map<string, Record<string, unknown>>()

    for(const record of sortedRecords) {
        const myPath = [...record.fieldPath, record.fieldId].join('.')
        const children = treeOfChildren.get(myPath)

        const parentPath = record.fieldPath.join('.')
        let parentRecord = treeOfChildren.get(parentPath)
        
        if(parentRecord === undefined) {
            parentRecord = {}
            treeOfChildren.set(parentPath, parentRecord)
        }

        if(children === undefined) {
            parentRecord[record.fieldName] = record.value
        }
        else {
            parentRecord[record.fieldName] = children
        }

        treeOfChildren.delete(myPath)
    }

    if(treeOfChildren.size !== 1) {
        throw new Error("Comething went wrong when building form tree")
    }

    return head(Array.from(treeOfChildren.values())) as T
}

export const validateForm = (database: ReduxDatabase, ajvFactory: AjvFactory) => (rootPath: string[]): boolean => {
    const records = database.query<FormFieldRecord>(queryChildrenOf(rootPath))  
    const recordToUpdates: FormFieldRecord[] = []
    let isValidForm = true;

    for(const record of records) {
        const validator = ajvFactory.forSchema(record.jsonSchemaValidator);
        validator(record.value)

        const errors = validator.errors || []

        if(errors.length > 0) {
            isValidForm = false;
        }

        if(!isEqual(record.errors, errors)) {
            recordToUpdates.push({
                ...record,
                errors
            })
        }
    }

    upsertFormFieldRecord(database, recordToUpdates)

    return isValidForm;
}
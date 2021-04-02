import { v4 as uuidv4 } from 'uuid';
import { ErrorObject, JSONSchemaType, Schema } from 'ajv'
import { ops, PrimaryIndex, PrimaryKey, Query, QueryBuilder, queryParam, recordParam, TableRecord } from "../../shared/redux-db";
import { ReduxDatabase } from '../../shared/redux-db/database';
import { AjvFactory } from '../../hooks';
import { head, isEqual } from 'lodash';

export const FormFieldTableName = 'form-field'
export type FormFieldError = ErrorObject<string, Record<string, any>, unknown>
export type FormFieldRecordValue = string | number | boolean | Record<string, unknown> | null

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

export function deleteFormFieldRecords(database: ReduxDatabase, id: string): void {
    const table = database.getTable(FormFieldTableName);
    const records = table.where<FormFieldRecord>(record => head(record.fieldPath) === id);
    table.removeMany(records);
}


export const STRING_VALIDATOR = { "type": "string" }
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

export function getField(fieldMap: Map<string, FormFieldRecord>, name: string) {
    const field = fieldMap.get(name);

    if(field === undefined) {
        throw new Error(`Field ${name} does not exists in map.`)
    }

    return field;
}

export interface HydratedFormNode<T extends FormFieldRecordValue> {
    id: string;
    name: string;
    value: T;
}

export function hydrateForm<T>(records: FormFieldRecord[]): T {
    const root: TableRecord = {}
    const fieldId2Name = new Map<string, string>(records.map(record => [record.fieldId, record.fieldName]))

    for(const record of records) {
        let currentObject = root;

        for(const pathItem of record.fieldPath) {
            const name = fieldId2Name.get(pathItem)

            if(name === undefined) {
                continue
            }

            if(!currentObject.hasOwnProperty(name)) {
                currentObject[name] = {}
            }

            currentObject = currentObject[name] as TableRecord;
        }

        if(!currentObject.hasOwnProperty(record.fieldName)) {
            currentObject[record.fieldName] = {}
        }

        const target = currentObject[record.fieldName] as TableRecord;

        currentObject[record.fieldName] = {
            ...target,
            id: record.fieldId,
            value: record.value,
            name: record.fieldName
        }
    }

    return root as T
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
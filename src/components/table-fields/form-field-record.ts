import { v4 as uuidv4 } from 'uuid';
import { ErrorObject } from 'ajv'
import { PrimaryIndex, PrimaryKey, TableRecord } from "../../common/redux-db";

export const FormFieldTableName = 'form-field'

export interface FormFieldRecord extends TableRecord {
    formId: string;
    fieldName: string;
    fieldId: string;
    value: unknown;
    errors: ErrorObject<string, Record<string, any>, unknown>[]
}

export function createEmptyFormFieldRecord(formId: string, fieldName: string, fieldId?: string, defaultValue?: string) {
    return {
        formId,
        fieldName,
        fieldId: fieldId || uuidv4(),
        value: defaultValue || '',
        errors: []
    };
}

export function buildFormFieldRecordPk(record: FormFieldRecord): PrimaryKey {
    return `${record.formId}.${record.fieldName}.${record.fieldId}`
}

export function buildFormFieldPk(formId: string, name: string, fieldId: string): PrimaryKey {
    return `${formId}.${name}.${fieldId}`
}


export function createPrimaryIndex() {
    return new PrimaryIndex(buildFormFieldRecordPk as ((r: TableRecord) => PrimaryKey))
}
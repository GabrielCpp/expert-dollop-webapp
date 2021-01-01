import Ajv, { JSONSchemaType, ValidateFunction } from 'ajv'
import AjvErrors from 'ajv-errors'

export const AJV_CUSTOM_ERROR = Symbol.for('ajv-with-errors');

export interface AjvFactory {
    forSchema<T>(schema: JSONSchemaType<any>): ValidateFunction<T>
}

export class AjvWithError implements AjvFactory {
    public forSchema<T>(schema: JSONSchemaType<T>) {
        const ajv = new Ajv({allErrors: true});
        const ajvWithCustomErrors = AjvErrors(ajv)
        return ajvWithCustomErrors.compile(schema)
    }
}

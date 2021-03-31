import Ajv, { JSONSchemaType, Schema } from 'ajv'
import AjvErrors from 'ajv-errors'
import { AjvFactory } from '../hooks';


export class AjvWithError implements AjvFactory {
    public forSchema<T>(schema: Schema | JSONSchemaType<T>) {
        const ajv = new Ajv({allErrors: true});
        const ajvWithCustomErrors = AjvErrors(ajv)
        return ajvWithCustomErrors.compile(schema)
    }
}

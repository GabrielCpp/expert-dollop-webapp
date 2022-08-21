import Ajv, { JSONSchemaType, Schema, ValidateFunction } from "ajv";
import AjvErrors from "ajv-errors";
import { AjvFactory } from "../services-def";
import addFormats from "ajv-formats"

export class AjvWithError implements AjvFactory {
  private _ajv = AjvErrors(new Ajv({ allErrors: true }));
  private _cache = new Map<string, any>();

  public constructor() {
    addFormats.default(this._ajv)
  }

  public forSchema<T>(schema: Schema | JSONSchemaType<T>): ValidateFunction<T> {
    const schemaFootprint = JSON.stringify(schema);
    let compiledSchema = this._cache.get(schemaFootprint);

    if (compiledSchema === undefined) {
      compiledSchema = this._ajv.compile(schema);
      this._cache.set(schemaFootprint, compiledSchema);
    }

    return compiledSchema;
  }
}

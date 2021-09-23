import { difference } from "lodash";
import { useEffect, useRef } from "react"
import { useServices } from "../../services-def";
import { createFormFieldRecord, FormFieldTableName, INT_VALIDATOR } from "./form-field-record";

interface FieldArrayProps {
    fields: string[]
    path: string[]
    children: (subpath: string[], id: string) => JSX.Element
}

export function FieldArray({ fields, path, children }: FieldArrayProps) {
    const { reduxDb } = useServices();
    const lastFields = useRef(fields)

    useEffect(() => {
        const records = fields.map((id, index) => createFormFieldRecord(
            INT_VALIDATOR,
            [...path, id],
            "index",
            index,
            id
        ))
            
        reduxDb.getTable(FormFieldTableName).upsertMany(records);

        const toRemoves = difference(lastFields.current, fields).map((id, index) => createFormFieldRecord(
            INT_VALIDATOR,
            [...path, id],
            "index",
            index,
            id
        ))

        reduxDb.getTable(FormFieldTableName).removeMany(toRemoves);
        lastFields.current = fields
    }, [fields, path, reduxDb])

    return (
        <>
        {
            fields.map(id => children([...path, id], id))
        }
        </>
    )
}
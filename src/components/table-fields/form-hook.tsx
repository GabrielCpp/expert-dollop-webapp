import { last } from "lodash";
import { useEffect, useRef } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useId } from "../../shared/redux-db";
import { useServices } from "../../shared/service-context";
import { createFormFieldRecord, deleteFormFieldRecords, upsertFormFieldRecord } from "./form-field-record";


export function useForm(name?: string, parentPath: string[]=[]) {
    const { reduxDb } = useServices();
    const formId = useId(name)
    const formPath = useRef<string[] | undefined>(undefined)

    if(formPath.current === undefined) {
        formPath.current = [...parentPath, formId]
    }

    useEffect(() => {
        formPath.current = [...parentPath, formId]
    }, [formId, formPath, parentPath])

    useEffect(() => {
        const path = formPath.current as string[]

        if(name !== undefined) {
            console.log("New record", path)
            upsertFormFieldRecord(reduxDb, [
                createFormFieldRecord(true, path.slice(0, path.length - 1), name, null, last(path)),
            ]);
        }

        return () => {
            console.log("Cleanup")
            deleteFormFieldRecords(reduxDb, path)
        }
    }, [reduxDb, formPath, name])

    return formPath.current
}

interface FormProps {
    name?: string;
    path?: string[]
    children: (path: string[]) => JSX.Element
}

export function Form({name, path, children}: FormProps): JSX.Element {
    const formPath = useForm(name, path)

    return children(formPath)
}
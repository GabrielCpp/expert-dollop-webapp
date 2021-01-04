import Button from "@material-ui/core/Button"
import React from "react"
import { useContainerDispatch } from '../../common/container-context/index';
import { setView } from "../page-stack";
import { TableCheckboxField, TableTextField } from "../table-fields";

export const ADD_CONTAINER_VIEW = Symbol.for('add-container-view')

/*
    customAttributes: Record<string, unknown>;
    defaultValue: Record<string, unknown>;
    value_type: string;
*/
export function AddContainerView() {
    const dispatch = useContainerDispatch()
/*
    return (
        <form>
            <TableTextField name="name" label="name"></TableTextField>
            <TableCheckboxField name="isCollection" label="is_collection" ></TableCheckboxField>
            <TableCheckboxField name="instanciateByDefault" label="instanciate_by_default" ></TableCheckboxField>
            <TableTextField name="label" label="label"></TableTextField>
            <TableTextField name="help_text" label="help_text"></TableTextField>
            <Button onClick={dispatch(setView())}>Go back</Button>
        </form>
    )*/
}
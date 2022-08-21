import { isEqual } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { useServices } from "../../../services-def";
import { useId } from "../../../shared/redux-db";
import { createFormFieldRecord, FormFieldTableName } from "../form-field-record";

export interface UseFormParams {
  name?: string;
  parentPath?: string | string[]
  id?: string
}

export interface UseFormHook {
  formId: string;
  formPath: string[];
}

export function useForm({name, parentPath, id}: UseFormParams = {}): UseFormHook {
  const formId = useId(id);
  const { reduxDb } = useServices();
  const makeFormRecord = useCallback(() => {
    let parentPathArray: string[] = []

    if(Array.isArray(parentPath)) {
      parentPathArray = parentPath
    }
    else if(parentPath !== undefined) {
      parentPathArray = [parentPath]
    }

    const record = createFormFieldRecord(
      true,
      parentPathArray,
      name || formId,
      null,
      '',
      formId,
      []
    )
    
    return reduxDb
      .getTable(FormFieldTableName)
      .findRecordOrDefault(formId, record);
  }, [reduxDb, parentPath, name, formId])

  const [record, setRecord] = useState(makeFormRecord)
  
  useEffect(() => {
      const newRecord = makeFormRecord()
      reduxDb.getTable(FormFieldTableName).initRecord(record.id, record);

      if(!isEqual(makeFormRecord(), record)) {
        // TODO: Update children
        setRecord(newRecord)
      }

      return () => {
        reduxDb.getTable(FormFieldTableName).removeManyByKey([record.id]);
      };

  }, [reduxDb, makeFormRecord, setRecord, record]);

  return {
    formId,
    formPath: record.fullPath,
  };
}
import { useCallback, useEffect } from "react";
import { useServices } from "../../../services-def";
import { useId, useTableRecord } from "../../../shared/redux-db";
import { createFormFieldRecord, deleteChildFormFieldRecords, FormFieldRecord, FormFieldTableName } from "../form-field-record";

export interface UseFormParams {
  name?: string;
  parentPath?: string | string[]
  id?: string
  metadata?: Record<string, unknown>
  value?: unknown
}

export interface UseFormHook {
  formId: string;
  formPath: string[];
}

export function useForm({name, parentPath, id, metadata, value }: UseFormParams = {}): UseFormHook {
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
      name || '',
      value || null,
      '',
      formId,
      [],
      metadata
    )
    
    return reduxDb
      .getTable(FormFieldTableName)
      .findRecordOrDefault(formId, record);
  }, [reduxDb, parentPath, name, formId, metadata, value])

  const [record] = useTableRecord<FormFieldRecord>(
    FormFieldTableName,
    formId,
    makeFormRecord
  );

  
  useEffect(() => {
      return () => {
        deleteChildFormFieldRecords(reduxDb, [formId])
      };
  }, [reduxDb, formId]);

  return {
    formId,
    formPath: record.fullPath,
  };
}

export function useRootForm(props: UseFormParams = {}): UseFormHook {
  const { reduxDb } = useServices();
  const form = useForm(props)
  useEffect(() => {
    return () => {
      deleteChildFormFieldRecords(reduxDb, [form.formId])
    }
  })

  return form
}
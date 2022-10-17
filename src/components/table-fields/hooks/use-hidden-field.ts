import { identity } from "lodash";
import {
  useCallback,
  useEffect, useState
} from "react";
import { useServices } from "../../../services-def";
import { useId } from "../../../shared/redux-db";
import {
  createFormFieldRecord, FormFieldRecord,
  FormFieldTableName, upsertFormFieldRecord
} from "../form-field-record";

interface UseHiddenFieldResult {
  id: string;
  path: string[];
  record: FormFieldRecord;
  updateRecord: (patchedRecord: Partial<FormFieldRecord>) => void
}

interface UseHiddenFieldParams {
  name: string,
  path: string[],
  value: any,
  id?: string;
  metadata?: Record<string, unknown>
  watch?: string[]
  makeValue?: (...values: unknown[]) => unknown
}

export function useHiddenField({ name, path, value, id, metadata, watch = [], makeValue = identity }: UseHiddenFieldParams): UseHiddenFieldResult {
  const { reduxDb } = useServices();
  const fieldId = useId(id);
  const makeRecord = useCallback(
    () =>
      createFormFieldRecord(
        true,
        path,
        name,
        value,
        String(value),
        fieldId,
        [],
        metadata
      ),
    [path, name, value, fieldId, metadata]
  );
  const [record, setRecord] = useState(makeRecord);
  const updateRecord = useCallback((patchedRecord: Partial<FormFieldRecord>) => {
    setRecord({
      ...record,
      ...patchedRecord
    })
  }, [setRecord, record])

  useEffect(() => {
    const record = makeRecord();

    setRecord(record);
    upsertFormFieldRecord(reduxDb, [record]);

    return () => {
      reduxDb.getTable(FormFieldTableName).removeManyByKey([record.id]);
    };

  }, [reduxDb, makeRecord]);

  return {
    id: fieldId,
    record,
    updateRecord,
    path: record.fullPath,
  };
}
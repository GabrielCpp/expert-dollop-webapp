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

interface UseHiddenField {
  id: string;
  path: string[];
  record: FormFieldRecord;
  updateRecord: (patchedRecord: Partial<FormFieldRecord>) => void
}

export function useHiddenField(
  name: string,
  path: string[],
  value: any,
  metadata?: unknown
): UseHiddenField {
  const { reduxDb } = useServices();
  const id = useId(name);
  const makeRecord = useCallback(
    () =>
      createFormFieldRecord(
        true,
        path,
        name,
        value,
        String(value),
        id,
        [],
        metadata
      ),
    [path, name, value, id, metadata]
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
    id,
    record,
    updateRecord,
    path: record.fullPath,
  };
}
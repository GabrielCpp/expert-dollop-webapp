
import { useEffect, useState } from "react";
import { useServices } from "../../../services-def";
import { TableRecord, useId } from "../../../shared/redux-db";
import { WatchEvent } from "../../../shared/redux-db/table-record-change-emitter";
import {
  FormFieldTableName, getFieldValue
} from "../form-field-record";

interface UseFormFieldValueRef {
  value: unknown;
  id: string;
}

export function useFormFieldValueRef(
  firstValue?: unknown, masterId?: string
): UseFormFieldValueRef {
  const id = useId(masterId);
  const { reduxDb } = useServices();
  const [value, setValue] = useState(() => {
    const previousRecord = reduxDb
      .getTable(FormFieldTableName)
      .findRecord(id)

    if(previousRecord === undefined) {
      return firstValue
    }

    return previousRecord.value
  });

  useEffect(() => {
    const watchEvent: WatchEvent = {
      onUpdate: (before: TableRecord, after: TableRecord) => {
        setValue(after.value);
      },
    };

    const unsubscribe = reduxDb
      .getTable(FormFieldTableName)
      .watchRecord(id, watchEvent);

    return unsubscribe;
  }, [reduxDb, id]);

  return { value, id };
}


export function useFieldWatch(
  id?: string
): { value: unknown } {
  const { reduxDb } = useServices();
  const [value, setValue] = useState(() => id === undefined ? undefined : getFieldValue(reduxDb, id));

  useEffect(() => {
    if(id !== undefined) {
      const watchEvent: WatchEvent = {
        onUpdate: (before: TableRecord, after: TableRecord) => {
          setValue(after.value);
        },
      };

      setValue(getFieldValue(reduxDb, id))
  
      const unsubscribe = reduxDb
        .getTable(FormFieldTableName)
        .watchRecord(id, watchEvent);
        
  
      return unsubscribe;
    }

  }, [reduxDb, id]);


  return { value };
}
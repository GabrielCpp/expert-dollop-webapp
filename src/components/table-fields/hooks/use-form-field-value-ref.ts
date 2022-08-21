
import { useEffect, useState } from "react";
import { useServices } from "../../../services-def";
import { TableRecord, useId } from "../../../shared/redux-db";
import { WatchEvent } from "../../../shared/redux-db/table-record-change-emitter";
import {
  FormFieldTableName
} from "../form-field-record";

interface UseFormFieldValueRef {
  value: unknown;
  id: string;
}

export function useFormFieldValueRef(
  defaultValue: unknown
): UseFormFieldValueRef {
  const id = useId();
  const { reduxDb } = useServices();
  const [value, setValue] = useState(defaultValue);

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
  });

  return { value, id };
}
import { last } from "lodash";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useServices } from "../../services-def";
import { TableRecord, useId } from "../../shared/redux-db";
import { WatchEvent } from "../../shared/redux-db/table-record-change-emitter";
import {
  createFormFieldRecord,
  FormFieldError,
  FormFieldRecord,
  FormFieldTableName,
  queryChildrenOfWithErrors,
  upsertFormFieldRecord,
} from "./form-field-record";

interface UseFormHiddenValue {
  formId: string;
  formPath: string[];
}

export function useFormHiddenValue(
  name: string,
  path: string[],
  value: any
): UseFormHiddenValue {
  const { reduxDb } = useServices();
  const formId = useId(name);
  const formPath = useRef<string[] | undefined>(undefined);

  if (formPath.current === undefined) {
    formPath.current = [...path, formId];
  }

  useLayoutEffect(() => {
    if (name !== undefined) {
      const path = formPath.current as string[];
      const record = createFormFieldRecord(
        true,
        path.slice(0, path.length - 1),
        name,
        value,
        String(value),
        last(path) as string,
        []
      );

      upsertFormFieldRecord(reduxDb, [record]);

      return () => {
        reduxDb.getTable(FormFieldTableName).removeManyByKey([record.id]);
      };
    }
  }, [reduxDb, formPath, name, value]);

  return {
    formId,
    formPath: formPath.current,
  };
}

interface UseFormFieldValueRef {
  value: unknown;
  id: string;
}

export function useFormFieldValueRef(
  name: string,
  path: string[],
  defaultValue: unknown
): UseFormFieldValueRef {
  const { reduxDb } = useServices();
  const id = useId();
  const [value, setValue] = useState(defaultValue);

  function onChange(before: TableRecord, after: TableRecord) {
    setValue(after.value);
  }

  useEffect(() => {
    const record = createFormFieldRecord(
      true,
      path,
      name,
      value,
      String(value),
      id,
      []
    );
    upsertFormFieldRecord(reduxDb, [record]);

    const watchEvent: WatchEvent = {
      onUpdate: onChange,
    };
    const unsubscribe = reduxDb
      .getTable(FormFieldTableName)
      .watchRecord(record.id, watchEvent);

    return unsubscribe;
  });

  return { value, id };
}

export function useFormError(...rootPath: string[]): FormFieldError[][] {
  const { reduxDb } = useServices();
  const [errors, setErrors] = useState<FormFieldError[][]>([]);
  const rootPathMemoised = useRef(rootPath);

  useEffect(() => {
    function onChange(records: FormFieldRecord[]) {
      setErrors(records.map((x) => x.errors));
    }

    const [, unsubcribe] = reduxDb.watchQuery(
      queryChildrenOfWithErrors(rootPathMemoised.current),
      onChange
    );

    return unsubcribe;
  }, [reduxDb, rootPathMemoised]);

  return errors;
}

import { last } from "lodash";
import { useEffect, useState } from "react";
import { useLayoutEffect, useRef } from "react";
import { useServices } from "../../services-def";
import { TableRecord, useId } from "../../shared/redux-db";
import { WatchEvent } from "../../shared/redux-db/table-record-change-emitter";
import {
  buildFormFieldRecordPk,
  createFormFieldRecord,
  FormFieldTableName,
  upsertFormFieldRecord,
} from "./form-field-record";

interface UseFormHook {
  formId: string;
  formPath: string[];
}

export function useForm(name?: string, parentPath: string[] = []): UseFormHook {
  const formId = useId(name);
  const formPath = useRef<string[] | undefined>(undefined);
  const { reduxDb } = useServices();

  if (formPath.current === undefined) {
    formPath.current = [...parentPath, formId];
  }

  useLayoutEffect(() => {
    formPath.current = [...parentPath, formId];
  }, [formId, formPath, parentPath]);

  useLayoutEffect(() => {
    if (name !== undefined) {
      const path = formPath.current as string[];
      const record = createFormFieldRecord(
        true,
        path.slice(0, path.length - 1),
        name,
        null,
        last(path)
      );

      upsertFormFieldRecord(reduxDb, [record]);

      return () => {
        reduxDb.getTable(FormFieldTableName).removeMany([record]);
      };
    }
  }, [reduxDb, formPath, name]);

  return {
    formId,
    formPath: formPath.current,
  };
}

export function useFormHiddenValue(name: string, path: string[], value: any) {
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
        last(path)
      );

      upsertFormFieldRecord(reduxDb, [record]);

      return () => {
        reduxDb.getTable(FormFieldTableName).removeMany([record]);
      };
    }
  }, [reduxDb, formPath, name, value]);

  return {
    formId,
    formPath: formPath.current,
  };
}

export function useFormFieldValueRef(
  name: string,
  path: string[],
  defaultValue: any
) {
  const { reduxDb } = useServices();
  const id = useId();
  const [value, setValue] = useState(defaultValue);

  function onChange(before: TableRecord, after: TableRecord) {
    setValue(after.value);
  }

  useEffect(() => {
    const record = createFormFieldRecord(true, path, name, value, id);
    upsertFormFieldRecord(reduxDb, [record]);

    const watchEvent: WatchEvent = {
      onUpdate: onChange,
    };
    const unsubscribe = reduxDb
      .getTable(FormFieldTableName)
      .watchRecord(buildFormFieldRecordPk(record), watchEvent);

    return unsubscribe;
  });

  return { value, id };
}

interface FormProps {
  name?: string;
  path?: string[];
  children: (props: UseFormHook) => JSX.Element;
}

export function Form({ name, path, children }: FormProps): JSX.Element {
  const props = useForm(name, path);

  return children(props);
}

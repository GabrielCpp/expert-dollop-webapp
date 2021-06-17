import { last } from "lodash";
import { useEffect, useRef } from "react";
import { useId } from "../../shared/redux-db";
import { useServices } from "../../shared/service-context";
import {
  createFormFieldRecord,
  FormFieldTableName,
  upsertFormFieldRecord,
} from "./form-field-record";

interface UseFormHook {
  formId: string;
  formPath: string[];
}

export function useForm(name?: string, parentPath: string[] = []): UseFormHook {
  const { reduxDb } = useServices();
  const formId = useId(name);
  const formPath = useRef<string[] | undefined>(undefined);

  if (formPath.current === undefined) {
    formPath.current = [...parentPath, formId];
  }

  useEffect(() => {
    formPath.current = [...parentPath, formId];
  }, [formId, formPath, parentPath]);

  useEffect(() => {
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

interface FormProps {
  name?: string;
  path?: string[];
  children: (props: UseFormHook) => JSX.Element;
}

export function Form({ name, path, children }: FormProps): JSX.Element {
  const props = useForm(name, path);

  return children(props);
}

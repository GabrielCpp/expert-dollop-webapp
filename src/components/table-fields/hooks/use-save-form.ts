import { FormEvent, useCallback } from "react";
import { Services, useServices } from "../../../services-def";
import { ReduxDatabase } from "../../../shared/redux-db";
import { hydrateForm, validateForm } from "../form-field-record";
import bindDebug from 'debug'

const debug = bindDebug('form')

export function useSaveForm<T>(
  formPath: string | string[],
  save: (data: T) => Promise<void>,
  buildForm: (db: ReduxDatabase, rootPath: string[]) => T = hydrateForm
): (event?: FormEvent<HTMLFormElement>) => Promise<boolean> {
  const { reduxDb, ajv, loader } = useServices();
  const handleSubmit = useCallback(
    async (event?: FormEvent<HTMLFormElement>): Promise<boolean> => {
      event?.preventDefault();
      return await saveForm(
        { reduxDb, ajv, loader },
        formPath,
        save,
        buildForm
      );
    },
    [reduxDb, ajv, loader, formPath, save, buildForm]
  );

  return handleSubmit;
}

export async function saveForm<T>(
  { reduxDb, ajv, loader }: Pick<Services, "reduxDb" | "ajv" | "loader">,
  formPath: string | string[],
  save: (data: T) => Promise<void>,
  buildForm: (db: ReduxDatabase, rootPath: string[]) => T = hydrateForm
): Promise<boolean> {
  const path = Array.isArray(formPath) ? formPath : [formPath];
  const formData = buildForm(reduxDb, path);

  try {
    if (validateForm(reduxDb, ajv)(path) === false) {
      return false;
    }
    debug(formData)
    await save(formData);
  } catch (e) {
    loader.onError(e as Error);
    return false;
  }

  return true;
}

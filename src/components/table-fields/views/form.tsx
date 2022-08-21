import { Button, Grid } from "@mui/material";
import { FormEvent, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useServices } from "../../../services-def";
import { ReduxDatabase } from "../../../shared/redux-db";
import { hydrateForm, validateForm } from "../form-field-record";

interface FormProps<T> {
  formPath: string[];
  label: string;
  save: (data: T) => Promise<void>;
  children: JSX.Element | JSX.Element[];
  parentPath?: string[];
  buildForm?: (db: ReduxDatabase, rootPath: string[]) => T;
  size?: number;
  spacing?: number;
}

export function Form<T>({
  formPath,
  parentPath,
  children,
  save,
  label,
  buildForm = hydrateForm,
  size = 6,
  spacing = 1,
}: FormProps<T>): JSX.Element {
  const { t } = useTranslation();
  const { reduxDb, ajv, loader } = useServices();
  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = buildForm(reduxDb, formPath);

      try {
        if (validateForm(reduxDb, ajv)(formPath) === false) {
          return;
        }

        await save(formData);
      } catch (e) {
        loader.onError(e as Error);
      }
    },
    [reduxDb, ajv, loader, formPath, save, buildForm]
  );

  if (parentPath === undefined) {
    return (
      <form onSubmit={handleSubmit}>
        <Grid container justifyContent="center" alignItems="center">
          <Grid
            item
            container
            direction="column"
            justifyContent="flex-end"
            alignItems="stretch"
            spacing={spacing}
            lg={size}
            xl={size}
            md={size}
          >
            {(Array.isArray(children) ? children : [children]).map((c) => (
              <Grid item lg={size} xl={size} md={size} key={c.key}>
                {c}
              </Grid>
            ))}

            <Grid
              item
              container
              direction="row"
              justifyContent="flex-end"
              alignItems="flex-end"
              lg={size}
              xl={size}
              md={size}
            >
              <Button variant="contained" type="submit">
                {t(label)}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    );
  }

  return <>{children}</>;
}

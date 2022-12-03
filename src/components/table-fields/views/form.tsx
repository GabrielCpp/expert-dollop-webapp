import { Button, Card, CardContent, CardHeader, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import { ReduxDatabase } from "../../../shared/redux-db";
import { hydrateForm } from "../form-field-record";
import { getJsxElements, MixedChildren } from "../helpers";
import { useSaveForm } from "../hooks/use-save-form";

interface FormProps<T> {
  formPath: string | string[];
  label: string;
  save: (data: T) => Promise<void>;
  children: MixedChildren;
  buildForm?: (db: ReduxDatabase, rootPath: string[]) => T;
  title?: JSX.Element;
  card?: boolean;
  size?: number;
  spacing?: number;
}

export function Form<T>({
  formPath,
  children,
  save,
  label,
  title,
  card,
  buildForm = hydrateForm,
  size = 6,
  spacing = 1,
}: FormProps<T>): JSX.Element {
  const { t } = useTranslation();
  const handleSubmit = useSaveForm(formPath, save, buildForm);

  const fields = getJsxElements(children).map((c) => (
    <Grid item key={c.key}>
      {c}
    </Grid>
  ));
  const content = [
    ...fields,
    <Grid
      item
      container
      direction="row"
      justifyContent="flex-end"
      alignItems="flex-end"
      key="buttons"
    >
      <Grid item>
        <Button variant="contained" type="submit">
          {t(label)}
        </Button>
      </Grid>
    </Grid>,
  ];

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
          {card === true && (
            <Card>
              {title && <CardHeader title={title} />}
              <CardContent>
                <Grid container direction="column" spacing={spacing}>
                  {content}
                </Grid>
              </CardContent>
            </Card>
          )}

          {card !== true && (
            <>
              {title && <Grid item>{title}</Grid>}
              {content}
            </>
          )}
        </Grid>
      </Grid>
    </form>
  );
}

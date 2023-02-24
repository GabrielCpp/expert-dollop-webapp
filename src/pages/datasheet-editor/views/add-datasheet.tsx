import { Button, Card, CardContent, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import {
  Field,
  hydrateForm,
  STRING_VALIDATOR,
  InlineTextField,
  useForm,
  validateForm,
} from "../../../components/table-fields";
import {
  CreateDatasheetDocument,
  CreateDatasheetMutation,
  CreateDatasheetMutationVariables,
} from "../../../generated";
import { useServices } from "../../../services-def";

interface AddDatasheetForm {
  name: string;
  projectDefinitionId: string;
}

export function AddDatasheet() {
  const { reduxDb, ajv, apollo } = useServices();
  const { formPath: path } = useForm();
  const { t } = useTranslation();
  const history = useHistory();

  async function onSubmit() {
    if (validateForm(reduxDb, ajv)(path) === false) {
      return;
    }

    const form = hydrateForm<AddDatasheetForm>(reduxDb, path);

    const { data } = await apollo.mutate<
      CreateDatasheetMutation,
      CreateDatasheetMutationVariables
    >({
      mutation: CreateDatasheetDocument,
      variables: {
        datasheet: {
          name: form.name,
          projectDefinitionId: form.projectDefinitionId,
        },
      },
    });

    if (data === undefined) {
      return;
    }
  }

  return (
    <Card>
      <CardContent>
        <form>
          <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <Field
              validator={STRING_VALIDATOR}
              path={path}
              defaultValue={""}
              name="name"
              component={InlineTextField}
              label={"name"}
              t={t}
            />

            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <Button onClick={onSubmit}>Add</Button>
              <Button onClick={history.goBack}>Cancel</Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
}

import { Button, Card, CardContent, Grid } from "@mui/material";
import { head } from "lodash";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { useLoaderEffect } from "../../../components/loading-frame";
import {
  Field,
  hydrateForm,
  selectField,
  STRING_VALIDATOR,
  textField,
  useForm,
  validateForm,
} from "../../../components/table-fields";
import {
  CreateDatasheetDocument,
  CreateDatasheetMutation,
  CreateDatasheetMutationVariables,
  useFindDatasheetDefinitionsQuery,
} from "../../../generated";
import { useServices } from "../../../services-def";

interface AddDatasheetForm {
  name: string;
  datasheetDefinitionId: string;
}

export function AddDatasheet() {
  const { reduxDb, ajv, apollo } = useServices();
  const { formPath: path } = useForm();
  const { t } = useTranslation();
  const history = useHistory();
  const { data, loading, error } = useFindDatasheetDefinitionsQuery({
    variables: {
      query: "",
      first: 500,
    },
  });
  useLoaderEffect(error, loading);

  async function onSubmit() {
    if (validateForm(reduxDb, ajv)(path) === false) {
      return;
    }

    const form = hydrateForm<AddDatasheetForm>(reduxDb)(path);

    const { data } = await apollo.mutate<
      CreateDatasheetMutation,
      CreateDatasheetMutationVariables
    >({
      mutation: CreateDatasheetDocument,
      variables: {
        datasheet: {
          name: form.name,
          datasheetDefinitionId: form.datasheetDefinitionId,
        },
      },
    });

    if (data === undefined) {
      return;
    }
  }
  if (data === undefined) {
    return null;
  }

  const options = data.findDatasheetDefinitions.edges.map((x) => ({
    id: x.node.id,
    label: x.node.name,
  }));

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
              component={textField}
              label="name"
              t={t}
            />
            <Field
              validator={STRING_VALIDATOR}
              path={path}
              defaultValue={head(options)?.id}
              name="datasheetDefinitionId"
              component={selectField}
              label="datasheet_type"
              options={options}
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

import { Button, Card, CardContent, Grid } from "@mui/material";
import { head } from "lodash";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
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
  CreateProjectDocument,
  CreateProjectMutation,
  CreateProjectMutationVariables,
  useFindProjectDefintionsQuery,
} from "../../../generated";
import { useServices } from "../../../services-def";

interface AddProjectViewForm {
  name: string;
  projectDefinitionId: string;
}

export function AddProjectView() {
  const { reduxDb, ajv, apollo } = useServices();
  const { formPath: path } = useForm();
  const { t } = useTranslation();
  const history = useHistory();
  const { data, loading, error } = useFindProjectDefintionsQuery({
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

    const form = hydrateForm<AddProjectViewForm>(reduxDb)(path);

    const { data } = await apollo.mutate<
      CreateProjectMutation,
      CreateProjectMutationVariables
    >({
      mutation: CreateProjectDocument,
      variables: {
        projectDetails: {
          datasheetId: uuidv4(),
          id: uuidv4(),
          name: form.name,
          projectDefinitionId: form.projectDefinitionId,
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

  const options = data.results.edges.map((x) => ({
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
              name="projectDefinitionId"
              component={selectField}
              label="project_type"
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

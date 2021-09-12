import { Button, Card, CardContent } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { head } from "lodash";
import { v4 as uuidv4 } from "uuid";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  useFindProjectDefintionsQuery,
  CreateProjectDocument,
  CreateProjectMutation,
  CreateProjectMutationVariables,
} from "../../../generated";
import { useServices } from "../../../services-def";
import { RouteViewCompoenentProps } from "../../../shared/named-routes";
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

interface AddProjectViewForm {
  name: string;
  projectDefId: string;
}

export function AddProjectView({ returnUrl }: RouteViewCompoenentProps) {
  const { reduxDb, ajv, apollo } = useServices();
  const { formPath: path } = useForm();
  const { t } = useTranslation();
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
          projectDefId: form.projectDefId,
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

  const options = data.findProjectDefintions.edges.map((x) => ({
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
              name="projectDefId"
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
              <Button component={Link} to={returnUrl}>
                Cancel
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
}

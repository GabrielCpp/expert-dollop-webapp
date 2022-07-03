import { Button, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import { useLoaderEffect } from "../../../components/loading-frame";
import {
  Field,
  hydrateForm,
  STRING_VALIDATOR,
  textField,
  useForm,
  useSaveForm,
} from "../../../components/table-fields";
import {
  Exact,
  NewSingleUserOrganisationInput,
  useCreateSingleUserOrganisationMutation,
} from "../../../generated";
import { useServices } from "../../../services-def";
import { ReduxDatabase } from "../../../shared/redux-db";
import { PROJECT_INDEX } from "../../project-editor/routes";

function buildForm(
  reduxDb: ReduxDatabase,
  formPath: string[]
): Exact<{ singleUserOrganisation: NewSingleUserOrganisationInput }> {
  const singleUserOrganisation =
    hydrateForm<NewSingleUserOrganisationInput>(reduxDb)(formPath);
  return { singleUserOrganisation };
}

interface RegistrationProps {
  completeAction?: () => Promise<unknown>;
}

export function Registration({
  completeAction,
}: RegistrationProps): JSX.Element {
  const { t } = useTranslation();
  const { routes, loader } = useServices();
  const history = useHistory();
  const { formPath } = useForm("registration");
  const [createUser, { loading, error }] =
    useCreateSingleUserOrganisationMutation({
      onCompleted: async () => {
        if (completeAction) {
          await loader.waitOnPromise(completeAction());
        }

        history.push(routes.render(PROJECT_INDEX));
      },
    });
  const { save } = useSaveForm(createUser, buildForm, formPath);
  useLoaderEffect(error, loading);

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid
        item
        container
        direction="column"
        justifyContent="flex-end"
        alignItems="stretch"
        spacing={2}
        lg={6}
        xl={4}
        md={6}
      >
        <Grid item lg={6} xl={6} md={6}>
          <fieldset>
            <legend>Organisation</legend>
            <Field
              validator={STRING_VALIDATOR}
              path={formPath}
              defaultValue={""}
              name="organisationName"
              component={textField}
              label="form.name"
              t={t}
            />
            <Field
              validator={STRING_VALIDATOR}
              path={formPath}
              defaultValue={""}
              name="email"
              component={textField}
              label="form.email"
              t={t}
            />
          </fieldset>
        </Grid>
        <Grid
          item
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="flex-end"
          lg={6}
          xl={6}
          md={6}
        >
          <Button variant="contained" onClick={save}>
            Submit
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

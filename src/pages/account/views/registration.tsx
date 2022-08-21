import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { useLoaderEffect } from "../../../components/loading-frame";
import {
  EMAIL_VALIDATOR,
  Field,
  Form,
  STRING_VALIDATOR,
  textField,
  useForm,
} from "../../../components/table-fields";
import {
  NewSingleUserOrganizationInput,
  useCreateSingleUserOrganizationMutation,
} from "../../../generated";
import { useServices } from "../../../services-def";
import { PROJECT_INDEX } from "../../project-editor/routes";

interface RegistrationProps {
  completeAction?: () => Promise<unknown>;
}

export function Registration({
  completeAction,
}: RegistrationProps): JSX.Element {
  const { t } = useTranslation();
  const { routes, loader } = useServices();
  const history = useHistory();
  const { formPath } = useForm({ name: "registration" });
  const [createUser, { loading, error }] =
    useCreateSingleUserOrganizationMutation({
      onCompleted: async () => {
        if (completeAction) {
          await loader.waitOnPromise(completeAction());
        }

        history.push(routes.render(PROJECT_INDEX));
      },
    });

  useLoaderEffect(error, loading);

  async function save(data: NewSingleUserOrganizationInput) {
    await createUser({
      variables: {
        singleUserOrganization: data,
      },
    });
  }

  return (
    <Form save={save} formPath={formPath} label="shared.buttons.save" size={6}>
      <fieldset>
        <legend>{t("account.registration.company_fieldset")}</legend>
        <Grid container spacing={1} direction="column">
          <Grid item>
            <Field
              validator={STRING_VALIDATOR}
              path={formPath}
              defaultValue={""}
              name="organizationName"
              component={textField}
              label="account.registration.company_name"
              t={t}
            />
          </Grid>
          <Grid item>
            <Field
              validator={EMAIL_VALIDATOR}
              path={formPath}
              defaultValue={""}
              name="email"
              label="account.registration.company_email"
              t={t}
              component={textField}
            />
          </Grid>
        </Grid>
      </fieldset>
    </Form>
  );
}

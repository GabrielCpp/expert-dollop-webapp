import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useLoaderEffect } from "../../../components/loading-frame";
import {
  ALERT_NOTIFICATION,
  useNavigateTransition,
} from "../../../components/snackbar-display";
import {
  Form,
  useRootForm,
  Field,
  textField,
  STRING_VALIDATOR,
} from "../../../components/table-fields";
import {
  DefinitionInput,
  useAddProjectDefinitionMutation,
} from "../../../generated";

export function CreateDefinition() {
  const { t } = useTranslation();
  const { formPath } = useRootForm();
  const { navigateBack, catchError } = useNavigateTransition({
    feed: ALERT_NOTIFICATION,
  });

  const [addProjectDefinition, creation] = useAddProjectDefinitionMutation({
    onCompleted: (x) => navigateBack(),
    onError: catchError,
  });
  useLoaderEffect(creation.error, creation.loading);

  const save = async (data: DefinitionInput) => {
    await addProjectDefinition({
      variables: {
        definitionInput: data,
      },
    });
  };

  return (
    <Form
      formPath={formPath}
      label="shared.buttons.create"
      title={
        <Typography variant="h3">
          {t("definition_editor.create_definiton.header")}
        </Typography>
      }
      save={save}
    >
      <Field
        component={textField}
        defaultValue={""}
        key="name"
        name="name"
        label={t("definition_editor.create_definiton.name")}
        path={formPath}
        t={t}
        validator={STRING_VALIDATOR}
      ></Field>
    </Form>
  );
}

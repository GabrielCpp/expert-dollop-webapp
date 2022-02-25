import { Button, Grid, Tooltip, Typography } from "@mui/material";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLoaderEffect } from "../../../components/loading-frame";
import {
  AlertContainer,
  scrollTop,
  useNotification,
} from "../../../components/snackbar-display";
import {
  buildFormMapById,
  useSaveForm,
} from "../../../components/table-fields";
import { useFormError } from "../../../components/table-fields/form-hook";
import { useDbTranslation } from "../../../components/translation";
import {
  FieldUpdateInput,
  useFindProjectFormContentQuery,
  useUpdateFieldsMutation,
} from "../../../generated";
import { ReduxDatabase, useId } from "../../../shared/redux-db";
import { FormSection } from "../components/form-section";
import { convertToFieldValue } from "../field-helper";

const buildForm =
  (projectId: string) => (reduxDb: ReduxDatabase, formPath: string[]) => {
    const fields = buildFormMapById(reduxDb, formPath);
    const updates: FieldUpdateInput[] = [];

    for (const [nodeId, rawValue] of fields.entries()) {
      updates.push({
        nodeId,
        value: convertToFieldValue(rawValue),
      });
    }

    return {
      projectId,
      updates: updates,
    };
  };

interface FormEditorProps {
  rootSectionId: string;
  formId: string;
  projectId: string;
}

export function FormEditor({
  projectId,
  rootSectionId,
  formId,
}: FormEditorProps) {
  const snackbarId = useId();
  const formErrors = useFormError(rootSectionId);
  const { dbTrans } = useDbTranslation(projectId);
  const { t } = useTranslation();
  const { success, catchError, clear } = useNotification(snackbarId);
  const { loading, data, error, refetch } = useFindProjectFormContentQuery({
    variables: {
      projectId,
      formId,
    },
  });

  const [
    updateFields,
    { loading: updateFieldLoading, error: updateFieldError },
  ] = useUpdateFieldsMutation({
    onCompleted: () => {
      success("form.saved");
      scrollTop();
    },
    onError: catchError,
  });

  const { save } = useSaveForm(updateFields, buildForm(projectId), [
    rootSectionId,
  ]);

  useEffect(clear, [clear, formId]);
  useLoaderEffect(error || updateFieldError, loading, updateFieldLoading);

  if (data === undefined) {
    return null;
  }

  const formContent = data.findProjectFormContent.roots;
  const formDefinition = data.findProjectNodeMetaDefinition.definition;

  return (
    <form>
      <Tooltip title={dbTrans(formDefinition.config.translations.helpTextName)}>
        <Typography variant="h4">
          {dbTrans(formDefinition.config.translations.label)}
        </Typography>
      </Tooltip>
      <AlertContainer id={snackbarId}></AlertContainer>
      <Grid container direction="column" spacing={1}>
        {formContent.map((node) => (
          <Grid item key={node.definition.name}>
            <FormSection
              projectId={projectId}
              parentNodeId={formId}
              node={node}
              snackbarId={snackbarId}
              refetch={refetch}
            />
          </Grid>
        ))}
        <Grid container item alignItems="flex-end">
          <Button
            variant="contained"
            color="primary"
            disabled={formErrors.length > 0}
            onClick={save}
          >
            {t("button.save")}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

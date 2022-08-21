import { Tooltip, Typography } from "@mui/material";
import { useEffect } from "react";
import { useLoaderEffect } from "../../../components/loading-frame";
import {
  scrollTop,
  useNotification,
} from "../../../components/snackbar-display";
import {
  buildFormMapById,
  Form,
  FormFieldRecord,
  useForm,
} from "../../../components/table-fields";
import { useDbTranslation } from "../../../components/translation";
import {
  FieldUpdateInput,
  useFindProjectFormContentQuery,
  useUpdateFieldsMutation,
} from "../../../generated";
import { FormSection } from "../components/form-section";
import { convertToFieldValue, WrappedFieldKind } from "../field-helper";

interface FormEditorProps {
  rootSectionId: string;
  formId: string;
  projectId: string;
  snackbarId: string;
}

export function FormEditor({
  projectId,
  rootSectionId,
  formId,
  snackbarId,
}: FormEditorProps) {
  const { dbTrans } = useDbTranslation(projectId);
  const { success, catchError, clear } = useNotification(snackbarId);
  const { loading, data, error, refetch } = useFindProjectFormContentQuery({
    defaultOptions: {
      fetchPolicy: "cache-and-network",
      errorPolicy: "ignore",
    },
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
      success("shared.forms.saved");
      scrollTop();
    },
    onError: catchError,
  });

  const { formPath } = useForm({ id: rootSectionId });
  const save = async (fields: Map<string, FormFieldRecord>) => {
    const updates: FieldUpdateInput[] = [];

    for (const [nodeId, record] of fields.entries()) {
      updates.push({
        nodeId,
        value: convertToFieldValue(
          record.value,
          record.metadata as WrappedFieldKind
        ),
      });
    }

    await updateFields({
      variables: {
        projectId,
        updates: updates,
      },
    });
  };

  useEffect(clear, [clear, formId]);
  useLoaderEffect(error || updateFieldError, loading, updateFieldLoading);

  if (data === undefined) {
    return null;
  }

  const formContent = data.findProjectFormContent.roots;
  const formDefinition = data.findProjectNodeMetaDefinition.definition;
  const content = [
    <Tooltip
      key={formDefinition.id}
      title={dbTrans(formDefinition.config.translations.helpTextName)}
    >
      <Typography variant="h4">
        {dbTrans(formDefinition.config.translations.label)}
      </Typography>
    </Tooltip>,
    ...formContent.map((node) => (
      <FormSection
        key={node.definition.name}
        projectId={projectId}
        parentNodeId={formId}
        node={node}
        snackbarId={snackbarId}
        refetch={refetch}
      />
    )),
  ];

  return (
    <Form
      formPath={formPath}
      save={save}
      buildForm={buildFormMapById}
      label="shared.buttons.save"
      size={12}
      spacing={0.5}
    >
      {content}
    </Form>
  );
}

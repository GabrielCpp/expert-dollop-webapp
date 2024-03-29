import { Tooltip, Typography } from "@mui/material";
import { useEffect } from "react";
import {
  RefectGroup,
  useLoaderEffect,
  useSharedRefetch,
} from "../../../components/loading-frame";
import {
  ALERT_NOTIFICATION,
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
  refectGroup: RefectGroup;
}

export function FormEditor({
  projectId,
  rootSectionId,
  formId,
  refectGroup,
}: FormEditorProps) {
  const { dbTrans } = useDbTranslation(projectId);
  const { success, catchError, clear } = useNotification(ALERT_NOTIFICATION);
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

  useSharedRefetch(refectGroup, refetch);

  const { formPath } = useForm({ id: rootSectionId });
  const save = async (fields: Map<string, FormFieldRecord>) => {
    const updates: FieldUpdateInput[] = [];

    for (const [nodeId, record] of fields.entries()) {
      updates.push({
        nodeId,
        value: convertToFieldValue(
          record.value,
          record.metadata.typename as WrappedFieldKind
        ),
      });
    }

    await updateFields({
      variables: {
        projectId,
        updates: updates,
      },
    });
    await refectGroup.refetchAll();
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
      title={dbTrans(formDefinition.translations.helpTextName)}
    >
      <Typography variant="h4">
        {dbTrans(formDefinition.translations.label)}
      </Typography>
    </Tooltip>,
    ...formContent.map((node) => (
      <FormSection
        key={node.definition.name}
        projectId={projectId}
        parentNodeId={formId}
        node={node}
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

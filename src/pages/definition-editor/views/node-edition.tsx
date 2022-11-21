import { useParams } from "react-router-dom";
import { useLoaderEffect } from "../../../components/loading-frame";
import {
  FieldDetailsUnion,
  ProjectDefinitionNodeCreationInput,
  useFindProjectDefinitionNodeQuery,
  useUpdateProjectDefinitionNodeMutation,
} from "../../../generated";
import { splitPath } from "../../project-editor/routes";
import { levelMapping } from "../form-definitions";
import { NodeForm } from "../forms/node-form";
import { mapFieldDetailsToUnion } from "../mappings/config-mapping";

export interface EditContainerViewProps {
  completeAction?: (() => Promise<unknown>) | undefined;
}

interface EditContainerFormParams {
  projectDefinitionId: string;
  selectedPath: string;
  nodeId: string;
}

export function EditContainerView({ completeAction }: EditContainerViewProps) {
  const { projectDefinitionId, selectedPath, nodeId } =
    useParams<EditContainerFormParams>();
  const [updateNode] = useUpdateProjectDefinitionNodeMutation();
  const { data, loading, error } = useFindProjectDefinitionNodeQuery({
    variables: {
      projectDefinitionId: projectDefinitionId,
      nodeId,
    },
  });

  useLoaderEffect(error, loading);

  const nodePath = splitPath(selectedPath);
  const level = levelMapping[nodePath.length];

  async function onSubmit(data: ProjectDefinitionNodeCreationInput) {
    await updateNode({
      variables: {
        projectDefinitionId,
        nodeId,
        node: { ...data, path: nodePath },
      },
    });

    if (completeAction) {
      await completeAction();
    }
  }

  if (data === undefined) {
    return null;
  }

  const x = data.findProjectDefinitionNode;
  const node: ProjectDefinitionNodeCreationInput = {
    fieldDetails: mapFieldDetailsToUnion(
      x.fieldDetails as FieldDetailsUnion,
      x.translated
    ),
    instanciateByDefault: x.instanciateByDefault,
    isCollection: x.isCollection,
    meta: x.meta,
    name: x.name,
    ordinal: x.ordinal,
    path: x.path,
    translations: x.translations,
    triggers: x.triggers,
    translated: x.translated,
  };

  return (
    <NodeForm
      level={level}
      role="edit"
      node={node}
      onSubmit={onSubmit}
      projectDefinitionId={projectDefinitionId}
    />
  );
}

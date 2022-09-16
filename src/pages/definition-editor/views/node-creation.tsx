import { useParams } from "react-router-dom";
import {
  FieldDetailsType,
  ProjectDefinitionNodeCreationInput,
  useAddProjectDefinitionNodeMutation,
} from "../../../generated";
import { splitPath } from "../../project-editor/routes";
import { levelMapping } from "../form-definitions";
import { NodeForm } from "../forms/node-form";

export interface AddContainerFormProps {
  completeAction?: (() => Promise<unknown>) | undefined;
}

interface AddContainerFormParams {
  projectDefinitionId: string;
  selectedPath: string;
}

export function AddContainerView({ completeAction }: AddContainerFormProps) {
  const { projectDefinitionId, selectedPath } =
    useParams<AddContainerFormParams>();
  const nodePath = splitPath(selectedPath);
  const level = levelMapping[nodePath.length];
  const [addNode] = useAddProjectDefinitionNodeMutation();

  async function onSubmit(data: ProjectDefinitionNodeCreationInput) {
    await addNode({
      variables: {
        projectDefinitionId,
        node: {
          ...data,
          path: nodePath,
        },
      },
    });

    if (completeAction) {
      await completeAction();
    }
  }

  const node: ProjectDefinitionNodeCreationInput = {
    fieldDetails:
      level !== "field"
        ? undefined
        : {
            kind: FieldDetailsType.DECIMAL_FIELD_CONFIG,
            decimal: {
              numeric: 0,
              precision: 3,
            },
          },
    instanciateByDefault: true,
    isCollection: false,
    meta: {
      isVisible: true,
    },
    name: "",
    orderIndex: 1,
    path: nodePath,
    translations: {
      helpTextName: "",
      label: "",
    },
    triggers: [],
    translated: [],
  };

  return (
    <NodeForm
      role="add"
      level={level}
      node={node}
      onSubmit={onSubmit}
      projectDefinitionId={projectDefinitionId}
    />
  );
}

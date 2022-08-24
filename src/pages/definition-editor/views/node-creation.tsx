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
  configType: FieldDetailsType;
}

interface AddContainerFormParams {
  projectDefinitionId: string;
  selectedPath: string;
}

export function AddContainerView() {
  const { projectDefinitionId, selectedPath } =
    useParams<AddContainerFormParams>();
  const nodePath = splitPath(selectedPath);
  const level = levelMapping[nodePath.length];
  const [addNode] = useAddProjectDefinitionNodeMutation();

  async function onSubmit(data: ProjectDefinitionNodeCreationInput) {
    await addNode({
      variables: {
        projectDefinitionId,
        node: data,
      },
    });
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
  };

  return (
    <NodeForm
      role="add"
      level={level}
      translated={[]}
      node={node}
      onSubmit={onSubmit}
    />
  );
}

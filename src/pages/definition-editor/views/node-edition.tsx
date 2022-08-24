import { useParams } from "react-router-dom";
import { useLoaderEffect } from "../../../components/loading-frame";
import {
  FieldDetailsType,
  FieldDetailsUnion,
  FieldDetailsUnionInput,
  ProjectDefinitionNodeCreationInput,
  useFindProjectDefinitionNodeQuery,
  useUpdateProjectDefinitionNodeMutation,
} from "../../../generated";
import { splitPath } from "../../project-editor/routes";
import { levelMapping } from "../form-definitions";
import { NodeForm } from "../forms/node-form";

export interface AddContainerFormProps {
  configType: FieldDetailsType;
}

interface EditContainerFormParams {
  projectDefinitionId: string;
  selectedPath: string;
  nodeId: string;
}

export function EditContainerView() {
  const { projectDefinitionId, selectedPath, nodeId } =
    useParams<EditContainerFormParams>();
  const nodePath = splitPath(selectedPath);
  const level = levelMapping[nodePath.length];

  const [updateNode] = useUpdateProjectDefinitionNodeMutation();
  const { data, loading, error } = useFindProjectDefinitionNodeQuery({
    variables: {
      projectDefinitionId: projectDefinitionId,
      nodeId,
    },
  });

  useLoaderEffect(error, loading);

  async function onSubmit(data: ProjectDefinitionNodeCreationInput) {
    await updateNode({
      variables: {
        projectDefinitionId,
        node: {
          id: nodeId,
          ...data,
        },
      },
    });
  }

  if (data === undefined) {
    return null;
  }

  const x = data.findProjectDefinitionNode;
  const node: ProjectDefinitionNodeCreationInput = {
    fieldDetails: expendFieldDetails(x.fieldDetails as FieldDetailsUnion),
    instanciateByDefault: x.instanciateByDefault,
    isCollection: x.isCollection,
    meta: x.meta,
    name: x.name,
    orderIndex: x.orderIndex,
    path: x.path,
    translations: x.translations,
    triggers: x.triggers,
  };

  return (
    <NodeForm
      level={level}
      role="edit"
      translated={x.translated}
      node={node}
      onSubmit={onSubmit}
    />
  );
}

const conversionMappings = new Map<
  FieldDetailsUnion["__typename"],
  (value: FieldDetailsUnion) => FieldDetailsUnionInput
>([
  [
    "BoolFieldConfig",
    (x) => ({ ...x, kind: FieldDetailsType.BOOL_FIELD_CONFIG }),
  ],
  [
    "CollapsibleContainerFieldConfig",
    (x) => ({
      ...x,
      kind: FieldDetailsType.COLLAPSIBLE_CONTAINER_FIELD_CONFIG,
    }),
  ],
  [
    "DecimalFieldConfig",
    (x) => ({ ...x, kind: FieldDetailsType.DECIMAL_FIELD_CONFIG }),
  ],
  [
    "IntFieldConfig",
    (x) => ({ ...x, kind: FieldDetailsType.INT_FIELD_CONFIG }),
  ],
  [
    "StaticChoiceFieldConfig",
    (x) => ({ ...x, kind: FieldDetailsType.STATIC_CHOICE_FIELD_CONFIG }),
  ],
  [
    "StaticNumberFieldConfig",
    (x) => ({ ...x, kind: FieldDetailsType.STATIC_NUMBER_FIELD_CONFIG }),
  ],
  [
    "StringFieldConfig",
    (x) => ({ ...x, kind: FieldDetailsType.STRING_FIELD_CONFIG }),
  ],
]);

function expendFieldDetails(
  x?: FieldDetailsUnion
): FieldDetailsUnionInput | undefined {
  const build = conversionMappings.get(x?.__typename);

  if (build === undefined || x === undefined) {
    return undefined;
  }

  return build(x);
}

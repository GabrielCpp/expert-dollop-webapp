import { useParams } from "react-router-dom";
import { useLoaderEffect } from "../../../components/loading-frame";
import {
  BoolFieldConfig,
  CollapsibleContainerFieldConfig,
  DecimalFieldConfig,
  FieldDetailsType,
  FieldDetailsUnion,
  FieldDetailsUnionInput,
  IntFieldConfig,
  ProjectDefinitionNodeCreationInput,
  StaticChoiceFieldConfig,
  StaticChoiceFieldConfigInput,
  StaticNumberFieldConfig,
  StringFieldConfig,
  Translation,
  useFindProjectDefinitionNodeQuery,
  useUpdateProjectDefinitionNodeMutation,
} from "../../../generated";
import { splitPath } from "../../project-editor/routes";
import { levelMapping } from "../form-definitions";
import { NodeForm } from "../forms/node-form";

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
    fieldDetails: expendFieldDetails(
      x.fieldDetails as FieldDetailsUnion,
      x.translated
    ),
    instanciateByDefault: x.instanciateByDefault,
    isCollection: x.isCollection,
    meta: x.meta,
    name: x.name,
    orderIndex: x.orderIndex,
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

type BuildFieldDetailsUnionInput = (
  value: FieldDetailsUnion,
  allTranslations: Translation[]
) => FieldDetailsUnionInput;
const conversionMappings = new Map<
  FieldDetailsUnion["__typename"],
  BuildFieldDetailsUnionInput
>([
  [
    "BoolFieldConfig",
    (x) => ({
      bool: x as BoolFieldConfig,
      kind: FieldDetailsType.BOOL_FIELD_CONFIG,
    }),
  ],
  [
    "CollapsibleContainerFieldConfig",
    (x) => ({
      collapsibleContainer: x as CollapsibleContainerFieldConfig,
      kind: FieldDetailsType.COLLAPSIBLE_CONTAINER_FIELD_CONFIG,
    }),
  ],
  [
    "DecimalFieldConfig",
    (x) => ({
      decimal: x as DecimalFieldConfig,
      kind: FieldDetailsType.DECIMAL_FIELD_CONFIG,
    }),
  ],
  [
    "IntFieldConfig",
    (x) => ({
      int: x as IntFieldConfig,
      kind: FieldDetailsType.INT_FIELD_CONFIG,
    }),
  ],
  [
    "StaticChoiceFieldConfig",
    (
      x,
      allTranslations: Translation[]
    ): {
      staticChoice: StaticChoiceFieldConfigInput;
      kind: FieldDetailsType;
    } => ({
      staticChoice: {
        ...(x as StaticChoiceFieldConfig),
        options: (x as StaticChoiceFieldConfig).options.map((option) => ({
          ...option,
          translated: allTranslations.filter((t) =>
            [option.label, option.helpText].includes(t.name)
          ),
        })),
      },
      kind: FieldDetailsType.STATIC_CHOICE_FIELD_CONFIG,
    }),
  ],
  [
    "StaticNumberFieldConfig",
    (x) => ({
      staticNumberFieldConfig: x as StaticNumberFieldConfig,
      kind: FieldDetailsType.STATIC_NUMBER_FIELD_CONFIG,
    }),
  ],
  [
    "StringFieldConfig",
    (x) => ({
      string: x as StringFieldConfig,
      kind: FieldDetailsType.STRING_FIELD_CONFIG,
    }),
  ],
]);

function expendFieldDetails(
  x: FieldDetailsUnion | undefined,
  allTranslations: Translation[]
): FieldDetailsUnionInput | undefined {
  const build = conversionMappings.get(x?.__typename);

  if (build === undefined || x === undefined) {
    return undefined;
  }

  return build(x, allTranslations);
}

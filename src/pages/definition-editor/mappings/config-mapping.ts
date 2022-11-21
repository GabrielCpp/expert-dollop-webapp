import {
  FieldDetailsUnion,
  Translation,
  FieldDetailsUnionInput,
  BoolFieldConfig,
  FieldDetailsType,
  CollapsibleContainerFieldConfig,
  DecimalFieldConfig,
  IntFieldConfig,
  StaticChoiceFieldConfigInput,
  StaticChoiceFieldConfig,
  StaticNumberFieldConfig,
  StringFieldConfig,
  AggregateReferenceConfig,
  AttributeDetailsEnum,
  AttributeDetailsUnionInput,
  FindAggregateCollectionQuery,
  NodeReferenceConfig,
} from "../../../generated";

export function mapFieldDetailsToUnion(
  x: FieldDetailsUnion | undefined,
  allTranslations: Translation[]
): FieldDetailsUnionInput | undefined {
  const build = conversionMappings.get(x?.__typename);

  if (build === undefined || x === undefined) {
    return undefined;
  }

  return build(x, allTranslations);
}

export function mapAttributeSchemaDetails(
  details: Details, allTranslations: Translation[]
): AttributeDetailsUnionInput {
  const handler = handlers.get(details.__typename);

  if (handler === undefined) {
    throw new Error(`Unknown handler for ${details.__typename}`);
  }

  return handler(details, allTranslations);
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
    (x, allTranslations: Translation[]) => ({
      staticChoice: mapStaticChoiceFieldConfigInput(
        x as StaticChoiceFieldConfigInput,
        allTranslations
      ),
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

type Details =
  FindAggregateCollectionQuery["findAggregateCollection"]["attributesSchema"][number]["details"];

const handlers = new Map<
  string,
  (d: Details, t: Translation[]) => AttributeDetailsUnionInput
>([
  [
    "AggregateReferenceConfig",
    (d) => ({
      kind: AttributeDetailsEnum.AGGREGATE_REFERENCE_CONFIG,
      aggregateReference: d as AggregateReferenceConfig,
    }),
  ],
  [
    "BoolFieldConfig",
    (d) => ({
      kind: AttributeDetailsEnum.BOOL_FIELD_CONFIG,
      bool: d as BoolFieldConfig,
    }),
  ],
  [
    "DecimalFieldConfig",
    (d) => ({
      kind: AttributeDetailsEnum.DECIMAL_FIELD_CONFIG,
      decimal: d as DecimalFieldConfig,
    }),
  ],
  [
    "IntFieldConfig",
    (d) => ({
      kind: AttributeDetailsEnum.INT_FIELD_CONFIG,
      int: d as IntFieldConfig,
    }),
  ],
  [
    "NodeReferenceConfig",
    (d) => ({
      kind: AttributeDetailsEnum.NODE_REFERENCE_CONFIG,
      nodeReference: d as NodeReferenceConfig,
    }),
  ],
  [
    "StringFieldConfig",
    (d) => ({
      kind: AttributeDetailsEnum.STRING_FIELD_CONFIG,
      string: d as StringFieldConfig,
    }),
  ],
  [
    "StaticChoiceFieldConfig",
    (x, allTranslations: Translation[]) => ({
      staticChoice: mapStaticChoiceFieldConfigInput(
        x as StaticChoiceFieldConfig,
        allTranslations
      ),
      kind: AttributeDetailsEnum.STATIC_CHOICE_FIELD_CONFIG,
    }),
  ],
]);



function mapStaticChoiceFieldConfigInput(
  x: StaticChoiceFieldConfig,
  allTranslations: Translation[]
): StaticChoiceFieldConfigInput {
  return {
    ...x,
    options: x.options.map((option) => ({
      ...option,
      translated: allTranslations.filter((t) =>
        [option.label, option.helpText].includes(t.name)
      ),
    })),
  };
}

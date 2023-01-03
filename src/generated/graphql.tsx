import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type FieldWrapper<T> = T;
const defaultOptions = {};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  JsonSchema: any;
  UUID: any;
};

export type Aggregate = {
  __typename?: "Aggregate";
  attributes: Array<FieldWrapper<AggregateAttribute>>;
  collectionId: FieldWrapper<Scalars["String"]>;
  id: FieldWrapper<Scalars["ID"]>;
  isExtendable: FieldWrapper<Scalars["Boolean"]>;
  name: FieldWrapper<Scalars["String"]>;
  ordinal: FieldWrapper<Scalars["Int"]>;
  projectDefinitionId: FieldWrapper<Scalars["String"]>;
  translated: Array<FieldWrapper<Translation>>;
};

export type AggregateAttribute = {
  __typename?: "AggregateAttribute";
  isReadonly: FieldWrapper<Scalars["Boolean"]>;
  name: FieldWrapper<Scalars["String"]>;
  value: FieldWrapper<PrimitiveWithReferenceUnion>;
};

export type AggregateAttributeInput = {
  isReadonly: Scalars["Boolean"];
  name: Scalars["String"];
  value: FieldValueInput;
};

export type AggregateAttributeSchema = {
  __typename?: "AggregateAttributeSchema";
  details: FieldWrapper<AttributeDetailsUnion>;
  name: FieldWrapper<Scalars["String"]>;
  translations: FieldWrapper<TranslationConfig>;
};

export type AggregateAttributeSchemaInput = {
  details: AttributeDetailsUnionInput;
  name: Scalars["String"];
};

export type AggregateCollection = {
  __typename?: "AggregateCollection";
  attributesSchema: Array<FieldWrapper<AggregateAttributeSchema>>;
  id: FieldWrapper<Scalars["String"]>;
  isAbstract: FieldWrapper<Scalars["Boolean"]>;
  name: FieldWrapper<Scalars["String"]>;
  projectDefinitionId: FieldWrapper<Scalars["String"]>;
  translated: Array<FieldWrapper<Translation>>;
};

export type AggregateCollectionInput = {
  attributesSchema: Array<AggregateAttributeSchemaInput>;
  isAbstract: Scalars["Boolean"];
  name: Scalars["String"];
};

export type AggregateConnection = {
  __typename?: "AggregateConnection";
  edges: Array<FieldWrapper<AggregateEdge>>;
  pageInfo: FieldWrapper<PageInfo>;
};

export type AggregateEdge = {
  __typename?: "AggregateEdge";
  cursor: FieldWrapper<Scalars["String"]>;
  node: FieldWrapper<Aggregate>;
};

export type AggregateInput = {
  attributes: Array<AggregateAttributeInput>;
  isExtendable: Scalars["Boolean"];
  name: Scalars["String"];
  ordinal: Scalars["Int"];
  translated: Array<TranslationInput>;
};

export type AggregateReferenceConfig = {
  __typename?: "AggregateReferenceConfig";
  fromCollection: FieldWrapper<Scalars["String"]>;
};

export type AggregateReferenceConfigInput = {
  fromCollection: Scalars["String"];
};

export type Attribute = {
  __typename?: "Attribute";
  name: FieldWrapper<Scalars["String"]>;
  value?: Maybe<FieldWrapper<PrimitiveWithReferenceUnion>>;
};

export type AttributeBucket = {
  __typename?: "AttributeBucket";
  attributeName: FieldWrapper<Scalars["String"]>;
  bucketName: FieldWrapper<Scalars["String"]>;
};

export enum AttributeDetailsEnum {
  AGGREGATE_REFERENCE_CONFIG = "AGGREGATE_REFERENCE_CONFIG",
  BOOL_FIELD_CONFIG = "BOOL_FIELD_CONFIG",
  DECIMAL_FIELD_CONFIG = "DECIMAL_FIELD_CONFIG",
  INT_FIELD_CONFIG = "INT_FIELD_CONFIG",
  NODE_REFERENCE_CONFIG = "NODE_REFERENCE_CONFIG",
  STATIC_CHOICE_FIELD_CONFIG = "STATIC_CHOICE_FIELD_CONFIG",
  STRING_FIELD_CONFIG = "STRING_FIELD_CONFIG",
}

export type AttributeDetailsUnion =
  | AggregateReferenceConfig
  | BoolFieldConfig
  | DecimalFieldConfig
  | IntFieldConfig
  | NodeReferenceConfig
  | StaticChoiceFieldConfig
  | StringFieldConfig;

export type AttributeDetailsUnionInput = {
  aggregateReference?: Maybe<AggregateReferenceConfigInput>;
  bool?: Maybe<BoolFieldConfigInput>;
  decimal?: Maybe<DecimalFieldConfigInput>;
  int?: Maybe<IntFieldConfigInput>;
  kind: AttributeDetailsEnum;
  nodeReference?: Maybe<NodeReferenceConfigInput>;
  staticChoice?: Maybe<StaticChoiceFieldConfigInput>;
  string?: Maybe<StringFieldConfigInput>;
};

export type BoolFieldConfig = {
  __typename?: "BoolFieldConfig";
  enabled: FieldWrapper<Scalars["Boolean"]>;
};

export type BoolFieldConfigInput = {
  enabled: Scalars["Boolean"];
};

export type BoolFieldValue = {
  __typename?: "BoolFieldValue";
  enabled: FieldWrapper<Scalars["Boolean"]>;
};

export type BoolFieldValueInput = {
  enabled: Scalars["Boolean"];
};

export type CollapsibleContainerFieldConfig = {
  __typename?: "CollapsibleContainerFieldConfig";
  isCollapsible: FieldWrapper<Scalars["Boolean"]>;
};

export type CollapsibleContainerFieldConfigInput = {
  isCollapsible: Scalars["Boolean"];
};

export type ComputedValue = {
  __typename?: "ComputedValue";
  isVisible: FieldWrapper<Scalars["Boolean"]>;
  label: FieldWrapper<Scalars["String"]>;
  unit?: Maybe<FieldWrapper<Scalars["String"]>>;
  value: FieldWrapper<PrimitiveWithReferenceUnion>;
};

export type CoreDefinitionNode = {
  __typename?: "CoreDefinitionNode";
  id: FieldWrapper<Scalars["ID"]>;
  name: FieldWrapper<Scalars["String"]>;
  path: Array<FieldWrapper<Scalars["String"]>>;
  projectDefinitionId: FieldWrapper<Scalars["String"]>;
};

export type CoreDefinitionNodeConnection = {
  __typename?: "CoreDefinitionNodeConnection";
  edges: Array<FieldWrapper<CoreDefinitionNodeEdge>>;
  pageInfo: FieldWrapper<PageInfo>;
};

export type CoreDefinitionNodeEdge = {
  __typename?: "CoreDefinitionNodeEdge";
  cursor: FieldWrapper<Scalars["String"]>;
  node: FieldWrapper<CoreDefinitionNode>;
};

export type Datasheet = {
  __typename?: "Datasheet";
  elements: FieldWrapper<DatasheetElementConnection>;
  fromDatasheetId: FieldWrapper<Scalars["String"]>;
  id: FieldWrapper<Scalars["ID"]>;
  name: FieldWrapper<Scalars["String"]>;
  projectDefinitionId: FieldWrapper<Scalars["String"]>;
};

export type DatasheetElementsArgs = {
  after?: Maybe<Scalars["String"]>;
  first: Scalars["Int"];
};

export type DatasheetConnection = {
  __typename?: "DatasheetConnection";
  edges: Array<FieldWrapper<DatasheetEdge>>;
  pageInfo: FieldWrapper<PageInfo>;
};

export type DatasheetEdge = {
  __typename?: "DatasheetEdge";
  cursor: FieldWrapper<Scalars["String"]>;
  node: FieldWrapper<Datasheet>;
};

export type DatasheetElement = {
  __typename?: "DatasheetElement";
  aggregateId: FieldWrapper<Scalars["String"]>;
  attributes: Array<FieldWrapper<Attribute>>;
  creationDateUtc: FieldWrapper<Scalars["String"]>;
  datasheetId: FieldWrapper<Scalars["String"]>;
  id: FieldWrapper<Scalars["ID"]>;
  originalDatasheetId: FieldWrapper<Scalars["String"]>;
  originalOwnerOrganizationId: FieldWrapper<Scalars["String"]>;
  schema: FieldWrapper<InstanceSchema>;
};

export type DatasheetElementConnection = {
  __typename?: "DatasheetElementConnection";
  edges: Array<FieldWrapper<DatasheetElementEdge>>;
  pageInfo: FieldWrapper<PageInfo>;
};

export type DatasheetElementEdge = {
  __typename?: "DatasheetElementEdge";
  cursor: FieldWrapper<Scalars["String"]>;
  node: FieldWrapper<DatasheetElement>;
};

export type DatasheetInput = {
  fromDatasheetId?: Maybe<Scalars["String"]>;
  name: Scalars["String"];
  projectDefinitionId: Scalars["String"];
};

export type DecimalFieldConfig = {
  __typename?: "DecimalFieldConfig";
  numeric: FieldWrapper<Scalars["Float"]>;
  precision: FieldWrapper<Scalars["Int"]>;
  unit: FieldWrapper<Scalars["String"]>;
};

export type DecimalFieldConfigInput = {
  numeric: Scalars["Float"];
  precision: Scalars["Int"];
  unit?: Maybe<Scalars["String"]>;
};

export type DecimalFieldValue = {
  __typename?: "DecimalFieldValue";
  numeric: FieldWrapper<Scalars["Float"]>;
};

export type DecimalFieldValueInput = {
  numeric: Scalars["Float"];
};

export type DefinitionInput = {
  name: Scalars["String"];
};

export type DistributableItem = {
  __typename?: "DistributableItem";
  columns: Array<FieldWrapper<ComputedValue>>;
  creationDateUtc: FieldWrapper<Scalars["String"]>;
  distribution_ids: Array<FieldWrapper<Scalars["String"]>>;
  formulaId: FieldWrapper<Scalars["String"]>;
  id: FieldWrapper<Scalars["String"]>;
  nodeId: FieldWrapper<Scalars["String"]>;
  obsolete: FieldWrapper<Scalars["Boolean"]>;
  projectId: FieldWrapper<Scalars["String"]>;
  reportDefinitionId: FieldWrapper<Scalars["String"]>;
  summary: FieldWrapper<ComputedValue>;
  suppliedItem: FieldWrapper<SuppliedItem>;
};

export enum FieldDetailsType {
  BOOL_FIELD_CONFIG = "BOOL_FIELD_CONFIG",
  COLLAPSIBLE_CONTAINER_FIELD_CONFIG = "COLLAPSIBLE_CONTAINER_FIELD_CONFIG",
  DECIMAL_FIELD_CONFIG = "DECIMAL_FIELD_CONFIG",
  INT_FIELD_CONFIG = "INT_FIELD_CONFIG",
  STATIC_CHOICE_FIELD_CONFIG = "STATIC_CHOICE_FIELD_CONFIG",
  STATIC_NUMBER_FIELD_CONFIG = "STATIC_NUMBER_FIELD_CONFIG",
  STRING_FIELD_CONFIG = "STRING_FIELD_CONFIG",
}

export type FieldDetailsUnion =
  | BoolFieldConfig
  | CollapsibleContainerFieldConfig
  | DecimalFieldConfig
  | IntFieldConfig
  | StaticChoiceFieldConfig
  | StaticNumberFieldConfig
  | StringFieldConfig;

export type FieldDetailsUnionInput = {
  bool?: Maybe<BoolFieldConfigInput>;
  collapsibleContainer?: Maybe<CollapsibleContainerFieldConfigInput>;
  decimal?: Maybe<DecimalFieldConfigInput>;
  int?: Maybe<IntFieldConfigInput>;
  kind: FieldDetailsType;
  staticChoice?: Maybe<StaticChoiceFieldConfigInput>;
  staticNumberFieldConfig?: Maybe<StaticNumberFieldConfigInput>;
  string?: Maybe<StringFieldConfigInput>;
};

export type FieldUpdateInput = {
  nodeId: Scalars["ID"];
  value: FieldValueInput;
};

export type FieldValueInput = {
  bool?: Maybe<BoolFieldValueInput>;
  decimal?: Maybe<DecimalFieldValueInput>;
  int?: Maybe<IntFieldValueInput>;
  kind: FieldValueType;
  reference?: Maybe<ReferenceFieldValueInput>;
  string?: Maybe<StringFieldValueInput>;
};

export enum FieldValueType {
  BOOL_FIELD_VALUE = "BOOL_FIELD_VALUE",
  DECIMAL_FIELD_VALUE = "DECIMAL_FIELD_VALUE",
  INT_FIELD_VALUE = "INT_FIELD_VALUE",
  REFERENCE_FIELD_VALUE = "REFERENCE_FIELD_VALUE",
  STRING_FIELD_VALUE = "STRING_FIELD_VALUE",
}

export type Formula = {
  __typename?: "Formula";
  attachedToTypeId: FieldWrapper<Scalars["String"]>;
  expression: FieldWrapper<Scalars["String"]>;
  id: FieldWrapper<Scalars["ID"]>;
  name: FieldWrapper<Scalars["String"]>;
  projectDefinitionId: FieldWrapper<Scalars["String"]>;
};

export type FormulaConnection = {
  __typename?: "FormulaConnection";
  edges: Array<FieldWrapper<FormulaEdge>>;
  pageInfo: FieldWrapper<PageInfo>;
};

export type FormulaEdge = {
  __typename?: "FormulaEdge";
  cursor: FieldWrapper<Scalars["String"]>;
  node: FieldWrapper<Formula>;
};

export type InstanceSchema = {
  __typename?: "InstanceSchema";
  attributesSchema: Array<FieldWrapper<AggregateAttribute>>;
  id: FieldWrapper<Scalars["ID"]>;
  isExtendable: FieldWrapper<Scalars["Boolean"]>;
};

export type IntFieldConfig = {
  __typename?: "IntFieldConfig";
  integer: FieldWrapper<Scalars["Int"]>;
  unit: FieldWrapper<Scalars["String"]>;
};

export type IntFieldConfigInput = {
  integer: Scalars["Int"];
  unit: Scalars["String"];
};

export type IntFieldValue = {
  __typename?: "IntFieldValue";
  integer: FieldWrapper<Scalars["Int"]>;
};

export type IntFieldValueInput = {
  integer: Scalars["Int"];
};

export type Mutation = {
  __typename?: "Mutation";
  addAggregate: FieldWrapper<Aggregate>;
  addAggregateCollection: FieldWrapper<AggregateCollection>;
  addProjectCollectionItem: Array<FieldWrapper<ProjectNode>>;
  addProjectDefinition: FieldWrapper<ProjectDefinition>;
  addProjectDefinitionNode: FieldWrapper<ProjectDefinitionNode>;
  cloneProjectCollection: Array<FieldWrapper<ProjectNode>>;
  createDatasheet: FieldWrapper<Datasheet>;
  createProject: FieldWrapper<ProjectDetails>;
  createSingleUserOrganization: FieldWrapper<User>;
  deleteAggregate: FieldWrapper<Scalars["String"]>;
  deleteAggregateCollection: FieldWrapper<Scalars["String"]>;
  deleteProjectCollection: FieldWrapper<ProjectNode>;
  deleteProjectDefinitionNode: FieldWrapper<Scalars["String"]>;
  updateAggregate: FieldWrapper<Aggregate>;
  updateAggregateCollection: FieldWrapper<AggregateCollection>;
  updateProjectDefinitionNode: FieldWrapper<ProjectDefinitionNode>;
  updateProjectField: FieldWrapper<ProjectNode>;
  updateProjectFields: Array<Maybe<FieldWrapper<ProjectNode>>>;
  updateTranslations: Array<FieldWrapper<Translation>>;
};

export type MutationAddAggregateArgs = {
  aggregate: AggregateInput;
  collectionId: Scalars["ID"];
  projectDefinitionId: Scalars["ID"];
};

export type MutationAddAggregateCollectionArgs = {
  collection: AggregateCollectionInput;
  projectDefinitionId: Scalars["ID"];
};

export type MutationAddProjectCollectionItemArgs = {
  collectionTarget: ProjectNodeCollectionTargetInput;
  projectId: Scalars["ID"];
};

export type MutationAddProjectDefinitionArgs = {
  definitionInput: DefinitionInput;
};

export type MutationAddProjectDefinitionNodeArgs = {
  node: ProjectDefinitionNodeCreationInput;
  projectDefinitionId: Scalars["ID"];
};

export type MutationCloneProjectCollectionArgs = {
  collectionNodeId: Scalars["ID"];
  projectId: Scalars["ID"];
};

export type MutationCreateDatasheetArgs = {
  datasheet?: Maybe<DatasheetInput>;
};

export type MutationCreateProjectArgs = {
  projectDetails?: Maybe<ProjectDetailsInput>;
};

export type MutationCreateSingleUserOrganizationArgs = {
  singleUserOrganization: NewSingleUserOrganizationInput;
};

export type MutationDeleteAggregateArgs = {
  aggregateId: Scalars["ID"];
  collectionId: Scalars["ID"];
  projectDefinitionId: Scalars["ID"];
};

export type MutationDeleteAggregateCollectionArgs = {
  collectionId: Scalars["ID"];
  projectDefinitionId: Scalars["ID"];
};

export type MutationDeleteProjectCollectionArgs = {
  collectionNodeId: Scalars["ID"];
  projectId: Scalars["ID"];
};

export type MutationDeleteProjectDefinitionNodeArgs = {
  nodeId: Scalars["ID"];
  projectDefinitionId: Scalars["ID"];
};

export type MutationUpdateAggregateArgs = {
  aggregateId: Scalars["ID"];
  collectionId: Scalars["ID"];
  projectDefinitionId: Scalars["ID"];
  replacement: AggregateInput;
};

export type MutationUpdateAggregateCollectionArgs = {
  collection: AggregateCollectionInput;
  collectionId: Scalars["ID"];
  projectDefinitionId: Scalars["ID"];
};

export type MutationUpdateProjectDefinitionNodeArgs = {
  node: ProjectDefinitionNodeCreationInput;
  nodeId: Scalars["ID"];
  projectDefinitionId: Scalars["ID"];
};

export type MutationUpdateProjectFieldArgs = {
  nodeId: Scalars["ID"];
  projectId: Scalars["ID"];
  value: FieldValueInput;
};

export type MutationUpdateProjectFieldsArgs = {
  projectId: Scalars["ID"];
  updates: Array<FieldUpdateInput>;
};

export type MutationUpdateTranslationsArgs = {
  translations: Array<TranslationUpdateInput>;
};

export type NewSingleUserOrganizationInput = {
  email: Scalars["String"];
  organizationName: Scalars["String"];
};

export type NodeMetaConfig = {
  __typename?: "NodeMetaConfig";
  isVisible: FieldWrapper<Scalars["Boolean"]>;
};

export type NodeMetaConfigInput = {
  isVisible: Scalars["Boolean"];
};

export type NodeReferenceConfig = {
  __typename?: "NodeReferenceConfig";
  nodeType: FieldWrapper<NodeType>;
};

export type NodeReferenceConfigInput = {
  nodeType: NodeType;
};

export enum NodeType {
  FIELD = "FIELD",
  FORM = "FORM",
  FORMULA = "FORMULA",
  ROOT_SECTION = "ROOT_SECTION",
  SECTION = "SECTION",
  SUB_SECTION = "SUB_SECTION",
}

export type Organization = {
  __typename?: "Organization";
  email: FieldWrapper<Scalars["String"]>;
  id: FieldWrapper<Scalars["String"]>;
  name: FieldWrapper<Scalars["String"]>;
};

export type PageInfo = {
  __typename?: "PageInfo";
  endCursor: FieldWrapper<Scalars["String"]>;
  hasNextPage: FieldWrapper<Scalars["Boolean"]>;
  totalCount: FieldWrapper<Scalars["Int"]>;
};

export type PrimitiveWithReferenceUnion =
  | BoolFieldValue
  | DecimalFieldValue
  | IntFieldValue
  | ReferenceId
  | StringFieldValue;

export type ProjectConnection = {
  __typename?: "ProjectConnection";
  edges: Array<FieldWrapper<ProjectEdge>>;
  pageInfo: FieldWrapper<PageInfo>;
};

export type ProjectDefinition = {
  __typename?: "ProjectDefinition";
  formContent: FieldWrapper<ProjectDefinitionNodeTree>;
  id: FieldWrapper<Scalars["ID"]>;
  name: FieldWrapper<Scalars["String"]>;
  rootSectionContainers: FieldWrapper<ProjectDefinitionNodeTree>;
  rootSections: FieldWrapper<ProjectDefinitionNodeTree>;
};

export type ProjectDefinitionFormContentArgs = {
  formId: Scalars["ID"];
};

export type ProjectDefinitionRootSectionContainersArgs = {
  rootSectionId: Scalars["ID"];
};

export type ProjectDefinitionConnection = {
  __typename?: "ProjectDefinitionConnection";
  edges: Array<FieldWrapper<ProjectDefinitionEdge>>;
  pageInfo: FieldWrapper<PageInfo>;
};

export type ProjectDefinitionEdge = {
  __typename?: "ProjectDefinitionEdge";
  cursor: FieldWrapper<Scalars["String"]>;
  node: FieldWrapper<ProjectDefinition>;
};

export type ProjectDefinitionNode = {
  __typename?: "ProjectDefinitionNode";
  children: Array<FieldWrapper<ProjectDefinitionNode>>;
  fieldDetails?: Maybe<FieldWrapper<FieldDetailsUnion>>;
  id: FieldWrapper<Scalars["ID"]>;
  instanciateByDefault: FieldWrapper<Scalars["Boolean"]>;
  isCollection: FieldWrapper<Scalars["Boolean"]>;
  meta: FieldWrapper<NodeMetaConfig>;
  name: FieldWrapper<Scalars["String"]>;
  ordinal: FieldWrapper<Scalars["Int"]>;
  path: Array<FieldWrapper<Scalars["String"]>>;
  projectDefinitionId: FieldWrapper<Scalars["String"]>;
  translated: Array<FieldWrapper<Translation>>;
  translations: FieldWrapper<TranslationConfig>;
  triggers: Array<FieldWrapper<Trigger>>;
  validator?: Maybe<FieldWrapper<Scalars["JsonSchema"]>>;
};

export type ProjectDefinitionNodeCreationInput = {
  fieldDetails?: Maybe<FieldDetailsUnionInput>;
  instanciateByDefault: Scalars["Boolean"];
  isCollection: Scalars["Boolean"];
  meta: NodeMetaConfigInput;
  name: Scalars["String"];
  ordinal: Scalars["Int"];
  path: Array<Scalars["String"]>;
  translated: Array<TranslationInput>;
  translations: TranslationConfigInput;
  triggers: Array<TriggerInput>;
};

export type ProjectDefinitionNodeTree = {
  __typename?: "ProjectDefinitionNodeTree";
  roots: Array<FieldWrapper<ProjectDefinitionTreeNode>>;
};

export type ProjectDefinitionTreeNode = {
  __typename?: "ProjectDefinitionTreeNode";
  children: Array<FieldWrapper<ProjectDefinitionTreeNode>>;
  definition: FieldWrapper<ProjectDefinitionNode>;
};

export type ProjectDetails = {
  __typename?: "ProjectDetails";
  datasheet: FieldWrapper<Datasheet>;
  datasheetId: FieldWrapper<Scalars["String"]>;
  id: FieldWrapper<Scalars["ID"]>;
  name: FieldWrapper<Scalars["String"]>;
  projectDefinition: FieldWrapper<ProjectDefinition>;
  projectDefinitionId: FieldWrapper<Scalars["String"]>;
  reportDefinitions: Array<FieldWrapper<ReportDefinition>>;
};

export type ProjectDetailsInput = {
  datasheetId: Scalars["String"];
  id: Scalars["ID"];
  name: Scalars["String"];
  projectDefinitionId: Scalars["String"];
};

export type ProjectEdge = {
  __typename?: "ProjectEdge";
  cursor: FieldWrapper<Scalars["String"]>;
  node: FieldWrapper<ProjectDetails>;
};

export type ProjectNode = {
  __typename?: "ProjectNode";
  id: FieldWrapper<Scalars["ID"]>;
  label?: Maybe<FieldWrapper<Scalars["String"]>>;
  path: Array<FieldWrapper<Scalars["String"]>>;
  projectId: FieldWrapper<Scalars["String"]>;
  typeId: FieldWrapper<Scalars["String"]>;
  typeName: FieldWrapper<Scalars["String"]>;
  typePath: Array<FieldWrapper<Scalars["String"]>>;
  value?: Maybe<FieldWrapper<PrimitiveWithReferenceUnion>>;
};

export type ProjectNodeCollectionTargetInput = {
  collectionTypeId: Scalars["String"];
  parentNodeId?: Maybe<Scalars["String"]>;
};

export type ProjectNodeMeta = {
  __typename?: "ProjectNodeMeta";
  definition: FieldWrapper<ProjectDefinitionNode>;
  state: FieldWrapper<ProjectNodeMetaState>;
  translations: Array<FieldWrapper<Translation>>;
  typeId: FieldWrapper<Scalars["ID"]>;
};

export type ProjectNodeMetaState = {
  __typename?: "ProjectNodeMetaState";
  isVisible?: Maybe<FieldWrapper<Scalars["Boolean"]>>;
  selectedChild?: Maybe<FieldWrapper<Scalars["String"]>>;
};

export type ProjectNodeTree = {
  __typename?: "ProjectNodeTree";
  roots: Array<FieldWrapper<ProjectNodeTreeTypeNode>>;
};

export type ProjectNodeTreeNode = {
  __typename?: "ProjectNodeTreeNode";
  children: Array<FieldWrapper<ProjectNodeTreeTypeNode>>;
  node: FieldWrapper<ProjectNode>;
};

export type ProjectNodeTreeTypeNode = {
  __typename?: "ProjectNodeTreeTypeNode";
  definition: FieldWrapper<ProjectDefinitionNode>;
  nodes: Array<FieldWrapper<ProjectNodeTreeNode>>;
  state: FieldWrapper<ProjectNodeMetaState>;
};

export type Query = {
  __typename?: "Query";
  currentUser?: Maybe<FieldWrapper<User>>;
  findAggregateCollection: FieldWrapper<AggregateCollection>;
  findAggregates: FieldWrapper<AggregateConnection>;
  findDatasheet: FieldWrapper<Datasheet>;
  findDatasheets: FieldWrapper<DatasheetConnection>;
  findDefinitionAggregateCollections: Array<FieldWrapper<AggregateCollection>>;
  findDefinitionFormulaFieldMix: FieldWrapper<CoreDefinitionNodeConnection>;
  findDistributableItems: Array<FieldWrapper<DistributableItem>>;
  findDistributables: Array<FieldWrapper<ReportDefinition>>;
  findFormula?: Maybe<FieldWrapper<Formula>>;
  findProjectDefinition: FieldWrapper<ProjectDefinition>;
  findProjectDefinitionFormContent: FieldWrapper<ProjectDefinitionNodeTree>;
  findProjectDefinitionFormulas: FieldWrapper<FormulaConnection>;
  findProjectDefinitionNode: FieldWrapper<ProjectDefinitionNode>;
  findProjectDefinitionRootSectionContainers: FieldWrapper<ProjectDefinitionNodeTree>;
  findProjectDefinitionRootSections: FieldWrapper<ProjectDefinitionNodeTree>;
  findProjectDefintions: FieldWrapper<ProjectDefinitionConnection>;
  findProjectDetails: FieldWrapper<ProjectDetails>;
  findProjectFormContent: FieldWrapper<ProjectNodeTree>;
  findProjectNodeMetaDefinition: FieldWrapper<ProjectNodeMeta>;
  findProjectReport: FieldWrapper<Report>;
  findProjectRootSectionContainers: FieldWrapper<ProjectNodeTree>;
  findProjectRootSections: FieldWrapper<ProjectNodeTree>;
  findProjects: FieldWrapper<ProjectConnection>;
  findReportDefinition: FieldWrapper<ReportDefinition>;
  findReportDefinitions: Array<FieldWrapper<ReportDefinition>>;
  findRessourceTranslation: FieldWrapper<TranslationConnection>;
  units: Array<FieldWrapper<Unit>>;
};

export type QueryFindAggregateCollectionArgs = {
  collectionId: Scalars["ID"];
  projectDefinitionId: Scalars["ID"];
};

export type QueryFindAggregatesArgs = {
  after?: Maybe<Scalars["String"]>;
  collectionId: Scalars["ID"];
  first: Scalars["Int"];
  projectDefinitionId: Scalars["ID"];
  query: Scalars["String"];
};

export type QueryFindDatasheetArgs = {
  id: Scalars["ID"];
};

export type QueryFindDatasheetsArgs = {
  after?: Maybe<Scalars["String"]>;
  first: Scalars["Int"];
  query: Scalars["String"];
};

export type QueryFindDefinitionAggregateCollectionsArgs = {
  projectDefinitionId: Scalars["ID"];
};

export type QueryFindDefinitionFormulaFieldMixArgs = {
  after?: Maybe<Scalars["String"]>;
  first: Scalars["Int"];
  projectDefinitionId: Scalars["ID"];
  query: Scalars["String"];
};

export type QueryFindDistributableItemsArgs = {
  projectId: Scalars["ID"];
  reportDefinitionId: Scalars["ID"];
};

export type QueryFindDistributablesArgs = {
  projectId: Scalars["ID"];
};

export type QueryFindFormulaArgs = {
  formulaId: Scalars["ID"];
  projectDefinitionId: Scalars["ID"];
};

export type QueryFindProjectDefinitionArgs = {
  id: Scalars["ID"];
};

export type QueryFindProjectDefinitionFormContentArgs = {
  formId: Scalars["ID"];
  projectDefinitionId: Scalars["ID"];
};

export type QueryFindProjectDefinitionFormulasArgs = {
  after?: Maybe<Scalars["String"]>;
  first: Scalars["Int"];
  projectDefinitionId: Scalars["ID"];
  query: Scalars["String"];
};

export type QueryFindProjectDefinitionNodeArgs = {
  id: Scalars["ID"];
  projectDefinitionId: Scalars["ID"];
};

export type QueryFindProjectDefinitionRootSectionContainersArgs = {
  projectDefinitionId: Scalars["ID"];
  rootSectionId: Scalars["ID"];
};

export type QueryFindProjectDefinitionRootSectionsArgs = {
  projectDefinitionId: Scalars["ID"];
};

export type QueryFindProjectDefintionsArgs = {
  after?: Maybe<Scalars["String"]>;
  first: Scalars["Int"];
  query: Scalars["String"];
};

export type QueryFindProjectDetailsArgs = {
  id: Scalars["ID"];
};

export type QueryFindProjectFormContentArgs = {
  formId: Scalars["ID"];
  projectId: Scalars["ID"];
};

export type QueryFindProjectNodeMetaDefinitionArgs = {
  nodeId: Scalars["ID"];
  projectId: Scalars["ID"];
};

export type QueryFindProjectReportArgs = {
  projectId: Scalars["ID"];
  reportDefinitionId: Scalars["ID"];
};

export type QueryFindProjectRootSectionContainersArgs = {
  projectId: Scalars["ID"];
  rootSectionId: Scalars["ID"];
};

export type QueryFindProjectRootSectionsArgs = {
  projectId: Scalars["ID"];
};

export type QueryFindProjectsArgs = {
  after?: Maybe<Scalars["String"]>;
  first: Scalars["Int"];
  query: Scalars["String"];
};

export type QueryFindReportDefinitionArgs = {
  reportDefinitionId: Scalars["ID"];
};

export type QueryFindReportDefinitionsArgs = {
  projectDefinitionId: Scalars["ID"];
};

export type QueryFindRessourceTranslationArgs = {
  language: Scalars["String"];
  ressourceId: Scalars["ID"];
};

export type ReferenceFieldValueInput = {
  uuid: Scalars["String"];
};

export type ReferenceId = {
  __typename?: "ReferenceId";
  uuid: FieldWrapper<Scalars["String"]>;
};

export type Report = {
  __typename?: "Report";
  creationDateUtc?: Maybe<FieldWrapper<Scalars["String"]>>;
  datasheetId: FieldWrapper<Scalars["String"]>;
  name: FieldWrapper<Scalars["String"]>;
  stages: Array<FieldWrapper<ReportStage>>;
  summaries: Array<FieldWrapper<ComputedValue>>;
};

export type ReportComputation = {
  __typename?: "ReportComputation";
  expression: FieldWrapper<Scalars["String"]>;
  isVisible: FieldWrapper<Scalars["Boolean"]>;
  name: FieldWrapper<Scalars["String"]>;
  unit?: Maybe<FieldWrapper<ReportUnitUnion>>;
};

export type ReportDefinition = {
  __typename?: "ReportDefinition";
  id: FieldWrapper<Scalars["String"]>;
  name: FieldWrapper<Scalars["String"]>;
  projectDefinitionId: FieldWrapper<Scalars["String"]>;
  structure: FieldWrapper<ReportDefinitionStructure>;
};

export type ReportDefinitionStructure = {
  __typename?: "ReportDefinitionStructure";
  columns: Array<FieldWrapper<ReportComputation>>;
  groupBy: Array<FieldWrapper<AttributeBucket>>;
  having: FieldWrapper<Scalars["String"]>;
  orderBy: Array<FieldWrapper<AttributeBucket>>;
  reportSummary: Array<FieldWrapper<ReportComputation>>;
  selection: FieldWrapper<Selection>;
  stageSummary: FieldWrapper<StageSummary>;
};

export type ReportJoin = {
  __typename?: "ReportJoin";
  aliasName: FieldWrapper<Scalars["String"]>;
  allowDicardElement: FieldWrapper<Scalars["Boolean"]>;
  fromObjectName: FieldWrapper<Scalars["String"]>;
  fromPropertyName: FieldWrapper<Scalars["String"]>;
  joinOnAttribute: FieldWrapper<Scalars["String"]>;
  joinOnCollection: FieldWrapper<Scalars["String"]>;
  sameCardinality: FieldWrapper<Scalars["Boolean"]>;
  warnAboutIdleItems: FieldWrapper<Scalars["Boolean"]>;
};

export type ReportRow = {
  __typename?: "ReportRow";
  childReferenceId: FieldWrapper<Scalars["String"]>;
  columns: Array<FieldWrapper<ComputedValue>>;
  elementDefId: FieldWrapper<Scalars["String"]>;
  formulaId: FieldWrapper<Scalars["String"]>;
  nodeId: FieldWrapper<Scalars["String"]>;
};

export type ReportStage = {
  __typename?: "ReportStage";
  columns: Array<FieldWrapper<StageColumn>>;
  rows: Array<FieldWrapper<ReportRow>>;
  summary: FieldWrapper<ComputedValue>;
};

export type ReportUnitUnion = AttributeBucket | Unit;

export type Selection = {
  __typename?: "Selection";
  datasheetAttribute: FieldWrapper<AttributeBucket>;
  formulaAttribute: FieldWrapper<AttributeBucket>;
  fromAlias: FieldWrapper<Scalars["String"]>;
  fromCollectionId: FieldWrapper<Scalars["String"]>;
  joinsCache: Array<FieldWrapper<ReportJoin>>;
};

export type StageColumn = {
  __typename?: "StageColumn";
  isVisible: FieldWrapper<Scalars["Boolean"]>;
  label: FieldWrapper<Scalars["String"]>;
  unit?: Maybe<FieldWrapper<Scalars["String"]>>;
};

export type StageSummary = {
  __typename?: "StageSummary";
  label?: Maybe<FieldWrapper<AttributeBucket>>;
  summary?: Maybe<FieldWrapper<ReportComputation>>;
};

export type StaticChoiceFieldConfig = {
  __typename?: "StaticChoiceFieldConfig";
  options: Array<FieldWrapper<StaticChoiceOption>>;
  selected: FieldWrapper<Scalars["String"]>;
};

export type StaticChoiceFieldConfigInput = {
  options: Array<StaticChoiceOptionInput>;
  selected: Scalars["String"];
};

export type StaticChoiceOption = {
  __typename?: "StaticChoiceOption";
  helpText: FieldWrapper<Scalars["String"]>;
  id: FieldWrapper<Scalars["String"]>;
  label: FieldWrapper<Scalars["String"]>;
};

export type StaticChoiceOptionInput = {
  helpText: Scalars["String"];
  id: Scalars["String"];
  label: Scalars["String"];
  translated: Array<TranslationInput>;
};

export type StaticNumberFieldConfig = {
  __typename?: "StaticNumberFieldConfig";
  passToTranslation: FieldWrapper<Scalars["Boolean"]>;
  precision: FieldWrapper<Scalars["Int"]>;
  unit: FieldWrapper<Scalars["String"]>;
};

export type StaticNumberFieldConfigInput = {
  passToTranslation: Scalars["Boolean"];
  precision: Scalars["Int"];
  unit: Scalars["String"];
};

export type StringFieldConfig = {
  __typename?: "StringFieldConfig";
  text: FieldWrapper<Scalars["String"]>;
  transforms: Array<FieldWrapper<Scalars["String"]>>;
};

export type StringFieldConfigInput = {
  text: Scalars["String"];
  transforms: Array<Scalars["String"]>;
};

export type StringFieldValue = {
  __typename?: "StringFieldValue";
  text: FieldWrapper<Scalars["String"]>;
};

export type StringFieldValueInput = {
  text: Scalars["String"];
};

export type SuppliedItem = {
  __typename?: "SuppliedItem";
  childReferenceId: FieldWrapper<Scalars["String"]>;
  datasheetId: FieldWrapper<Scalars["String"]>;
  elementDefId: FieldWrapper<Scalars["String"]>;
  organization: FieldWrapper<Organization>;
  organizationId: FieldWrapper<Scalars["String"]>;
};

export type Translation = {
  __typename?: "Translation";
  id: FieldWrapper<Scalars["ID"]>;
  locale: FieldWrapper<Scalars["String"]>;
  name: FieldWrapper<Scalars["String"]>;
  ressourceId: FieldWrapper<Scalars["String"]>;
  scope: FieldWrapper<Scalars["String"]>;
  value: FieldWrapper<Scalars["String"]>;
};

export type TranslationConfig = {
  __typename?: "TranslationConfig";
  helpTextName: FieldWrapper<Scalars["String"]>;
  label: FieldWrapper<Scalars["String"]>;
};

export type TranslationConfigInput = {
  helpTextName: Scalars["String"];
  label: Scalars["String"];
};

export type TranslationConnection = {
  __typename?: "TranslationConnection";
  edges: Array<FieldWrapper<TranslationEdge>>;
  pageInfo: FieldWrapper<PageInfo>;
};

export type TranslationEdge = {
  __typename?: "TranslationEdge";
  cursor: FieldWrapper<Scalars["String"]>;
  node: FieldWrapper<Translation>;
};

export type TranslationInput = {
  locale: Scalars["String"];
  name: Scalars["String"];
  value: Scalars["String"];
};

export type TranslationUpdateInput = {
  locale: Scalars["String"];
  name: Scalars["String"];
  ressourceId: Scalars["String"];
  scope: Scalars["String"];
  value: Scalars["String"];
};

export type Trigger = {
  __typename?: "Trigger";
  action: FieldWrapper<TriggerAction>;
  params: Array<FieldWrapper<TriggerParam>>;
  targetTypeId: FieldWrapper<Scalars["String"]>;
};

export enum TriggerAction {
  CHANGE_NAME = "CHANGE_NAME",
  SET_VISIBILITY = "SET_VISIBILITY",
}

export type TriggerInput = {
  action: TriggerAction;
  params: Array<TriggerParamInput>;
  targetTypeId: Scalars["String"];
};

export type TriggerParam = {
  __typename?: "TriggerParam";
  name: FieldWrapper<Scalars["String"]>;
  value: FieldWrapper<Scalars["String"]>;
};

export type TriggerParamInput = {
  name: Scalars["String"];
  value: Scalars["String"];
};

export type Unit = {
  __typename?: "Unit";
  id: FieldWrapper<Scalars["ID"]>;
};

export type User = {
  __typename?: "User";
  email: FieldWrapper<Scalars["String"]>;
  id: FieldWrapper<Scalars["String"]>;
  oauthId: FieldWrapper<Scalars["ID"]>;
  organizationId: FieldWrapper<Scalars["String"]>;
  permissions: Array<FieldWrapper<Scalars["String"]>>;
};

export type CreateSingleUserOrganizationMutationVariables = Exact<{
  singleUserOrganization: NewSingleUserOrganizationInput;
}>;

export type CreateSingleUserOrganizationMutation = {
  __typename?: "Mutation";
} & {
  createSingleUserOrganization: { __typename?: "User" } & Pick<
    User,
    "oauthId" | "id" | "email" | "permissions" | "organizationId"
  >;
};

export type FindDistributablesQueryVariables = Exact<{
  projectId: Scalars["ID"];
}>;

export type FindDistributablesQuery = { __typename?: "Query" } & {
  findDistributables: Array<
    { __typename?: "ReportDefinition" } & Pick<
      ReportDefinition,
      "id" | "projectDefinitionId" | "name"
    >
  >;
};

export type FindDistributableItemsQueryVariables = Exact<{
  projectId: Scalars["ID"];
  reportDefinitionId: Scalars["ID"];
}>;

export type FindDistributableItemsQuery = { __typename?: "Query" } & {
  findDistributableItems: Array<
    { __typename?: "DistributableItem" } & Pick<
      DistributableItem,
      | "id"
      | "projectId"
      | "reportDefinitionId"
      | "nodeId"
      | "formulaId"
      | "distribution_ids"
      | "obsolete"
    > & {
        suppliedItem: { __typename?: "SuppliedItem" } & Pick<
          SuppliedItem,
          "datasheetId" | "elementDefId" | "childReferenceId"
        > & {
            organization: { __typename?: "Organization" } & Pick<
              Organization,
              "id" | "name" | "email"
            >;
          };
        summary: { __typename?: "ComputedValue" } & Pick<
          ComputedValue,
          "label" | "unit"
        > & {
            value:
              | ({ __typename: "BoolFieldValue" } & Pick<
                  BoolFieldValue,
                  "enabled"
                >)
              | ({ __typename: "DecimalFieldValue" } & Pick<
                  DecimalFieldValue,
                  "numeric"
                >)
              | ({ __typename: "IntFieldValue" } & Pick<
                  IntFieldValue,
                  "integer"
                >)
              | { __typename: "ReferenceId" }
              | ({ __typename: "StringFieldValue" } & Pick<
                  StringFieldValue,
                  "text"
                >);
          };
        columns: Array<
          { __typename?: "ComputedValue" } & Pick<
            ComputedValue,
            "label" | "unit"
          > & {
              value:
                | ({ __typename: "BoolFieldValue" } & Pick<
                    BoolFieldValue,
                    "enabled"
                  >)
                | ({ __typename: "DecimalFieldValue" } & Pick<
                    DecimalFieldValue,
                    "numeric"
                  >)
                | ({ __typename: "IntFieldValue" } & Pick<
                    IntFieldValue,
                    "integer"
                  >)
                | { __typename: "ReferenceId" }
                | ({ __typename: "StringFieldValue" } & Pick<
                    StringFieldValue,
                    "text"
                  >);
            }
        >;
      }
  >;
};

export type CreateDatasheetMutationVariables = Exact<{
  datasheet: DatasheetInput;
}>;

export type CreateDatasheetMutation = { __typename?: "Mutation" } & {
  createDatasheet: { __typename?: "Datasheet" } & Pick<
    Datasheet,
    "id" | "name" | "projectDefinitionId" | "fromDatasheetId"
  >;
};

export type FindDatasheetsQueryVariables = Exact<{
  query: Scalars["String"];
  first: Scalars["Int"];
  after?: Maybe<Scalars["String"]>;
}>;

export type FindDatasheetsQuery = { __typename?: "Query" } & {
  results: { __typename?: "DatasheetConnection" } & {
    pageInfo: { __typename?: "PageInfo" } & Pick<
      PageInfo,
      "totalCount" | "hasNextPage" | "endCursor"
    >;
    edges: Array<
      { __typename?: "DatasheetEdge" } & Pick<DatasheetEdge, "cursor"> & {
          node: { __typename?: "Datasheet" } & Pick<
            Datasheet,
            "id" | "name" | "projectDefinitionId" | "fromDatasheetId"
          >;
        }
    >;
  };
};

export type AddProjectDefinitionNodeMutationVariables = Exact<{
  projectDefinitionId: Scalars["ID"];
  node: ProjectDefinitionNodeCreationInput;
}>;

export type AddProjectDefinitionNodeMutation = { __typename?: "Mutation" } & {
  addProjectDefinitionNode: { __typename?: "ProjectDefinitionNode" } & Pick<
    ProjectDefinitionNode,
    | "id"
    | "projectDefinitionId"
    | "name"
    | "isCollection"
    | "instanciateByDefault"
    | "ordinal"
  > & {
      fieldDetails?: Maybe<
        | ({ __typename: "BoolFieldConfig" } & Pick<BoolFieldConfig, "enabled">)
        | ({ __typename: "CollapsibleContainerFieldConfig" } & Pick<
            CollapsibleContainerFieldConfig,
            "isCollapsible"
          >)
        | ({ __typename: "DecimalFieldConfig" } & Pick<
            DecimalFieldConfig,
            "unit" | "precision" | "numeric"
          >)
        | ({ __typename: "IntFieldConfig" } & Pick<
            IntFieldConfig,
            "unit" | "integer"
          >)
        | ({ __typename: "StaticChoiceFieldConfig" } & Pick<
            StaticChoiceFieldConfig,
            "selected"
          > & {
              options: Array<
                { __typename?: "StaticChoiceOption" } & Pick<
                  StaticChoiceOption,
                  "id" | "label" | "helpText"
                >
              >;
            })
        | { __typename: "StaticNumberFieldConfig" }
        | ({ __typename: "StringFieldConfig" } & Pick<
            StringFieldConfig,
            "transforms" | "text"
          >)
      >;
    };
};

export type UpdateProjectDefinitionNodeMutationVariables = Exact<{
  projectDefinitionId: Scalars["ID"];
  nodeId: Scalars["ID"];
  node: ProjectDefinitionNodeCreationInput;
}>;

export type UpdateProjectDefinitionNodeMutation = {
  __typename?: "Mutation";
} & {
  updateProjectDefinitionNode: { __typename?: "ProjectDefinitionNode" } & Pick<
    ProjectDefinitionNode,
    | "id"
    | "projectDefinitionId"
    | "name"
    | "isCollection"
    | "instanciateByDefault"
    | "ordinal"
  > & {
      fieldDetails?: Maybe<
        | ({ __typename: "BoolFieldConfig" } & Pick<BoolFieldConfig, "enabled">)
        | ({ __typename: "CollapsibleContainerFieldConfig" } & Pick<
            CollapsibleContainerFieldConfig,
            "isCollapsible"
          >)
        | ({ __typename: "DecimalFieldConfig" } & Pick<
            DecimalFieldConfig,
            "unit" | "precision" | "numeric"
          >)
        | ({ __typename: "IntFieldConfig" } & Pick<
            IntFieldConfig,
            "unit" | "integer"
          >)
        | ({ __typename: "StaticChoiceFieldConfig" } & Pick<
            StaticChoiceFieldConfig,
            "selected"
          > & {
              options: Array<
                { __typename?: "StaticChoiceOption" } & Pick<
                  StaticChoiceOption,
                  "id" | "label" | "helpText"
                >
              >;
            })
        | { __typename: "StaticNumberFieldConfig" }
        | ({ __typename: "StringFieldConfig" } & Pick<
            StringFieldConfig,
            "transforms" | "text"
          >)
      >;
    };
};

export type DeleteProjectDefinitionNodeMutationVariables = Exact<{
  projectDefinitionId: Scalars["ID"];
  nodeId: Scalars["ID"];
}>;

export type DeleteProjectDefinitionNodeMutation = {
  __typename?: "Mutation";
} & Pick<Mutation, "deleteProjectDefinitionNode">;

export type AddProjectDefinitionMutationVariables = Exact<{
  definitionInput: DefinitionInput;
}>;

export type AddProjectDefinitionMutation = { __typename?: "Mutation" } & {
  addProjectDefinition: { __typename?: "ProjectDefinition" } & Pick<
    ProjectDefinition,
    "id" | "name"
  >;
};

export type AddAggregateCollectionMutationVariables = Exact<{
  projectDefinitionId: Scalars["ID"];
  collection: AggregateCollectionInput;
}>;

export type AddAggregateCollectionMutation = { __typename?: "Mutation" } & {
  addAggregateCollection: { __typename?: "AggregateCollection" } & Pick<
    AggregateCollection,
    "id" | "projectDefinitionId" | "name" | "isAbstract"
  > & {
      attributesSchema: Array<
        { __typename?: "AggregateAttributeSchema" } & Pick<
          AggregateAttributeSchema,
          "name"
        > & {
            details:
              | ({ __typename: "AggregateReferenceConfig" } & Pick<
                  AggregateReferenceConfig,
                  "fromCollection"
                >)
              | ({ __typename: "BoolFieldConfig" } & Pick<
                  BoolFieldConfig,
                  "enabled"
                >)
              | ({ __typename: "DecimalFieldConfig" } & Pick<
                  DecimalFieldConfig,
                  "unit" | "precision" | "numeric"
                >)
              | ({ __typename: "IntFieldConfig" } & Pick<
                  IntFieldConfig,
                  "unit" | "integer"
                >)
              | ({ __typename: "NodeReferenceConfig" } & Pick<
                  NodeReferenceConfig,
                  "nodeType"
                >)
              | ({ __typename: "StaticChoiceFieldConfig" } & Pick<
                  StaticChoiceFieldConfig,
                  "selected"
                > & {
                    options: Array<
                      { __typename?: "StaticChoiceOption" } & Pick<
                        StaticChoiceOption,
                        "id" | "label" | "helpText"
                      >
                    >;
                  })
              | ({ __typename: "StringFieldConfig" } & Pick<
                  StringFieldConfig,
                  "transforms" | "text"
                >);
          }
      >;
    };
};

export type UpdateAggregateCollectionMutationVariables = Exact<{
  projectDefinitionId: Scalars["ID"];
  collectionId: Scalars["ID"];
  collection: AggregateCollectionInput;
}>;

export type UpdateAggregateCollectionMutation = { __typename?: "Mutation" } & {
  updateAggregateCollection: { __typename?: "AggregateCollection" } & Pick<
    AggregateCollection,
    "id" | "projectDefinitionId" | "name" | "isAbstract"
  > & {
      attributesSchema: Array<
        { __typename?: "AggregateAttributeSchema" } & Pick<
          AggregateAttributeSchema,
          "name"
        > & {
            details:
              | ({ __typename: "AggregateReferenceConfig" } & Pick<
                  AggregateReferenceConfig,
                  "fromCollection"
                >)
              | ({ __typename: "BoolFieldConfig" } & Pick<
                  BoolFieldConfig,
                  "enabled"
                >)
              | ({ __typename: "DecimalFieldConfig" } & Pick<
                  DecimalFieldConfig,
                  "unit" | "precision" | "numeric"
                >)
              | ({ __typename: "IntFieldConfig" } & Pick<
                  IntFieldConfig,
                  "unit" | "integer"
                >)
              | ({ __typename: "NodeReferenceConfig" } & Pick<
                  NodeReferenceConfig,
                  "nodeType"
                >)
              | ({ __typename: "StaticChoiceFieldConfig" } & Pick<
                  StaticChoiceFieldConfig,
                  "selected"
                > & {
                    options: Array<
                      { __typename?: "StaticChoiceOption" } & Pick<
                        StaticChoiceOption,
                        "id" | "label" | "helpText"
                      >
                    >;
                  })
              | ({ __typename: "StringFieldConfig" } & Pick<
                  StringFieldConfig,
                  "transforms" | "text"
                >);
          }
      >;
    };
};

export type AddAggregateMutationVariables = Exact<{
  projectDefinitionId: Scalars["ID"];
  collectionId: Scalars["ID"];
  aggregate: AggregateInput;
}>;

export type AddAggregateMutation = { __typename?: "Mutation" } & {
  addAggregate: { __typename?: "Aggregate" } & Pick<
    Aggregate,
    | "id"
    | "projectDefinitionId"
    | "collectionId"
    | "name"
    | "ordinal"
    | "isExtendable"
  > & {
      translated: Array<
        { __typename?: "Translation" } & Pick<
          Translation,
          "ressourceId" | "locale" | "scope" | "name" | "value"
        >
      >;
      attributes: Array<
        { __typename?: "AggregateAttribute" } & Pick<
          AggregateAttribute,
          "name" | "isReadonly"
        > & {
            value:
              | ({ __typename: "BoolFieldValue" } & Pick<
                  BoolFieldValue,
                  "enabled"
                >)
              | ({ __typename: "DecimalFieldValue" } & Pick<
                  DecimalFieldValue,
                  "numeric"
                >)
              | ({ __typename: "IntFieldValue" } & Pick<
                  IntFieldValue,
                  "integer"
                >)
              | ({ __typename: "ReferenceId" } & Pick<ReferenceId, "uuid">)
              | ({ __typename: "StringFieldValue" } & Pick<
                  StringFieldValue,
                  "text"
                >);
          }
      >;
    };
};

export type UpdateAggregateMutationVariables = Exact<{
  projectDefinitionId: Scalars["ID"];
  collectionId: Scalars["ID"];
  aggregateId: Scalars["ID"];
  aggregate: AggregateInput;
}>;

export type UpdateAggregateMutation = { __typename?: "Mutation" } & {
  updateAggregate: { __typename?: "Aggregate" } & Pick<
    Aggregate,
    | "id"
    | "projectDefinitionId"
    | "collectionId"
    | "name"
    | "ordinal"
    | "isExtendable"
  > & {
      translated: Array<
        { __typename?: "Translation" } & Pick<
          Translation,
          "ressourceId" | "locale" | "scope" | "name" | "value"
        >
      >;
      attributes: Array<
        { __typename?: "AggregateAttribute" } & Pick<
          AggregateAttribute,
          "name" | "isReadonly"
        > & {
            value:
              | ({ __typename: "BoolFieldValue" } & Pick<
                  BoolFieldValue,
                  "enabled"
                >)
              | ({ __typename: "DecimalFieldValue" } & Pick<
                  DecimalFieldValue,
                  "numeric"
                >)
              | ({ __typename: "IntFieldValue" } & Pick<
                  IntFieldValue,
                  "integer"
                >)
              | ({ __typename: "ReferenceId" } & Pick<ReferenceId, "uuid">)
              | ({ __typename: "StringFieldValue" } & Pick<
                  StringFieldValue,
                  "text"
                >);
          }
      >;
    };
};

export type DeleteAggregateMutationVariables = Exact<{
  projectDefinitionId: Scalars["ID"];
  collectionId: Scalars["ID"];
  aggregateId: Scalars["ID"];
}>;

export type DeleteAggregateMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "deleteAggregate"
>;

export type FindProjectDefinitionFormulasQueryVariables = Exact<{
  projectDefinitionId: Scalars["ID"];
  query: Scalars["String"];
  first: Scalars["Int"];
  after?: Maybe<Scalars["String"]>;
}>;

export type FindProjectDefinitionFormulasQuery = { __typename?: "Query" } & {
  results: { __typename?: "FormulaConnection" } & {
    pageInfo: { __typename?: "PageInfo" } & Pick<
      PageInfo,
      "hasNextPage" | "endCursor" | "totalCount"
    >;
    edges: Array<
      { __typename?: "FormulaEdge" } & Pick<FormulaEdge, "cursor"> & {
          node: { __typename?: "Formula" } & Pick<
            Formula,
            "id" | "name" | "expression"
          >;
        }
    >;
  };
};

export type FindProjectDefinitionRootSectionsQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type FindProjectDefinitionRootSectionsQuery = {
  __typename?: "Query";
} & {
  findProjectDefinitionRootSections: {
    __typename?: "ProjectDefinitionNodeTree";
  } & {
    roots: Array<
      { __typename?: "ProjectDefinitionTreeNode" } & {
        definition: { __typename?: "ProjectDefinitionNode" } & Pick<
          ProjectDefinitionNode,
          | "id"
          | "projectDefinitionId"
          | "name"
          | "isCollection"
          | "instanciateByDefault"
          | "ordinal"
          | "validator"
          | "path"
        > & {
            translations: { __typename?: "TranslationConfig" } & Pick<
              TranslationConfig,
              "helpTextName" | "label"
            >;
            fieldDetails?: Maybe<
              | ({ __typename: "BoolFieldConfig" } & Pick<
                  BoolFieldConfig,
                  "enabled"
                >)
              | ({ __typename: "CollapsibleContainerFieldConfig" } & Pick<
                  CollapsibleContainerFieldConfig,
                  "isCollapsible"
                >)
              | ({ __typename: "DecimalFieldConfig" } & Pick<
                  DecimalFieldConfig,
                  "unit" | "precision" | "numeric"
                >)
              | ({ __typename: "IntFieldConfig" } & Pick<
                  IntFieldConfig,
                  "unit" | "integer"
                >)
              | ({ __typename: "StaticChoiceFieldConfig" } & Pick<
                  StaticChoiceFieldConfig,
                  "selected"
                > & {
                    options: Array<
                      { __typename?: "StaticChoiceOption" } & Pick<
                        StaticChoiceOption,
                        "id" | "label" | "helpText"
                      >
                    >;
                  })
              | ({ __typename: "StaticNumberFieldConfig" } & Pick<
                  StaticNumberFieldConfig,
                  "passToTranslation" | "precision" | "unit"
                >)
              | ({ __typename: "StringFieldConfig" } & Pick<
                  StringFieldConfig,
                  "transforms" | "text"
                >)
            >;
          };
      }
    >;
  };
};

export type FindProjectDefinitionRootSectionContainersQueryVariables = Exact<{
  id: Scalars["ID"];
  rootSectionId: Scalars["ID"];
}>;

export type FindProjectDefinitionRootSectionContainersQuery = {
  __typename?: "Query";
} & {
  findProjectDefinitionRootSectionContainers: {
    __typename?: "ProjectDefinitionNodeTree";
  } & {
    roots: Array<
      { __typename?: "ProjectDefinitionTreeNode" } & {
        definition: { __typename?: "ProjectDefinitionNode" } & Pick<
          ProjectDefinitionNode,
          | "id"
          | "projectDefinitionId"
          | "name"
          | "isCollection"
          | "instanciateByDefault"
          | "ordinal"
          | "validator"
          | "path"
        > & {
            translations: { __typename?: "TranslationConfig" } & Pick<
              TranslationConfig,
              "helpTextName" | "label"
            >;
            fieldDetails?: Maybe<
              | ({ __typename: "BoolFieldConfig" } & Pick<
                  BoolFieldConfig,
                  "enabled"
                >)
              | ({ __typename: "CollapsibleContainerFieldConfig" } & Pick<
                  CollapsibleContainerFieldConfig,
                  "isCollapsible"
                >)
              | ({ __typename: "DecimalFieldConfig" } & Pick<
                  DecimalFieldConfig,
                  "unit" | "precision" | "numeric"
                >)
              | ({ __typename: "IntFieldConfig" } & Pick<
                  IntFieldConfig,
                  "unit" | "integer"
                >)
              | ({ __typename: "StaticChoiceFieldConfig" } & Pick<
                  StaticChoiceFieldConfig,
                  "selected"
                > & {
                    options: Array<
                      { __typename?: "StaticChoiceOption" } & Pick<
                        StaticChoiceOption,
                        "id" | "label" | "helpText"
                      >
                    >;
                  })
              | ({ __typename: "StaticNumberFieldConfig" } & Pick<
                  StaticNumberFieldConfig,
                  "passToTranslation" | "precision" | "unit"
                >)
              | ({ __typename: "StringFieldConfig" } & Pick<
                  StringFieldConfig,
                  "transforms" | "text"
                >)
            >;
          };
        children: Array<
          { __typename?: "ProjectDefinitionTreeNode" } & {
            definition: { __typename?: "ProjectDefinitionNode" } & Pick<
              ProjectDefinitionNode,
              | "id"
              | "projectDefinitionId"
              | "name"
              | "isCollection"
              | "instanciateByDefault"
              | "ordinal"
              | "validator"
              | "path"
            > & {
                translations: { __typename?: "TranslationConfig" } & Pick<
                  TranslationConfig,
                  "helpTextName" | "label"
                >;
                fieldDetails?: Maybe<
                  | ({ __typename: "BoolFieldConfig" } & Pick<
                      BoolFieldConfig,
                      "enabled"
                    >)
                  | ({ __typename: "CollapsibleContainerFieldConfig" } & Pick<
                      CollapsibleContainerFieldConfig,
                      "isCollapsible"
                    >)
                  | ({ __typename: "DecimalFieldConfig" } & Pick<
                      DecimalFieldConfig,
                      "unit" | "precision" | "numeric"
                    >)
                  | ({ __typename: "IntFieldConfig" } & Pick<
                      IntFieldConfig,
                      "unit" | "integer"
                    >)
                  | ({ __typename: "StaticChoiceFieldConfig" } & Pick<
                      StaticChoiceFieldConfig,
                      "selected"
                    > & {
                        options: Array<
                          { __typename?: "StaticChoiceOption" } & Pick<
                            StaticChoiceOption,
                            "id" | "label" | "helpText"
                          >
                        >;
                      })
                  | ({ __typename: "StaticNumberFieldConfig" } & Pick<
                      StaticNumberFieldConfig,
                      "passToTranslation" | "precision" | "unit"
                    >)
                  | ({ __typename: "StringFieldConfig" } & Pick<
                      StringFieldConfig,
                      "transforms" | "text"
                    >)
                >;
              };
          }
        >;
      }
    >;
  };
};

export type FindProjectDefinitionFormContentQueryVariables = Exact<{
  id: Scalars["ID"];
  formId: Scalars["ID"];
}>;

export type FindProjectDefinitionFormContentQuery = { __typename?: "Query" } & {
  findProjectDefinitionNode: { __typename?: "ProjectDefinitionNode" } & Pick<
    ProjectDefinitionNode,
    | "id"
    | "projectDefinitionId"
    | "name"
    | "isCollection"
    | "instanciateByDefault"
    | "ordinal"
    | "path"
    | "validator"
  > & {
      triggers: Array<
        { __typename?: "Trigger" } & Pick<
          Trigger,
          "action" | "targetTypeId"
        > & {
            params: Array<
              { __typename?: "TriggerParam" } & Pick<
                TriggerParam,
                "name" | "value"
              >
            >;
          }
      >;
      translations: { __typename?: "TranslationConfig" } & Pick<
        TranslationConfig,
        "helpTextName" | "label"
      >;
      fieldDetails?: Maybe<
        | ({ __typename: "BoolFieldConfig" } & Pick<BoolFieldConfig, "enabled">)
        | ({ __typename: "CollapsibleContainerFieldConfig" } & Pick<
            CollapsibleContainerFieldConfig,
            "isCollapsible"
          >)
        | ({ __typename: "DecimalFieldConfig" } & Pick<
            DecimalFieldConfig,
            "unit" | "precision" | "numeric"
          >)
        | ({ __typename: "IntFieldConfig" } & Pick<
            IntFieldConfig,
            "unit" | "integer"
          >)
        | ({ __typename: "StaticChoiceFieldConfig" } & Pick<
            StaticChoiceFieldConfig,
            "selected"
          > & {
              options: Array<
                { __typename?: "StaticChoiceOption" } & Pick<
                  StaticChoiceOption,
                  "id" | "label" | "helpText"
                >
              >;
            })
        | ({ __typename: "StaticNumberFieldConfig" } & Pick<
            StaticNumberFieldConfig,
            "passToTranslation" | "precision" | "unit"
          >)
        | ({ __typename: "StringFieldConfig" } & Pick<
            StringFieldConfig,
            "transforms" | "text"
          >)
      >;
    };
  findProjectDefinitionFormContent: {
    __typename?: "ProjectDefinitionNodeTree";
  } & {
    roots: Array<
      { __typename?: "ProjectDefinitionTreeNode" } & {
        definition: { __typename?: "ProjectDefinitionNode" } & Pick<
          ProjectDefinitionNode,
          | "id"
          | "projectDefinitionId"
          | "name"
          | "isCollection"
          | "instanciateByDefault"
          | "ordinal"
          | "validator"
          | "path"
        > & {
            triggers: Array<
              { __typename?: "Trigger" } & Pick<
                Trigger,
                "action" | "targetTypeId"
              > & {
                  params: Array<
                    { __typename?: "TriggerParam" } & Pick<
                      TriggerParam,
                      "name" | "value"
                    >
                  >;
                }
            >;
            translations: { __typename?: "TranslationConfig" } & Pick<
              TranslationConfig,
              "helpTextName" | "label"
            >;
            fieldDetails?: Maybe<
              | ({ __typename: "BoolFieldConfig" } & Pick<
                  BoolFieldConfig,
                  "enabled"
                >)
              | ({ __typename: "CollapsibleContainerFieldConfig" } & Pick<
                  CollapsibleContainerFieldConfig,
                  "isCollapsible"
                >)
              | ({ __typename: "DecimalFieldConfig" } & Pick<
                  DecimalFieldConfig,
                  "unit" | "precision" | "numeric"
                >)
              | ({ __typename: "IntFieldConfig" } & Pick<
                  IntFieldConfig,
                  "unit" | "integer"
                >)
              | ({ __typename: "StaticChoiceFieldConfig" } & Pick<
                  StaticChoiceFieldConfig,
                  "selected"
                > & {
                    options: Array<
                      { __typename?: "StaticChoiceOption" } & Pick<
                        StaticChoiceOption,
                        "id" | "label" | "helpText"
                      >
                    >;
                  })
              | ({ __typename: "StaticNumberFieldConfig" } & Pick<
                  StaticNumberFieldConfig,
                  "passToTranslation" | "precision" | "unit"
                >)
              | ({ __typename: "StringFieldConfig" } & Pick<
                  StringFieldConfig,
                  "transforms" | "text"
                >)
            >;
          };
        children: Array<
          { __typename?: "ProjectDefinitionTreeNode" } & {
            definition: { __typename?: "ProjectDefinitionNode" } & Pick<
              ProjectDefinitionNode,
              | "id"
              | "projectDefinitionId"
              | "name"
              | "isCollection"
              | "instanciateByDefault"
              | "ordinal"
              | "validator"
              | "path"
            > & {
                triggers: Array<
                  { __typename?: "Trigger" } & Pick<
                    Trigger,
                    "action" | "targetTypeId"
                  > & {
                      params: Array<
                        { __typename?: "TriggerParam" } & Pick<
                          TriggerParam,
                          "name" | "value"
                        >
                      >;
                    }
                >;
                translations: { __typename?: "TranslationConfig" } & Pick<
                  TranslationConfig,
                  "helpTextName" | "label"
                >;
                fieldDetails?: Maybe<
                  | ({ __typename: "BoolFieldConfig" } & Pick<
                      BoolFieldConfig,
                      "enabled"
                    >)
                  | ({ __typename: "CollapsibleContainerFieldConfig" } & Pick<
                      CollapsibleContainerFieldConfig,
                      "isCollapsible"
                    >)
                  | ({ __typename: "DecimalFieldConfig" } & Pick<
                      DecimalFieldConfig,
                      "unit" | "precision" | "numeric"
                    >)
                  | ({ __typename: "IntFieldConfig" } & Pick<
                      IntFieldConfig,
                      "unit" | "integer"
                    >)
                  | ({ __typename: "StaticChoiceFieldConfig" } & Pick<
                      StaticChoiceFieldConfig,
                      "selected"
                    > & {
                        options: Array<
                          { __typename?: "StaticChoiceOption" } & Pick<
                            StaticChoiceOption,
                            "id" | "label" | "helpText"
                          >
                        >;
                      })
                  | ({ __typename: "StaticNumberFieldConfig" } & Pick<
                      StaticNumberFieldConfig,
                      "passToTranslation" | "precision" | "unit"
                    >)
                  | ({ __typename: "StringFieldConfig" } & Pick<
                      StringFieldConfig,
                      "transforms" | "text"
                    >)
                >;
              };
          }
        >;
      }
    >;
  };
};

export type FindProjectDefinitionNodeQueryVariables = Exact<{
  projectDefinitionId: Scalars["ID"];
  nodeId: Scalars["ID"];
}>;

export type FindProjectDefinitionNodeQuery = { __typename?: "Query" } & {
  findProjectDefinitionNode: { __typename?: "ProjectDefinitionNode" } & Pick<
    ProjectDefinitionNode,
    | "id"
    | "projectDefinitionId"
    | "name"
    | "isCollection"
    | "instanciateByDefault"
    | "ordinal"
    | "path"
    | "validator"
  > & {
      triggers: Array<
        { __typename?: "Trigger" } & Pick<
          Trigger,
          "action" | "targetTypeId"
        > & {
            params: Array<
              { __typename?: "TriggerParam" } & Pick<
                TriggerParam,
                "name" | "value"
              >
            >;
          }
      >;
      translations: { __typename?: "TranslationConfig" } & Pick<
        TranslationConfig,
        "helpTextName" | "label"
      >;
      meta: { __typename?: "NodeMetaConfig" } & Pick<
        NodeMetaConfig,
        "isVisible"
      >;
      fieldDetails?: Maybe<
        | ({ __typename: "BoolFieldConfig" } & Pick<BoolFieldConfig, "enabled">)
        | ({ __typename: "CollapsibleContainerFieldConfig" } & Pick<
            CollapsibleContainerFieldConfig,
            "isCollapsible"
          >)
        | ({ __typename: "DecimalFieldConfig" } & Pick<
            DecimalFieldConfig,
            "unit" | "precision" | "numeric"
          >)
        | ({ __typename: "IntFieldConfig" } & Pick<
            IntFieldConfig,
            "unit" | "integer"
          >)
        | ({ __typename: "StaticChoiceFieldConfig" } & Pick<
            StaticChoiceFieldConfig,
            "selected"
          > & {
              options: Array<
                { __typename?: "StaticChoiceOption" } & Pick<
                  StaticChoiceOption,
                  "id" | "label" | "helpText"
                >
              >;
            })
        | ({ __typename: "StaticNumberFieldConfig" } & Pick<
            StaticNumberFieldConfig,
            "passToTranslation" | "precision" | "unit"
          >)
        | ({ __typename: "StringFieldConfig" } & Pick<
            StringFieldConfig,
            "transforms" | "text"
          >)
      >;
      translated: Array<
        { __typename?: "Translation" } & Pick<
          Translation,
          "id" | "ressourceId" | "locale" | "scope" | "name" | "value"
        >
      >;
    };
};

export type FindProjectDefintionsQueryVariables = Exact<{
  query: Scalars["String"];
  first: Scalars["Int"];
  after?: Maybe<Scalars["String"]>;
}>;

export type FindProjectDefintionsQuery = { __typename?: "Query" } & {
  results: { __typename?: "ProjectDefinitionConnection" } & {
    edges: Array<
      { __typename?: "ProjectDefinitionEdge" } & Pick<
        ProjectDefinitionEdge,
        "cursor"
      > & {
          node: { __typename?: "ProjectDefinition" } & Pick<
            ProjectDefinition,
            "id" | "name"
          >;
        }
    >;
    pageInfo: { __typename?: "PageInfo" } & Pick<
      PageInfo,
      "hasNextPage" | "endCursor" | "totalCount"
    >;
  };
};

export type UnitsQueryVariables = Exact<{ [key: string]: never }>;

export type UnitsQuery = { __typename?: "Query" } & {
  units: Array<{ __typename?: "Unit" } & Pick<Unit, "id">>;
};

export type FindDefinitionFormulaFieldMixQueryVariables = Exact<{
  projectDefinitionId: Scalars["ID"];
  query: Scalars["String"];
  first: Scalars["Int"];
  after?: Maybe<Scalars["String"]>;
}>;

export type FindDefinitionFormulaFieldMixQuery = { __typename?: "Query" } & {
  results: { __typename?: "CoreDefinitionNodeConnection" } & {
    edges: Array<
      { __typename?: "CoreDefinitionNodeEdge" } & Pick<
        CoreDefinitionNodeEdge,
        "cursor"
      > & {
          node: { __typename?: "CoreDefinitionNode" } & Pick<
            CoreDefinitionNode,
            "id"
          > & { label: CoreDefinitionNode["name"] };
        }
    >;
    pageInfo: { __typename?: "PageInfo" } & Pick<
      PageInfo,
      "hasNextPage" | "endCursor" | "totalCount"
    >;
  };
};

export type FindFormulaQueryVariables = Exact<{
  projectDefinitionId: Scalars["ID"];
  formulaId: Scalars["ID"];
}>;

export type FindFormulaQuery = { __typename?: "Query" } & {
  result?: Maybe<
    { __typename?: "Formula" } & Pick<Formula, "id"> & {
        label: Formula["name"];
      }
  >;
};

export type FindAggregatesQueryVariables = Exact<{
  projectDefinitionId: Scalars["ID"];
  collectionId: Scalars["ID"];
  query: Scalars["String"];
  first: Scalars["Int"];
  after?: Maybe<Scalars["String"]>;
}>;

export type FindAggregatesQuery = { __typename?: "Query" } & {
  results: { __typename?: "AggregateConnection" } & {
    edges: Array<
      { __typename?: "AggregateEdge" } & Pick<AggregateEdge, "cursor"> & {
          node: { __typename?: "Aggregate" } & Pick<
            Aggregate,
            | "id"
            | "projectDefinitionId"
            | "collectionId"
            | "name"
            | "ordinal"
            | "isExtendable"
          > & {
              translated: Array<
                { __typename?: "Translation" } & Pick<
                  Translation,
                  "id" | "ressourceId" | "locale" | "scope" | "name" | "value"
                >
              >;
              attributes: Array<
                { __typename?: "AggregateAttribute" } & Pick<
                  AggregateAttribute,
                  "name" | "isReadonly"
                > & {
                    value:
                      | ({ __typename: "BoolFieldValue" } & Pick<
                          BoolFieldValue,
                          "enabled"
                        >)
                      | ({ __typename: "DecimalFieldValue" } & Pick<
                          DecimalFieldValue,
                          "numeric"
                        >)
                      | ({ __typename: "IntFieldValue" } & Pick<
                          IntFieldValue,
                          "integer"
                        >)
                      | ({ __typename: "ReferenceId" } & Pick<
                          ReferenceId,
                          "uuid"
                        >)
                      | ({ __typename: "StringFieldValue" } & Pick<
                          StringFieldValue,
                          "text"
                        >);
                  }
              >;
            };
        }
    >;
    pageInfo: { __typename?: "PageInfo" } & Pick<
      PageInfo,
      "hasNextPage" | "endCursor" | "totalCount"
    >;
  };
};

export type FindAggregateCollectionQueryVariables = Exact<{
  projectDefinitionId: Scalars["ID"];
  collectionId: Scalars["ID"];
}>;

export type FindAggregateCollectionQuery = { __typename?: "Query" } & {
  findAggregateCollection: { __typename?: "AggregateCollection" } & Pick<
    AggregateCollection,
    "id" | "projectDefinitionId" | "name" | "isAbstract"
  > & {
      translated: Array<
        { __typename?: "Translation" } & Pick<
          Translation,
          "id" | "ressourceId" | "locale" | "scope" | "name" | "value"
        >
      >;
      attributesSchema: Array<
        { __typename?: "AggregateAttributeSchema" } & Pick<
          AggregateAttributeSchema,
          "name"
        > & {
            details:
              | ({ __typename: "AggregateReferenceConfig" } & Pick<
                  AggregateReferenceConfig,
                  "fromCollection"
                >)
              | ({ __typename: "BoolFieldConfig" } & Pick<
                  BoolFieldConfig,
                  "enabled"
                >)
              | ({ __typename: "DecimalFieldConfig" } & Pick<
                  DecimalFieldConfig,
                  "unit" | "precision" | "numeric"
                >)
              | ({ __typename: "IntFieldConfig" } & Pick<
                  IntFieldConfig,
                  "unit" | "integer"
                >)
              | ({ __typename: "NodeReferenceConfig" } & Pick<
                  NodeReferenceConfig,
                  "nodeType"
                >)
              | ({ __typename: "StaticChoiceFieldConfig" } & Pick<
                  StaticChoiceFieldConfig,
                  "selected"
                > & {
                    options: Array<
                      { __typename?: "StaticChoiceOption" } & Pick<
                        StaticChoiceOption,
                        "id" | "label" | "helpText"
                      >
                    >;
                  })
              | ({ __typename: "StringFieldConfig" } & Pick<
                  StringFieldConfig,
                  "transforms" | "text"
                >);
          }
      >;
    };
};

export type ReportViewQueryVariables = Exact<{
  projectDefinitionId: Scalars["ID"];
}>;

export type ReportViewQuery = { __typename?: "Query" } & {
  findDefinitionAggregateCollections: Array<
    { __typename?: "AggregateCollection" } & Pick<
      AggregateCollection,
      "id" | "projectDefinitionId" | "name" | "isAbstract"
    > & {
        translated: Array<
          { __typename?: "Translation" } & Pick<
            Translation,
            "id" | "locale" | "scope" | "name" | "value"
          >
        >;
        attributesSchema: Array<
          { __typename?: "AggregateAttributeSchema" } & Pick<
            AggregateAttributeSchema,
            "name"
          > & {
              details:
                | ({ __typename: "AggregateReferenceConfig" } & Pick<
                    AggregateReferenceConfig,
                    "fromCollection"
                  >)
                | ({ __typename: "BoolFieldConfig" } & Pick<
                    BoolFieldConfig,
                    "enabled"
                  >)
                | ({ __typename: "DecimalFieldConfig" } & Pick<
                    DecimalFieldConfig,
                    "unit" | "precision" | "numeric"
                  >)
                | ({ __typename: "IntFieldConfig" } & Pick<
                    IntFieldConfig,
                    "unit" | "integer"
                  >)
                | ({ __typename: "NodeReferenceConfig" } & Pick<
                    NodeReferenceConfig,
                    "nodeType"
                  >)
                | ({ __typename: "StaticChoiceFieldConfig" } & Pick<
                    StaticChoiceFieldConfig,
                    "selected"
                  > & {
                      options: Array<
                        { __typename?: "StaticChoiceOption" } & Pick<
                          StaticChoiceOption,
                          "id" | "label" | "helpText"
                        >
                      >;
                    })
                | ({ __typename: "StringFieldConfig" } & Pick<
                    StringFieldConfig,
                    "transforms"
                  >);
              translations: { __typename?: "TranslationConfig" } & Pick<
                TranslationConfig,
                "helpTextName" | "label"
              >;
            }
        >;
      }
  >;
  findReportDefinitions: Array<
    { __typename?: "ReportDefinition" } & Pick<
      ReportDefinition,
      "id" | "name" | "projectDefinitionId"
    > & {
        structure: { __typename?: "ReportDefinitionStructure" } & Pick<
          ReportDefinitionStructure,
          "having"
        > & {
            selection: { __typename?: "Selection" } & Pick<
              Selection,
              "fromCollectionId" | "fromAlias"
            > & {
                joinsCache: Array<
                  { __typename?: "ReportJoin" } & Pick<
                    ReportJoin,
                    | "fromObjectName"
                    | "fromPropertyName"
                    | "joinOnCollection"
                    | "joinOnAttribute"
                    | "aliasName"
                    | "warnAboutIdleItems"
                    | "sameCardinality"
                    | "allowDicardElement"
                  >
                >;
                formulaAttribute: { __typename?: "AttributeBucket" } & Pick<
                  AttributeBucket,
                  "bucketName" | "attributeName"
                >;
                datasheetAttribute: { __typename?: "AttributeBucket" } & Pick<
                  AttributeBucket,
                  "bucketName"
                >;
              };
            columns: Array<
              { __typename?: "ReportComputation" } & Pick<
                ReportComputation,
                "name" | "expression" | "isVisible"
              > & {
                  unit?: Maybe<
                    | ({ __typename: "AttributeBucket" } & Pick<
                        AttributeBucket,
                        "bucketName" | "attributeName"
                      >)
                    | ({ __typename: "Unit" } & Pick<Unit, "id">)
                  >;
                }
            >;
            groupBy: Array<
              { __typename?: "AttributeBucket" } & Pick<
                AttributeBucket,
                "bucketName" | "attributeName"
              >
            >;
            orderBy: Array<
              { __typename?: "AttributeBucket" } & Pick<
                AttributeBucket,
                "bucketName" | "attributeName"
              >
            >;
          };
      }
  >;
};

export type CreateProjectMutationVariables = Exact<{
  projectDetails: ProjectDetailsInput;
}>;

export type CreateProjectMutation = { __typename?: "Mutation" } & {
  createProject: { __typename?: "ProjectDetails" } & Pick<
    ProjectDetails,
    "id" | "name" | "projectDefinitionId" | "datasheetId"
  >;
};

export type UpdateFieldsMutationVariables = Exact<{
  projectId: Scalars["ID"];
  updates: Array<FieldUpdateInput> | FieldUpdateInput;
}>;

export type UpdateFieldsMutation = { __typename?: "Mutation" } & {
  updateProjectFields: Array<
    Maybe<
      { __typename?: "ProjectNode" } & Pick<
        ProjectNode,
        "id" | "projectId" | "typePath" | "typeId" | "path" | "label"
      > & {
          value?: Maybe<
            | ({ __typename: "BoolFieldValue" } & Pick<
                BoolFieldValue,
                "enabled"
              >)
            | ({ __typename: "DecimalFieldValue" } & Pick<
                DecimalFieldValue,
                "numeric"
              >)
            | ({ __typename: "IntFieldValue" } & Pick<IntFieldValue, "integer">)
            | { __typename: "ReferenceId" }
            | ({ __typename: "StringFieldValue" } & Pick<
                StringFieldValue,
                "text"
              >)
          >;
        }
    >
  >;
};

export type AddProjectCollectionItemMutationVariables = Exact<{
  projectId: Scalars["ID"];
  collectionTarget: ProjectNodeCollectionTargetInput;
}>;

export type AddProjectCollectionItemMutation = { __typename?: "Mutation" } & {
  addProjectCollectionItem: Array<
    { __typename?: "ProjectNode" } & Pick<
      ProjectNode,
      "id" | "projectId" | "typePath" | "typeId" | "path" | "label"
    > & {
        value?: Maybe<
          | ({ __typename: "BoolFieldValue" } & Pick<BoolFieldValue, "enabled">)
          | ({ __typename: "DecimalFieldValue" } & Pick<
              DecimalFieldValue,
              "numeric"
            >)
          | ({ __typename: "IntFieldValue" } & Pick<IntFieldValue, "integer">)
          | { __typename: "ReferenceId" }
          | ({ __typename: "StringFieldValue" } & Pick<
              StringFieldValue,
              "text"
            >)
        >;
      }
  >;
};

export type CloneProjectCollectionMutationVariables = Exact<{
  projectId: Scalars["ID"];
  collectionNodeId: Scalars["ID"];
}>;

export type CloneProjectCollectionMutation = { __typename?: "Mutation" } & {
  cloneProjectCollection: Array<
    { __typename?: "ProjectNode" } & Pick<
      ProjectNode,
      "id" | "projectId" | "typePath" | "typeId" | "path" | "label"
    > & {
        value?: Maybe<
          | ({ __typename: "BoolFieldValue" } & Pick<BoolFieldValue, "enabled">)
          | ({ __typename: "DecimalFieldValue" } & Pick<
              DecimalFieldValue,
              "numeric"
            >)
          | ({ __typename: "IntFieldValue" } & Pick<IntFieldValue, "integer">)
          | { __typename: "ReferenceId" }
          | ({ __typename: "StringFieldValue" } & Pick<
              StringFieldValue,
              "text"
            >)
        >;
      }
  >;
};

export type DeleteProjectCollectionMutationVariables = Exact<{
  projectId: Scalars["ID"];
  collectionNodeId: Scalars["ID"];
}>;

export type DeleteProjectCollectionMutation = { __typename?: "Mutation" } & {
  deleteProjectCollection: { __typename?: "ProjectNode" } & Pick<
    ProjectNode,
    "id" | "path"
  >;
};

export type FindProjectsQueryVariables = Exact<{
  query: Scalars["String"];
  first: Scalars["Int"];
  after?: Maybe<Scalars["String"]>;
}>;

export type FindProjectsQuery = { __typename?: "Query" } & {
  results: { __typename?: "ProjectConnection" } & {
    edges: Array<
      { __typename?: "ProjectEdge" } & Pick<ProjectEdge, "cursor"> & {
          node: { __typename?: "ProjectDetails" } & Pick<
            ProjectDetails,
            "id" | "name" | "projectDefinitionId" | "datasheetId"
          >;
        }
    >;
    pageInfo: { __typename?: "PageInfo" } & Pick<
      PageInfo,
      "hasNextPage" | "endCursor" | "totalCount"
    >;
  };
};

export type FindProjectRootSectionsQueryVariables = Exact<{
  projectId: Scalars["ID"];
}>;

export type FindProjectRootSectionsQuery = { __typename?: "Query" } & {
  findProjectRootSections: { __typename?: "ProjectNodeTree" } & {
    roots: Array<
      { __typename?: "ProjectNodeTreeTypeNode" } & {
        definition: { __typename?: "ProjectDefinitionNode" } & Pick<
          ProjectDefinitionNode,
          | "id"
          | "projectDefinitionId"
          | "name"
          | "isCollection"
          | "instanciateByDefault"
          | "ordinal"
          | "validator"
        > & {
            translations: { __typename?: "TranslationConfig" } & Pick<
              TranslationConfig,
              "helpTextName" | "label"
            >;
            fieldDetails?: Maybe<
              | ({ __typename: "BoolFieldConfig" } & Pick<
                  BoolFieldConfig,
                  "enabled"
                >)
              | ({ __typename: "CollapsibleContainerFieldConfig" } & Pick<
                  CollapsibleContainerFieldConfig,
                  "isCollapsible"
                >)
              | ({ __typename: "DecimalFieldConfig" } & Pick<
                  DecimalFieldConfig,
                  "unit" | "precision" | "numeric"
                >)
              | ({ __typename: "IntFieldConfig" } & Pick<
                  IntFieldConfig,
                  "unit" | "integer"
                >)
              | ({ __typename: "StaticChoiceFieldConfig" } & Pick<
                  StaticChoiceFieldConfig,
                  "selected"
                > & {
                    options: Array<
                      { __typename?: "StaticChoiceOption" } & Pick<
                        StaticChoiceOption,
                        "id" | "label" | "helpText"
                      >
                    >;
                  })
              | { __typename: "StaticNumberFieldConfig" }
              | ({ __typename: "StringFieldConfig" } & Pick<
                  StringFieldConfig,
                  "transforms" | "text"
                >)
            >;
          };
        state: { __typename?: "ProjectNodeMetaState" } & Pick<
          ProjectNodeMetaState,
          "isVisible" | "selectedChild"
        >;
        nodes: Array<
          { __typename?: "ProjectNodeTreeNode" } & {
            node: { __typename?: "ProjectNode" } & Pick<
              ProjectNode,
              "id" | "projectId" | "typePath" | "typeId" | "path" | "label"
            > & {
                value?: Maybe<
                  | ({ __typename: "BoolFieldValue" } & Pick<
                      BoolFieldValue,
                      "enabled"
                    >)
                  | ({ __typename: "DecimalFieldValue" } & Pick<
                      DecimalFieldValue,
                      "numeric"
                    >)
                  | ({ __typename: "IntFieldValue" } & Pick<
                      IntFieldValue,
                      "integer"
                    >)
                  | { __typename: "ReferenceId" }
                  | ({ __typename: "StringFieldValue" } & Pick<
                      StringFieldValue,
                      "text"
                    >)
                >;
              };
          }
        >;
      }
    >;
  };
};

export type FindProjectRootSectionContainersQueryVariables = Exact<{
  projectId: Scalars["ID"];
  rootSectionId: Scalars["ID"];
}>;

export type FindProjectRootSectionContainersQuery = { __typename?: "Query" } & {
  findProjectRootSectionContainers: { __typename?: "ProjectNodeTree" } & {
    roots: Array<
      { __typename?: "ProjectNodeTreeTypeNode" } & {
        definition: { __typename?: "ProjectDefinitionNode" } & Pick<
          ProjectDefinitionNode,
          | "id"
          | "projectDefinitionId"
          | "name"
          | "isCollection"
          | "instanciateByDefault"
          | "ordinal"
          | "validator"
        > & {
            translations: { __typename?: "TranslationConfig" } & Pick<
              TranslationConfig,
              "helpTextName" | "label"
            >;
            fieldDetails?: Maybe<
              | ({ __typename: "BoolFieldConfig" } & Pick<
                  BoolFieldConfig,
                  "enabled"
                >)
              | ({ __typename: "CollapsibleContainerFieldConfig" } & Pick<
                  CollapsibleContainerFieldConfig,
                  "isCollapsible"
                >)
              | ({ __typename: "DecimalFieldConfig" } & Pick<
                  DecimalFieldConfig,
                  "unit" | "precision" | "numeric"
                >)
              | ({ __typename: "IntFieldConfig" } & Pick<
                  IntFieldConfig,
                  "unit" | "integer"
                >)
              | ({ __typename: "StaticChoiceFieldConfig" } & Pick<
                  StaticChoiceFieldConfig,
                  "selected"
                > & {
                    options: Array<
                      { __typename?: "StaticChoiceOption" } & Pick<
                        StaticChoiceOption,
                        "id" | "label" | "helpText"
                      >
                    >;
                  })
              | { __typename: "StaticNumberFieldConfig" }
              | ({ __typename: "StringFieldConfig" } & Pick<
                  StringFieldConfig,
                  "transforms" | "text"
                >)
            >;
          };
        state: { __typename?: "ProjectNodeMetaState" } & Pick<
          ProjectNodeMetaState,
          "isVisible" | "selectedChild"
        >;
        nodes: Array<
          { __typename?: "ProjectNodeTreeNode" } & {
            node: { __typename?: "ProjectNode" } & Pick<
              ProjectNode,
              "id" | "projectId" | "typePath" | "typeId" | "path"
            > & {
                value?: Maybe<
                  | ({ __typename: "BoolFieldValue" } & Pick<
                      BoolFieldValue,
                      "enabled"
                    >)
                  | ({ __typename: "DecimalFieldValue" } & Pick<
                      DecimalFieldValue,
                      "numeric"
                    >)
                  | ({ __typename: "IntFieldValue" } & Pick<
                      IntFieldValue,
                      "integer"
                    >)
                  | { __typename: "ReferenceId" }
                  | ({ __typename: "StringFieldValue" } & Pick<
                      StringFieldValue,
                      "text"
                    >)
                >;
              };
            children: Array<
              { __typename?: "ProjectNodeTreeTypeNode" } & {
                definition: { __typename?: "ProjectDefinitionNode" } & Pick<
                  ProjectDefinitionNode,
                  | "id"
                  | "projectDefinitionId"
                  | "name"
                  | "isCollection"
                  | "instanciateByDefault"
                  | "ordinal"
                  | "validator"
                > & {
                    translations: { __typename?: "TranslationConfig" } & Pick<
                      TranslationConfig,
                      "helpTextName" | "label"
                    >;
                    fieldDetails?: Maybe<
                      | ({ __typename: "BoolFieldConfig" } & Pick<
                          BoolFieldConfig,
                          "enabled"
                        >)
                      | ({
                          __typename: "CollapsibleContainerFieldConfig";
                        } & Pick<
                          CollapsibleContainerFieldConfig,
                          "isCollapsible"
                        >)
                      | ({ __typename: "DecimalFieldConfig" } & Pick<
                          DecimalFieldConfig,
                          "unit" | "precision" | "numeric"
                        >)
                      | ({ __typename: "IntFieldConfig" } & Pick<
                          IntFieldConfig,
                          "unit" | "integer"
                        >)
                      | ({ __typename: "StaticChoiceFieldConfig" } & Pick<
                          StaticChoiceFieldConfig,
                          "selected"
                        > & {
                            options: Array<
                              { __typename?: "StaticChoiceOption" } & Pick<
                                StaticChoiceOption,
                                "id" | "label" | "helpText"
                              >
                            >;
                          })
                      | { __typename: "StaticNumberFieldConfig" }
                      | ({ __typename: "StringFieldConfig" } & Pick<
                          StringFieldConfig,
                          "transforms" | "text"
                        >)
                    >;
                  };
                state: { __typename?: "ProjectNodeMetaState" } & Pick<
                  ProjectNodeMetaState,
                  "isVisible" | "selectedChild"
                >;
                nodes: Array<
                  { __typename?: "ProjectNodeTreeNode" } & {
                    node: { __typename?: "ProjectNode" } & Pick<
                      ProjectNode,
                      "id" | "projectId" | "typePath" | "typeId" | "path"
                    > & {
                        value?: Maybe<
                          | ({ __typename: "BoolFieldValue" } & Pick<
                              BoolFieldValue,
                              "enabled"
                            >)
                          | ({ __typename: "DecimalFieldValue" } & Pick<
                              DecimalFieldValue,
                              "numeric"
                            >)
                          | ({ __typename: "IntFieldValue" } & Pick<
                              IntFieldValue,
                              "integer"
                            >)
                          | { __typename: "ReferenceId" }
                          | ({ __typename: "StringFieldValue" } & Pick<
                              StringFieldValue,
                              "text"
                            >)
                        >;
                      };
                  }
                >;
              }
            >;
          }
        >;
      }
    >;
  };
};

export type FindProjectFormContentQueryVariables = Exact<{
  projectId: Scalars["ID"];
  formId: Scalars["ID"];
}>;

export type FindProjectFormContentQuery = { __typename?: "Query" } & {
  findProjectNodeMetaDefinition: { __typename?: "ProjectNodeMeta" } & Pick<
    ProjectNodeMeta,
    "typeId"
  > & {
      definition: { __typename?: "ProjectDefinitionNode" } & Pick<
        ProjectDefinitionNode,
        | "id"
        | "projectDefinitionId"
        | "name"
        | "isCollection"
        | "instanciateByDefault"
        | "ordinal"
        | "validator"
        | "path"
      > & {
          fieldDetails?: Maybe<
            | ({ __typename: "BoolFieldConfig" } & Pick<
                BoolFieldConfig,
                "enabled"
              >)
            | ({ __typename: "CollapsibleContainerFieldConfig" } & Pick<
                CollapsibleContainerFieldConfig,
                "isCollapsible"
              >)
            | ({ __typename: "DecimalFieldConfig" } & Pick<
                DecimalFieldConfig,
                "unit" | "precision" | "numeric"
              >)
            | ({ __typename: "IntFieldConfig" } & Pick<
                IntFieldConfig,
                "unit" | "integer"
              >)
            | ({ __typename: "StaticChoiceFieldConfig" } & Pick<
                StaticChoiceFieldConfig,
                "selected"
              > & {
                  options: Array<
                    { __typename?: "StaticChoiceOption" } & Pick<
                      StaticChoiceOption,
                      "id" | "label" | "helpText"
                    >
                  >;
                })
            | ({ __typename: "StaticNumberFieldConfig" } & Pick<
                StaticNumberFieldConfig,
                "unit" | "precision"
              >)
            | ({ __typename: "StringFieldConfig" } & Pick<
                StringFieldConfig,
                "transforms" | "text"
              >)
          >;
          translations: { __typename?: "TranslationConfig" } & Pick<
            TranslationConfig,
            "helpTextName" | "label"
          >;
        };
      state: { __typename?: "ProjectNodeMetaState" } & Pick<
        ProjectNodeMetaState,
        "isVisible"
      >;
    };
  findProjectFormContent: { __typename?: "ProjectNodeTree" } & {
    roots: Array<
      { __typename?: "ProjectNodeTreeTypeNode" } & {
        definition: { __typename?: "ProjectDefinitionNode" } & Pick<
          ProjectDefinitionNode,
          | "id"
          | "projectDefinitionId"
          | "name"
          | "isCollection"
          | "instanciateByDefault"
          | "ordinal"
          | "validator"
        > & {
            translations: { __typename?: "TranslationConfig" } & Pick<
              TranslationConfig,
              "helpTextName" | "label"
            >;
            fieldDetails?: Maybe<
              | ({ __typename: "BoolFieldConfig" } & Pick<
                  BoolFieldConfig,
                  "enabled"
                >)
              | ({ __typename: "CollapsibleContainerFieldConfig" } & Pick<
                  CollapsibleContainerFieldConfig,
                  "isCollapsible"
                >)
              | ({ __typename: "DecimalFieldConfig" } & Pick<
                  DecimalFieldConfig,
                  "unit" | "precision" | "numeric"
                >)
              | ({ __typename: "IntFieldConfig" } & Pick<
                  IntFieldConfig,
                  "unit" | "integer"
                >)
              | ({ __typename: "StaticChoiceFieldConfig" } & Pick<
                  StaticChoiceFieldConfig,
                  "selected"
                > & {
                    options: Array<
                      { __typename?: "StaticChoiceOption" } & Pick<
                        StaticChoiceOption,
                        "id" | "label" | "helpText"
                      >
                    >;
                  })
              | ({ __typename: "StaticNumberFieldConfig" } & Pick<
                  StaticNumberFieldConfig,
                  "unit" | "precision"
                >)
              | ({ __typename: "StringFieldConfig" } & Pick<
                  StringFieldConfig,
                  "transforms" | "text"
                >)
            >;
          };
        state: { __typename?: "ProjectNodeMetaState" } & Pick<
          ProjectNodeMetaState,
          "isVisible" | "selectedChild"
        >;
        nodes: Array<
          { __typename?: "ProjectNodeTreeNode" } & {
            node: { __typename?: "ProjectNode" } & Pick<
              ProjectNode,
              "id" | "projectId" | "typePath" | "typeId" | "path"
            > & {
                value?: Maybe<
                  | ({ __typename: "BoolFieldValue" } & Pick<
                      BoolFieldValue,
                      "enabled"
                    >)
                  | ({ __typename: "DecimalFieldValue" } & Pick<
                      DecimalFieldValue,
                      "numeric"
                    >)
                  | ({ __typename: "IntFieldValue" } & Pick<
                      IntFieldValue,
                      "integer"
                    >)
                  | { __typename: "ReferenceId" }
                  | ({ __typename: "StringFieldValue" } & Pick<
                      StringFieldValue,
                      "text"
                    >)
                >;
              };
            children: Array<
              { __typename?: "ProjectNodeTreeTypeNode" } & {
                definition: { __typename?: "ProjectDefinitionNode" } & Pick<
                  ProjectDefinitionNode,
                  | "id"
                  | "projectDefinitionId"
                  | "name"
                  | "isCollection"
                  | "instanciateByDefault"
                  | "ordinal"
                  | "validator"
                > & {
                    translations: { __typename?: "TranslationConfig" } & Pick<
                      TranslationConfig,
                      "helpTextName" | "label"
                    >;
                    fieldDetails?: Maybe<
                      | ({ __typename: "BoolFieldConfig" } & Pick<
                          BoolFieldConfig,
                          "enabled"
                        >)
                      | ({
                          __typename: "CollapsibleContainerFieldConfig";
                        } & Pick<
                          CollapsibleContainerFieldConfig,
                          "isCollapsible"
                        >)
                      | ({ __typename: "DecimalFieldConfig" } & Pick<
                          DecimalFieldConfig,
                          "unit" | "precision" | "numeric"
                        >)
                      | ({ __typename: "IntFieldConfig" } & Pick<
                          IntFieldConfig,
                          "unit" | "integer"
                        >)
                      | ({ __typename: "StaticChoiceFieldConfig" } & Pick<
                          StaticChoiceFieldConfig,
                          "selected"
                        > & {
                            options: Array<
                              { __typename?: "StaticChoiceOption" } & Pick<
                                StaticChoiceOption,
                                "id" | "label" | "helpText"
                              >
                            >;
                          })
                      | ({ __typename: "StaticNumberFieldConfig" } & Pick<
                          StaticNumberFieldConfig,
                          "unit" | "precision"
                        >)
                      | ({ __typename: "StringFieldConfig" } & Pick<
                          StringFieldConfig,
                          "transforms" | "text"
                        >)
                    >;
                  };
                state: { __typename?: "ProjectNodeMetaState" } & Pick<
                  ProjectNodeMetaState,
                  "isVisible" | "selectedChild"
                >;
                nodes: Array<
                  { __typename?: "ProjectNodeTreeNode" } & {
                    node: { __typename?: "ProjectNode" } & Pick<
                      ProjectNode,
                      "id" | "projectId" | "typePath" | "typeId" | "path"
                    > & {
                        value?: Maybe<
                          | ({ __typename: "BoolFieldValue" } & Pick<
                              BoolFieldValue,
                              "enabled"
                            >)
                          | ({ __typename: "DecimalFieldValue" } & Pick<
                              DecimalFieldValue,
                              "numeric"
                            >)
                          | ({ __typename: "IntFieldValue" } & Pick<
                              IntFieldValue,
                              "integer"
                            >)
                          | { __typename: "ReferenceId" }
                          | ({ __typename: "StringFieldValue" } & Pick<
                              StringFieldValue,
                              "text"
                            >)
                        >;
                      };
                  }
                >;
              }
            >;
          }
        >;
      }
    >;
  };
};

export type FindProjectDefinitionIdQueryVariables = Exact<{
  projectId: Scalars["ID"];
}>;

export type FindProjectDefinitionIdQuery = { __typename?: "Query" } & {
  findProjectDetails: { __typename?: "ProjectDetails" } & Pick<
    ProjectDetails,
    "projectDefinitionId"
  >;
};

export type FindDefinitionAggregateCollectionsQueryVariables = Exact<{
  projectDefinitionId: Scalars["ID"];
}>;

export type FindDefinitionAggregateCollectionsQuery = {
  __typename?: "Query";
} & {
  findDefinitionAggregateCollections: Array<
    { __typename?: "AggregateCollection" } & Pick<
      AggregateCollection,
      "id" | "projectDefinitionId" | "name" | "isAbstract"
    > & {
        attributesSchema: Array<
          { __typename?: "AggregateAttributeSchema" } & Pick<
            AggregateAttributeSchema,
            "name"
          > & {
              details:
                | ({ __typename: "AggregateReferenceConfig" } & Pick<
                    AggregateReferenceConfig,
                    "fromCollection"
                  >)
                | ({ __typename: "BoolFieldConfig" } & Pick<
                    BoolFieldConfig,
                    "enabled"
                  >)
                | ({ __typename: "DecimalFieldConfig" } & Pick<
                    DecimalFieldConfig,
                    "unit" | "precision" | "numeric"
                  >)
                | ({ __typename: "IntFieldConfig" } & Pick<
                    IntFieldConfig,
                    "unit" | "integer"
                  >)
                | ({ __typename: "NodeReferenceConfig" } & Pick<
                    NodeReferenceConfig,
                    "nodeType"
                  >)
                | ({ __typename: "StaticChoiceFieldConfig" } & Pick<
                    StaticChoiceFieldConfig,
                    "selected"
                  > & {
                      options: Array<
                        { __typename?: "StaticChoiceOption" } & Pick<
                          StaticChoiceOption,
                          "id" | "label" | "helpText"
                        >
                      >;
                    })
                | ({ __typename: "StringFieldConfig" } & Pick<
                    StringFieldConfig,
                    "transforms" | "text"
                  >);
            }
        >;
      }
  >;
};

export type FindProjectReportWithDefinitionQueryVariables = Exact<{
  projectId: Scalars["ID"];
  reportDefinitionId: Scalars["ID"];
}>;

export type FindProjectReportWithDefinitionQuery = { __typename?: "Query" } & {
  findProjectReport: { __typename?: "Report" } & Pick<
    Report,
    "creationDateUtc" | "name"
  > & {
      stages: Array<
        { __typename?: "ReportStage" } & {
          columns: Array<
            { __typename?: "StageColumn" } & Pick<
              StageColumn,
              "label" | "isVisible" | "unit"
            >
          >;
          summary: { __typename?: "ComputedValue" } & Pick<
            ComputedValue,
            "label" | "unit"
          > & {
              value:
                | ({ __typename: "BoolFieldValue" } & Pick<
                    BoolFieldValue,
                    "enabled"
                  >)
                | ({ __typename: "DecimalFieldValue" } & Pick<
                    DecimalFieldValue,
                    "numeric"
                  >)
                | ({ __typename: "IntFieldValue" } & Pick<
                    IntFieldValue,
                    "integer"
                  >)
                | { __typename: "ReferenceId" }
                | ({ __typename: "StringFieldValue" } & Pick<
                    StringFieldValue,
                    "text"
                  >);
            };
          rows: Array<
            { __typename?: "ReportRow" } & Pick<
              ReportRow,
              "nodeId" | "formulaId" | "elementDefId" | "childReferenceId"
            > & {
                columns: Array<
                  { __typename?: "ComputedValue" } & Pick<
                    ComputedValue,
                    "unit"
                  > & {
                      value:
                        | ({ __typename: "BoolFieldValue" } & Pick<
                            BoolFieldValue,
                            "enabled"
                          >)
                        | ({ __typename: "DecimalFieldValue" } & Pick<
                            DecimalFieldValue,
                            "numeric"
                          >)
                        | ({ __typename: "IntFieldValue" } & Pick<
                            IntFieldValue,
                            "integer"
                          >)
                        | { __typename: "ReferenceId" }
                        | ({ __typename: "StringFieldValue" } & Pick<
                            StringFieldValue,
                            "text"
                          >);
                    }
                >;
              }
          >;
        }
      >;
      summaries: Array<
        { __typename?: "ComputedValue" } & Pick<
          ComputedValue,
          "label" | "unit"
        > & {
            value:
              | ({ __typename: "BoolFieldValue" } & Pick<
                  BoolFieldValue,
                  "enabled"
                >)
              | ({ __typename: "DecimalFieldValue" } & Pick<
                  DecimalFieldValue,
                  "numeric"
                >)
              | ({ __typename: "IntFieldValue" } & Pick<
                  IntFieldValue,
                  "integer"
                >)
              | { __typename: "ReferenceId" }
              | ({ __typename: "StringFieldValue" } & Pick<
                  StringFieldValue,
                  "text"
                >);
          }
      >;
    };
};

export type FindReportDefinitionsFromProjectDetailsQueryVariables = Exact<{
  projectId: Scalars["ID"];
}>;

export type FindReportDefinitionsFromProjectDetailsQuery = {
  __typename?: "Query";
} & {
  findProjectDetails: { __typename?: "ProjectDetails" } & {
    reportDefinitions: Array<
      { __typename?: "ReportDefinition" } & Pick<
        ReportDefinition,
        "id" | "name"
      > & {
          structure: { __typename?: "ReportDefinitionStructure" } & {
            selection: { __typename?: "Selection" } & {
              formulaAttribute: { __typename?: "AttributeBucket" } & Pick<
                AttributeBucket,
                "bucketName" | "attributeName"
              >;
            };
            columns: Array<
              { __typename?: "ReportComputation" } & Pick<
                ReportComputation,
                "name" | "isVisible"
              > & {
                  unit?: Maybe<
                    | ({ __typename: "AttributeBucket" } & Pick<
                        AttributeBucket,
                        "bucketName" | "attributeName"
                      >)
                    | ({ __typename: "Unit" } & Pick<Unit, "id">)
                  >;
                }
            >;
          };
        }
    >;
  };
};

export const CreateSingleUserOrganizationDocument = gql`
  mutation createSingleUserOrganization(
    $singleUserOrganization: NewSingleUserOrganizationInput!
  ) {
    createSingleUserOrganization(
      singleUserOrganization: $singleUserOrganization
    ) {
      oauthId
      id
      email
      permissions
      organizationId
    }
  }
`;
export type CreateSingleUserOrganizationMutationFn = Apollo.MutationFunction<
  CreateSingleUserOrganizationMutation,
  CreateSingleUserOrganizationMutationVariables
>;

/**
 * __useCreateSingleUserOrganizationMutation__
 *
 * To run a mutation, you first call `useCreateSingleUserOrganizationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSingleUserOrganizationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSingleUserOrganizationMutation, { data, loading, error }] = useCreateSingleUserOrganizationMutation({
 *   variables: {
 *      singleUserOrganization: // value for 'singleUserOrganization'
 *   },
 * });
 */
export function useCreateSingleUserOrganizationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateSingleUserOrganizationMutation,
    CreateSingleUserOrganizationMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateSingleUserOrganizationMutation,
    CreateSingleUserOrganizationMutationVariables
  >(CreateSingleUserOrganizationDocument, options);
}
export type CreateSingleUserOrganizationMutationHookResult = ReturnType<
  typeof useCreateSingleUserOrganizationMutation
>;
export type CreateSingleUserOrganizationMutationResult =
  Apollo.MutationResult<CreateSingleUserOrganizationMutation>;
export type CreateSingleUserOrganizationMutationOptions =
  Apollo.BaseMutationOptions<
    CreateSingleUserOrganizationMutation,
    CreateSingleUserOrganizationMutationVariables
  >;
export const FindDistributablesDocument = gql`
  query findDistributables($projectId: ID!) {
    findDistributables(projectId: $projectId) {
      id
      projectDefinitionId
      name
    }
  }
`;

/**
 * __useFindDistributablesQuery__
 *
 * To run a query within a React component, call `useFindDistributablesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindDistributablesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindDistributablesQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useFindDistributablesQuery(
  baseOptions: Apollo.QueryHookOptions<
    FindDistributablesQuery,
    FindDistributablesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    FindDistributablesQuery,
    FindDistributablesQueryVariables
  >(FindDistributablesDocument, options);
}
export function useFindDistributablesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindDistributablesQuery,
    FindDistributablesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    FindDistributablesQuery,
    FindDistributablesQueryVariables
  >(FindDistributablesDocument, options);
}
export type FindDistributablesQueryHookResult = ReturnType<
  typeof useFindDistributablesQuery
>;
export type FindDistributablesLazyQueryHookResult = ReturnType<
  typeof useFindDistributablesLazyQuery
>;
export type FindDistributablesQueryResult = Apollo.QueryResult<
  FindDistributablesQuery,
  FindDistributablesQueryVariables
>;
export const FindDistributableItemsDocument = gql`
  query findDistributableItems($projectId: ID!, $reportDefinitionId: ID!) {
    findDistributableItems(
      projectId: $projectId
      reportDefinitionId: $reportDefinitionId
    ) {
      id
      projectId
      reportDefinitionId
      nodeId
      formulaId
      suppliedItem {
        datasheetId
        elementDefId
        childReferenceId
        organization {
          id
          name
          email
        }
      }
      distribution_ids
      summary {
        label
        value {
          __typename
          ... on IntFieldValue {
            integer
          }
          ... on DecimalFieldValue {
            numeric
          }
          ... on StringFieldValue {
            text
          }
          ... on BoolFieldValue {
            enabled
          }
        }
        unit
      }
      columns {
        label
        value {
          __typename
          ... on IntFieldValue {
            integer
          }
          ... on DecimalFieldValue {
            numeric
          }
          ... on StringFieldValue {
            text
          }
          ... on BoolFieldValue {
            enabled
          }
        }
        unit
      }
      obsolete
    }
  }
`;

/**
 * __useFindDistributableItemsQuery__
 *
 * To run a query within a React component, call `useFindDistributableItemsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindDistributableItemsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindDistributableItemsQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *      reportDefinitionId: // value for 'reportDefinitionId'
 *   },
 * });
 */
export function useFindDistributableItemsQuery(
  baseOptions: Apollo.QueryHookOptions<
    FindDistributableItemsQuery,
    FindDistributableItemsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    FindDistributableItemsQuery,
    FindDistributableItemsQueryVariables
  >(FindDistributableItemsDocument, options);
}
export function useFindDistributableItemsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindDistributableItemsQuery,
    FindDistributableItemsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    FindDistributableItemsQuery,
    FindDistributableItemsQueryVariables
  >(FindDistributableItemsDocument, options);
}
export type FindDistributableItemsQueryHookResult = ReturnType<
  typeof useFindDistributableItemsQuery
>;
export type FindDistributableItemsLazyQueryHookResult = ReturnType<
  typeof useFindDistributableItemsLazyQuery
>;
export type FindDistributableItemsQueryResult = Apollo.QueryResult<
  FindDistributableItemsQuery,
  FindDistributableItemsQueryVariables
>;
export const CreateDatasheetDocument = gql`
  mutation createDatasheet($datasheet: DatasheetInput!) {
    createDatasheet(datasheet: $datasheet) {
      id
      name
      projectDefinitionId
      fromDatasheetId
    }
  }
`;
export type CreateDatasheetMutationFn = Apollo.MutationFunction<
  CreateDatasheetMutation,
  CreateDatasheetMutationVariables
>;

/**
 * __useCreateDatasheetMutation__
 *
 * To run a mutation, you first call `useCreateDatasheetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDatasheetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDatasheetMutation, { data, loading, error }] = useCreateDatasheetMutation({
 *   variables: {
 *      datasheet: // value for 'datasheet'
 *   },
 * });
 */
export function useCreateDatasheetMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateDatasheetMutation,
    CreateDatasheetMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateDatasheetMutation,
    CreateDatasheetMutationVariables
  >(CreateDatasheetDocument, options);
}
export type CreateDatasheetMutationHookResult = ReturnType<
  typeof useCreateDatasheetMutation
>;
export type CreateDatasheetMutationResult =
  Apollo.MutationResult<CreateDatasheetMutation>;
export type CreateDatasheetMutationOptions = Apollo.BaseMutationOptions<
  CreateDatasheetMutation,
  CreateDatasheetMutationVariables
>;
export const FindDatasheetsDocument = gql`
  query findDatasheets($query: String!, $first: Int!, $after: String) {
    results: findDatasheets(query: $query, first: $first, after: $after) {
      pageInfo {
        totalCount
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          name
          projectDefinitionId
          fromDatasheetId
        }
        cursor
      }
    }
  }
`;

/**
 * __useFindDatasheetsQuery__
 *
 * To run a query within a React component, call `useFindDatasheetsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindDatasheetsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindDatasheetsQuery({
 *   variables: {
 *      query: // value for 'query'
 *      first: // value for 'first'
 *      after: // value for 'after'
 *   },
 * });
 */
export function useFindDatasheetsQuery(
  baseOptions: Apollo.QueryHookOptions<
    FindDatasheetsQuery,
    FindDatasheetsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FindDatasheetsQuery, FindDatasheetsQueryVariables>(
    FindDatasheetsDocument,
    options
  );
}
export function useFindDatasheetsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindDatasheetsQuery,
    FindDatasheetsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FindDatasheetsQuery, FindDatasheetsQueryVariables>(
    FindDatasheetsDocument,
    options
  );
}
export type FindDatasheetsQueryHookResult = ReturnType<
  typeof useFindDatasheetsQuery
>;
export type FindDatasheetsLazyQueryHookResult = ReturnType<
  typeof useFindDatasheetsLazyQuery
>;
export type FindDatasheetsQueryResult = Apollo.QueryResult<
  FindDatasheetsQuery,
  FindDatasheetsQueryVariables
>;
export const AddProjectDefinitionNodeDocument = gql`
  mutation addProjectDefinitionNode(
    $projectDefinitionId: ID!
    $node: ProjectDefinitionNodeCreationInput!
  ) {
    addProjectDefinitionNode(
      projectDefinitionId: $projectDefinitionId
      node: $node
    ) {
      id
      projectDefinitionId
      name
      isCollection
      instanciateByDefault
      ordinal
      fieldDetails {
        __typename
        ... on IntFieldConfig {
          unit
          integer
        }
        ... on DecimalFieldConfig {
          unit
          precision
          numeric
        }
        ... on StringFieldConfig {
          transforms
          text
        }
        ... on BoolFieldConfig {
          enabled
        }
        ... on StaticChoiceFieldConfig {
          options {
            id
            label
            helpText
          }
          selected
        }
        ... on CollapsibleContainerFieldConfig {
          isCollapsible
        }
      }
    }
  }
`;
export type AddProjectDefinitionNodeMutationFn = Apollo.MutationFunction<
  AddProjectDefinitionNodeMutation,
  AddProjectDefinitionNodeMutationVariables
>;

/**
 * __useAddProjectDefinitionNodeMutation__
 *
 * To run a mutation, you first call `useAddProjectDefinitionNodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddProjectDefinitionNodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addProjectDefinitionNodeMutation, { data, loading, error }] = useAddProjectDefinitionNodeMutation({
 *   variables: {
 *      projectDefinitionId: // value for 'projectDefinitionId'
 *      node: // value for 'node'
 *   },
 * });
 */
export function useAddProjectDefinitionNodeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddProjectDefinitionNodeMutation,
    AddProjectDefinitionNodeMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    AddProjectDefinitionNodeMutation,
    AddProjectDefinitionNodeMutationVariables
  >(AddProjectDefinitionNodeDocument, options);
}
export type AddProjectDefinitionNodeMutationHookResult = ReturnType<
  typeof useAddProjectDefinitionNodeMutation
>;
export type AddProjectDefinitionNodeMutationResult =
  Apollo.MutationResult<AddProjectDefinitionNodeMutation>;
export type AddProjectDefinitionNodeMutationOptions =
  Apollo.BaseMutationOptions<
    AddProjectDefinitionNodeMutation,
    AddProjectDefinitionNodeMutationVariables
  >;
export const UpdateProjectDefinitionNodeDocument = gql`
  mutation updateProjectDefinitionNode(
    $projectDefinitionId: ID!
    $nodeId: ID!
    $node: ProjectDefinitionNodeCreationInput!
  ) {
    updateProjectDefinitionNode(
      projectDefinitionId: $projectDefinitionId
      nodeId: $nodeId
      node: $node
    ) {
      id
      projectDefinitionId
      name
      isCollection
      instanciateByDefault
      ordinal
      fieldDetails {
        __typename
        ... on IntFieldConfig {
          unit
          integer
        }
        ... on DecimalFieldConfig {
          unit
          precision
          numeric
        }
        ... on StringFieldConfig {
          transforms
          text
        }
        ... on BoolFieldConfig {
          enabled
        }
        ... on StaticChoiceFieldConfig {
          options {
            id
            label
            helpText
          }
          selected
        }
        ... on CollapsibleContainerFieldConfig {
          isCollapsible
        }
      }
    }
  }
`;
export type UpdateProjectDefinitionNodeMutationFn = Apollo.MutationFunction<
  UpdateProjectDefinitionNodeMutation,
  UpdateProjectDefinitionNodeMutationVariables
>;

/**
 * __useUpdateProjectDefinitionNodeMutation__
 *
 * To run a mutation, you first call `useUpdateProjectDefinitionNodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProjectDefinitionNodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProjectDefinitionNodeMutation, { data, loading, error }] = useUpdateProjectDefinitionNodeMutation({
 *   variables: {
 *      projectDefinitionId: // value for 'projectDefinitionId'
 *      nodeId: // value for 'nodeId'
 *      node: // value for 'node'
 *   },
 * });
 */
export function useUpdateProjectDefinitionNodeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateProjectDefinitionNodeMutation,
    UpdateProjectDefinitionNodeMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateProjectDefinitionNodeMutation,
    UpdateProjectDefinitionNodeMutationVariables
  >(UpdateProjectDefinitionNodeDocument, options);
}
export type UpdateProjectDefinitionNodeMutationHookResult = ReturnType<
  typeof useUpdateProjectDefinitionNodeMutation
>;
export type UpdateProjectDefinitionNodeMutationResult =
  Apollo.MutationResult<UpdateProjectDefinitionNodeMutation>;
export type UpdateProjectDefinitionNodeMutationOptions =
  Apollo.BaseMutationOptions<
    UpdateProjectDefinitionNodeMutation,
    UpdateProjectDefinitionNodeMutationVariables
  >;
export const DeleteProjectDefinitionNodeDocument = gql`
  mutation deleteProjectDefinitionNode(
    $projectDefinitionId: ID!
    $nodeId: ID!
  ) {
    deleteProjectDefinitionNode(
      projectDefinitionId: $projectDefinitionId
      nodeId: $nodeId
    )
  }
`;
export type DeleteProjectDefinitionNodeMutationFn = Apollo.MutationFunction<
  DeleteProjectDefinitionNodeMutation,
  DeleteProjectDefinitionNodeMutationVariables
>;

/**
 * __useDeleteProjectDefinitionNodeMutation__
 *
 * To run a mutation, you first call `useDeleteProjectDefinitionNodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProjectDefinitionNodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProjectDefinitionNodeMutation, { data, loading, error }] = useDeleteProjectDefinitionNodeMutation({
 *   variables: {
 *      projectDefinitionId: // value for 'projectDefinitionId'
 *      nodeId: // value for 'nodeId'
 *   },
 * });
 */
export function useDeleteProjectDefinitionNodeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteProjectDefinitionNodeMutation,
    DeleteProjectDefinitionNodeMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteProjectDefinitionNodeMutation,
    DeleteProjectDefinitionNodeMutationVariables
  >(DeleteProjectDefinitionNodeDocument, options);
}
export type DeleteProjectDefinitionNodeMutationHookResult = ReturnType<
  typeof useDeleteProjectDefinitionNodeMutation
>;
export type DeleteProjectDefinitionNodeMutationResult =
  Apollo.MutationResult<DeleteProjectDefinitionNodeMutation>;
export type DeleteProjectDefinitionNodeMutationOptions =
  Apollo.BaseMutationOptions<
    DeleteProjectDefinitionNodeMutation,
    DeleteProjectDefinitionNodeMutationVariables
  >;
export const AddProjectDefinitionDocument = gql`
  mutation addProjectDefinition($definitionInput: DefinitionInput!) {
    addProjectDefinition(definitionInput: $definitionInput) {
      id
      name
    }
  }
`;
export type AddProjectDefinitionMutationFn = Apollo.MutationFunction<
  AddProjectDefinitionMutation,
  AddProjectDefinitionMutationVariables
>;

/**
 * __useAddProjectDefinitionMutation__
 *
 * To run a mutation, you first call `useAddProjectDefinitionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddProjectDefinitionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addProjectDefinitionMutation, { data, loading, error }] = useAddProjectDefinitionMutation({
 *   variables: {
 *      definitionInput: // value for 'definitionInput'
 *   },
 * });
 */
export function useAddProjectDefinitionMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddProjectDefinitionMutation,
    AddProjectDefinitionMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    AddProjectDefinitionMutation,
    AddProjectDefinitionMutationVariables
  >(AddProjectDefinitionDocument, options);
}
export type AddProjectDefinitionMutationHookResult = ReturnType<
  typeof useAddProjectDefinitionMutation
>;
export type AddProjectDefinitionMutationResult =
  Apollo.MutationResult<AddProjectDefinitionMutation>;
export type AddProjectDefinitionMutationOptions = Apollo.BaseMutationOptions<
  AddProjectDefinitionMutation,
  AddProjectDefinitionMutationVariables
>;
export const AddAggregateCollectionDocument = gql`
  mutation addAggregateCollection(
    $projectDefinitionId: ID!
    $collection: AggregateCollectionInput!
  ) {
    addAggregateCollection(
      projectDefinitionId: $projectDefinitionId
      collection: $collection
    ) {
      id
      projectDefinitionId
      name
      isAbstract
      attributesSchema {
        name
        details {
          __typename
          ... on IntFieldConfig {
            unit
            integer
          }
          ... on DecimalFieldConfig {
            unit
            precision
            numeric
          }
          ... on StringFieldConfig {
            transforms
            text
          }
          ... on BoolFieldConfig {
            enabled
          }
          ... on StaticChoiceFieldConfig {
            selected
            options {
              id
              label
              helpText
            }
          }
          ... on AggregateReferenceConfig {
            fromCollection
          }
          ... on NodeReferenceConfig {
            nodeType
          }
        }
      }
    }
  }
`;
export type AddAggregateCollectionMutationFn = Apollo.MutationFunction<
  AddAggregateCollectionMutation,
  AddAggregateCollectionMutationVariables
>;

/**
 * __useAddAggregateCollectionMutation__
 *
 * To run a mutation, you first call `useAddAggregateCollectionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddAggregateCollectionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addAggregateCollectionMutation, { data, loading, error }] = useAddAggregateCollectionMutation({
 *   variables: {
 *      projectDefinitionId: // value for 'projectDefinitionId'
 *      collection: // value for 'collection'
 *   },
 * });
 */
export function useAddAggregateCollectionMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddAggregateCollectionMutation,
    AddAggregateCollectionMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    AddAggregateCollectionMutation,
    AddAggregateCollectionMutationVariables
  >(AddAggregateCollectionDocument, options);
}
export type AddAggregateCollectionMutationHookResult = ReturnType<
  typeof useAddAggregateCollectionMutation
>;
export type AddAggregateCollectionMutationResult =
  Apollo.MutationResult<AddAggregateCollectionMutation>;
export type AddAggregateCollectionMutationOptions = Apollo.BaseMutationOptions<
  AddAggregateCollectionMutation,
  AddAggregateCollectionMutationVariables
>;
export const UpdateAggregateCollectionDocument = gql`
  mutation updateAggregateCollection(
    $projectDefinitionId: ID!
    $collectionId: ID!
    $collection: AggregateCollectionInput!
  ) {
    updateAggregateCollection(
      projectDefinitionId: $projectDefinitionId
      collectionId: $collectionId
      collection: $collection
    ) {
      id
      projectDefinitionId
      name
      isAbstract
      attributesSchema {
        name
        details {
          __typename
          ... on IntFieldConfig {
            unit
            integer
          }
          ... on DecimalFieldConfig {
            unit
            precision
            numeric
          }
          ... on StringFieldConfig {
            transforms
            text
          }
          ... on BoolFieldConfig {
            enabled
          }
          ... on StaticChoiceFieldConfig {
            selected
            options {
              id
              label
              helpText
            }
          }
          ... on AggregateReferenceConfig {
            fromCollection
          }
          ... on NodeReferenceConfig {
            nodeType
          }
        }
      }
    }
  }
`;
export type UpdateAggregateCollectionMutationFn = Apollo.MutationFunction<
  UpdateAggregateCollectionMutation,
  UpdateAggregateCollectionMutationVariables
>;

/**
 * __useUpdateAggregateCollectionMutation__
 *
 * To run a mutation, you first call `useUpdateAggregateCollectionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAggregateCollectionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAggregateCollectionMutation, { data, loading, error }] = useUpdateAggregateCollectionMutation({
 *   variables: {
 *      projectDefinitionId: // value for 'projectDefinitionId'
 *      collectionId: // value for 'collectionId'
 *      collection: // value for 'collection'
 *   },
 * });
 */
export function useUpdateAggregateCollectionMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateAggregateCollectionMutation,
    UpdateAggregateCollectionMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateAggregateCollectionMutation,
    UpdateAggregateCollectionMutationVariables
  >(UpdateAggregateCollectionDocument, options);
}
export type UpdateAggregateCollectionMutationHookResult = ReturnType<
  typeof useUpdateAggregateCollectionMutation
>;
export type UpdateAggregateCollectionMutationResult =
  Apollo.MutationResult<UpdateAggregateCollectionMutation>;
export type UpdateAggregateCollectionMutationOptions =
  Apollo.BaseMutationOptions<
    UpdateAggregateCollectionMutation,
    UpdateAggregateCollectionMutationVariables
  >;
export const AddAggregateDocument = gql`
  mutation addAggregate(
    $projectDefinitionId: ID!
    $collectionId: ID!
    $aggregate: AggregateInput!
  ) {
    addAggregate(
      projectDefinitionId: $projectDefinitionId
      collectionId: $collectionId
      aggregate: $aggregate
    ) {
      id
      projectDefinitionId
      collectionId
      name
      ordinal
      isExtendable
      translated {
        ressourceId
        locale
        scope
        name
        value
      }
      attributes {
        name
        isReadonly
        value {
          __typename
          ... on IntFieldValue {
            integer
          }
          ... on DecimalFieldValue {
            numeric
          }
          ... on StringFieldValue {
            text
          }
          ... on BoolFieldValue {
            enabled
          }
          ... on ReferenceId {
            uuid
          }
        }
      }
    }
  }
`;
export type AddAggregateMutationFn = Apollo.MutationFunction<
  AddAggregateMutation,
  AddAggregateMutationVariables
>;

/**
 * __useAddAggregateMutation__
 *
 * To run a mutation, you first call `useAddAggregateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddAggregateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addAggregateMutation, { data, loading, error }] = useAddAggregateMutation({
 *   variables: {
 *      projectDefinitionId: // value for 'projectDefinitionId'
 *      collectionId: // value for 'collectionId'
 *      aggregate: // value for 'aggregate'
 *   },
 * });
 */
export function useAddAggregateMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddAggregateMutation,
    AddAggregateMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    AddAggregateMutation,
    AddAggregateMutationVariables
  >(AddAggregateDocument, options);
}
export type AddAggregateMutationHookResult = ReturnType<
  typeof useAddAggregateMutation
>;
export type AddAggregateMutationResult =
  Apollo.MutationResult<AddAggregateMutation>;
export type AddAggregateMutationOptions = Apollo.BaseMutationOptions<
  AddAggregateMutation,
  AddAggregateMutationVariables
>;
export const UpdateAggregateDocument = gql`
  mutation updateAggregate(
    $projectDefinitionId: ID!
    $collectionId: ID!
    $aggregateId: ID!
    $aggregate: AggregateInput!
  ) {
    updateAggregate(
      projectDefinitionId: $projectDefinitionId
      collectionId: $collectionId
      aggregateId: $aggregateId
      replacement: $aggregate
    ) {
      id
      projectDefinitionId
      collectionId
      name
      ordinal
      isExtendable
      translated {
        ressourceId
        locale
        scope
        name
        value
      }
      attributes {
        name
        isReadonly
        value {
          __typename
          ... on IntFieldValue {
            integer
          }
          ... on DecimalFieldValue {
            numeric
          }
          ... on StringFieldValue {
            text
          }
          ... on BoolFieldValue {
            enabled
          }
          ... on ReferenceId {
            uuid
          }
        }
      }
    }
  }
`;
export type UpdateAggregateMutationFn = Apollo.MutationFunction<
  UpdateAggregateMutation,
  UpdateAggregateMutationVariables
>;

/**
 * __useUpdateAggregateMutation__
 *
 * To run a mutation, you first call `useUpdateAggregateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAggregateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAggregateMutation, { data, loading, error }] = useUpdateAggregateMutation({
 *   variables: {
 *      projectDefinitionId: // value for 'projectDefinitionId'
 *      collectionId: // value for 'collectionId'
 *      aggregateId: // value for 'aggregateId'
 *      aggregate: // value for 'aggregate'
 *   },
 * });
 */
export function useUpdateAggregateMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateAggregateMutation,
    UpdateAggregateMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateAggregateMutation,
    UpdateAggregateMutationVariables
  >(UpdateAggregateDocument, options);
}
export type UpdateAggregateMutationHookResult = ReturnType<
  typeof useUpdateAggregateMutation
>;
export type UpdateAggregateMutationResult =
  Apollo.MutationResult<UpdateAggregateMutation>;
export type UpdateAggregateMutationOptions = Apollo.BaseMutationOptions<
  UpdateAggregateMutation,
  UpdateAggregateMutationVariables
>;
export const DeleteAggregateDocument = gql`
  mutation deleteAggregate(
    $projectDefinitionId: ID!
    $collectionId: ID!
    $aggregateId: ID!
  ) {
    deleteAggregate(
      projectDefinitionId: $projectDefinitionId
      collectionId: $collectionId
      aggregateId: $aggregateId
    )
  }
`;
export type DeleteAggregateMutationFn = Apollo.MutationFunction<
  DeleteAggregateMutation,
  DeleteAggregateMutationVariables
>;

/**
 * __useDeleteAggregateMutation__
 *
 * To run a mutation, you first call `useDeleteAggregateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAggregateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAggregateMutation, { data, loading, error }] = useDeleteAggregateMutation({
 *   variables: {
 *      projectDefinitionId: // value for 'projectDefinitionId'
 *      collectionId: // value for 'collectionId'
 *      aggregateId: // value for 'aggregateId'
 *   },
 * });
 */
export function useDeleteAggregateMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteAggregateMutation,
    DeleteAggregateMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteAggregateMutation,
    DeleteAggregateMutationVariables
  >(DeleteAggregateDocument, options);
}
export type DeleteAggregateMutationHookResult = ReturnType<
  typeof useDeleteAggregateMutation
>;
export type DeleteAggregateMutationResult =
  Apollo.MutationResult<DeleteAggregateMutation>;
export type DeleteAggregateMutationOptions = Apollo.BaseMutationOptions<
  DeleteAggregateMutation,
  DeleteAggregateMutationVariables
>;
export const FindProjectDefinitionFormulasDocument = gql`
  query findProjectDefinitionFormulas(
    $projectDefinitionId: ID!
    $query: String!
    $first: Int!
    $after: String
  ) {
    results: findProjectDefinitionFormulas(
      projectDefinitionId: $projectDefinitionId
      query: $query
      first: $first
      after: $after
    ) {
      pageInfo {
        hasNextPage
        endCursor
        totalCount
      }
      edges {
        cursor
        node {
          id
          name
          expression
        }
      }
    }
  }
`;

/**
 * __useFindProjectDefinitionFormulasQuery__
 *
 * To run a query within a React component, call `useFindProjectDefinitionFormulasQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindProjectDefinitionFormulasQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindProjectDefinitionFormulasQuery({
 *   variables: {
 *      projectDefinitionId: // value for 'projectDefinitionId'
 *      query: // value for 'query'
 *      first: // value for 'first'
 *      after: // value for 'after'
 *   },
 * });
 */
export function useFindProjectDefinitionFormulasQuery(
  baseOptions: Apollo.QueryHookOptions<
    FindProjectDefinitionFormulasQuery,
    FindProjectDefinitionFormulasQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    FindProjectDefinitionFormulasQuery,
    FindProjectDefinitionFormulasQueryVariables
  >(FindProjectDefinitionFormulasDocument, options);
}
export function useFindProjectDefinitionFormulasLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindProjectDefinitionFormulasQuery,
    FindProjectDefinitionFormulasQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    FindProjectDefinitionFormulasQuery,
    FindProjectDefinitionFormulasQueryVariables
  >(FindProjectDefinitionFormulasDocument, options);
}
export type FindProjectDefinitionFormulasQueryHookResult = ReturnType<
  typeof useFindProjectDefinitionFormulasQuery
>;
export type FindProjectDefinitionFormulasLazyQueryHookResult = ReturnType<
  typeof useFindProjectDefinitionFormulasLazyQuery
>;
export type FindProjectDefinitionFormulasQueryResult = Apollo.QueryResult<
  FindProjectDefinitionFormulasQuery,
  FindProjectDefinitionFormulasQueryVariables
>;
export const FindProjectDefinitionRootSectionsDocument = gql`
  query findProjectDefinitionRootSections($id: ID!) {
    findProjectDefinitionRootSections(projectDefinitionId: $id) {
      roots {
        definition {
          id
          projectDefinitionId
          name
          isCollection
          instanciateByDefault
          ordinal
          validator
          translations {
            helpTextName
            label
          }
          fieldDetails {
            __typename
            ... on IntFieldConfig {
              unit
              integer
            }
            ... on DecimalFieldConfig {
              unit
              precision
              numeric
            }
            ... on StringFieldConfig {
              transforms
              text
            }
            ... on BoolFieldConfig {
              enabled
            }
            ... on StaticChoiceFieldConfig {
              options {
                id
                label
                helpText
              }
              selected
            }
            ... on CollapsibleContainerFieldConfig {
              isCollapsible
            }
            ... on StaticNumberFieldConfig {
              passToTranslation
              precision
              unit
            }
          }
          path
        }
      }
    }
  }
`;

/**
 * __useFindProjectDefinitionRootSectionsQuery__
 *
 * To run a query within a React component, call `useFindProjectDefinitionRootSectionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindProjectDefinitionRootSectionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindProjectDefinitionRootSectionsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFindProjectDefinitionRootSectionsQuery(
  baseOptions: Apollo.QueryHookOptions<
    FindProjectDefinitionRootSectionsQuery,
    FindProjectDefinitionRootSectionsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    FindProjectDefinitionRootSectionsQuery,
    FindProjectDefinitionRootSectionsQueryVariables
  >(FindProjectDefinitionRootSectionsDocument, options);
}
export function useFindProjectDefinitionRootSectionsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindProjectDefinitionRootSectionsQuery,
    FindProjectDefinitionRootSectionsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    FindProjectDefinitionRootSectionsQuery,
    FindProjectDefinitionRootSectionsQueryVariables
  >(FindProjectDefinitionRootSectionsDocument, options);
}
export type FindProjectDefinitionRootSectionsQueryHookResult = ReturnType<
  typeof useFindProjectDefinitionRootSectionsQuery
>;
export type FindProjectDefinitionRootSectionsLazyQueryHookResult = ReturnType<
  typeof useFindProjectDefinitionRootSectionsLazyQuery
>;
export type FindProjectDefinitionRootSectionsQueryResult = Apollo.QueryResult<
  FindProjectDefinitionRootSectionsQuery,
  FindProjectDefinitionRootSectionsQueryVariables
>;
export const FindProjectDefinitionRootSectionContainersDocument = gql`
  query findProjectDefinitionRootSectionContainers(
    $id: ID!
    $rootSectionId: ID!
  ) {
    findProjectDefinitionRootSectionContainers(
      projectDefinitionId: $id
      rootSectionId: $rootSectionId
    ) {
      roots {
        definition {
          id
          projectDefinitionId
          name
          isCollection
          instanciateByDefault
          ordinal
          validator
          translations {
            helpTextName
            label
          }
          fieldDetails {
            __typename
            ... on IntFieldConfig {
              unit
              integer
            }
            ... on DecimalFieldConfig {
              unit
              precision
              numeric
            }
            ... on StringFieldConfig {
              transforms
              text
            }
            ... on BoolFieldConfig {
              enabled
            }
            ... on StaticChoiceFieldConfig {
              options {
                id
                label
                helpText
              }
              selected
            }
            ... on CollapsibleContainerFieldConfig {
              isCollapsible
            }
            ... on StaticNumberFieldConfig {
              passToTranslation
              precision
              unit
            }
          }
          path
        }
        children {
          definition {
            id
            projectDefinitionId
            name
            isCollection
            instanciateByDefault
            ordinal
            validator
            translations {
              helpTextName
              label
            }
            fieldDetails {
              __typename
              ... on IntFieldConfig {
                unit
                integer
              }
              ... on DecimalFieldConfig {
                unit
                precision
                numeric
              }
              ... on StringFieldConfig {
                transforms
                text
              }
              ... on BoolFieldConfig {
                enabled
              }
              ... on StaticChoiceFieldConfig {
                options {
                  id
                  label
                  helpText
                }
                selected
              }
              ... on CollapsibleContainerFieldConfig {
                isCollapsible
              }
              ... on StaticNumberFieldConfig {
                passToTranslation
                precision
                unit
              }
            }
            path
          }
        }
      }
    }
  }
`;

/**
 * __useFindProjectDefinitionRootSectionContainersQuery__
 *
 * To run a query within a React component, call `useFindProjectDefinitionRootSectionContainersQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindProjectDefinitionRootSectionContainersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindProjectDefinitionRootSectionContainersQuery({
 *   variables: {
 *      id: // value for 'id'
 *      rootSectionId: // value for 'rootSectionId'
 *   },
 * });
 */
export function useFindProjectDefinitionRootSectionContainersQuery(
  baseOptions: Apollo.QueryHookOptions<
    FindProjectDefinitionRootSectionContainersQuery,
    FindProjectDefinitionRootSectionContainersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    FindProjectDefinitionRootSectionContainersQuery,
    FindProjectDefinitionRootSectionContainersQueryVariables
  >(FindProjectDefinitionRootSectionContainersDocument, options);
}
export function useFindProjectDefinitionRootSectionContainersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindProjectDefinitionRootSectionContainersQuery,
    FindProjectDefinitionRootSectionContainersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    FindProjectDefinitionRootSectionContainersQuery,
    FindProjectDefinitionRootSectionContainersQueryVariables
  >(FindProjectDefinitionRootSectionContainersDocument, options);
}
export type FindProjectDefinitionRootSectionContainersQueryHookResult =
  ReturnType<typeof useFindProjectDefinitionRootSectionContainersQuery>;
export type FindProjectDefinitionRootSectionContainersLazyQueryHookResult =
  ReturnType<typeof useFindProjectDefinitionRootSectionContainersLazyQuery>;
export type FindProjectDefinitionRootSectionContainersQueryResult =
  Apollo.QueryResult<
    FindProjectDefinitionRootSectionContainersQuery,
    FindProjectDefinitionRootSectionContainersQueryVariables
  >;
export const FindProjectDefinitionFormContentDocument = gql`
  query findProjectDefinitionFormContent($id: ID!, $formId: ID!) {
    findProjectDefinitionNode(projectDefinitionId: $id, id: $formId) {
      id
      projectDefinitionId
      name
      isCollection
      instanciateByDefault
      ordinal
      path
      validator
      triggers {
        action
        targetTypeId
        params {
          name
          value
        }
      }
      translations {
        helpTextName
        label
      }
      fieldDetails {
        __typename
        ... on IntFieldConfig {
          unit
          integer
        }
        ... on DecimalFieldConfig {
          unit
          precision
          numeric
        }
        ... on StringFieldConfig {
          transforms
          text
        }
        ... on BoolFieldConfig {
          enabled
        }
        ... on StaticChoiceFieldConfig {
          options {
            id
            label
            helpText
          }
          selected
        }
        ... on CollapsibleContainerFieldConfig {
          isCollapsible
        }
        ... on StaticNumberFieldConfig {
          passToTranslation
          precision
          unit
        }
      }
    }
    findProjectDefinitionFormContent(
      projectDefinitionId: $id
      formId: $formId
    ) {
      roots {
        definition {
          id
          projectDefinitionId
          name
          isCollection
          instanciateByDefault
          ordinal
          validator
          triggers {
            action
            targetTypeId
            params {
              name
              value
            }
          }
          translations {
            helpTextName
            label
          }
          fieldDetails {
            __typename
            ... on IntFieldConfig {
              unit
              integer
            }
            ... on DecimalFieldConfig {
              unit
              precision
              numeric
            }
            ... on StringFieldConfig {
              transforms
              text
            }
            ... on BoolFieldConfig {
              enabled
            }
            ... on StaticChoiceFieldConfig {
              options {
                id
                label
                helpText
              }
              selected
            }
            ... on CollapsibleContainerFieldConfig {
              isCollapsible
            }
            ... on StaticNumberFieldConfig {
              passToTranslation
              precision
              unit
            }
          }
          path
        }
        children {
          definition {
            id
            projectDefinitionId
            name
            isCollection
            instanciateByDefault
            ordinal
            validator
            triggers {
              action
              targetTypeId
              params {
                name
                value
              }
            }
            translations {
              helpTextName
              label
            }
            fieldDetails {
              __typename
              ... on IntFieldConfig {
                unit
                integer
              }
              ... on DecimalFieldConfig {
                unit
                precision
                numeric
              }
              ... on StringFieldConfig {
                transforms
                text
              }
              ... on BoolFieldConfig {
                enabled
              }
              ... on StaticChoiceFieldConfig {
                options {
                  id
                  label
                  helpText
                }
                selected
              }
              ... on CollapsibleContainerFieldConfig {
                isCollapsible
              }
              ... on StaticNumberFieldConfig {
                passToTranslation
                precision
                unit
              }
            }
            path
          }
        }
      }
    }
  }
`;

/**
 * __useFindProjectDefinitionFormContentQuery__
 *
 * To run a query within a React component, call `useFindProjectDefinitionFormContentQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindProjectDefinitionFormContentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindProjectDefinitionFormContentQuery({
 *   variables: {
 *      id: // value for 'id'
 *      formId: // value for 'formId'
 *   },
 * });
 */
export function useFindProjectDefinitionFormContentQuery(
  baseOptions: Apollo.QueryHookOptions<
    FindProjectDefinitionFormContentQuery,
    FindProjectDefinitionFormContentQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    FindProjectDefinitionFormContentQuery,
    FindProjectDefinitionFormContentQueryVariables
  >(FindProjectDefinitionFormContentDocument, options);
}
export function useFindProjectDefinitionFormContentLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindProjectDefinitionFormContentQuery,
    FindProjectDefinitionFormContentQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    FindProjectDefinitionFormContentQuery,
    FindProjectDefinitionFormContentQueryVariables
  >(FindProjectDefinitionFormContentDocument, options);
}
export type FindProjectDefinitionFormContentQueryHookResult = ReturnType<
  typeof useFindProjectDefinitionFormContentQuery
>;
export type FindProjectDefinitionFormContentLazyQueryHookResult = ReturnType<
  typeof useFindProjectDefinitionFormContentLazyQuery
>;
export type FindProjectDefinitionFormContentQueryResult = Apollo.QueryResult<
  FindProjectDefinitionFormContentQuery,
  FindProjectDefinitionFormContentQueryVariables
>;
export const FindProjectDefinitionNodeDocument = gql`
  query findProjectDefinitionNode($projectDefinitionId: ID!, $nodeId: ID!) {
    findProjectDefinitionNode(
      projectDefinitionId: $projectDefinitionId
      id: $nodeId
    ) {
      id
      projectDefinitionId
      name
      isCollection
      instanciateByDefault
      ordinal
      path
      validator
      triggers {
        action
        targetTypeId
        params {
          name
          value
        }
      }
      translations {
        helpTextName
        label
      }
      meta {
        isVisible
      }
      fieldDetails {
        __typename
        ... on IntFieldConfig {
          unit
          integer
        }
        ... on DecimalFieldConfig {
          unit
          precision
          numeric
        }
        ... on StringFieldConfig {
          transforms
          text
        }
        ... on BoolFieldConfig {
          enabled
        }
        ... on StaticChoiceFieldConfig {
          selected
          options {
            id
            label
            helpText
          }
        }
        ... on CollapsibleContainerFieldConfig {
          isCollapsible
        }
        ... on StaticNumberFieldConfig {
          passToTranslation
          precision
          unit
        }
      }
      translated {
        id
        ressourceId
        locale
        scope
        name
        value
      }
    }
  }
`;

/**
 * __useFindProjectDefinitionNodeQuery__
 *
 * To run a query within a React component, call `useFindProjectDefinitionNodeQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindProjectDefinitionNodeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindProjectDefinitionNodeQuery({
 *   variables: {
 *      projectDefinitionId: // value for 'projectDefinitionId'
 *      nodeId: // value for 'nodeId'
 *   },
 * });
 */
export function useFindProjectDefinitionNodeQuery(
  baseOptions: Apollo.QueryHookOptions<
    FindProjectDefinitionNodeQuery,
    FindProjectDefinitionNodeQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    FindProjectDefinitionNodeQuery,
    FindProjectDefinitionNodeQueryVariables
  >(FindProjectDefinitionNodeDocument, options);
}
export function useFindProjectDefinitionNodeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindProjectDefinitionNodeQuery,
    FindProjectDefinitionNodeQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    FindProjectDefinitionNodeQuery,
    FindProjectDefinitionNodeQueryVariables
  >(FindProjectDefinitionNodeDocument, options);
}
export type FindProjectDefinitionNodeQueryHookResult = ReturnType<
  typeof useFindProjectDefinitionNodeQuery
>;
export type FindProjectDefinitionNodeLazyQueryHookResult = ReturnType<
  typeof useFindProjectDefinitionNodeLazyQuery
>;
export type FindProjectDefinitionNodeQueryResult = Apollo.QueryResult<
  FindProjectDefinitionNodeQuery,
  FindProjectDefinitionNodeQueryVariables
>;
export const FindProjectDefintionsDocument = gql`
  query findProjectDefintions($query: String!, $first: Int!, $after: String) {
    results: findProjectDefintions(
      query: $query
      first: $first
      after: $after
    ) {
      edges {
        node {
          id
          name
        }
        cursor
      }
      pageInfo {
        hasNextPage
        endCursor
        totalCount
      }
    }
  }
`;

/**
 * __useFindProjectDefintionsQuery__
 *
 * To run a query within a React component, call `useFindProjectDefintionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindProjectDefintionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindProjectDefintionsQuery({
 *   variables: {
 *      query: // value for 'query'
 *      first: // value for 'first'
 *      after: // value for 'after'
 *   },
 * });
 */
export function useFindProjectDefintionsQuery(
  baseOptions: Apollo.QueryHookOptions<
    FindProjectDefintionsQuery,
    FindProjectDefintionsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    FindProjectDefintionsQuery,
    FindProjectDefintionsQueryVariables
  >(FindProjectDefintionsDocument, options);
}
export function useFindProjectDefintionsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindProjectDefintionsQuery,
    FindProjectDefintionsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    FindProjectDefintionsQuery,
    FindProjectDefintionsQueryVariables
  >(FindProjectDefintionsDocument, options);
}
export type FindProjectDefintionsQueryHookResult = ReturnType<
  typeof useFindProjectDefintionsQuery
>;
export type FindProjectDefintionsLazyQueryHookResult = ReturnType<
  typeof useFindProjectDefintionsLazyQuery
>;
export type FindProjectDefintionsQueryResult = Apollo.QueryResult<
  FindProjectDefintionsQuery,
  FindProjectDefintionsQueryVariables
>;
export const UnitsDocument = gql`
  query units {
    units {
      id
    }
  }
`;

/**
 * __useUnitsQuery__
 *
 * To run a query within a React component, call `useUnitsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUnitsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUnitsQuery({
 *   variables: {
 *   },
 * });
 */
export function useUnitsQuery(
  baseOptions?: Apollo.QueryHookOptions<UnitsQuery, UnitsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UnitsQuery, UnitsQueryVariables>(
    UnitsDocument,
    options
  );
}
export function useUnitsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UnitsQuery, UnitsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UnitsQuery, UnitsQueryVariables>(
    UnitsDocument,
    options
  );
}
export type UnitsQueryHookResult = ReturnType<typeof useUnitsQuery>;
export type UnitsLazyQueryHookResult = ReturnType<typeof useUnitsLazyQuery>;
export type UnitsQueryResult = Apollo.QueryResult<
  UnitsQuery,
  UnitsQueryVariables
>;
export const FindDefinitionFormulaFieldMixDocument = gql`
  query findDefinitionFormulaFieldMix(
    $projectDefinitionId: ID!
    $query: String!
    $first: Int!
    $after: String
  ) {
    results: findDefinitionFormulaFieldMix(
      projectDefinitionId: $projectDefinitionId
      query: $query
      first: $first
      after: $after
    ) {
      edges {
        node {
          id
          label: name
        }
        cursor
      }
      pageInfo {
        hasNextPage
        endCursor
        totalCount
      }
    }
  }
`;

/**
 * __useFindDefinitionFormulaFieldMixQuery__
 *
 * To run a query within a React component, call `useFindDefinitionFormulaFieldMixQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindDefinitionFormulaFieldMixQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindDefinitionFormulaFieldMixQuery({
 *   variables: {
 *      projectDefinitionId: // value for 'projectDefinitionId'
 *      query: // value for 'query'
 *      first: // value for 'first'
 *      after: // value for 'after'
 *   },
 * });
 */
export function useFindDefinitionFormulaFieldMixQuery(
  baseOptions: Apollo.QueryHookOptions<
    FindDefinitionFormulaFieldMixQuery,
    FindDefinitionFormulaFieldMixQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    FindDefinitionFormulaFieldMixQuery,
    FindDefinitionFormulaFieldMixQueryVariables
  >(FindDefinitionFormulaFieldMixDocument, options);
}
export function useFindDefinitionFormulaFieldMixLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindDefinitionFormulaFieldMixQuery,
    FindDefinitionFormulaFieldMixQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    FindDefinitionFormulaFieldMixQuery,
    FindDefinitionFormulaFieldMixQueryVariables
  >(FindDefinitionFormulaFieldMixDocument, options);
}
export type FindDefinitionFormulaFieldMixQueryHookResult = ReturnType<
  typeof useFindDefinitionFormulaFieldMixQuery
>;
export type FindDefinitionFormulaFieldMixLazyQueryHookResult = ReturnType<
  typeof useFindDefinitionFormulaFieldMixLazyQuery
>;
export type FindDefinitionFormulaFieldMixQueryResult = Apollo.QueryResult<
  FindDefinitionFormulaFieldMixQuery,
  FindDefinitionFormulaFieldMixQueryVariables
>;
export const FindFormulaDocument = gql`
  query findFormula($projectDefinitionId: ID!, $formulaId: ID!) {
    result: findFormula(
      projectDefinitionId: $projectDefinitionId
      formulaId: $formulaId
    ) {
      id
      label: name
    }
  }
`;

/**
 * __useFindFormulaQuery__
 *
 * To run a query within a React component, call `useFindFormulaQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindFormulaQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindFormulaQuery({
 *   variables: {
 *      projectDefinitionId: // value for 'projectDefinitionId'
 *      formulaId: // value for 'formulaId'
 *   },
 * });
 */
export function useFindFormulaQuery(
  baseOptions: Apollo.QueryHookOptions<
    FindFormulaQuery,
    FindFormulaQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FindFormulaQuery, FindFormulaQueryVariables>(
    FindFormulaDocument,
    options
  );
}
export function useFindFormulaLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindFormulaQuery,
    FindFormulaQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FindFormulaQuery, FindFormulaQueryVariables>(
    FindFormulaDocument,
    options
  );
}
export type FindFormulaQueryHookResult = ReturnType<typeof useFindFormulaQuery>;
export type FindFormulaLazyQueryHookResult = ReturnType<
  typeof useFindFormulaLazyQuery
>;
export type FindFormulaQueryResult = Apollo.QueryResult<
  FindFormulaQuery,
  FindFormulaQueryVariables
>;
export const FindAggregatesDocument = gql`
  query findAggregates(
    $projectDefinitionId: ID!
    $collectionId: ID!
    $query: String!
    $first: Int!
    $after: String
  ) {
    results: findAggregates(
      projectDefinitionId: $projectDefinitionId
      collectionId: $collectionId
      query: $query
      first: $first
      after: $after
    ) {
      edges {
        node {
          id
          projectDefinitionId
          collectionId
          name
          ordinal
          isExtendable
          translated {
            id
            ressourceId
            locale
            scope
            name
            value
          }
          attributes {
            name
            isReadonly
            value {
              __typename
              ... on IntFieldValue {
                integer
              }
              ... on DecimalFieldValue {
                numeric
              }
              ... on StringFieldValue {
                text
              }
              ... on BoolFieldValue {
                enabled
              }
              ... on ReferenceId {
                uuid
              }
            }
          }
        }
        cursor
      }
      pageInfo {
        hasNextPage
        endCursor
        totalCount
      }
    }
  }
`;

/**
 * __useFindAggregatesQuery__
 *
 * To run a query within a React component, call `useFindAggregatesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAggregatesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindAggregatesQuery({
 *   variables: {
 *      projectDefinitionId: // value for 'projectDefinitionId'
 *      collectionId: // value for 'collectionId'
 *      query: // value for 'query'
 *      first: // value for 'first'
 *      after: // value for 'after'
 *   },
 * });
 */
export function useFindAggregatesQuery(
  baseOptions: Apollo.QueryHookOptions<
    FindAggregatesQuery,
    FindAggregatesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FindAggregatesQuery, FindAggregatesQueryVariables>(
    FindAggregatesDocument,
    options
  );
}
export function useFindAggregatesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindAggregatesQuery,
    FindAggregatesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FindAggregatesQuery, FindAggregatesQueryVariables>(
    FindAggregatesDocument,
    options
  );
}
export type FindAggregatesQueryHookResult = ReturnType<
  typeof useFindAggregatesQuery
>;
export type FindAggregatesLazyQueryHookResult = ReturnType<
  typeof useFindAggregatesLazyQuery
>;
export type FindAggregatesQueryResult = Apollo.QueryResult<
  FindAggregatesQuery,
  FindAggregatesQueryVariables
>;
export const FindAggregateCollectionDocument = gql`
  query findAggregateCollection($projectDefinitionId: ID!, $collectionId: ID!) {
    findAggregateCollection(
      projectDefinitionId: $projectDefinitionId
      collectionId: $collectionId
    ) {
      id
      projectDefinitionId
      name
      isAbstract
      translated {
        id
        ressourceId
        locale
        scope
        name
        value
      }
      attributesSchema {
        name
        details {
          __typename
          ... on IntFieldConfig {
            unit
            integer
          }
          ... on DecimalFieldConfig {
            unit
            precision
            numeric
          }
          ... on StringFieldConfig {
            transforms
            text
          }
          ... on BoolFieldConfig {
            enabled
          }
          ... on StaticChoiceFieldConfig {
            selected
            options {
              id
              label
              helpText
            }
          }
          ... on AggregateReferenceConfig {
            fromCollection
          }
          ... on NodeReferenceConfig {
            nodeType
          }
        }
      }
    }
  }
`;

/**
 * __useFindAggregateCollectionQuery__
 *
 * To run a query within a React component, call `useFindAggregateCollectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAggregateCollectionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindAggregateCollectionQuery({
 *   variables: {
 *      projectDefinitionId: // value for 'projectDefinitionId'
 *      collectionId: // value for 'collectionId'
 *   },
 * });
 */
export function useFindAggregateCollectionQuery(
  baseOptions: Apollo.QueryHookOptions<
    FindAggregateCollectionQuery,
    FindAggregateCollectionQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    FindAggregateCollectionQuery,
    FindAggregateCollectionQueryVariables
  >(FindAggregateCollectionDocument, options);
}
export function useFindAggregateCollectionLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindAggregateCollectionQuery,
    FindAggregateCollectionQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    FindAggregateCollectionQuery,
    FindAggregateCollectionQueryVariables
  >(FindAggregateCollectionDocument, options);
}
export type FindAggregateCollectionQueryHookResult = ReturnType<
  typeof useFindAggregateCollectionQuery
>;
export type FindAggregateCollectionLazyQueryHookResult = ReturnType<
  typeof useFindAggregateCollectionLazyQuery
>;
export type FindAggregateCollectionQueryResult = Apollo.QueryResult<
  FindAggregateCollectionQuery,
  FindAggregateCollectionQueryVariables
>;
export const ReportViewDocument = gql`
  query reportView($projectDefinitionId: ID!) {
    findDefinitionAggregateCollections(
      projectDefinitionId: $projectDefinitionId
    ) {
      id
      projectDefinitionId
      name
      isAbstract
      translated {
        id
        id
        locale
        scope
        name
        value
      }
      attributesSchema {
        name
        details {
          __typename
          ... on IntFieldConfig {
            unit
            integer
          }
          ... on DecimalFieldConfig {
            unit
            precision
            numeric
          }
          ... on StringFieldConfig {
            transforms
            transforms
          }
          ... on BoolFieldConfig {
            enabled
          }
          ... on StaticChoiceFieldConfig {
            options {
              id
              label
              helpText
            }
            selected
          }
          ... on AggregateReferenceConfig {
            fromCollection
          }
          ... on NodeReferenceConfig {
            nodeType
          }
        }
        translations {
          helpTextName
          label
        }
      }
    }
    findReportDefinitions(projectDefinitionId: $projectDefinitionId) {
      id
      name
      projectDefinitionId
      structure {
        selection {
          fromCollectionId
          fromAlias
          joinsCache {
            fromObjectName
            fromPropertyName
            joinOnCollection
            joinOnAttribute
            aliasName
            warnAboutIdleItems
            sameCardinality
            allowDicardElement
          }
          formulaAttribute {
            bucketName
            attributeName
          }
          datasheetAttribute {
            bucketName
            bucketName
          }
        }
        columns {
          name
          expression
          unit {
            __typename
            ... on Unit {
              id
            }
            ... on AttributeBucket {
              bucketName
              attributeName
            }
          }
          isVisible
        }
        groupBy {
          bucketName
          attributeName
        }
        having
        orderBy {
          bucketName
          attributeName
        }
      }
    }
  }
`;

/**
 * __useReportViewQuery__
 *
 * To run a query within a React component, call `useReportViewQuery` and pass it any options that fit your needs.
 * When your component renders, `useReportViewQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReportViewQuery({
 *   variables: {
 *      projectDefinitionId: // value for 'projectDefinitionId'
 *   },
 * });
 */
export function useReportViewQuery(
  baseOptions: Apollo.QueryHookOptions<
    ReportViewQuery,
    ReportViewQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ReportViewQuery, ReportViewQueryVariables>(
    ReportViewDocument,
    options
  );
}
export function useReportViewLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ReportViewQuery,
    ReportViewQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ReportViewQuery, ReportViewQueryVariables>(
    ReportViewDocument,
    options
  );
}
export type ReportViewQueryHookResult = ReturnType<typeof useReportViewQuery>;
export type ReportViewLazyQueryHookResult = ReturnType<
  typeof useReportViewLazyQuery
>;
export type ReportViewQueryResult = Apollo.QueryResult<
  ReportViewQuery,
  ReportViewQueryVariables
>;
export const CreateProjectDocument = gql`
  mutation createProject($projectDetails: ProjectDetailsInput!) {
    createProject(projectDetails: $projectDetails) {
      id
      name
      projectDefinitionId
      datasheetId
    }
  }
`;
export type CreateProjectMutationFn = Apollo.MutationFunction<
  CreateProjectMutation,
  CreateProjectMutationVariables
>;

/**
 * __useCreateProjectMutation__
 *
 * To run a mutation, you first call `useCreateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProjectMutation, { data, loading, error }] = useCreateProjectMutation({
 *   variables: {
 *      projectDetails: // value for 'projectDetails'
 *   },
 * });
 */
export function useCreateProjectMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateProjectMutation,
    CreateProjectMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateProjectMutation,
    CreateProjectMutationVariables
  >(CreateProjectDocument, options);
}
export type CreateProjectMutationHookResult = ReturnType<
  typeof useCreateProjectMutation
>;
export type CreateProjectMutationResult =
  Apollo.MutationResult<CreateProjectMutation>;
export type CreateProjectMutationOptions = Apollo.BaseMutationOptions<
  CreateProjectMutation,
  CreateProjectMutationVariables
>;
export const UpdateFieldsDocument = gql`
  mutation updateFields($projectId: ID!, $updates: [FieldUpdateInput!]!) {
    updateProjectFields(projectId: $projectId, updates: $updates) {
      id
      projectId
      typePath
      typeId
      path
      value {
        __typename
        ... on IntFieldValue {
          integer
        }
        ... on DecimalFieldValue {
          numeric
        }
        ... on StringFieldValue {
          text
        }
        ... on BoolFieldValue {
          enabled
        }
      }
      label
    }
  }
`;
export type UpdateFieldsMutationFn = Apollo.MutationFunction<
  UpdateFieldsMutation,
  UpdateFieldsMutationVariables
>;

/**
 * __useUpdateFieldsMutation__
 *
 * To run a mutation, you first call `useUpdateFieldsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateFieldsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateFieldsMutation, { data, loading, error }] = useUpdateFieldsMutation({
 *   variables: {
 *      projectId: // value for 'projectId'
 *      updates: // value for 'updates'
 *   },
 * });
 */
export function useUpdateFieldsMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateFieldsMutation,
    UpdateFieldsMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateFieldsMutation,
    UpdateFieldsMutationVariables
  >(UpdateFieldsDocument, options);
}
export type UpdateFieldsMutationHookResult = ReturnType<
  typeof useUpdateFieldsMutation
>;
export type UpdateFieldsMutationResult =
  Apollo.MutationResult<UpdateFieldsMutation>;
export type UpdateFieldsMutationOptions = Apollo.BaseMutationOptions<
  UpdateFieldsMutation,
  UpdateFieldsMutationVariables
>;
export const AddProjectCollectionItemDocument = gql`
  mutation addProjectCollectionItem(
    $projectId: ID!
    $collectionTarget: ProjectNodeCollectionTargetInput!
  ) {
    addProjectCollectionItem(
      projectId: $projectId
      collectionTarget: $collectionTarget
    ) {
      id
      projectId
      typePath
      typeId
      path
      value {
        __typename
        ... on IntFieldValue {
          integer
        }
        ... on DecimalFieldValue {
          numeric
        }
        ... on StringFieldValue {
          text
        }
        ... on BoolFieldValue {
          enabled
        }
      }
      label
    }
  }
`;
export type AddProjectCollectionItemMutationFn = Apollo.MutationFunction<
  AddProjectCollectionItemMutation,
  AddProjectCollectionItemMutationVariables
>;

/**
 * __useAddProjectCollectionItemMutation__
 *
 * To run a mutation, you first call `useAddProjectCollectionItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddProjectCollectionItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addProjectCollectionItemMutation, { data, loading, error }] = useAddProjectCollectionItemMutation({
 *   variables: {
 *      projectId: // value for 'projectId'
 *      collectionTarget: // value for 'collectionTarget'
 *   },
 * });
 */
export function useAddProjectCollectionItemMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddProjectCollectionItemMutation,
    AddProjectCollectionItemMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    AddProjectCollectionItemMutation,
    AddProjectCollectionItemMutationVariables
  >(AddProjectCollectionItemDocument, options);
}
export type AddProjectCollectionItemMutationHookResult = ReturnType<
  typeof useAddProjectCollectionItemMutation
>;
export type AddProjectCollectionItemMutationResult =
  Apollo.MutationResult<AddProjectCollectionItemMutation>;
export type AddProjectCollectionItemMutationOptions =
  Apollo.BaseMutationOptions<
    AddProjectCollectionItemMutation,
    AddProjectCollectionItemMutationVariables
  >;
export const CloneProjectCollectionDocument = gql`
  mutation cloneProjectCollection($projectId: ID!, $collectionNodeId: ID!) {
    cloneProjectCollection(
      projectId: $projectId
      collectionNodeId: $collectionNodeId
    ) {
      id
      projectId
      typePath
      typeId
      path
      value {
        __typename
        ... on IntFieldValue {
          integer
        }
        ... on DecimalFieldValue {
          numeric
        }
        ... on StringFieldValue {
          text
        }
        ... on BoolFieldValue {
          enabled
        }
      }
      label
    }
  }
`;
export type CloneProjectCollectionMutationFn = Apollo.MutationFunction<
  CloneProjectCollectionMutation,
  CloneProjectCollectionMutationVariables
>;

/**
 * __useCloneProjectCollectionMutation__
 *
 * To run a mutation, you first call `useCloneProjectCollectionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCloneProjectCollectionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cloneProjectCollectionMutation, { data, loading, error }] = useCloneProjectCollectionMutation({
 *   variables: {
 *      projectId: // value for 'projectId'
 *      collectionNodeId: // value for 'collectionNodeId'
 *   },
 * });
 */
export function useCloneProjectCollectionMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CloneProjectCollectionMutation,
    CloneProjectCollectionMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CloneProjectCollectionMutation,
    CloneProjectCollectionMutationVariables
  >(CloneProjectCollectionDocument, options);
}
export type CloneProjectCollectionMutationHookResult = ReturnType<
  typeof useCloneProjectCollectionMutation
>;
export type CloneProjectCollectionMutationResult =
  Apollo.MutationResult<CloneProjectCollectionMutation>;
export type CloneProjectCollectionMutationOptions = Apollo.BaseMutationOptions<
  CloneProjectCollectionMutation,
  CloneProjectCollectionMutationVariables
>;
export const DeleteProjectCollectionDocument = gql`
  mutation deleteProjectCollection($projectId: ID!, $collectionNodeId: ID!) {
    deleteProjectCollection(
      projectId: $projectId
      collectionNodeId: $collectionNodeId
    ) {
      id
      path
    }
  }
`;
export type DeleteProjectCollectionMutationFn = Apollo.MutationFunction<
  DeleteProjectCollectionMutation,
  DeleteProjectCollectionMutationVariables
>;

/**
 * __useDeleteProjectCollectionMutation__
 *
 * To run a mutation, you first call `useDeleteProjectCollectionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProjectCollectionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProjectCollectionMutation, { data, loading, error }] = useDeleteProjectCollectionMutation({
 *   variables: {
 *      projectId: // value for 'projectId'
 *      collectionNodeId: // value for 'collectionNodeId'
 *   },
 * });
 */
export function useDeleteProjectCollectionMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteProjectCollectionMutation,
    DeleteProjectCollectionMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteProjectCollectionMutation,
    DeleteProjectCollectionMutationVariables
  >(DeleteProjectCollectionDocument, options);
}
export type DeleteProjectCollectionMutationHookResult = ReturnType<
  typeof useDeleteProjectCollectionMutation
>;
export type DeleteProjectCollectionMutationResult =
  Apollo.MutationResult<DeleteProjectCollectionMutation>;
export type DeleteProjectCollectionMutationOptions = Apollo.BaseMutationOptions<
  DeleteProjectCollectionMutation,
  DeleteProjectCollectionMutationVariables
>;
export const FindProjectsDocument = gql`
  query findProjects($query: String!, $first: Int!, $after: String) {
    results: findProjects(query: $query, first: $first, after: $after) {
      edges {
        node {
          id
          name
          projectDefinitionId
          datasheetId
        }
        cursor
      }
      pageInfo {
        hasNextPage
        endCursor
        totalCount
      }
    }
  }
`;

/**
 * __useFindProjectsQuery__
 *
 * To run a query within a React component, call `useFindProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindProjectsQuery({
 *   variables: {
 *      query: // value for 'query'
 *      first: // value for 'first'
 *      after: // value for 'after'
 *   },
 * });
 */
export function useFindProjectsQuery(
  baseOptions: Apollo.QueryHookOptions<
    FindProjectsQuery,
    FindProjectsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FindProjectsQuery, FindProjectsQueryVariables>(
    FindProjectsDocument,
    options
  );
}
export function useFindProjectsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindProjectsQuery,
    FindProjectsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FindProjectsQuery, FindProjectsQueryVariables>(
    FindProjectsDocument,
    options
  );
}
export type FindProjectsQueryHookResult = ReturnType<
  typeof useFindProjectsQuery
>;
export type FindProjectsLazyQueryHookResult = ReturnType<
  typeof useFindProjectsLazyQuery
>;
export type FindProjectsQueryResult = Apollo.QueryResult<
  FindProjectsQuery,
  FindProjectsQueryVariables
>;
export const FindProjectRootSectionsDocument = gql`
  query findProjectRootSections($projectId: ID!) {
    findProjectRootSections(projectId: $projectId) {
      roots {
        definition {
          id
          projectDefinitionId
          name
          isCollection
          instanciateByDefault
          ordinal
          validator
          translations {
            helpTextName
            label
          }
          fieldDetails {
            __typename
            ... on IntFieldConfig {
              unit
              integer
            }
            ... on DecimalFieldConfig {
              unit
              precision
              numeric
            }
            ... on StringFieldConfig {
              transforms
              text
            }
            ... on BoolFieldConfig {
              enabled
            }
            ... on StaticChoiceFieldConfig {
              options {
                id
                label
                helpText
              }
              selected
            }
            ... on CollapsibleContainerFieldConfig {
              isCollapsible
            }
          }
        }
        state {
          isVisible
          selectedChild
        }
        nodes {
          node {
            id
            projectId
            typePath
            typeId
            path
            label
            value {
              __typename
              ... on IntFieldValue {
                integer
              }
              ... on DecimalFieldValue {
                numeric
              }
              ... on StringFieldValue {
                text
              }
              ... on BoolFieldValue {
                enabled
              }
            }
          }
        }
      }
    }
  }
`;

/**
 * __useFindProjectRootSectionsQuery__
 *
 * To run a query within a React component, call `useFindProjectRootSectionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindProjectRootSectionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindProjectRootSectionsQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useFindProjectRootSectionsQuery(
  baseOptions: Apollo.QueryHookOptions<
    FindProjectRootSectionsQuery,
    FindProjectRootSectionsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    FindProjectRootSectionsQuery,
    FindProjectRootSectionsQueryVariables
  >(FindProjectRootSectionsDocument, options);
}
export function useFindProjectRootSectionsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindProjectRootSectionsQuery,
    FindProjectRootSectionsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    FindProjectRootSectionsQuery,
    FindProjectRootSectionsQueryVariables
  >(FindProjectRootSectionsDocument, options);
}
export type FindProjectRootSectionsQueryHookResult = ReturnType<
  typeof useFindProjectRootSectionsQuery
>;
export type FindProjectRootSectionsLazyQueryHookResult = ReturnType<
  typeof useFindProjectRootSectionsLazyQuery
>;
export type FindProjectRootSectionsQueryResult = Apollo.QueryResult<
  FindProjectRootSectionsQuery,
  FindProjectRootSectionsQueryVariables
>;
export const FindProjectRootSectionContainersDocument = gql`
  query findProjectRootSectionContainers($projectId: ID!, $rootSectionId: ID!) {
    findProjectRootSectionContainers(
      projectId: $projectId
      rootSectionId: $rootSectionId
    ) {
      roots {
        definition {
          id
          projectDefinitionId
          name
          isCollection
          instanciateByDefault
          ordinal
          validator
          translations {
            helpTextName
            label
          }
          fieldDetails {
            __typename
            ... on IntFieldConfig {
              unit
              integer
            }
            ... on DecimalFieldConfig {
              unit
              precision
              numeric
            }
            ... on StringFieldConfig {
              transforms
              text
            }
            ... on BoolFieldConfig {
              enabled
            }
            ... on StaticChoiceFieldConfig {
              options {
                id
                label
                helpText
              }
              selected
            }
            ... on CollapsibleContainerFieldConfig {
              isCollapsible
            }
          }
        }
        state {
          isVisible
          selectedChild
        }
        nodes {
          node {
            id
            projectId
            typePath
            typeId
            path
            value {
              __typename
              ... on IntFieldValue {
                integer
              }
              ... on DecimalFieldValue {
                numeric
              }
              ... on StringFieldValue {
                text
              }
              ... on BoolFieldValue {
                enabled
              }
            }
          }
          children {
            definition {
              id
              projectDefinitionId
              name
              isCollection
              instanciateByDefault
              ordinal
              validator
              translations {
                helpTextName
                label
              }
              fieldDetails {
                __typename
                ... on IntFieldConfig {
                  unit
                  integer
                }
                ... on DecimalFieldConfig {
                  unit
                  precision
                  numeric
                }
                ... on StringFieldConfig {
                  transforms
                  text
                }
                ... on BoolFieldConfig {
                  enabled
                }
                ... on StaticChoiceFieldConfig {
                  options {
                    id
                    label
                    helpText
                  }
                  selected
                }
                ... on CollapsibleContainerFieldConfig {
                  isCollapsible
                }
              }
            }
            state {
              isVisible
              selectedChild
            }
            nodes {
              node {
                id
                projectId
                typePath
                typeId
                path
                value {
                  __typename
                  ... on IntFieldValue {
                    integer
                  }
                  ... on DecimalFieldValue {
                    numeric
                  }
                  ... on StringFieldValue {
                    text
                  }
                  ... on BoolFieldValue {
                    enabled
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

/**
 * __useFindProjectRootSectionContainersQuery__
 *
 * To run a query within a React component, call `useFindProjectRootSectionContainersQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindProjectRootSectionContainersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindProjectRootSectionContainersQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *      rootSectionId: // value for 'rootSectionId'
 *   },
 * });
 */
export function useFindProjectRootSectionContainersQuery(
  baseOptions: Apollo.QueryHookOptions<
    FindProjectRootSectionContainersQuery,
    FindProjectRootSectionContainersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    FindProjectRootSectionContainersQuery,
    FindProjectRootSectionContainersQueryVariables
  >(FindProjectRootSectionContainersDocument, options);
}
export function useFindProjectRootSectionContainersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindProjectRootSectionContainersQuery,
    FindProjectRootSectionContainersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    FindProjectRootSectionContainersQuery,
    FindProjectRootSectionContainersQueryVariables
  >(FindProjectRootSectionContainersDocument, options);
}
export type FindProjectRootSectionContainersQueryHookResult = ReturnType<
  typeof useFindProjectRootSectionContainersQuery
>;
export type FindProjectRootSectionContainersLazyQueryHookResult = ReturnType<
  typeof useFindProjectRootSectionContainersLazyQuery
>;
export type FindProjectRootSectionContainersQueryResult = Apollo.QueryResult<
  FindProjectRootSectionContainersQuery,
  FindProjectRootSectionContainersQueryVariables
>;
export const FindProjectFormContentDocument = gql`
  query findProjectFormContent($projectId: ID!, $formId: ID!) {
    findProjectNodeMetaDefinition(projectId: $projectId, nodeId: $formId) {
      typeId
      definition {
        id
        projectDefinitionId
        name
        isCollection
        instanciateByDefault
        ordinal
        validator
        fieldDetails {
          __typename
          ... on IntFieldConfig {
            unit
            integer
          }
          ... on DecimalFieldConfig {
            unit
            precision
            numeric
          }
          ... on StringFieldConfig {
            transforms
            text
          }
          ... on BoolFieldConfig {
            enabled
          }
          ... on StaticChoiceFieldConfig {
            options {
              id
              label
              helpText
            }
            selected
          }
          ... on CollapsibleContainerFieldConfig {
            isCollapsible
          }
          ... on StaticNumberFieldConfig {
            unit
            precision
          }
        }
        translations {
          helpTextName
          label
        }
        path
      }
      state {
        isVisible
      }
    }
    findProjectFormContent(projectId: $projectId, formId: $formId) {
      roots {
        definition {
          id
          projectDefinitionId
          name
          isCollection
          instanciateByDefault
          ordinal
          validator
          translations {
            helpTextName
            label
          }
          fieldDetails {
            __typename
            ... on IntFieldConfig {
              unit
              integer
            }
            ... on DecimalFieldConfig {
              unit
              precision
              numeric
            }
            ... on StringFieldConfig {
              transforms
              text
            }
            ... on BoolFieldConfig {
              enabled
            }
            ... on StaticChoiceFieldConfig {
              options {
                id
                label
                helpText
              }
              selected
            }
            ... on CollapsibleContainerFieldConfig {
              isCollapsible
            }
            ... on StaticNumberFieldConfig {
              unit
              precision
            }
          }
        }
        state {
          isVisible
          selectedChild
        }
        nodes {
          node {
            id
            projectId
            typePath
            typeId
            path
            value {
              __typename
              ... on IntFieldValue {
                integer
              }
              ... on DecimalFieldValue {
                numeric
              }
              ... on StringFieldValue {
                text
              }
              ... on BoolFieldValue {
                enabled
              }
            }
          }
          children {
            definition {
              id
              projectDefinitionId
              name
              isCollection
              instanciateByDefault
              ordinal
              validator
              translations {
                helpTextName
                label
              }
              fieldDetails {
                __typename
                ... on IntFieldConfig {
                  unit
                  integer
                }
                ... on DecimalFieldConfig {
                  unit
                  precision
                  numeric
                }
                ... on StringFieldConfig {
                  transforms
                  text
                }
                ... on BoolFieldConfig {
                  enabled
                }
                ... on StaticChoiceFieldConfig {
                  options {
                    id
                    label
                    helpText
                  }
                  selected
                }
                ... on CollapsibleContainerFieldConfig {
                  isCollapsible
                }
                ... on StaticNumberFieldConfig {
                  unit
                  precision
                }
              }
            }
            state {
              isVisible
              selectedChild
            }
            nodes {
              node {
                id
                projectId
                typePath
                typeId
                path
                value {
                  __typename
                  ... on IntFieldValue {
                    integer
                  }
                  ... on DecimalFieldValue {
                    numeric
                  }
                  ... on StringFieldValue {
                    text
                  }
                  ... on BoolFieldValue {
                    enabled
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

/**
 * __useFindProjectFormContentQuery__
 *
 * To run a query within a React component, call `useFindProjectFormContentQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindProjectFormContentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindProjectFormContentQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *      formId: // value for 'formId'
 *   },
 * });
 */
export function useFindProjectFormContentQuery(
  baseOptions: Apollo.QueryHookOptions<
    FindProjectFormContentQuery,
    FindProjectFormContentQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    FindProjectFormContentQuery,
    FindProjectFormContentQueryVariables
  >(FindProjectFormContentDocument, options);
}
export function useFindProjectFormContentLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindProjectFormContentQuery,
    FindProjectFormContentQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    FindProjectFormContentQuery,
    FindProjectFormContentQueryVariables
  >(FindProjectFormContentDocument, options);
}
export type FindProjectFormContentQueryHookResult = ReturnType<
  typeof useFindProjectFormContentQuery
>;
export type FindProjectFormContentLazyQueryHookResult = ReturnType<
  typeof useFindProjectFormContentLazyQuery
>;
export type FindProjectFormContentQueryResult = Apollo.QueryResult<
  FindProjectFormContentQuery,
  FindProjectFormContentQueryVariables
>;
export const FindProjectDefinitionIdDocument = gql`
  query findProjectDefinitionId($projectId: ID!) {
    findProjectDetails(id: $projectId) {
      projectDefinitionId
    }
  }
`;

/**
 * __useFindProjectDefinitionIdQuery__
 *
 * To run a query within a React component, call `useFindProjectDefinitionIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindProjectDefinitionIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindProjectDefinitionIdQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useFindProjectDefinitionIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    FindProjectDefinitionIdQuery,
    FindProjectDefinitionIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    FindProjectDefinitionIdQuery,
    FindProjectDefinitionIdQueryVariables
  >(FindProjectDefinitionIdDocument, options);
}
export function useFindProjectDefinitionIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindProjectDefinitionIdQuery,
    FindProjectDefinitionIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    FindProjectDefinitionIdQuery,
    FindProjectDefinitionIdQueryVariables
  >(FindProjectDefinitionIdDocument, options);
}
export type FindProjectDefinitionIdQueryHookResult = ReturnType<
  typeof useFindProjectDefinitionIdQuery
>;
export type FindProjectDefinitionIdLazyQueryHookResult = ReturnType<
  typeof useFindProjectDefinitionIdLazyQuery
>;
export type FindProjectDefinitionIdQueryResult = Apollo.QueryResult<
  FindProjectDefinitionIdQuery,
  FindProjectDefinitionIdQueryVariables
>;
export const FindDefinitionAggregateCollectionsDocument = gql`
  query findDefinitionAggregateCollections($projectDefinitionId: ID!) {
    findDefinitionAggregateCollections(
      projectDefinitionId: $projectDefinitionId
    ) {
      id
      projectDefinitionId
      name
      isAbstract
      attributesSchema {
        name
        details {
          __typename
          ... on IntFieldConfig {
            unit
            integer
          }
          ... on DecimalFieldConfig {
            unit
            precision
            numeric
          }
          ... on StringFieldConfig {
            transforms
            text
          }
          ... on BoolFieldConfig {
            enabled
          }
          ... on StaticChoiceFieldConfig {
            selected
            options {
              id
              label
              helpText
            }
          }
          ... on AggregateReferenceConfig {
            fromCollection
          }
          ... on NodeReferenceConfig {
            nodeType
          }
        }
      }
    }
  }
`;

/**
 * __useFindDefinitionAggregateCollectionsQuery__
 *
 * To run a query within a React component, call `useFindDefinitionAggregateCollectionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindDefinitionAggregateCollectionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindDefinitionAggregateCollectionsQuery({
 *   variables: {
 *      projectDefinitionId: // value for 'projectDefinitionId'
 *   },
 * });
 */
export function useFindDefinitionAggregateCollectionsQuery(
  baseOptions: Apollo.QueryHookOptions<
    FindDefinitionAggregateCollectionsQuery,
    FindDefinitionAggregateCollectionsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    FindDefinitionAggregateCollectionsQuery,
    FindDefinitionAggregateCollectionsQueryVariables
  >(FindDefinitionAggregateCollectionsDocument, options);
}
export function useFindDefinitionAggregateCollectionsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindDefinitionAggregateCollectionsQuery,
    FindDefinitionAggregateCollectionsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    FindDefinitionAggregateCollectionsQuery,
    FindDefinitionAggregateCollectionsQueryVariables
  >(FindDefinitionAggregateCollectionsDocument, options);
}
export type FindDefinitionAggregateCollectionsQueryHookResult = ReturnType<
  typeof useFindDefinitionAggregateCollectionsQuery
>;
export type FindDefinitionAggregateCollectionsLazyQueryHookResult = ReturnType<
  typeof useFindDefinitionAggregateCollectionsLazyQuery
>;
export type FindDefinitionAggregateCollectionsQueryResult = Apollo.QueryResult<
  FindDefinitionAggregateCollectionsQuery,
  FindDefinitionAggregateCollectionsQueryVariables
>;
export const FindProjectReportWithDefinitionDocument = gql`
  query findProjectReportWithDefinition(
    $projectId: ID!
    $reportDefinitionId: ID!
  ) {
    findProjectReport(
      projectId: $projectId
      reportDefinitionId: $reportDefinitionId
    ) {
      creationDateUtc
      name
      stages {
        columns {
          label
          isVisible
          unit
        }
        summary {
          label
          unit
          value {
            __typename
            ... on IntFieldValue {
              integer
            }
            ... on DecimalFieldValue {
              numeric
            }
            ... on StringFieldValue {
              text
            }
            ... on BoolFieldValue {
              enabled
            }
          }
        }
        rows {
          nodeId
          formulaId
          elementDefId
          childReferenceId
          columns {
            unit
            value {
              __typename
              ... on IntFieldValue {
                integer
              }
              ... on DecimalFieldValue {
                numeric
              }
              ... on StringFieldValue {
                text
              }
              ... on BoolFieldValue {
                enabled
              }
            }
          }
        }
      }
      summaries {
        label
        unit
        value {
          __typename
          ... on IntFieldValue {
            integer
          }
          ... on DecimalFieldValue {
            numeric
          }
          ... on StringFieldValue {
            text
          }
          ... on BoolFieldValue {
            enabled
          }
        }
      }
    }
  }
`;

/**
 * __useFindProjectReportWithDefinitionQuery__
 *
 * To run a query within a React component, call `useFindProjectReportWithDefinitionQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindProjectReportWithDefinitionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindProjectReportWithDefinitionQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *      reportDefinitionId: // value for 'reportDefinitionId'
 *   },
 * });
 */
export function useFindProjectReportWithDefinitionQuery(
  baseOptions: Apollo.QueryHookOptions<
    FindProjectReportWithDefinitionQuery,
    FindProjectReportWithDefinitionQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    FindProjectReportWithDefinitionQuery,
    FindProjectReportWithDefinitionQueryVariables
  >(FindProjectReportWithDefinitionDocument, options);
}
export function useFindProjectReportWithDefinitionLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindProjectReportWithDefinitionQuery,
    FindProjectReportWithDefinitionQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    FindProjectReportWithDefinitionQuery,
    FindProjectReportWithDefinitionQueryVariables
  >(FindProjectReportWithDefinitionDocument, options);
}
export type FindProjectReportWithDefinitionQueryHookResult = ReturnType<
  typeof useFindProjectReportWithDefinitionQuery
>;
export type FindProjectReportWithDefinitionLazyQueryHookResult = ReturnType<
  typeof useFindProjectReportWithDefinitionLazyQuery
>;
export type FindProjectReportWithDefinitionQueryResult = Apollo.QueryResult<
  FindProjectReportWithDefinitionQuery,
  FindProjectReportWithDefinitionQueryVariables
>;
export const FindReportDefinitionsFromProjectDetailsDocument = gql`
  query findReportDefinitionsFromProjectDetails($projectId: ID!) {
    findProjectDetails(id: $projectId) {
      reportDefinitions {
        id
        name
        structure {
          selection {
            formulaAttribute {
              bucketName
              attributeName
            }
          }
          columns {
            name
            isVisible
            unit {
              __typename
              ... on Unit {
                id
              }
              ... on AttributeBucket {
                bucketName
                attributeName
              }
            }
          }
        }
      }
    }
  }
`;

/**
 * __useFindReportDefinitionsFromProjectDetailsQuery__
 *
 * To run a query within a React component, call `useFindReportDefinitionsFromProjectDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindReportDefinitionsFromProjectDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindReportDefinitionsFromProjectDetailsQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useFindReportDefinitionsFromProjectDetailsQuery(
  baseOptions: Apollo.QueryHookOptions<
    FindReportDefinitionsFromProjectDetailsQuery,
    FindReportDefinitionsFromProjectDetailsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    FindReportDefinitionsFromProjectDetailsQuery,
    FindReportDefinitionsFromProjectDetailsQueryVariables
  >(FindReportDefinitionsFromProjectDetailsDocument, options);
}
export function useFindReportDefinitionsFromProjectDetailsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindReportDefinitionsFromProjectDetailsQuery,
    FindReportDefinitionsFromProjectDetailsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    FindReportDefinitionsFromProjectDetailsQuery,
    FindReportDefinitionsFromProjectDetailsQueryVariables
  >(FindReportDefinitionsFromProjectDetailsDocument, options);
}
export type FindReportDefinitionsFromProjectDetailsQueryHookResult = ReturnType<
  typeof useFindReportDefinitionsFromProjectDetailsQuery
>;
export type FindReportDefinitionsFromProjectDetailsLazyQueryHookResult =
  ReturnType<typeof useFindReportDefinitionsFromProjectDetailsLazyQuery>;
export type FindReportDefinitionsFromProjectDetailsQueryResult =
  Apollo.QueryResult<
    FindReportDefinitionsFromProjectDetailsQuery,
    FindReportDefinitionsFromProjectDetailsQueryVariables
  >;

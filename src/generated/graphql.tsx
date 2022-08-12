import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type FieldWrapper<T> = T;
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  JsonSchema: any;
};

export type AttributeBucket = {
  __typename?: 'AttributeBucket';
  bucketName: FieldWrapper<Scalars['String']>;
  attributeName: FieldWrapper<Scalars['String']>;
};

export type BoolFieldConfig = {
  __typename?: 'BoolFieldConfig';
  isCheckbox: FieldWrapper<Scalars['Boolean']>;
};

export type BoolFieldConfigInput = {
  validator: Scalars['JsonSchema'];
};

export type BoolFieldValue = {
  __typename?: 'BoolFieldValue';
  enabled: FieldWrapper<Scalars['Boolean']>;
};

export type BoolFieldValueInput = {
  enabled: Scalars['Boolean'];
};

export type CollapsibleContainerFieldConfig = {
  __typename?: 'CollapsibleContainerFieldConfig';
  isCollapsible: FieldWrapper<Scalars['Boolean']>;
};

export type CollapsibleContainerFieldConfigInput = {
  isCollapsible: Scalars['Boolean'];
};

export type ComputedValue = {
  __typename?: 'ComputedValue';
  label: FieldWrapper<Scalars['String']>;
  value: FieldWrapper<FieldValue>;
  unit?: Maybe<FieldWrapper<Scalars['String']>>;
};

export type Datasheet = {
  __typename?: 'Datasheet';
  id: FieldWrapper<Scalars['ID']>;
  name: FieldWrapper<Scalars['String']>;
  isStaged: FieldWrapper<Scalars['Boolean']>;
  projectDefinitionId: FieldWrapper<Scalars['String']>;
  fromDatasheetId?: Maybe<FieldWrapper<Scalars['String']>>;
  elements: FieldWrapper<DatasheetElementConnection>;
};


export type DatasheetElementsArgs = {
  first: Scalars['Int'];
  after?: Maybe<Scalars['String']>;
};

export type DatasheetConnection = {
  __typename?: 'DatasheetConnection';
  edges: Array<FieldWrapper<DatasheetEdge>>;
  pageInfo: FieldWrapper<PageInfo>;
};

export type DatasheetDefinitionElement = {
  __typename?: 'DatasheetDefinitionElement';
  id: FieldWrapper<Scalars['ID']>;
  unitId: FieldWrapper<Scalars['String']>;
  isCollection: FieldWrapper<Scalars['Boolean']>;
  projectDefinitionId: FieldWrapper<Scalars['String']>;
  projectDefinition?: Maybe<FieldWrapper<ProjectDefinition>>;
  orderIndex: FieldWrapper<Scalars['Int']>;
  name: FieldWrapper<Scalars['String']>;
  defaultProperties: Array<FieldWrapper<DatasheetDefinitionElementPropertyDict>>;
  tags: Array<FieldWrapper<Scalars['String']>>;
  creationDateUtc: FieldWrapper<Scalars['String']>;
};

export type DatasheetDefinitionElementConnection = {
  __typename?: 'DatasheetDefinitionElementConnection';
  edges: Array<FieldWrapper<DatasheetDefinitionElementEdge>>;
  pageInfo: FieldWrapper<PageInfo>;
};

export type DatasheetDefinitionElementEdge = {
  __typename?: 'DatasheetDefinitionElementEdge';
  node: FieldWrapper<DatasheetDefinitionElement>;
  cursor: FieldWrapper<Scalars['String']>;
};

export type DatasheetDefinitionElementProperty = {
  __typename?: 'DatasheetDefinitionElementProperty';
  isReadonly: FieldWrapper<Scalars['Boolean']>;
  value: FieldWrapper<Scalars['String']>;
};

export type DatasheetDefinitionElementPropertyDict = {
  __typename?: 'DatasheetDefinitionElementPropertyDict';
  name: FieldWrapper<Scalars['String']>;
  property: FieldWrapper<DatasheetDefinitionElementProperty>;
};

export type DatasheetDefinitionPropertySchema = {
  __typename?: 'DatasheetDefinitionPropertySchema';
  valueValidator: FieldWrapper<Scalars['JsonSchema']>;
};

export type DatasheetDefinitionPropertySchemaDict = {
  __typename?: 'DatasheetDefinitionPropertySchemaDict';
  name: FieldWrapper<Scalars['String']>;
  schema: FieldWrapper<DatasheetDefinitionPropertySchema>;
};

export type DatasheetEdge = {
  __typename?: 'DatasheetEdge';
  node: FieldWrapper<Datasheet>;
  cursor: FieldWrapper<Scalars['String']>;
};

export type DatasheetElement = {
  __typename?: 'DatasheetElement';
  datasheetId: FieldWrapper<Scalars['String']>;
  elementDefId: FieldWrapper<Scalars['String']>;
  elementDefinition: FieldWrapper<DatasheetDefinitionElement>;
  childElementReference: FieldWrapper<Scalars['ID']>;
  properties: FieldWrapper<Scalars['String']>;
  originalDatasheetId: FieldWrapper<Scalars['String']>;
  creationDateUtc: FieldWrapper<Scalars['String']>;
};

export type DatasheetElementConnection = {
  __typename?: 'DatasheetElementConnection';
  edges: Array<FieldWrapper<DatasheetElementEdge>>;
  pageInfo: FieldWrapper<PageInfo>;
};

export type DatasheetElementEdge = {
  __typename?: 'DatasheetElementEdge';
  node: FieldWrapper<DatasheetElement>;
  cursor: FieldWrapper<Scalars['String']>;
};

export type DatasheetInput = {
  name: Scalars['String'];
  projectDefinitionId: Scalars['String'];
  fromDatasheetId?: Maybe<Scalars['String']>;
};

export type DecimalFieldConfig = {
  __typename?: 'DecimalFieldConfig';
  unit: FieldWrapper<Scalars['String']>;
  precision: FieldWrapper<Scalars['Int']>;
};

export type DecimalFieldConfigInput = {
  validator: Scalars['JsonSchema'];
  precision: Scalars['Int'];
};

export type DecimalFieldValue = {
  __typename?: 'DecimalFieldValue';
  numeric: FieldWrapper<Scalars['Float']>;
};

export type DecimalFieldValueInput = {
  numeric: Scalars['Float'];
};

export type DistributableItem = {
  __typename?: 'DistributableItem';
  projectId: FieldWrapper<Scalars['String']>;
  reportDefinitionId: FieldWrapper<Scalars['String']>;
  nodeId: FieldWrapper<Scalars['String']>;
  formulaId: FieldWrapper<Scalars['String']>;
  suppliedItem: FieldWrapper<SuppliedItem>;
  distribution_ids: Array<FieldWrapper<Scalars['String']>>;
  summary: FieldWrapper<ComputedValue>;
  columns: Array<FieldWrapper<ComputedValue>>;
  obsolete: FieldWrapper<Scalars['Boolean']>;
  creationDateUtc: FieldWrapper<Scalars['String']>;
};

export enum FieldDetailsType {
  INT_FIELD_CONFIG = 'INT_FIELD_CONFIG',
  DECIMAL_FIELD_CONFIG = 'DECIMAL_FIELD_CONFIG',
  STRING_FIELD_CONFIG = 'STRING_FIELD_CONFIG',
  BOOL_FIELD_CONFIG = 'BOOL_FIELD_CONFIG',
  STATIC_CHOICE_FIELD_CONFIG = 'STATIC_CHOICE_FIELD_CONFIG',
  COLLAPSIBLE_CONTAINER_FIELD_CONFIG = 'COLLAPSIBLE_CONTAINER_FIELD_CONFIG',
  STATIC_NUMBER_FIELD_CONFIG = 'STATIC_NUMBER_FIELD_CONFIG'
}

export type FieldDetailsUnion = IntFieldConfig | DecimalFieldConfig | StringFieldConfig | BoolFieldConfig | StaticChoiceFieldConfig | CollapsibleContainerFieldConfig | StaticNumberFieldConfig;

export type FieldDetailsUnionInput = {
  kind: FieldDetailsType;
  int?: Maybe<IntFieldConfigInput>;
  decimal?: Maybe<DecimalFieldConfigInput>;
  string?: Maybe<StringFieldConfigInput>;
  bool?: Maybe<BoolFieldConfigInput>;
  staticChoice?: Maybe<StaticChoiceFieldConfigInput>;
  collapsibleContainer?: Maybe<CollapsibleContainerFieldConfigInput>;
  staticNumberFieldConfig?: Maybe<StaticNumberFieldConfigInput>;
};

export type FieldUpdateInput = {
  nodeId: Scalars['ID'];
  value: FieldValueInput;
};

export type FieldValue = IntFieldValue | DecimalFieldValue | StringFieldValue | BoolFieldValue | ReferenceId;

export type FieldValueInput = {
  kind: FieldValueType;
  int?: Maybe<IntFieldValueInput>;
  decimal?: Maybe<DecimalFieldValueInput>;
  string?: Maybe<StringFieldValueInput>;
  bool?: Maybe<BoolFieldValueInput>;
};

export enum FieldValueType {
  INT_FIELD_VALUE = 'INT_FIELD_VALUE',
  DECIMAL_FIELD_VALUE = 'DECIMAL_FIELD_VALUE',
  STRING_FIELD_VALUE = 'STRING_FIELD_VALUE',
  BOOL_FIELD_VALUE = 'BOOL_FIELD_VALUE'
}

export type Formula = {
  __typename?: 'Formula';
  id: FieldWrapper<Scalars['ID']>;
  projectDefinitionId: FieldWrapper<Scalars['String']>;
  attachedToTypeId: FieldWrapper<Scalars['String']>;
  name: FieldWrapper<Scalars['String']>;
  expression: FieldWrapper<Scalars['String']>;
};

export type FormulaConnection = {
  __typename?: 'FormulaConnection';
  edges: Array<FieldWrapper<FormulaEdge>>;
  pageInfo: FieldWrapper<PageInfo>;
};

export type FormulaEdge = {
  __typename?: 'FormulaEdge';
  node: FieldWrapper<Formula>;
  cursor: FieldWrapper<Scalars['String']>;
};

export type IntFieldConfig = {
  __typename?: 'IntFieldConfig';
  unit: FieldWrapper<Scalars['String']>;
};

export type IntFieldConfigInput = {
  validator: Scalars['JsonSchema'];
};

export type IntFieldValue = {
  __typename?: 'IntFieldValue';
  integer: FieldWrapper<Scalars['Int']>;
};

export type IntFieldValueInput = {
  integer: Scalars['Int'];
};


export type Mutation = {
  __typename?: 'Mutation';
  addTranslations: Array<FieldWrapper<Translation>>;
  updateTranslations: Array<FieldWrapper<Translation>>;
  addProjectDefinitionNode: FieldWrapper<ProjectDefinitionNode>;
  updateProjectField: FieldWrapper<ProjectNode>;
  updateProjectFields: Array<Maybe<FieldWrapper<ProjectNode>>>;
  deleteProjectCollection: FieldWrapper<ProjectNode>;
  cloneProjectCollection: Array<FieldWrapper<ProjectNode>>;
  addProjectCollectionItem: Array<FieldWrapper<ProjectNode>>;
  createProject: FieldWrapper<ProjectDetails>;
  createDatasheet: FieldWrapper<Datasheet>;
  createSingleUserOrganization: FieldWrapper<User>;
};


export type MutationAddTranslationsArgs = {
  translations: Array<TranslationInput>;
};


export type MutationUpdateTranslationsArgs = {
  translations: Array<TranslationUpdateInput>;
};


export type MutationAddProjectDefinitionNodeArgs = {
  node: ProjectDefinitionNodeInput;
};


export type MutationUpdateProjectFieldArgs = {
  projectId: Scalars['ID'];
  nodeId: Scalars['ID'];
  value: FieldValueInput;
};


export type MutationUpdateProjectFieldsArgs = {
  projectId: Scalars['ID'];
  updates: Array<FieldUpdateInput>;
};


export type MutationDeleteProjectCollectionArgs = {
  projectId: Scalars['ID'];
  collectionNodeId: Scalars['ID'];
};


export type MutationCloneProjectCollectionArgs = {
  projectId: Scalars['ID'];
  collectionNodeId: Scalars['ID'];
};


export type MutationAddProjectCollectionItemArgs = {
  projectId: Scalars['ID'];
  collectionTarget: ProjectNodeCollectionTargetInput;
};


export type MutationCreateProjectArgs = {
  projectDetails?: Maybe<ProjectDetailsInput>;
};


export type MutationCreateDatasheetArgs = {
  datasheet?: Maybe<DatasheetInput>;
};


export type MutationCreateSingleUserOrganizationArgs = {
  singleUserOrganization: NewSingleUserOrganizationInput;
};

export type NewSingleUserOrganizationInput = {
  organizationName: Scalars['String'];
  email: Scalars['String'];
};

export type NodeConfig = {
  __typename?: 'NodeConfig';
  fieldDetails?: Maybe<FieldWrapper<FieldDetailsUnion>>;
  valueValidator?: Maybe<FieldWrapper<Scalars['JsonSchema']>>;
  triggers: Array<Maybe<FieldWrapper<Trigger>>>;
  translations: FieldWrapper<TranslationConfig>;
  meta?: Maybe<FieldWrapper<NodeMetaConfig>>;
};

export type NodeConfigInput = {
  fieldDetails?: Maybe<FieldDetailsUnionInput>;
  valueValidator?: Maybe<Scalars['JsonSchema']>;
};

export type NodeMetaConfig = {
  __typename?: 'NodeMetaConfig';
  isVisible?: Maybe<FieldWrapper<Scalars['Boolean']>>;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  hasNextPage: FieldWrapper<Scalars['Boolean']>;
  endCursor: FieldWrapper<Scalars['String']>;
  totalCount: FieldWrapper<Scalars['Int']>;
};

export type ProjectConnection = {
  __typename?: 'ProjectConnection';
  edges: Array<FieldWrapper<ProjectEdge>>;
  pageInfo: FieldWrapper<PageInfo>;
};

export type ProjectDefinition = {
  __typename?: 'ProjectDefinition';
  id: FieldWrapper<Scalars['ID']>;
  name: FieldWrapper<Scalars['String']>;
  defaultDatasheetId: FieldWrapper<Scalars['String']>;
  defaultDatasheet: FieldWrapper<Datasheet>;
  projectDefinitionId: FieldWrapper<Scalars['String']>;
  projectDefinition: FieldWrapper<ProjectDefinition>;
  rootSections: FieldWrapper<ProjectDefinitionNodeTree>;
  rootSectionContainers: FieldWrapper<ProjectDefinitionNodeTree>;
  formContent: FieldWrapper<ProjectDefinitionNodeTree>;
  properties: Array<FieldWrapper<DatasheetDefinitionPropertySchemaDict>>;
  elementsDefinition?: Maybe<FieldWrapper<DatasheetDefinitionElementConnection>>;
};


export type ProjectDefinitionRootSectionsArgs = {
  projectDefinitionId: Scalars['ID'];
};


export type ProjectDefinitionRootSectionContainersArgs = {
  projectDefinitionId: Scalars['ID'];
  rootSectionId: Scalars['ID'];
};


export type ProjectDefinitionFormContentArgs = {
  projectDefinitionId: Scalars['ID'];
  formId: Scalars['ID'];
};


export type ProjectDefinitionElementsDefinitionArgs = {
  first: Scalars['Int'];
  after?: Maybe<Scalars['String']>;
};

export type ProjectDefinitionConnection = {
  __typename?: 'ProjectDefinitionConnection';
  edges: Array<FieldWrapper<ProjectDefinitionEdge>>;
  pageInfo: FieldWrapper<PageInfo>;
};

export type ProjectDefinitionEdge = {
  __typename?: 'ProjectDefinitionEdge';
  node: FieldWrapper<ProjectDefinition>;
  cursor: FieldWrapper<Scalars['String']>;
};

export type ProjectDefinitionNode = {
  __typename?: 'ProjectDefinitionNode';
  id: FieldWrapper<Scalars['ID']>;
  projectDefinitionId: FieldWrapper<Scalars['String']>;
  name: FieldWrapper<Scalars['String']>;
  isCollection: FieldWrapper<Scalars['Boolean']>;
  instanciateByDefault: FieldWrapper<Scalars['Boolean']>;
  orderIndex: FieldWrapper<Scalars['Int']>;
  config: FieldWrapper<NodeConfig>;
  defaultValue?: Maybe<FieldWrapper<FieldValue>>;
  path: Array<FieldWrapper<Scalars['String']>>;
  children: Array<FieldWrapper<ProjectDefinitionNode>>;
  translations: Array<FieldWrapper<Translation>>;
};

export type ProjectDefinitionNodeInput = {
  id: Scalars['ID'];
  name: Scalars['String'];
  isCollection: Scalars['Boolean'];
  instanciateByDefault: Scalars['Boolean'];
  orderIndex: Scalars['Int'];
  config: NodeConfigInput;
  defaultValue?: Maybe<FieldValueInput>;
  path: Array<Scalars['String']>;
};

export type ProjectDefinitionNodeTree = {
  __typename?: 'ProjectDefinitionNodeTree';
  roots: Array<FieldWrapper<ProjectDefinitionTreeNode>>;
};

export type ProjectDefinitionTreeNode = {
  __typename?: 'ProjectDefinitionTreeNode';
  definition: FieldWrapper<ProjectDefinitionNode>;
  children: Array<FieldWrapper<ProjectDefinitionTreeNode>>;
};

export type ProjectDetails = {
  __typename?: 'ProjectDetails';
  id: FieldWrapper<Scalars['ID']>;
  name: FieldWrapper<Scalars['String']>;
  isStaged?: Maybe<FieldWrapper<Scalars['Boolean']>>;
  projectDefinitionId: FieldWrapper<Scalars['String']>;
  projectDefinition: FieldWrapper<ProjectDefinition>;
  datasheetId: FieldWrapper<Scalars['String']>;
  datasheet: FieldWrapper<Datasheet>;
  reportDefinitions: Array<FieldWrapper<ReportDefinition>>;
};

export type ProjectDetailsInput = {
  id: Scalars['ID'];
  name: Scalars['String'];
  projectDefinitionId: Scalars['String'];
  datasheetId: Scalars['String'];
};

export type ProjectEdge = {
  __typename?: 'ProjectEdge';
  node: FieldWrapper<ProjectDetails>;
  cursor: FieldWrapper<Scalars['String']>;
};

export type ProjectNode = {
  __typename?: 'ProjectNode';
  id: FieldWrapper<Scalars['ID']>;
  projectId: FieldWrapper<Scalars['String']>;
  typePath: Array<FieldWrapper<Scalars['String']>>;
  typeId: FieldWrapper<Scalars['String']>;
  typeName: FieldWrapper<Scalars['String']>;
  path: Array<FieldWrapper<Scalars['String']>>;
  value?: Maybe<FieldWrapper<FieldValue>>;
  label?: Maybe<FieldWrapper<Scalars['String']>>;
};

export type ProjectNodeCollectionTargetInput = {
  parentNodeId?: Maybe<Scalars['String']>;
  collectionTypeId: Scalars['String'];
};

export type ProjectNodeMeta = {
  __typename?: 'ProjectNodeMeta';
  definition: FieldWrapper<ProjectDefinitionNode>;
  state: FieldWrapper<ProjectNodeMetaState>;
  typeId: FieldWrapper<Scalars['ID']>;
};

export type ProjectNodeMetaState = {
  __typename?: 'ProjectNodeMetaState';
  isVisible?: Maybe<FieldWrapper<Scalars['Boolean']>>;
  selectedChild?: Maybe<FieldWrapper<Scalars['String']>>;
};

export type ProjectNodeTree = {
  __typename?: 'ProjectNodeTree';
  roots: Array<FieldWrapper<ProjectNodeTreeTypeNode>>;
};

export type ProjectNodeTreeNode = {
  __typename?: 'ProjectNodeTreeNode';
  node: FieldWrapper<ProjectNode>;
  children: Array<FieldWrapper<ProjectNodeTreeTypeNode>>;
};

export type ProjectNodeTreeTypeNode = {
  __typename?: 'ProjectNodeTreeTypeNode';
  definition: FieldWrapper<ProjectDefinitionNode>;
  state: FieldWrapper<ProjectNodeMetaState>;
  nodes: Array<FieldWrapper<ProjectNodeTreeNode>>;
};

export type Query = {
  __typename?: 'Query';
  currentUser?: Maybe<FieldWrapper<User>>;
  findDatasheet: FieldWrapper<Datasheet>;
  findDatasheets: FieldWrapper<DatasheetConnection>;
  findDatasheetDefinitionElements: FieldWrapper<DatasheetDefinitionElementConnection>;
  queryDatasheetDefinitionElements: FieldWrapper<DatasheetDefinitionElementConnection>;
  findProjectDefinition: FieldWrapper<ProjectDefinition>;
  findProjectDefinitionRootSections: FieldWrapper<ProjectDefinitionNodeTree>;
  findProjectDefinitionRootSectionContainers: FieldWrapper<ProjectDefinitionNodeTree>;
  findProjectDefinitionFormContent: FieldWrapper<ProjectDefinitionNodeTree>;
  findProjectDefinitionNode: FieldWrapper<ProjectDefinitionNode>;
  findRessourceTranslation: FieldWrapper<TranslationConnection>;
  findProjectDefintions: FieldWrapper<ProjectDefinitionConnection>;
  findProjectRootSections: FieldWrapper<ProjectNodeTree>;
  findProjectRootSectionContainers: FieldWrapper<ProjectNodeTree>;
  findProjectNodeMetaDefinition: FieldWrapper<ProjectNodeMeta>;
  findProjectFormContent: FieldWrapper<ProjectNodeTree>;
  findProjects: FieldWrapper<ProjectConnection>;
  findProjectDetails: FieldWrapper<ProjectDetails>;
  findProjectDefinitionFormulas: FieldWrapper<FormulaConnection>;
  findReportDefinitions: Array<FieldWrapper<ReportDefinition>>;
  findReportDefinition: FieldWrapper<ReportDefinition>;
  findProjectReport: FieldWrapper<Report>;
  findDistributables: Array<FieldWrapper<ReportDefinition>>;
  findDistributableItems: Array<FieldWrapper<DistributableItem>>;
};


export type QueryFindDatasheetArgs = {
  id: Scalars['ID'];
};


export type QueryFindDatasheetsArgs = {
  query: Scalars['String'];
  first: Scalars['Int'];
  after?: Maybe<Scalars['String']>;
};


export type QueryFindDatasheetDefinitionElementsArgs = {
  projectDefinitionId: Scalars['ID'];
  first: Scalars['Int'];
  after?: Maybe<Scalars['String']>;
};


export type QueryQueryDatasheetDefinitionElementsArgs = {
  projectDefinitionId: Scalars['ID'];
  query: Scalars['String'];
  first: Scalars['Int'];
  after?: Maybe<Scalars['String']>;
};


export type QueryFindProjectDefinitionArgs = {
  id: Scalars['ID'];
};


export type QueryFindProjectDefinitionRootSectionsArgs = {
  projectDefinitionId: Scalars['ID'];
};


export type QueryFindProjectDefinitionRootSectionContainersArgs = {
  projectDefinitionId: Scalars['ID'];
  rootSectionId: Scalars['ID'];
};


export type QueryFindProjectDefinitionFormContentArgs = {
  projectDefinitionId: Scalars['ID'];
  formId: Scalars['ID'];
};


export type QueryFindProjectDefinitionNodeArgs = {
  projectDefinitionId: Scalars['ID'];
  id: Scalars['ID'];
};


export type QueryFindRessourceTranslationArgs = {
  ressourceId: Scalars['ID'];
  language: Scalars['String'];
};


export type QueryFindProjectDefintionsArgs = {
  query: Scalars['String'];
  first: Scalars['Int'];
  after?: Maybe<Scalars['String']>;
};


export type QueryFindProjectRootSectionsArgs = {
  projectId: Scalars['ID'];
};


export type QueryFindProjectRootSectionContainersArgs = {
  projectId: Scalars['ID'];
  rootSectionId: Scalars['ID'];
};


export type QueryFindProjectNodeMetaDefinitionArgs = {
  projectId: Scalars['ID'];
  nodeId: Scalars['ID'];
};


export type QueryFindProjectFormContentArgs = {
  projectId: Scalars['ID'];
  formId: Scalars['ID'];
};


export type QueryFindProjectsArgs = {
  query: Scalars['String'];
  first: Scalars['Int'];
  after?: Maybe<Scalars['String']>;
};


export type QueryFindProjectDetailsArgs = {
  id: Scalars['ID'];
};


export type QueryFindProjectDefinitionFormulasArgs = {
  projectDefinitionId: Scalars['ID'];
  query: Scalars['String'];
  first: Scalars['Int'];
  after?: Maybe<Scalars['String']>;
};


export type QueryFindReportDefinitionsArgs = {
  projectDefinitionId: Scalars['ID'];
};


export type QueryFindReportDefinitionArgs = {
  reportDefinitionId: Scalars['ID'];
};


export type QueryFindProjectReportArgs = {
  projectId: Scalars['ID'];
  reportDefinitionId: Scalars['ID'];
};


export type QueryFindDistributablesArgs = {
  projectId: Scalars['ID'];
};


export type QueryFindDistributableItemsArgs = {
  projectId: Scalars['ID'];
  reportDefinitionId: Scalars['ID'];
};

export type ReferenceId = {
  __typename?: 'ReferenceId';
  uuid: FieldWrapper<Scalars['String']>;
};

export type Report = {
  __typename?: 'Report';
  datasheetId: FieldWrapper<Scalars['String']>;
  stages: Array<FieldWrapper<ReportStage>>;
  creationDateUtc?: Maybe<FieldWrapper<Scalars['String']>>;
  summaries: Array<FieldWrapper<ComputedValue>>;
};

export type ReportComputation = {
  __typename?: 'ReportComputation';
  name: FieldWrapper<Scalars['String']>;
  expression: FieldWrapper<Scalars['String']>;
  isVisible: FieldWrapper<Scalars['Boolean']>;
  unitId?: Maybe<FieldWrapper<Scalars['String']>>;
};

export type ReportDefinition = {
  __typename?: 'ReportDefinition';
  id: FieldWrapper<Scalars['String']>;
  projectDefinitionId: FieldWrapper<Scalars['String']>;
  name: FieldWrapper<Scalars['String']>;
  structure: FieldWrapper<ReportDefinitionStructure>;
};

export type ReportDefinitionStructure = {
  __typename?: 'ReportDefinitionStructure';
  formulaAttribute: FieldWrapper<AttributeBucket>;
  datasheetAttribute: FieldWrapper<AttributeBucket>;
  columns: Array<FieldWrapper<ReportComputation>>;
};

export type ReportRow = {
  __typename?: 'ReportRow';
  nodeId: FieldWrapper<Scalars['String']>;
  formulaId: FieldWrapper<Scalars['String']>;
  elementDefId: FieldWrapper<Scalars['String']>;
  childReferenceId: FieldWrapper<Scalars['String']>;
  columns: Array<FieldWrapper<ComputedValue>>;
};

export type ReportStage = {
  __typename?: 'ReportStage';
  summary: FieldWrapper<ComputedValue>;
  rows: Array<FieldWrapper<ReportRow>>;
};

export type StaticChoiceFieldConfig = {
  __typename?: 'StaticChoiceFieldConfig';
  options: Array<FieldWrapper<StaticChoiceOption>>;
};

export type StaticChoiceFieldConfigInput = {
  validator: Scalars['JsonSchema'];
  options: Array<StaticChoiceOptionInput>;
};

export type StaticChoiceOption = {
  __typename?: 'StaticChoiceOption';
  id: FieldWrapper<Scalars['String']>;
  label: FieldWrapper<Scalars['String']>;
  helpText: FieldWrapper<Scalars['String']>;
};

export type StaticChoiceOptionInput = {
  id: Scalars['String'];
  label: Scalars['String'];
  helpText: Scalars['String'];
};

export type StaticNumberFieldConfig = {
  __typename?: 'StaticNumberFieldConfig';
  passToTranslation: FieldWrapper<Scalars['Boolean']>;
  precision: FieldWrapper<Scalars['Int']>;
  unit: FieldWrapper<Scalars['String']>;
};

export type StaticNumberFieldConfigInput = {
  passToTranslation: Scalars['Boolean'];
  precision: Scalars['Int'];
  unit: Scalars['String'];
};

export type StringFieldConfig = {
  __typename?: 'StringFieldConfig';
  transforms: Array<FieldWrapper<Scalars['String']>>;
};

export type StringFieldConfigInput = {
  validator: Scalars['JsonSchema'];
  transforms: Array<Scalars['String']>;
};

export type StringFieldValue = {
  __typename?: 'StringFieldValue';
  text: FieldWrapper<Scalars['String']>;
};

export type StringFieldValueInput = {
  text: Scalars['String'];
};

export type SuppliedItem = {
  __typename?: 'SuppliedItem';
  datasheetId: FieldWrapper<Scalars['String']>;
  elementDefId: FieldWrapper<Scalars['String']>;
  childReferenceId: FieldWrapper<Scalars['String']>;
  organizationId: FieldWrapper<Scalars['String']>;
};

export type Translation = {
  __typename?: 'Translation';
  id: FieldWrapper<Scalars['ID']>;
  ressourceId: FieldWrapper<Scalars['String']>;
  locale: FieldWrapper<Scalars['String']>;
  scope: FieldWrapper<Scalars['String']>;
  name: FieldWrapper<Scalars['String']>;
  value: FieldWrapper<Scalars['String']>;
};

export type TranslationConfig = {
  __typename?: 'TranslationConfig';
  helpTextName: FieldWrapper<Scalars['String']>;
  label?: Maybe<FieldWrapper<Scalars['String']>>;
};

export type TranslationConnection = {
  __typename?: 'TranslationConnection';
  edges: Array<FieldWrapper<TranslationEdge>>;
  pageInfo: FieldWrapper<PageInfo>;
};

export type TranslationEdge = {
  __typename?: 'TranslationEdge';
  node: FieldWrapper<Translation>;
  cursor: FieldWrapper<Scalars['String']>;
};

export type TranslationInput = {
  ressourceId: Scalars['String'];
  scope: Scalars['String'];
  locale: Scalars['String'];
  name: Scalars['String'];
  value: Scalars['String'];
};

export type TranslationUpdateInput = {
  id: Scalars['ID'];
  ressourceId: Scalars['String'];
  scope: Scalars['String'];
  locale: Scalars['String'];
  name: Scalars['String'];
  value: Scalars['String'];
};

export type Trigger = {
  __typename?: 'Trigger';
  action: FieldWrapper<TriggerAction>;
  targetTypeId: FieldWrapper<Scalars['String']>;
  params: Array<FieldWrapper<TriggerParam>>;
};

export enum TriggerAction {
  CHANGE_NAME = 'CHANGE_NAME',
  SET_VISIBILITY = 'SET_VISIBILITY'
}

export type TriggerParam = {
  __typename?: 'TriggerParam';
  name: FieldWrapper<Scalars['String']>;
  value: FieldWrapper<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  oauthId: FieldWrapper<Scalars['ID']>;
  id: FieldWrapper<Scalars['String']>;
  email: FieldWrapper<Scalars['String']>;
  permissions: Array<FieldWrapper<Scalars['String']>>;
  organizationId: FieldWrapper<Scalars['String']>;
};

export type CreateSingleUserOrganizationMutationVariables = Exact<{
  singleUserOrganization: NewSingleUserOrganizationInput;
}>;


export type CreateSingleUserOrganizationMutation = (
  { __typename?: 'Mutation' }
  & { createSingleUserOrganization: (
    { __typename?: 'User' }
    & Pick<User, 'oauthId' | 'id' | 'email' | 'permissions' | 'organizationId'>
  ) }
);

export type CreateDatasheetMutationVariables = Exact<{
  datasheet: DatasheetInput;
}>;


export type CreateDatasheetMutation = (
  { __typename?: 'Mutation' }
  & { createDatasheet: (
    { __typename?: 'Datasheet' }
    & Pick<Datasheet, 'id' | 'name' | 'isStaged' | 'projectDefinitionId' | 'fromDatasheetId'>
  ) }
);

export type FindDatasheetsQueryVariables = Exact<{
  query: Scalars['String'];
  first: Scalars['Int'];
  after?: Maybe<Scalars['String']>;
}>;


export type FindDatasheetsQuery = (
  { __typename?: 'Query' }
  & { results: (
    { __typename?: 'DatasheetConnection' }
    & { pageInfo: (
      { __typename?: 'PageInfo' }
      & Pick<PageInfo, 'totalCount' | 'hasNextPage' | 'endCursor'>
    ), edges: Array<(
      { __typename?: 'DatasheetEdge' }
      & Pick<DatasheetEdge, 'cursor'>
      & { node: (
        { __typename?: 'Datasheet' }
        & Pick<Datasheet, 'id' | 'name' | 'isStaged' | 'projectDefinitionId' | 'fromDatasheetId'>
      ) }
    )> }
  ) }
);

export type AddProjectDefinitionNodeMutationVariables = Exact<{
  node: ProjectDefinitionNodeInput;
}>;


export type AddProjectDefinitionNodeMutation = (
  { __typename?: 'Mutation' }
  & { addProjectDefinitionNode: (
    { __typename?: 'ProjectDefinitionNode' }
    & Pick<ProjectDefinitionNode, 'id' | 'projectDefinitionId' | 'name' | 'isCollection' | 'instanciateByDefault' | 'orderIndex'>
    & { config: (
      { __typename?: 'NodeConfig' }
      & Pick<NodeConfig, 'valueValidator'>
      & { fieldDetails?: Maybe<(
        { __typename: 'IntFieldConfig' }
        & Pick<IntFieldConfig, 'unit'>
      ) | (
        { __typename: 'DecimalFieldConfig' }
        & Pick<DecimalFieldConfig, 'unit' | 'precision'>
      ) | (
        { __typename: 'StringFieldConfig' }
        & Pick<StringFieldConfig, 'transforms'>
      ) | (
        { __typename: 'BoolFieldConfig' }
        & Pick<BoolFieldConfig, 'isCheckbox'>
      ) | (
        { __typename: 'StaticChoiceFieldConfig' }
        & { options: Array<(
          { __typename?: 'StaticChoiceOption' }
          & Pick<StaticChoiceOption, 'id' | 'label' | 'helpText'>
        )> }
      ) | (
        { __typename: 'CollapsibleContainerFieldConfig' }
        & Pick<CollapsibleContainerFieldConfig, 'isCollapsible'>
      ) | { __typename: 'StaticNumberFieldConfig' }> }
    ) }
  ) }
);

export type FindProjectDefinitionFormulasQueryVariables = Exact<{
  projectDefinitionId: Scalars['ID'];
  query: Scalars['String'];
  first: Scalars['Int'];
  after?: Maybe<Scalars['String']>;
}>;


export type FindProjectDefinitionFormulasQuery = (
  { __typename?: 'Query' }
  & { results: (
    { __typename?: 'FormulaConnection' }
    & { pageInfo: (
      { __typename?: 'PageInfo' }
      & Pick<PageInfo, 'hasNextPage' | 'endCursor' | 'totalCount'>
    ), edges: Array<(
      { __typename?: 'FormulaEdge' }
      & { node: (
        { __typename?: 'Formula' }
        & Pick<Formula, 'id' | 'name' | 'expression'>
      ) }
    )> }
  ) }
);

export type FindProjectDefinitionRootSectionsQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type FindProjectDefinitionRootSectionsQuery = (
  { __typename?: 'Query' }
  & { findProjectDefinitionRootSections: (
    { __typename?: 'ProjectDefinitionNodeTree' }
    & { roots: Array<(
      { __typename?: 'ProjectDefinitionTreeNode' }
      & { definition: (
        { __typename?: 'ProjectDefinitionNode' }
        & Pick<ProjectDefinitionNode, 'id' | 'projectDefinitionId' | 'name' | 'isCollection' | 'instanciateByDefault' | 'orderIndex' | 'path'>
        & { config: (
          { __typename?: 'NodeConfig' }
          & Pick<NodeConfig, 'valueValidator'>
          & { translations: (
            { __typename?: 'TranslationConfig' }
            & Pick<TranslationConfig, 'helpTextName' | 'label'>
          ), fieldDetails?: Maybe<(
            { __typename: 'IntFieldConfig' }
            & Pick<IntFieldConfig, 'unit'>
          ) | (
            { __typename: 'DecimalFieldConfig' }
            & Pick<DecimalFieldConfig, 'unit' | 'precision'>
          ) | (
            { __typename: 'StringFieldConfig' }
            & Pick<StringFieldConfig, 'transforms'>
          ) | (
            { __typename: 'BoolFieldConfig' }
            & Pick<BoolFieldConfig, 'isCheckbox'>
          ) | (
            { __typename: 'StaticChoiceFieldConfig' }
            & { options: Array<(
              { __typename?: 'StaticChoiceOption' }
              & Pick<StaticChoiceOption, 'id' | 'label' | 'helpText'>
            )> }
          ) | (
            { __typename: 'CollapsibleContainerFieldConfig' }
            & Pick<CollapsibleContainerFieldConfig, 'isCollapsible'>
          ) | (
            { __typename: 'StaticNumberFieldConfig' }
            & Pick<StaticNumberFieldConfig, 'passToTranslation' | 'precision' | 'unit'>
          )> }
        ), defaultValue?: Maybe<(
          { __typename: 'IntFieldValue' }
          & Pick<IntFieldValue, 'integer'>
        ) | (
          { __typename: 'DecimalFieldValue' }
          & Pick<DecimalFieldValue, 'numeric'>
        ) | (
          { __typename: 'StringFieldValue' }
          & Pick<StringFieldValue, 'text'>
        ) | (
          { __typename: 'BoolFieldValue' }
          & Pick<BoolFieldValue, 'enabled'>
        ) | { __typename: 'ReferenceId' }> }
      ) }
    )> }
  ) }
);

export type FindProjectDefinitionRootSectionContainersQueryVariables = Exact<{
  id: Scalars['ID'];
  rootSectionId: Scalars['ID'];
}>;


export type FindProjectDefinitionRootSectionContainersQuery = (
  { __typename?: 'Query' }
  & { findProjectDefinitionRootSectionContainers: (
    { __typename?: 'ProjectDefinitionNodeTree' }
    & { roots: Array<(
      { __typename?: 'ProjectDefinitionTreeNode' }
      & { definition: (
        { __typename?: 'ProjectDefinitionNode' }
        & Pick<ProjectDefinitionNode, 'id' | 'projectDefinitionId' | 'name' | 'isCollection' | 'instanciateByDefault' | 'orderIndex' | 'path'>
        & { config: (
          { __typename?: 'NodeConfig' }
          & Pick<NodeConfig, 'valueValidator'>
          & { translations: (
            { __typename?: 'TranslationConfig' }
            & Pick<TranslationConfig, 'helpTextName' | 'label'>
          ), fieldDetails?: Maybe<(
            { __typename: 'IntFieldConfig' }
            & Pick<IntFieldConfig, 'unit'>
          ) | (
            { __typename: 'DecimalFieldConfig' }
            & Pick<DecimalFieldConfig, 'unit' | 'precision'>
          ) | (
            { __typename: 'StringFieldConfig' }
            & Pick<StringFieldConfig, 'transforms'>
          ) | (
            { __typename: 'BoolFieldConfig' }
            & Pick<BoolFieldConfig, 'isCheckbox'>
          ) | (
            { __typename: 'StaticChoiceFieldConfig' }
            & { options: Array<(
              { __typename?: 'StaticChoiceOption' }
              & Pick<StaticChoiceOption, 'id' | 'label' | 'helpText'>
            )> }
          ) | (
            { __typename: 'CollapsibleContainerFieldConfig' }
            & Pick<CollapsibleContainerFieldConfig, 'isCollapsible'>
          ) | (
            { __typename: 'StaticNumberFieldConfig' }
            & Pick<StaticNumberFieldConfig, 'passToTranslation' | 'precision' | 'unit'>
          )> }
        ), defaultValue?: Maybe<(
          { __typename: 'IntFieldValue' }
          & Pick<IntFieldValue, 'integer'>
        ) | (
          { __typename: 'DecimalFieldValue' }
          & Pick<DecimalFieldValue, 'numeric'>
        ) | (
          { __typename: 'StringFieldValue' }
          & Pick<StringFieldValue, 'text'>
        ) | (
          { __typename: 'BoolFieldValue' }
          & Pick<BoolFieldValue, 'enabled'>
        ) | { __typename: 'ReferenceId' }> }
      ), children: Array<(
        { __typename?: 'ProjectDefinitionTreeNode' }
        & { definition: (
          { __typename?: 'ProjectDefinitionNode' }
          & Pick<ProjectDefinitionNode, 'id' | 'projectDefinitionId' | 'name' | 'isCollection' | 'instanciateByDefault' | 'orderIndex' | 'path'>
          & { config: (
            { __typename?: 'NodeConfig' }
            & Pick<NodeConfig, 'valueValidator'>
            & { translations: (
              { __typename?: 'TranslationConfig' }
              & Pick<TranslationConfig, 'helpTextName' | 'label'>
            ), fieldDetails?: Maybe<(
              { __typename: 'IntFieldConfig' }
              & Pick<IntFieldConfig, 'unit'>
            ) | (
              { __typename: 'DecimalFieldConfig' }
              & Pick<DecimalFieldConfig, 'unit' | 'precision'>
            ) | (
              { __typename: 'StringFieldConfig' }
              & Pick<StringFieldConfig, 'transforms'>
            ) | (
              { __typename: 'BoolFieldConfig' }
              & Pick<BoolFieldConfig, 'isCheckbox'>
            ) | (
              { __typename: 'StaticChoiceFieldConfig' }
              & { options: Array<(
                { __typename?: 'StaticChoiceOption' }
                & Pick<StaticChoiceOption, 'id' | 'label' | 'helpText'>
              )> }
            ) | (
              { __typename: 'CollapsibleContainerFieldConfig' }
              & Pick<CollapsibleContainerFieldConfig, 'isCollapsible'>
            ) | (
              { __typename: 'StaticNumberFieldConfig' }
              & Pick<StaticNumberFieldConfig, 'passToTranslation' | 'precision' | 'unit'>
            )> }
          ), defaultValue?: Maybe<(
            { __typename: 'IntFieldValue' }
            & Pick<IntFieldValue, 'integer'>
          ) | (
            { __typename: 'DecimalFieldValue' }
            & Pick<DecimalFieldValue, 'numeric'>
          ) | (
            { __typename: 'StringFieldValue' }
            & Pick<StringFieldValue, 'text'>
          ) | (
            { __typename: 'BoolFieldValue' }
            & Pick<BoolFieldValue, 'enabled'>
          ) | { __typename: 'ReferenceId' }> }
        ) }
      )> }
    )> }
  ) }
);

export type FindProjectDefinitionFormContentQueryVariables = Exact<{
  id: Scalars['ID'];
  formId: Scalars['ID'];
}>;


export type FindProjectDefinitionFormContentQuery = (
  { __typename?: 'Query' }
  & { findProjectDefinitionNode: (
    { __typename?: 'ProjectDefinitionNode' }
    & Pick<ProjectDefinitionNode, 'id' | 'projectDefinitionId' | 'name' | 'isCollection' | 'instanciateByDefault' | 'orderIndex' | 'path'>
    & { config: (
      { __typename?: 'NodeConfig' }
      & Pick<NodeConfig, 'valueValidator'>
      & { triggers: Array<Maybe<(
        { __typename?: 'Trigger' }
        & Pick<Trigger, 'action' | 'targetTypeId'>
        & { params: Array<(
          { __typename?: 'TriggerParam' }
          & Pick<TriggerParam, 'name' | 'value'>
        )> }
      )>>, translations: (
        { __typename?: 'TranslationConfig' }
        & Pick<TranslationConfig, 'helpTextName' | 'label'>
      ), fieldDetails?: Maybe<(
        { __typename: 'IntFieldConfig' }
        & Pick<IntFieldConfig, 'unit'>
      ) | (
        { __typename: 'DecimalFieldConfig' }
        & Pick<DecimalFieldConfig, 'unit' | 'precision'>
      ) | (
        { __typename: 'StringFieldConfig' }
        & Pick<StringFieldConfig, 'transforms'>
      ) | (
        { __typename: 'BoolFieldConfig' }
        & Pick<BoolFieldConfig, 'isCheckbox'>
      ) | (
        { __typename: 'StaticChoiceFieldConfig' }
        & { options: Array<(
          { __typename?: 'StaticChoiceOption' }
          & Pick<StaticChoiceOption, 'id' | 'label' | 'helpText'>
        )> }
      ) | (
        { __typename: 'CollapsibleContainerFieldConfig' }
        & Pick<CollapsibleContainerFieldConfig, 'isCollapsible'>
      ) | (
        { __typename: 'StaticNumberFieldConfig' }
        & Pick<StaticNumberFieldConfig, 'passToTranslation' | 'precision' | 'unit'>
      )> }
    ) }
  ), findProjectDefinitionFormContent: (
    { __typename?: 'ProjectDefinitionNodeTree' }
    & { roots: Array<(
      { __typename?: 'ProjectDefinitionTreeNode' }
      & { definition: (
        { __typename?: 'ProjectDefinitionNode' }
        & Pick<ProjectDefinitionNode, 'id' | 'projectDefinitionId' | 'name' | 'isCollection' | 'instanciateByDefault' | 'orderIndex' | 'path'>
        & { config: (
          { __typename?: 'NodeConfig' }
          & Pick<NodeConfig, 'valueValidator'>
          & { triggers: Array<Maybe<(
            { __typename?: 'Trigger' }
            & Pick<Trigger, 'action' | 'targetTypeId'>
            & { params: Array<(
              { __typename?: 'TriggerParam' }
              & Pick<TriggerParam, 'name' | 'value'>
            )> }
          )>>, translations: (
            { __typename?: 'TranslationConfig' }
            & Pick<TranslationConfig, 'helpTextName' | 'label'>
          ), fieldDetails?: Maybe<(
            { __typename: 'IntFieldConfig' }
            & Pick<IntFieldConfig, 'unit'>
          ) | (
            { __typename: 'DecimalFieldConfig' }
            & Pick<DecimalFieldConfig, 'unit' | 'precision'>
          ) | (
            { __typename: 'StringFieldConfig' }
            & Pick<StringFieldConfig, 'transforms'>
          ) | (
            { __typename: 'BoolFieldConfig' }
            & Pick<BoolFieldConfig, 'isCheckbox'>
          ) | (
            { __typename: 'StaticChoiceFieldConfig' }
            & { options: Array<(
              { __typename?: 'StaticChoiceOption' }
              & Pick<StaticChoiceOption, 'id' | 'label' | 'helpText'>
            )> }
          ) | (
            { __typename: 'CollapsibleContainerFieldConfig' }
            & Pick<CollapsibleContainerFieldConfig, 'isCollapsible'>
          ) | (
            { __typename: 'StaticNumberFieldConfig' }
            & Pick<StaticNumberFieldConfig, 'passToTranslation' | 'precision' | 'unit'>
          )> }
        ), defaultValue?: Maybe<(
          { __typename: 'IntFieldValue' }
          & Pick<IntFieldValue, 'integer'>
        ) | (
          { __typename: 'DecimalFieldValue' }
          & Pick<DecimalFieldValue, 'numeric'>
        ) | (
          { __typename: 'StringFieldValue' }
          & Pick<StringFieldValue, 'text'>
        ) | (
          { __typename: 'BoolFieldValue' }
          & Pick<BoolFieldValue, 'enabled'>
        ) | { __typename: 'ReferenceId' }> }
      ), children: Array<(
        { __typename?: 'ProjectDefinitionTreeNode' }
        & { definition: (
          { __typename?: 'ProjectDefinitionNode' }
          & Pick<ProjectDefinitionNode, 'id' | 'projectDefinitionId' | 'name' | 'isCollection' | 'instanciateByDefault' | 'orderIndex' | 'path'>
          & { config: (
            { __typename?: 'NodeConfig' }
            & Pick<NodeConfig, 'valueValidator'>
            & { triggers: Array<Maybe<(
              { __typename?: 'Trigger' }
              & Pick<Trigger, 'action' | 'targetTypeId'>
              & { params: Array<(
                { __typename?: 'TriggerParam' }
                & Pick<TriggerParam, 'name' | 'value'>
              )> }
            )>>, translations: (
              { __typename?: 'TranslationConfig' }
              & Pick<TranslationConfig, 'helpTextName' | 'label'>
            ), fieldDetails?: Maybe<(
              { __typename: 'IntFieldConfig' }
              & Pick<IntFieldConfig, 'unit'>
            ) | (
              { __typename: 'DecimalFieldConfig' }
              & Pick<DecimalFieldConfig, 'unit' | 'precision'>
            ) | (
              { __typename: 'StringFieldConfig' }
              & Pick<StringFieldConfig, 'transforms'>
            ) | (
              { __typename: 'BoolFieldConfig' }
              & Pick<BoolFieldConfig, 'isCheckbox'>
            ) | (
              { __typename: 'StaticChoiceFieldConfig' }
              & { options: Array<(
                { __typename?: 'StaticChoiceOption' }
                & Pick<StaticChoiceOption, 'id' | 'label' | 'helpText'>
              )> }
            ) | (
              { __typename: 'CollapsibleContainerFieldConfig' }
              & Pick<CollapsibleContainerFieldConfig, 'isCollapsible'>
            ) | (
              { __typename: 'StaticNumberFieldConfig' }
              & Pick<StaticNumberFieldConfig, 'passToTranslation' | 'precision' | 'unit'>
            )> }
          ), defaultValue?: Maybe<(
            { __typename: 'IntFieldValue' }
            & Pick<IntFieldValue, 'integer'>
          ) | (
            { __typename: 'DecimalFieldValue' }
            & Pick<DecimalFieldValue, 'numeric'>
          ) | (
            { __typename: 'StringFieldValue' }
            & Pick<StringFieldValue, 'text'>
          ) | (
            { __typename: 'BoolFieldValue' }
            & Pick<BoolFieldValue, 'enabled'>
          ) | { __typename: 'ReferenceId' }> }
        ) }
      )> }
    )> }
  ) }
);

export type FindProjectDefinitionNodeQueryVariables = Exact<{
  projectDefinitionId: Scalars['ID'];
  nodeId: Scalars['ID'];
}>;


export type FindProjectDefinitionNodeQuery = (
  { __typename?: 'Query' }
  & { findProjectDefinitionNode: (
    { __typename?: 'ProjectDefinitionNode' }
    & Pick<ProjectDefinitionNode, 'id' | 'projectDefinitionId' | 'name' | 'isCollection' | 'instanciateByDefault' | 'orderIndex' | 'path'>
    & { config: (
      { __typename?: 'NodeConfig' }
      & Pick<NodeConfig, 'valueValidator'>
      & { triggers: Array<Maybe<(
        { __typename?: 'Trigger' }
        & Pick<Trigger, 'action' | 'targetTypeId'>
        & { params: Array<(
          { __typename?: 'TriggerParam' }
          & Pick<TriggerParam, 'name' | 'value'>
        )> }
      )>>, translations: (
        { __typename?: 'TranslationConfig' }
        & Pick<TranslationConfig, 'helpTextName' | 'label'>
      ), fieldDetails?: Maybe<(
        { __typename: 'IntFieldConfig' }
        & Pick<IntFieldConfig, 'unit'>
      ) | (
        { __typename: 'DecimalFieldConfig' }
        & Pick<DecimalFieldConfig, 'unit' | 'precision'>
      ) | (
        { __typename: 'StringFieldConfig' }
        & Pick<StringFieldConfig, 'transforms'>
      ) | (
        { __typename: 'BoolFieldConfig' }
        & Pick<BoolFieldConfig, 'isCheckbox'>
      ) | (
        { __typename: 'StaticChoiceFieldConfig' }
        & { options: Array<(
          { __typename?: 'StaticChoiceOption' }
          & Pick<StaticChoiceOption, 'id' | 'label' | 'helpText'>
        )> }
      ) | (
        { __typename: 'CollapsibleContainerFieldConfig' }
        & Pick<CollapsibleContainerFieldConfig, 'isCollapsible'>
      ) | (
        { __typename: 'StaticNumberFieldConfig' }
        & Pick<StaticNumberFieldConfig, 'passToTranslation' | 'precision' | 'unit'>
      )> }
    ), translations: Array<(
      { __typename?: 'Translation' }
      & Pick<Translation, 'id' | 'ressourceId' | 'locale' | 'scope' | 'name' | 'value'>
    )> }
  ) }
);

export type FindProjectDefintionsQueryVariables = Exact<{
  query: Scalars['String'];
  first: Scalars['Int'];
  after?: Maybe<Scalars['String']>;
}>;


export type FindProjectDefintionsQuery = (
  { __typename?: 'Query' }
  & { results: (
    { __typename?: 'ProjectDefinitionConnection' }
    & { edges: Array<(
      { __typename?: 'ProjectDefinitionEdge' }
      & Pick<ProjectDefinitionEdge, 'cursor'>
      & { node: (
        { __typename?: 'ProjectDefinition' }
        & Pick<ProjectDefinition, 'id' | 'name' | 'defaultDatasheetId'>
      ) }
    )>, pageInfo: (
      { __typename?: 'PageInfo' }
      & Pick<PageInfo, 'hasNextPage' | 'endCursor' | 'totalCount'>
    ) }
  ) }
);

export type CreateProjectMutationVariables = Exact<{
  projectDetails: ProjectDetailsInput;
}>;


export type CreateProjectMutation = (
  { __typename?: 'Mutation' }
  & { createProject: (
    { __typename?: 'ProjectDetails' }
    & Pick<ProjectDetails, 'id' | 'name' | 'isStaged' | 'projectDefinitionId' | 'datasheetId'>
  ) }
);

export type UpdateFieldsMutationVariables = Exact<{
  projectId: Scalars['ID'];
  updates: Array<FieldUpdateInput> | FieldUpdateInput;
}>;


export type UpdateFieldsMutation = (
  { __typename?: 'Mutation' }
  & { updateProjectFields: Array<Maybe<(
    { __typename?: 'ProjectNode' }
    & Pick<ProjectNode, 'id' | 'projectId' | 'typePath' | 'typeId' | 'path' | 'label'>
    & { value?: Maybe<(
      { __typename: 'IntFieldValue' }
      & Pick<IntFieldValue, 'integer'>
    ) | (
      { __typename: 'DecimalFieldValue' }
      & Pick<DecimalFieldValue, 'numeric'>
    ) | (
      { __typename: 'StringFieldValue' }
      & Pick<StringFieldValue, 'text'>
    ) | (
      { __typename: 'BoolFieldValue' }
      & Pick<BoolFieldValue, 'enabled'>
    ) | { __typename: 'ReferenceId' }> }
  )>> }
);

export type AddProjectCollectionItemMutationVariables = Exact<{
  projectId: Scalars['ID'];
  collectionTarget: ProjectNodeCollectionTargetInput;
}>;


export type AddProjectCollectionItemMutation = (
  { __typename?: 'Mutation' }
  & { addProjectCollectionItem: Array<(
    { __typename?: 'ProjectNode' }
    & Pick<ProjectNode, 'id' | 'projectId' | 'typePath' | 'typeId' | 'path' | 'label'>
    & { value?: Maybe<(
      { __typename: 'IntFieldValue' }
      & Pick<IntFieldValue, 'integer'>
    ) | (
      { __typename: 'DecimalFieldValue' }
      & Pick<DecimalFieldValue, 'numeric'>
    ) | (
      { __typename: 'StringFieldValue' }
      & Pick<StringFieldValue, 'text'>
    ) | (
      { __typename: 'BoolFieldValue' }
      & Pick<BoolFieldValue, 'enabled'>
    ) | { __typename: 'ReferenceId' }> }
  )> }
);

export type CloneProjectCollectionMutationVariables = Exact<{
  projectId: Scalars['ID'];
  collectionNodeId: Scalars['ID'];
}>;


export type CloneProjectCollectionMutation = (
  { __typename?: 'Mutation' }
  & { cloneProjectCollection: Array<(
    { __typename?: 'ProjectNode' }
    & Pick<ProjectNode, 'id' | 'projectId' | 'typePath' | 'typeId' | 'path' | 'label'>
    & { value?: Maybe<(
      { __typename: 'IntFieldValue' }
      & Pick<IntFieldValue, 'integer'>
    ) | (
      { __typename: 'DecimalFieldValue' }
      & Pick<DecimalFieldValue, 'numeric'>
    ) | (
      { __typename: 'StringFieldValue' }
      & Pick<StringFieldValue, 'text'>
    ) | (
      { __typename: 'BoolFieldValue' }
      & Pick<BoolFieldValue, 'enabled'>
    ) | { __typename: 'ReferenceId' }> }
  )> }
);

export type DeleteProjectCollectionMutationVariables = Exact<{
  projectId: Scalars['ID'];
  collectionNodeId: Scalars['ID'];
}>;


export type DeleteProjectCollectionMutation = (
  { __typename?: 'Mutation' }
  & { deleteProjectCollection: (
    { __typename?: 'ProjectNode' }
    & Pick<ProjectNode, 'id' | 'path'>
  ) }
);

export type FindProjectsQueryVariables = Exact<{
  query: Scalars['String'];
  first: Scalars['Int'];
  after?: Maybe<Scalars['String']>;
}>;


export type FindProjectsQuery = (
  { __typename?: 'Query' }
  & { results: (
    { __typename?: 'ProjectConnection' }
    & { edges: Array<(
      { __typename?: 'ProjectEdge' }
      & Pick<ProjectEdge, 'cursor'>
      & { node: (
        { __typename?: 'ProjectDetails' }
        & Pick<ProjectDetails, 'id' | 'name' | 'isStaged' | 'projectDefinitionId' | 'datasheetId'>
      ) }
    )>, pageInfo: (
      { __typename?: 'PageInfo' }
      & Pick<PageInfo, 'hasNextPage' | 'endCursor' | 'totalCount'>
    ) }
  ) }
);

export type FindProjectRootSectionsQueryVariables = Exact<{
  projectId: Scalars['ID'];
}>;


export type FindProjectRootSectionsQuery = (
  { __typename?: 'Query' }
  & { findProjectRootSections: (
    { __typename?: 'ProjectNodeTree' }
    & { roots: Array<(
      { __typename?: 'ProjectNodeTreeTypeNode' }
      & { definition: (
        { __typename?: 'ProjectDefinitionNode' }
        & Pick<ProjectDefinitionNode, 'id' | 'projectDefinitionId' | 'name' | 'isCollection' | 'instanciateByDefault' | 'orderIndex'>
        & { config: (
          { __typename?: 'NodeConfig' }
          & Pick<NodeConfig, 'valueValidator'>
          & { translations: (
            { __typename?: 'TranslationConfig' }
            & Pick<TranslationConfig, 'helpTextName' | 'label'>
          ), fieldDetails?: Maybe<(
            { __typename: 'IntFieldConfig' }
            & Pick<IntFieldConfig, 'unit'>
          ) | (
            { __typename: 'DecimalFieldConfig' }
            & Pick<DecimalFieldConfig, 'unit' | 'precision'>
          ) | (
            { __typename: 'StringFieldConfig' }
            & Pick<StringFieldConfig, 'transforms'>
          ) | (
            { __typename: 'BoolFieldConfig' }
            & Pick<BoolFieldConfig, 'isCheckbox'>
          ) | (
            { __typename: 'StaticChoiceFieldConfig' }
            & { options: Array<(
              { __typename?: 'StaticChoiceOption' }
              & Pick<StaticChoiceOption, 'id' | 'label' | 'helpText'>
            )> }
          ) | (
            { __typename: 'CollapsibleContainerFieldConfig' }
            & Pick<CollapsibleContainerFieldConfig, 'isCollapsible'>
          ) | { __typename: 'StaticNumberFieldConfig' }> }
        ) }
      ), state: (
        { __typename?: 'ProjectNodeMetaState' }
        & Pick<ProjectNodeMetaState, 'isVisible' | 'selectedChild'>
      ), nodes: Array<(
        { __typename?: 'ProjectNodeTreeNode' }
        & { node: (
          { __typename?: 'ProjectNode' }
          & Pick<ProjectNode, 'id' | 'projectId' | 'typePath' | 'typeId' | 'path' | 'label'>
          & { value?: Maybe<(
            { __typename: 'IntFieldValue' }
            & Pick<IntFieldValue, 'integer'>
          ) | (
            { __typename: 'DecimalFieldValue' }
            & Pick<DecimalFieldValue, 'numeric'>
          ) | (
            { __typename: 'StringFieldValue' }
            & Pick<StringFieldValue, 'text'>
          ) | (
            { __typename: 'BoolFieldValue' }
            & Pick<BoolFieldValue, 'enabled'>
          ) | { __typename: 'ReferenceId' }> }
        ) }
      )> }
    )> }
  ) }
);

export type FindProjectRootSectionContainersQueryVariables = Exact<{
  projectId: Scalars['ID'];
  rootSectionId: Scalars['ID'];
}>;


export type FindProjectRootSectionContainersQuery = (
  { __typename?: 'Query' }
  & { findProjectRootSectionContainers: (
    { __typename?: 'ProjectNodeTree' }
    & { roots: Array<(
      { __typename?: 'ProjectNodeTreeTypeNode' }
      & { definition: (
        { __typename?: 'ProjectDefinitionNode' }
        & Pick<ProjectDefinitionNode, 'id' | 'projectDefinitionId' | 'name' | 'isCollection' | 'instanciateByDefault' | 'orderIndex'>
        & { config: (
          { __typename?: 'NodeConfig' }
          & Pick<NodeConfig, 'valueValidator'>
          & { translations: (
            { __typename?: 'TranslationConfig' }
            & Pick<TranslationConfig, 'helpTextName' | 'label'>
          ), fieldDetails?: Maybe<(
            { __typename: 'IntFieldConfig' }
            & Pick<IntFieldConfig, 'unit'>
          ) | (
            { __typename: 'DecimalFieldConfig' }
            & Pick<DecimalFieldConfig, 'unit' | 'precision'>
          ) | (
            { __typename: 'StringFieldConfig' }
            & Pick<StringFieldConfig, 'transforms'>
          ) | (
            { __typename: 'BoolFieldConfig' }
            & Pick<BoolFieldConfig, 'isCheckbox'>
          ) | (
            { __typename: 'StaticChoiceFieldConfig' }
            & { options: Array<(
              { __typename?: 'StaticChoiceOption' }
              & Pick<StaticChoiceOption, 'id' | 'label' | 'helpText'>
            )> }
          ) | (
            { __typename: 'CollapsibleContainerFieldConfig' }
            & Pick<CollapsibleContainerFieldConfig, 'isCollapsible'>
          ) | { __typename: 'StaticNumberFieldConfig' }> }
        ) }
      ), state: (
        { __typename?: 'ProjectNodeMetaState' }
        & Pick<ProjectNodeMetaState, 'isVisible' | 'selectedChild'>
      ), nodes: Array<(
        { __typename?: 'ProjectNodeTreeNode' }
        & { node: (
          { __typename?: 'ProjectNode' }
          & Pick<ProjectNode, 'id' | 'projectId' | 'typePath' | 'typeId' | 'path'>
          & { value?: Maybe<(
            { __typename: 'IntFieldValue' }
            & Pick<IntFieldValue, 'integer'>
          ) | (
            { __typename: 'DecimalFieldValue' }
            & Pick<DecimalFieldValue, 'numeric'>
          ) | (
            { __typename: 'StringFieldValue' }
            & Pick<StringFieldValue, 'text'>
          ) | (
            { __typename: 'BoolFieldValue' }
            & Pick<BoolFieldValue, 'enabled'>
          ) | { __typename: 'ReferenceId' }> }
        ), children: Array<(
          { __typename?: 'ProjectNodeTreeTypeNode' }
          & { definition: (
            { __typename?: 'ProjectDefinitionNode' }
            & Pick<ProjectDefinitionNode, 'id' | 'projectDefinitionId' | 'name' | 'isCollection' | 'instanciateByDefault' | 'orderIndex'>
            & { config: (
              { __typename?: 'NodeConfig' }
              & Pick<NodeConfig, 'valueValidator'>
              & { translations: (
                { __typename?: 'TranslationConfig' }
                & Pick<TranslationConfig, 'helpTextName' | 'label'>
              ), fieldDetails?: Maybe<(
                { __typename: 'IntFieldConfig' }
                & Pick<IntFieldConfig, 'unit'>
              ) | (
                { __typename: 'DecimalFieldConfig' }
                & Pick<DecimalFieldConfig, 'unit' | 'precision'>
              ) | (
                { __typename: 'StringFieldConfig' }
                & Pick<StringFieldConfig, 'transforms'>
              ) | (
                { __typename: 'BoolFieldConfig' }
                & Pick<BoolFieldConfig, 'isCheckbox'>
              ) | (
                { __typename: 'StaticChoiceFieldConfig' }
                & { options: Array<(
                  { __typename?: 'StaticChoiceOption' }
                  & Pick<StaticChoiceOption, 'id' | 'label' | 'helpText'>
                )> }
              ) | (
                { __typename: 'CollapsibleContainerFieldConfig' }
                & Pick<CollapsibleContainerFieldConfig, 'isCollapsible'>
              ) | { __typename: 'StaticNumberFieldConfig' }> }
            ) }
          ), state: (
            { __typename?: 'ProjectNodeMetaState' }
            & Pick<ProjectNodeMetaState, 'isVisible' | 'selectedChild'>
          ), nodes: Array<(
            { __typename?: 'ProjectNodeTreeNode' }
            & { node: (
              { __typename?: 'ProjectNode' }
              & Pick<ProjectNode, 'id' | 'projectId' | 'typePath' | 'typeId' | 'path'>
              & { value?: Maybe<(
                { __typename: 'IntFieldValue' }
                & Pick<IntFieldValue, 'integer'>
              ) | (
                { __typename: 'DecimalFieldValue' }
                & Pick<DecimalFieldValue, 'numeric'>
              ) | (
                { __typename: 'StringFieldValue' }
                & Pick<StringFieldValue, 'text'>
              ) | (
                { __typename: 'BoolFieldValue' }
                & Pick<BoolFieldValue, 'enabled'>
              ) | { __typename: 'ReferenceId' }> }
            ) }
          )> }
        )> }
      )> }
    )> }
  ) }
);

export type FindProjectFormContentQueryVariables = Exact<{
  projectId: Scalars['ID'];
  formId: Scalars['ID'];
}>;


export type FindProjectFormContentQuery = (
  { __typename?: 'Query' }
  & { findProjectNodeMetaDefinition: (
    { __typename?: 'ProjectNodeMeta' }
    & Pick<ProjectNodeMeta, 'typeId'>
    & { definition: (
      { __typename?: 'ProjectDefinitionNode' }
      & Pick<ProjectDefinitionNode, 'id' | 'projectDefinitionId' | 'name' | 'isCollection' | 'instanciateByDefault' | 'orderIndex' | 'path'>
      & { config: (
        { __typename?: 'NodeConfig' }
        & Pick<NodeConfig, 'valueValidator'>
        & { fieldDetails?: Maybe<(
          { __typename: 'IntFieldConfig' }
          & Pick<IntFieldConfig, 'unit'>
        ) | (
          { __typename: 'DecimalFieldConfig' }
          & Pick<DecimalFieldConfig, 'unit' | 'precision'>
        ) | (
          { __typename: 'StringFieldConfig' }
          & Pick<StringFieldConfig, 'transforms'>
        ) | (
          { __typename: 'BoolFieldConfig' }
          & Pick<BoolFieldConfig, 'isCheckbox'>
        ) | (
          { __typename: 'StaticChoiceFieldConfig' }
          & { options: Array<(
            { __typename?: 'StaticChoiceOption' }
            & Pick<StaticChoiceOption, 'id' | 'label' | 'helpText'>
          )> }
        ) | (
          { __typename: 'CollapsibleContainerFieldConfig' }
          & Pick<CollapsibleContainerFieldConfig, 'isCollapsible'>
        ) | (
          { __typename: 'StaticNumberFieldConfig' }
          & Pick<StaticNumberFieldConfig, 'unit' | 'precision'>
        )>, translations: (
          { __typename?: 'TranslationConfig' }
          & Pick<TranslationConfig, 'helpTextName' | 'label'>
        ) }
      ) }
    ), state: (
      { __typename?: 'ProjectNodeMetaState' }
      & Pick<ProjectNodeMetaState, 'isVisible'>
    ) }
  ), findProjectFormContent: (
    { __typename?: 'ProjectNodeTree' }
    & { roots: Array<(
      { __typename?: 'ProjectNodeTreeTypeNode' }
      & { definition: (
        { __typename?: 'ProjectDefinitionNode' }
        & Pick<ProjectDefinitionNode, 'id' | 'projectDefinitionId' | 'name' | 'isCollection' | 'instanciateByDefault' | 'orderIndex'>
        & { config: (
          { __typename?: 'NodeConfig' }
          & Pick<NodeConfig, 'valueValidator'>
          & { translations: (
            { __typename?: 'TranslationConfig' }
            & Pick<TranslationConfig, 'helpTextName' | 'label'>
          ), fieldDetails?: Maybe<(
            { __typename: 'IntFieldConfig' }
            & Pick<IntFieldConfig, 'unit'>
          ) | (
            { __typename: 'DecimalFieldConfig' }
            & Pick<DecimalFieldConfig, 'unit' | 'precision'>
          ) | (
            { __typename: 'StringFieldConfig' }
            & Pick<StringFieldConfig, 'transforms'>
          ) | (
            { __typename: 'BoolFieldConfig' }
            & Pick<BoolFieldConfig, 'isCheckbox'>
          ) | (
            { __typename: 'StaticChoiceFieldConfig' }
            & { options: Array<(
              { __typename?: 'StaticChoiceOption' }
              & Pick<StaticChoiceOption, 'id' | 'label' | 'helpText'>
            )> }
          ) | (
            { __typename: 'CollapsibleContainerFieldConfig' }
            & Pick<CollapsibleContainerFieldConfig, 'isCollapsible'>
          ) | (
            { __typename: 'StaticNumberFieldConfig' }
            & Pick<StaticNumberFieldConfig, 'unit' | 'precision'>
          )> }
        ) }
      ), state: (
        { __typename?: 'ProjectNodeMetaState' }
        & Pick<ProjectNodeMetaState, 'isVisible' | 'selectedChild'>
      ), nodes: Array<(
        { __typename?: 'ProjectNodeTreeNode' }
        & { node: (
          { __typename?: 'ProjectNode' }
          & Pick<ProjectNode, 'id' | 'projectId' | 'typePath' | 'typeId' | 'path'>
          & { value?: Maybe<(
            { __typename: 'IntFieldValue' }
            & Pick<IntFieldValue, 'integer'>
          ) | (
            { __typename: 'DecimalFieldValue' }
            & Pick<DecimalFieldValue, 'numeric'>
          ) | (
            { __typename: 'StringFieldValue' }
            & Pick<StringFieldValue, 'text'>
          ) | (
            { __typename: 'BoolFieldValue' }
            & Pick<BoolFieldValue, 'enabled'>
          ) | { __typename: 'ReferenceId' }> }
        ), children: Array<(
          { __typename?: 'ProjectNodeTreeTypeNode' }
          & { definition: (
            { __typename?: 'ProjectDefinitionNode' }
            & Pick<ProjectDefinitionNode, 'id' | 'projectDefinitionId' | 'name' | 'isCollection' | 'instanciateByDefault' | 'orderIndex'>
            & { config: (
              { __typename?: 'NodeConfig' }
              & Pick<NodeConfig, 'valueValidator'>
              & { translations: (
                { __typename?: 'TranslationConfig' }
                & Pick<TranslationConfig, 'helpTextName' | 'label'>
              ), fieldDetails?: Maybe<(
                { __typename: 'IntFieldConfig' }
                & Pick<IntFieldConfig, 'unit'>
              ) | (
                { __typename: 'DecimalFieldConfig' }
                & Pick<DecimalFieldConfig, 'unit' | 'precision'>
              ) | (
                { __typename: 'StringFieldConfig' }
                & Pick<StringFieldConfig, 'transforms'>
              ) | (
                { __typename: 'BoolFieldConfig' }
                & Pick<BoolFieldConfig, 'isCheckbox'>
              ) | (
                { __typename: 'StaticChoiceFieldConfig' }
                & { options: Array<(
                  { __typename?: 'StaticChoiceOption' }
                  & Pick<StaticChoiceOption, 'id' | 'label' | 'helpText'>
                )> }
              ) | (
                { __typename: 'CollapsibleContainerFieldConfig' }
                & Pick<CollapsibleContainerFieldConfig, 'isCollapsible'>
              ) | (
                { __typename: 'StaticNumberFieldConfig' }
                & Pick<StaticNumberFieldConfig, 'unit' | 'precision'>
              )> }
            ) }
          ), state: (
            { __typename?: 'ProjectNodeMetaState' }
            & Pick<ProjectNodeMetaState, 'isVisible' | 'selectedChild'>
          ), nodes: Array<(
            { __typename?: 'ProjectNodeTreeNode' }
            & { node: (
              { __typename?: 'ProjectNode' }
              & Pick<ProjectNode, 'id' | 'projectId' | 'typePath' | 'typeId' | 'path'>
              & { value?: Maybe<(
                { __typename: 'IntFieldValue' }
                & Pick<IntFieldValue, 'integer'>
              ) | (
                { __typename: 'DecimalFieldValue' }
                & Pick<DecimalFieldValue, 'numeric'>
              ) | (
                { __typename: 'StringFieldValue' }
                & Pick<StringFieldValue, 'text'>
              ) | (
                { __typename: 'BoolFieldValue' }
                & Pick<BoolFieldValue, 'enabled'>
              ) | { __typename: 'ReferenceId' }> }
            ) }
          )> }
        )> }
      )> }
    )> }
  ) }
);

export type FindProjectDefinitionIdQueryVariables = Exact<{
  projectId: Scalars['ID'];
}>;


export type FindProjectDefinitionIdQuery = (
  { __typename?: 'Query' }
  & { findProjectDetails: (
    { __typename?: 'ProjectDetails' }
    & Pick<ProjectDetails, 'projectDefinitionId'>
  ) }
);

export type FindProjectReportWithDefinitionQueryVariables = Exact<{
  projectId: Scalars['ID'];
  reportDefinitionId: Scalars['ID'];
}>;


export type FindProjectReportWithDefinitionQuery = (
  { __typename?: 'Query' }
  & { findReportDefinition: (
    { __typename?: 'ReportDefinition' }
    & Pick<ReportDefinition, 'id' | 'name'>
    & { structure: (
      { __typename?: 'ReportDefinitionStructure' }
      & { formulaAttribute: (
        { __typename?: 'AttributeBucket' }
        & Pick<AttributeBucket, 'bucketName' | 'attributeName'>
      ), columns: Array<(
        { __typename?: 'ReportComputation' }
        & Pick<ReportComputation, 'name' | 'isVisible' | 'unitId'>
      )> }
    ) }
  ), findProjectReport: (
    { __typename?: 'Report' }
    & Pick<Report, 'creationDateUtc'>
    & { stages: Array<(
      { __typename?: 'ReportStage' }
      & { summary: (
        { __typename?: 'ComputedValue' }
        & Pick<ComputedValue, 'label' | 'unit'>
        & { value: (
          { __typename: 'IntFieldValue' }
          & Pick<IntFieldValue, 'integer'>
        ) | (
          { __typename: 'DecimalFieldValue' }
          & Pick<DecimalFieldValue, 'numeric'>
        ) | (
          { __typename: 'StringFieldValue' }
          & Pick<StringFieldValue, 'text'>
        ) | (
          { __typename: 'BoolFieldValue' }
          & Pick<BoolFieldValue, 'enabled'>
        ) | { __typename: 'ReferenceId' } }
      ), rows: Array<(
        { __typename?: 'ReportRow' }
        & Pick<ReportRow, 'nodeId' | 'formulaId' | 'elementDefId' | 'childReferenceId'>
        & { columns: Array<(
          { __typename?: 'ComputedValue' }
          & Pick<ComputedValue, 'unit'>
          & { value: (
            { __typename: 'IntFieldValue' }
            & Pick<IntFieldValue, 'integer'>
          ) | (
            { __typename: 'DecimalFieldValue' }
            & Pick<DecimalFieldValue, 'numeric'>
          ) | (
            { __typename: 'StringFieldValue' }
            & Pick<StringFieldValue, 'text'>
          ) | (
            { __typename: 'BoolFieldValue' }
            & Pick<BoolFieldValue, 'enabled'>
          ) | { __typename: 'ReferenceId' } }
        )> }
      )> }
    )>, summaries: Array<(
      { __typename?: 'ComputedValue' }
      & Pick<ComputedValue, 'label' | 'unit'>
      & { value: (
        { __typename: 'IntFieldValue' }
        & Pick<IntFieldValue, 'integer'>
      ) | (
        { __typename: 'DecimalFieldValue' }
        & Pick<DecimalFieldValue, 'numeric'>
      ) | (
        { __typename: 'StringFieldValue' }
        & Pick<StringFieldValue, 'text'>
      ) | (
        { __typename: 'BoolFieldValue' }
        & Pick<BoolFieldValue, 'enabled'>
      ) | { __typename: 'ReferenceId' } }
    )> }
  ) }
);

export type FindReportDefinitionsFromProjectDetailsQueryVariables = Exact<{
  projectId: Scalars['ID'];
}>;


export type FindReportDefinitionsFromProjectDetailsQuery = (
  { __typename?: 'Query' }
  & { findProjectDetails: (
    { __typename?: 'ProjectDetails' }
    & { reportDefinitions: Array<(
      { __typename?: 'ReportDefinition' }
      & Pick<ReportDefinition, 'id' | 'name'>
      & { structure: (
        { __typename?: 'ReportDefinitionStructure' }
        & { formulaAttribute: (
          { __typename?: 'AttributeBucket' }
          & Pick<AttributeBucket, 'bucketName' | 'attributeName'>
        ), columns: Array<(
          { __typename?: 'ReportComputation' }
          & Pick<ReportComputation, 'name' | 'isVisible' | 'unitId'>
        )> }
      ) }
    )> }
  ) }
);

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = (
  { __typename?: 'Query' }
  & { currentUser?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'permissions' | 'email' | 'oauthId' | 'organizationId'>
  )> }
);


export const CreateSingleUserOrganizationDocument = gql`
    mutation createSingleUserOrganization($singleUserOrganization: NewSingleUserOrganizationInput!) {
  createSingleUserOrganization(singleUserOrganization: $singleUserOrganization) {
    oauthId
    id
    email
    permissions
    organizationId
  }
}
    `;
export type CreateSingleUserOrganizationMutationFn = Apollo.MutationFunction<CreateSingleUserOrganizationMutation, CreateSingleUserOrganizationMutationVariables>;

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
export function useCreateSingleUserOrganizationMutation(baseOptions?: Apollo.MutationHookOptions<CreateSingleUserOrganizationMutation, CreateSingleUserOrganizationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSingleUserOrganizationMutation, CreateSingleUserOrganizationMutationVariables>(CreateSingleUserOrganizationDocument, options);
      }
export type CreateSingleUserOrganizationMutationHookResult = ReturnType<typeof useCreateSingleUserOrganizationMutation>;
export type CreateSingleUserOrganizationMutationResult = Apollo.MutationResult<CreateSingleUserOrganizationMutation>;
export type CreateSingleUserOrganizationMutationOptions = Apollo.BaseMutationOptions<CreateSingleUserOrganizationMutation, CreateSingleUserOrganizationMutationVariables>;
export const CreateDatasheetDocument = gql`
    mutation createDatasheet($datasheet: DatasheetInput!) {
  createDatasheet(datasheet: $datasheet) {
    id
    name
    isStaged
    projectDefinitionId
    fromDatasheetId
  }
}
    `;
export type CreateDatasheetMutationFn = Apollo.MutationFunction<CreateDatasheetMutation, CreateDatasheetMutationVariables>;

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
export function useCreateDatasheetMutation(baseOptions?: Apollo.MutationHookOptions<CreateDatasheetMutation, CreateDatasheetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateDatasheetMutation, CreateDatasheetMutationVariables>(CreateDatasheetDocument, options);
      }
export type CreateDatasheetMutationHookResult = ReturnType<typeof useCreateDatasheetMutation>;
export type CreateDatasheetMutationResult = Apollo.MutationResult<CreateDatasheetMutation>;
export type CreateDatasheetMutationOptions = Apollo.BaseMutationOptions<CreateDatasheetMutation, CreateDatasheetMutationVariables>;
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
        isStaged
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
export function useFindDatasheetsQuery(baseOptions: Apollo.QueryHookOptions<FindDatasheetsQuery, FindDatasheetsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindDatasheetsQuery, FindDatasheetsQueryVariables>(FindDatasheetsDocument, options);
      }
export function useFindDatasheetsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindDatasheetsQuery, FindDatasheetsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindDatasheetsQuery, FindDatasheetsQueryVariables>(FindDatasheetsDocument, options);
        }
export type FindDatasheetsQueryHookResult = ReturnType<typeof useFindDatasheetsQuery>;
export type FindDatasheetsLazyQueryHookResult = ReturnType<typeof useFindDatasheetsLazyQuery>;
export type FindDatasheetsQueryResult = Apollo.QueryResult<FindDatasheetsQuery, FindDatasheetsQueryVariables>;
export const AddProjectDefinitionNodeDocument = gql`
    mutation addProjectDefinitionNode($node: ProjectDefinitionNodeInput!) {
  addProjectDefinitionNode(node: $node) {
    id
    projectDefinitionId
    name
    isCollection
    instanciateByDefault
    orderIndex
    config {
      valueValidator
      fieldDetails {
        __typename
        ... on IntFieldConfig {
          unit
        }
        ... on DecimalFieldConfig {
          unit
          precision
        }
        ... on StringFieldConfig {
          transforms
        }
        ... on BoolFieldConfig {
          isCheckbox
        }
        ... on StaticChoiceFieldConfig {
          options {
            id
            label
            helpText
          }
        }
        ... on CollapsibleContainerFieldConfig {
          isCollapsible
        }
      }
    }
  }
}
    `;
export type AddProjectDefinitionNodeMutationFn = Apollo.MutationFunction<AddProjectDefinitionNodeMutation, AddProjectDefinitionNodeMutationVariables>;

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
 *      node: // value for 'node'
 *   },
 * });
 */
export function useAddProjectDefinitionNodeMutation(baseOptions?: Apollo.MutationHookOptions<AddProjectDefinitionNodeMutation, AddProjectDefinitionNodeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddProjectDefinitionNodeMutation, AddProjectDefinitionNodeMutationVariables>(AddProjectDefinitionNodeDocument, options);
      }
export type AddProjectDefinitionNodeMutationHookResult = ReturnType<typeof useAddProjectDefinitionNodeMutation>;
export type AddProjectDefinitionNodeMutationResult = Apollo.MutationResult<AddProjectDefinitionNodeMutation>;
export type AddProjectDefinitionNodeMutationOptions = Apollo.BaseMutationOptions<AddProjectDefinitionNodeMutation, AddProjectDefinitionNodeMutationVariables>;
export const FindProjectDefinitionFormulasDocument = gql`
    query findProjectDefinitionFormulas($projectDefinitionId: ID!, $query: String!, $first: Int!, $after: String) {
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
export function useFindProjectDefinitionFormulasQuery(baseOptions: Apollo.QueryHookOptions<FindProjectDefinitionFormulasQuery, FindProjectDefinitionFormulasQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindProjectDefinitionFormulasQuery, FindProjectDefinitionFormulasQueryVariables>(FindProjectDefinitionFormulasDocument, options);
      }
export function useFindProjectDefinitionFormulasLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindProjectDefinitionFormulasQuery, FindProjectDefinitionFormulasQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindProjectDefinitionFormulasQuery, FindProjectDefinitionFormulasQueryVariables>(FindProjectDefinitionFormulasDocument, options);
        }
export type FindProjectDefinitionFormulasQueryHookResult = ReturnType<typeof useFindProjectDefinitionFormulasQuery>;
export type FindProjectDefinitionFormulasLazyQueryHookResult = ReturnType<typeof useFindProjectDefinitionFormulasLazyQuery>;
export type FindProjectDefinitionFormulasQueryResult = Apollo.QueryResult<FindProjectDefinitionFormulasQuery, FindProjectDefinitionFormulasQueryVariables>;
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
        orderIndex
        config {
          valueValidator
          translations {
            helpTextName
            label
          }
          fieldDetails {
            __typename
            ... on IntFieldConfig {
              unit
            }
            ... on DecimalFieldConfig {
              unit
              precision
            }
            ... on StringFieldConfig {
              transforms
            }
            ... on BoolFieldConfig {
              isCheckbox
            }
            ... on StaticChoiceFieldConfig {
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
        }
        defaultValue {
          __typename
          ... on StringFieldValue {
            text
          }
          ... on IntFieldValue {
            integer
          }
          ... on DecimalFieldValue {
            numeric
          }
          ... on BoolFieldValue {
            enabled
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
export function useFindProjectDefinitionRootSectionsQuery(baseOptions: Apollo.QueryHookOptions<FindProjectDefinitionRootSectionsQuery, FindProjectDefinitionRootSectionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindProjectDefinitionRootSectionsQuery, FindProjectDefinitionRootSectionsQueryVariables>(FindProjectDefinitionRootSectionsDocument, options);
      }
export function useFindProjectDefinitionRootSectionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindProjectDefinitionRootSectionsQuery, FindProjectDefinitionRootSectionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindProjectDefinitionRootSectionsQuery, FindProjectDefinitionRootSectionsQueryVariables>(FindProjectDefinitionRootSectionsDocument, options);
        }
export type FindProjectDefinitionRootSectionsQueryHookResult = ReturnType<typeof useFindProjectDefinitionRootSectionsQuery>;
export type FindProjectDefinitionRootSectionsLazyQueryHookResult = ReturnType<typeof useFindProjectDefinitionRootSectionsLazyQuery>;
export type FindProjectDefinitionRootSectionsQueryResult = Apollo.QueryResult<FindProjectDefinitionRootSectionsQuery, FindProjectDefinitionRootSectionsQueryVariables>;
export const FindProjectDefinitionRootSectionContainersDocument = gql`
    query findProjectDefinitionRootSectionContainers($id: ID!, $rootSectionId: ID!) {
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
        orderIndex
        config {
          valueValidator
          translations {
            helpTextName
            label
          }
          fieldDetails {
            __typename
            ... on IntFieldConfig {
              unit
            }
            ... on DecimalFieldConfig {
              unit
              precision
            }
            ... on StringFieldConfig {
              transforms
            }
            ... on BoolFieldConfig {
              isCheckbox
            }
            ... on StaticChoiceFieldConfig {
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
        }
        defaultValue {
          __typename
          ... on StringFieldValue {
            text
          }
          ... on IntFieldValue {
            integer
          }
          ... on DecimalFieldValue {
            numeric
          }
          ... on BoolFieldValue {
            enabled
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
          orderIndex
          config {
            valueValidator
            translations {
              helpTextName
              label
            }
            fieldDetails {
              __typename
              ... on IntFieldConfig {
                unit
              }
              ... on DecimalFieldConfig {
                unit
                precision
              }
              ... on StringFieldConfig {
                transforms
              }
              ... on BoolFieldConfig {
                isCheckbox
              }
              ... on StaticChoiceFieldConfig {
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
          }
          defaultValue {
            __typename
            ... on StringFieldValue {
              text
            }
            ... on IntFieldValue {
              integer
            }
            ... on DecimalFieldValue {
              numeric
            }
            ... on BoolFieldValue {
              enabled
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
export function useFindProjectDefinitionRootSectionContainersQuery(baseOptions: Apollo.QueryHookOptions<FindProjectDefinitionRootSectionContainersQuery, FindProjectDefinitionRootSectionContainersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindProjectDefinitionRootSectionContainersQuery, FindProjectDefinitionRootSectionContainersQueryVariables>(FindProjectDefinitionRootSectionContainersDocument, options);
      }
export function useFindProjectDefinitionRootSectionContainersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindProjectDefinitionRootSectionContainersQuery, FindProjectDefinitionRootSectionContainersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindProjectDefinitionRootSectionContainersQuery, FindProjectDefinitionRootSectionContainersQueryVariables>(FindProjectDefinitionRootSectionContainersDocument, options);
        }
export type FindProjectDefinitionRootSectionContainersQueryHookResult = ReturnType<typeof useFindProjectDefinitionRootSectionContainersQuery>;
export type FindProjectDefinitionRootSectionContainersLazyQueryHookResult = ReturnType<typeof useFindProjectDefinitionRootSectionContainersLazyQuery>;
export type FindProjectDefinitionRootSectionContainersQueryResult = Apollo.QueryResult<FindProjectDefinitionRootSectionContainersQuery, FindProjectDefinitionRootSectionContainersQueryVariables>;
export const FindProjectDefinitionFormContentDocument = gql`
    query findProjectDefinitionFormContent($id: ID!, $formId: ID!) {
  findProjectDefinitionNode(projectDefinitionId: $id, id: $formId) {
    id
    projectDefinitionId
    name
    isCollection
    instanciateByDefault
    orderIndex
    path
    config {
      valueValidator
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
        }
        ... on DecimalFieldConfig {
          unit
          precision
        }
        ... on StringFieldConfig {
          transforms
        }
        ... on BoolFieldConfig {
          isCheckbox
        }
        ... on StaticChoiceFieldConfig {
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
    }
  }
  findProjectDefinitionFormContent(projectDefinitionId: $id, formId: $formId) {
    roots {
      definition {
        id
        projectDefinitionId
        name
        isCollection
        instanciateByDefault
        orderIndex
        config {
          valueValidator
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
            }
            ... on DecimalFieldConfig {
              unit
              precision
            }
            ... on StringFieldConfig {
              transforms
            }
            ... on BoolFieldConfig {
              isCheckbox
            }
            ... on StaticChoiceFieldConfig {
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
        }
        defaultValue {
          __typename
          ... on StringFieldValue {
            text
          }
          ... on IntFieldValue {
            integer
          }
          ... on DecimalFieldValue {
            numeric
          }
          ... on BoolFieldValue {
            enabled
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
          orderIndex
          config {
            valueValidator
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
              }
              ... on DecimalFieldConfig {
                unit
                precision
              }
              ... on StringFieldConfig {
                transforms
              }
              ... on BoolFieldConfig {
                isCheckbox
              }
              ... on StaticChoiceFieldConfig {
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
          }
          defaultValue {
            __typename
            ... on StringFieldValue {
              text
            }
            ... on IntFieldValue {
              integer
            }
            ... on DecimalFieldValue {
              numeric
            }
            ... on BoolFieldValue {
              enabled
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
export function useFindProjectDefinitionFormContentQuery(baseOptions: Apollo.QueryHookOptions<FindProjectDefinitionFormContentQuery, FindProjectDefinitionFormContentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindProjectDefinitionFormContentQuery, FindProjectDefinitionFormContentQueryVariables>(FindProjectDefinitionFormContentDocument, options);
      }
export function useFindProjectDefinitionFormContentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindProjectDefinitionFormContentQuery, FindProjectDefinitionFormContentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindProjectDefinitionFormContentQuery, FindProjectDefinitionFormContentQueryVariables>(FindProjectDefinitionFormContentDocument, options);
        }
export type FindProjectDefinitionFormContentQueryHookResult = ReturnType<typeof useFindProjectDefinitionFormContentQuery>;
export type FindProjectDefinitionFormContentLazyQueryHookResult = ReturnType<typeof useFindProjectDefinitionFormContentLazyQuery>;
export type FindProjectDefinitionFormContentQueryResult = Apollo.QueryResult<FindProjectDefinitionFormContentQuery, FindProjectDefinitionFormContentQueryVariables>;
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
    orderIndex
    path
    config {
      valueValidator
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
        }
        ... on DecimalFieldConfig {
          unit
          precision
        }
        ... on StringFieldConfig {
          transforms
        }
        ... on BoolFieldConfig {
          isCheckbox
        }
        ... on StaticChoiceFieldConfig {
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
    }
    translations {
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
export function useFindProjectDefinitionNodeQuery(baseOptions: Apollo.QueryHookOptions<FindProjectDefinitionNodeQuery, FindProjectDefinitionNodeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindProjectDefinitionNodeQuery, FindProjectDefinitionNodeQueryVariables>(FindProjectDefinitionNodeDocument, options);
      }
export function useFindProjectDefinitionNodeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindProjectDefinitionNodeQuery, FindProjectDefinitionNodeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindProjectDefinitionNodeQuery, FindProjectDefinitionNodeQueryVariables>(FindProjectDefinitionNodeDocument, options);
        }
export type FindProjectDefinitionNodeQueryHookResult = ReturnType<typeof useFindProjectDefinitionNodeQuery>;
export type FindProjectDefinitionNodeLazyQueryHookResult = ReturnType<typeof useFindProjectDefinitionNodeLazyQuery>;
export type FindProjectDefinitionNodeQueryResult = Apollo.QueryResult<FindProjectDefinitionNodeQuery, FindProjectDefinitionNodeQueryVariables>;
export const FindProjectDefintionsDocument = gql`
    query findProjectDefintions($query: String!, $first: Int!, $after: String) {
  results: findProjectDefintions(query: $query, first: $first, after: $after) {
    edges {
      node {
        id
        name
        defaultDatasheetId
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
export function useFindProjectDefintionsQuery(baseOptions: Apollo.QueryHookOptions<FindProjectDefintionsQuery, FindProjectDefintionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindProjectDefintionsQuery, FindProjectDefintionsQueryVariables>(FindProjectDefintionsDocument, options);
      }
export function useFindProjectDefintionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindProjectDefintionsQuery, FindProjectDefintionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindProjectDefintionsQuery, FindProjectDefintionsQueryVariables>(FindProjectDefintionsDocument, options);
        }
export type FindProjectDefintionsQueryHookResult = ReturnType<typeof useFindProjectDefintionsQuery>;
export type FindProjectDefintionsLazyQueryHookResult = ReturnType<typeof useFindProjectDefintionsLazyQuery>;
export type FindProjectDefintionsQueryResult = Apollo.QueryResult<FindProjectDefintionsQuery, FindProjectDefintionsQueryVariables>;
export const CreateProjectDocument = gql`
    mutation createProject($projectDetails: ProjectDetailsInput!) {
  createProject(projectDetails: $projectDetails) {
    id
    name
    isStaged
    projectDefinitionId
    datasheetId
  }
}
    `;
export type CreateProjectMutationFn = Apollo.MutationFunction<CreateProjectMutation, CreateProjectMutationVariables>;

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
export function useCreateProjectMutation(baseOptions?: Apollo.MutationHookOptions<CreateProjectMutation, CreateProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProjectMutation, CreateProjectMutationVariables>(CreateProjectDocument, options);
      }
export type CreateProjectMutationHookResult = ReturnType<typeof useCreateProjectMutation>;
export type CreateProjectMutationResult = Apollo.MutationResult<CreateProjectMutation>;
export type CreateProjectMutationOptions = Apollo.BaseMutationOptions<CreateProjectMutation, CreateProjectMutationVariables>;
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
export type UpdateFieldsMutationFn = Apollo.MutationFunction<UpdateFieldsMutation, UpdateFieldsMutationVariables>;

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
export function useUpdateFieldsMutation(baseOptions?: Apollo.MutationHookOptions<UpdateFieldsMutation, UpdateFieldsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateFieldsMutation, UpdateFieldsMutationVariables>(UpdateFieldsDocument, options);
      }
export type UpdateFieldsMutationHookResult = ReturnType<typeof useUpdateFieldsMutation>;
export type UpdateFieldsMutationResult = Apollo.MutationResult<UpdateFieldsMutation>;
export type UpdateFieldsMutationOptions = Apollo.BaseMutationOptions<UpdateFieldsMutation, UpdateFieldsMutationVariables>;
export const AddProjectCollectionItemDocument = gql`
    mutation addProjectCollectionItem($projectId: ID!, $collectionTarget: ProjectNodeCollectionTargetInput!) {
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
export type AddProjectCollectionItemMutationFn = Apollo.MutationFunction<AddProjectCollectionItemMutation, AddProjectCollectionItemMutationVariables>;

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
export function useAddProjectCollectionItemMutation(baseOptions?: Apollo.MutationHookOptions<AddProjectCollectionItemMutation, AddProjectCollectionItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddProjectCollectionItemMutation, AddProjectCollectionItemMutationVariables>(AddProjectCollectionItemDocument, options);
      }
export type AddProjectCollectionItemMutationHookResult = ReturnType<typeof useAddProjectCollectionItemMutation>;
export type AddProjectCollectionItemMutationResult = Apollo.MutationResult<AddProjectCollectionItemMutation>;
export type AddProjectCollectionItemMutationOptions = Apollo.BaseMutationOptions<AddProjectCollectionItemMutation, AddProjectCollectionItemMutationVariables>;
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
export type CloneProjectCollectionMutationFn = Apollo.MutationFunction<CloneProjectCollectionMutation, CloneProjectCollectionMutationVariables>;

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
export function useCloneProjectCollectionMutation(baseOptions?: Apollo.MutationHookOptions<CloneProjectCollectionMutation, CloneProjectCollectionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CloneProjectCollectionMutation, CloneProjectCollectionMutationVariables>(CloneProjectCollectionDocument, options);
      }
export type CloneProjectCollectionMutationHookResult = ReturnType<typeof useCloneProjectCollectionMutation>;
export type CloneProjectCollectionMutationResult = Apollo.MutationResult<CloneProjectCollectionMutation>;
export type CloneProjectCollectionMutationOptions = Apollo.BaseMutationOptions<CloneProjectCollectionMutation, CloneProjectCollectionMutationVariables>;
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
export type DeleteProjectCollectionMutationFn = Apollo.MutationFunction<DeleteProjectCollectionMutation, DeleteProjectCollectionMutationVariables>;

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
export function useDeleteProjectCollectionMutation(baseOptions?: Apollo.MutationHookOptions<DeleteProjectCollectionMutation, DeleteProjectCollectionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteProjectCollectionMutation, DeleteProjectCollectionMutationVariables>(DeleteProjectCollectionDocument, options);
      }
export type DeleteProjectCollectionMutationHookResult = ReturnType<typeof useDeleteProjectCollectionMutation>;
export type DeleteProjectCollectionMutationResult = Apollo.MutationResult<DeleteProjectCollectionMutation>;
export type DeleteProjectCollectionMutationOptions = Apollo.BaseMutationOptions<DeleteProjectCollectionMutation, DeleteProjectCollectionMutationVariables>;
export const FindProjectsDocument = gql`
    query findProjects($query: String!, $first: Int!, $after: String) {
  results: findProjects(query: $query, first: $first, after: $after) {
    edges {
      node {
        id
        name
        isStaged
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
export function useFindProjectsQuery(baseOptions: Apollo.QueryHookOptions<FindProjectsQuery, FindProjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindProjectsQuery, FindProjectsQueryVariables>(FindProjectsDocument, options);
      }
export function useFindProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindProjectsQuery, FindProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindProjectsQuery, FindProjectsQueryVariables>(FindProjectsDocument, options);
        }
export type FindProjectsQueryHookResult = ReturnType<typeof useFindProjectsQuery>;
export type FindProjectsLazyQueryHookResult = ReturnType<typeof useFindProjectsLazyQuery>;
export type FindProjectsQueryResult = Apollo.QueryResult<FindProjectsQuery, FindProjectsQueryVariables>;
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
        orderIndex
        config {
          translations {
            helpTextName
            label
          }
          fieldDetails {
            __typename
            ... on IntFieldConfig {
              unit
            }
            ... on DecimalFieldConfig {
              unit
              precision
            }
            ... on StringFieldConfig {
              transforms
            }
            ... on BoolFieldConfig {
              isCheckbox
            }
            ... on StaticChoiceFieldConfig {
              options {
                id
                label
                helpText
              }
            }
            ... on CollapsibleContainerFieldConfig {
              isCollapsible
            }
          }
          valueValidator
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
export function useFindProjectRootSectionsQuery(baseOptions: Apollo.QueryHookOptions<FindProjectRootSectionsQuery, FindProjectRootSectionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindProjectRootSectionsQuery, FindProjectRootSectionsQueryVariables>(FindProjectRootSectionsDocument, options);
      }
export function useFindProjectRootSectionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindProjectRootSectionsQuery, FindProjectRootSectionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindProjectRootSectionsQuery, FindProjectRootSectionsQueryVariables>(FindProjectRootSectionsDocument, options);
        }
export type FindProjectRootSectionsQueryHookResult = ReturnType<typeof useFindProjectRootSectionsQuery>;
export type FindProjectRootSectionsLazyQueryHookResult = ReturnType<typeof useFindProjectRootSectionsLazyQuery>;
export type FindProjectRootSectionsQueryResult = Apollo.QueryResult<FindProjectRootSectionsQuery, FindProjectRootSectionsQueryVariables>;
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
        orderIndex
        config {
          translations {
            helpTextName
            label
          }
          fieldDetails {
            __typename
            ... on IntFieldConfig {
              unit
            }
            ... on DecimalFieldConfig {
              unit
              precision
            }
            ... on StringFieldConfig {
              transforms
            }
            ... on BoolFieldConfig {
              isCheckbox
            }
            ... on StaticChoiceFieldConfig {
              options {
                id
                label
                helpText
              }
            }
            ... on CollapsibleContainerFieldConfig {
              isCollapsible
            }
          }
          valueValidator
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
            orderIndex
            config {
              translations {
                helpTextName
                label
              }
              fieldDetails {
                __typename
                ... on IntFieldConfig {
                  unit
                }
                ... on DecimalFieldConfig {
                  unit
                  precision
                }
                ... on StringFieldConfig {
                  transforms
                }
                ... on BoolFieldConfig {
                  isCheckbox
                }
                ... on StaticChoiceFieldConfig {
                  options {
                    id
                    label
                    helpText
                  }
                }
                ... on CollapsibleContainerFieldConfig {
                  isCollapsible
                }
              }
              valueValidator
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
export function useFindProjectRootSectionContainersQuery(baseOptions: Apollo.QueryHookOptions<FindProjectRootSectionContainersQuery, FindProjectRootSectionContainersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindProjectRootSectionContainersQuery, FindProjectRootSectionContainersQueryVariables>(FindProjectRootSectionContainersDocument, options);
      }
export function useFindProjectRootSectionContainersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindProjectRootSectionContainersQuery, FindProjectRootSectionContainersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindProjectRootSectionContainersQuery, FindProjectRootSectionContainersQueryVariables>(FindProjectRootSectionContainersDocument, options);
        }
export type FindProjectRootSectionContainersQueryHookResult = ReturnType<typeof useFindProjectRootSectionContainersQuery>;
export type FindProjectRootSectionContainersLazyQueryHookResult = ReturnType<typeof useFindProjectRootSectionContainersLazyQuery>;
export type FindProjectRootSectionContainersQueryResult = Apollo.QueryResult<FindProjectRootSectionContainersQuery, FindProjectRootSectionContainersQueryVariables>;
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
      orderIndex
      config {
        fieldDetails {
          __typename
          ... on IntFieldConfig {
            unit
          }
          ... on DecimalFieldConfig {
            unit
            precision
          }
          ... on StringFieldConfig {
            transforms
          }
          ... on BoolFieldConfig {
            isCheckbox
          }
          ... on StaticChoiceFieldConfig {
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
            unit
            precision
          }
        }
        valueValidator
        translations {
          helpTextName
          label
        }
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
        orderIndex
        config {
          translations {
            helpTextName
            label
          }
          fieldDetails {
            __typename
            ... on IntFieldConfig {
              unit
            }
            ... on DecimalFieldConfig {
              unit
              precision
            }
            ... on StringFieldConfig {
              transforms
            }
            ... on BoolFieldConfig {
              isCheckbox
            }
            ... on StaticChoiceFieldConfig {
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
              unit
              precision
            }
          }
          valueValidator
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
            orderIndex
            config {
              translations {
                helpTextName
                label
              }
              fieldDetails {
                __typename
                ... on IntFieldConfig {
                  unit
                }
                ... on DecimalFieldConfig {
                  unit
                  precision
                }
                ... on StringFieldConfig {
                  transforms
                }
                ... on BoolFieldConfig {
                  isCheckbox
                }
                ... on StaticChoiceFieldConfig {
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
                  unit
                  precision
                }
              }
              valueValidator
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
export function useFindProjectFormContentQuery(baseOptions: Apollo.QueryHookOptions<FindProjectFormContentQuery, FindProjectFormContentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindProjectFormContentQuery, FindProjectFormContentQueryVariables>(FindProjectFormContentDocument, options);
      }
export function useFindProjectFormContentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindProjectFormContentQuery, FindProjectFormContentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindProjectFormContentQuery, FindProjectFormContentQueryVariables>(FindProjectFormContentDocument, options);
        }
export type FindProjectFormContentQueryHookResult = ReturnType<typeof useFindProjectFormContentQuery>;
export type FindProjectFormContentLazyQueryHookResult = ReturnType<typeof useFindProjectFormContentLazyQuery>;
export type FindProjectFormContentQueryResult = Apollo.QueryResult<FindProjectFormContentQuery, FindProjectFormContentQueryVariables>;
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
export function useFindProjectDefinitionIdQuery(baseOptions: Apollo.QueryHookOptions<FindProjectDefinitionIdQuery, FindProjectDefinitionIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindProjectDefinitionIdQuery, FindProjectDefinitionIdQueryVariables>(FindProjectDefinitionIdDocument, options);
      }
export function useFindProjectDefinitionIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindProjectDefinitionIdQuery, FindProjectDefinitionIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindProjectDefinitionIdQuery, FindProjectDefinitionIdQueryVariables>(FindProjectDefinitionIdDocument, options);
        }
export type FindProjectDefinitionIdQueryHookResult = ReturnType<typeof useFindProjectDefinitionIdQuery>;
export type FindProjectDefinitionIdLazyQueryHookResult = ReturnType<typeof useFindProjectDefinitionIdLazyQuery>;
export type FindProjectDefinitionIdQueryResult = Apollo.QueryResult<FindProjectDefinitionIdQuery, FindProjectDefinitionIdQueryVariables>;
export const FindProjectReportWithDefinitionDocument = gql`
    query findProjectReportWithDefinition($projectId: ID!, $reportDefinitionId: ID!) {
  findReportDefinition(reportDefinitionId: $reportDefinitionId) {
    id
    name
    structure {
      formulaAttribute {
        bucketName
        attributeName
      }
      formulaAttribute {
        bucketName
        attributeName
      }
      columns {
        name
        isVisible
        unitId
      }
    }
  }
  findProjectReport(
    projectId: $projectId
    reportDefinitionId: $reportDefinitionId
  ) {
    creationDateUtc
    stages {
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
export function useFindProjectReportWithDefinitionQuery(baseOptions: Apollo.QueryHookOptions<FindProjectReportWithDefinitionQuery, FindProjectReportWithDefinitionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindProjectReportWithDefinitionQuery, FindProjectReportWithDefinitionQueryVariables>(FindProjectReportWithDefinitionDocument, options);
      }
export function useFindProjectReportWithDefinitionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindProjectReportWithDefinitionQuery, FindProjectReportWithDefinitionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindProjectReportWithDefinitionQuery, FindProjectReportWithDefinitionQueryVariables>(FindProjectReportWithDefinitionDocument, options);
        }
export type FindProjectReportWithDefinitionQueryHookResult = ReturnType<typeof useFindProjectReportWithDefinitionQuery>;
export type FindProjectReportWithDefinitionLazyQueryHookResult = ReturnType<typeof useFindProjectReportWithDefinitionLazyQuery>;
export type FindProjectReportWithDefinitionQueryResult = Apollo.QueryResult<FindProjectReportWithDefinitionQuery, FindProjectReportWithDefinitionQueryVariables>;
export const FindReportDefinitionsFromProjectDetailsDocument = gql`
    query findReportDefinitionsFromProjectDetails($projectId: ID!) {
  findProjectDetails(id: $projectId) {
    reportDefinitions {
      id
      name
      structure {
        formulaAttribute {
          bucketName
          attributeName
        }
        formulaAttribute {
          bucketName
          attributeName
        }
        columns {
          name
          isVisible
          unitId
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
export function useFindReportDefinitionsFromProjectDetailsQuery(baseOptions: Apollo.QueryHookOptions<FindReportDefinitionsFromProjectDetailsQuery, FindReportDefinitionsFromProjectDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindReportDefinitionsFromProjectDetailsQuery, FindReportDefinitionsFromProjectDetailsQueryVariables>(FindReportDefinitionsFromProjectDetailsDocument, options);
      }
export function useFindReportDefinitionsFromProjectDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindReportDefinitionsFromProjectDetailsQuery, FindReportDefinitionsFromProjectDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindReportDefinitionsFromProjectDetailsQuery, FindReportDefinitionsFromProjectDetailsQueryVariables>(FindReportDefinitionsFromProjectDetailsDocument, options);
        }
export type FindReportDefinitionsFromProjectDetailsQueryHookResult = ReturnType<typeof useFindReportDefinitionsFromProjectDetailsQuery>;
export type FindReportDefinitionsFromProjectDetailsLazyQueryHookResult = ReturnType<typeof useFindReportDefinitionsFromProjectDetailsLazyQuery>;
export type FindReportDefinitionsFromProjectDetailsQueryResult = Apollo.QueryResult<FindReportDefinitionsFromProjectDetailsQuery, FindReportDefinitionsFromProjectDetailsQueryVariables>;
export const CurrentUserDocument = gql`
    query currentUser {
  currentUser {
    id
    permissions
    email
    oauthId
    organizationId
  }
}
    `;

/**
 * __useCurrentUserQuery__
 *
 * To run a query within a React component, call `useCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
      }
export function useCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
        }
export type CurrentUserQueryHookResult = ReturnType<typeof useCurrentUserQuery>;
export type CurrentUserLazyQueryHookResult = ReturnType<typeof useCurrentUserLazyQuery>;
export type CurrentUserQueryResult = Apollo.QueryResult<CurrentUserQuery, CurrentUserQueryVariables>;
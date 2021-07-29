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

export type Datasheet = {
  __typename?: 'Datasheet';
  id: FieldWrapper<Scalars['ID']>;
  name: FieldWrapper<Scalars['String']>;
  isStaged: FieldWrapper<Scalars['Boolean']>;
  datasheetDefId: FieldWrapper<Scalars['ID']>;
  fromDatasheetId: FieldWrapper<Scalars['ID']>;
  elements?: Maybe<FieldWrapper<DatasheetElementConnection>>;
};


export type DatasheetElementsArgs = {
  first: Scalars['Int'];
  after?: Maybe<Scalars['String']>;
};

export type DatasheetDefinition = {
  __typename?: 'DatasheetDefinition';
  id: FieldWrapper<Scalars['ID']>;
  name: FieldWrapper<Scalars['String']>;
  properties: Array<FieldWrapper<DatasheetDefinitionPropertySchemaDict>>;
  elementsDefinition?: Maybe<FieldWrapper<DatasheetDefinitionElementConnection>>;
};


export type DatasheetDefinitionElementsDefinitionArgs = {
  first: Scalars['Int'];
  after?: Maybe<Scalars['String']>;
};

export type DatasheetDefinitionConnection = {
  __typename?: 'DatasheetDefinitionConnection';
  edges: Array<FieldWrapper<DatasheetDefinitionEdge>>;
  pageInfo: FieldWrapper<PageInfo>;
};

export type DatasheetDefinitionEdge = {
  __typename?: 'DatasheetDefinitionEdge';
  node: FieldWrapper<DatasheetDefinition>;
  cursor: FieldWrapper<Scalars['String']>;
};

export type DatasheetDefinitionElement = {
  __typename?: 'DatasheetDefinitionElement';
  id: FieldWrapper<Scalars['ID']>;
  unitId: FieldWrapper<Scalars['String']>;
  isCollection: FieldWrapper<Scalars['Boolean']>;
  datasheetDefId: FieldWrapper<Scalars['String']>;
  datasheetDefinition?: Maybe<FieldWrapper<DatasheetDefinition>>;
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
  is_readonly: FieldWrapper<Scalars['Boolean']>;
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

export enum FieldDetailsType {
  INT_FIELD_CONFIG = 'INT_FIELD_CONFIG',
  DECIMAL_FIELD_CONFIG = 'DECIMAL_FIELD_CONFIG',
  STRING_FIELD_CONFIG = 'STRING_FIELD_CONFIG',
  BOOL_FIELD_CONFIG = 'BOOL_FIELD_CONFIG',
  STATIC_CHOICE_FIELD_CONFIG = 'STATIC_CHOICE_FIELD_CONFIG',
  COLLAPSIBLE_CONTAINER_FIELD_CONFIG = 'COLLAPSIBLE_CONTAINER_FIELD_CONFIG'
}

export type FieldDetailsUnion = IntFieldConfig | DecimalFieldConfig | StringFieldConfig | BoolFieldConfig | StaticChoiceFieldConfig | CollapsibleContainerFieldConfig;

export type FieldDetailsUnionInput = {
  kind: FieldDetailsType;
  int?: Maybe<IntFieldConfigInput>;
  decimal?: Maybe<DecimalFieldConfigInput>;
  string?: Maybe<StringFieldConfigInput>;
  bool?: Maybe<BoolFieldConfigInput>;
  staticChoice?: Maybe<StaticChoiceFieldConfigInput>;
  collapsibleContainer?: Maybe<CollapsibleContainerFieldConfigInput>;
};

export type FieldValue = IntFieldValue | DecimalFieldValue | StringFieldValue | BoolFieldValue;

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
  project_def_id: FieldWrapper<Scalars['String']>;
  attached_to_type_id: FieldWrapper<Scalars['String']>;
  name: FieldWrapper<Scalars['String']>;
  expression: FieldWrapper<Scalars['String']>;
  generated_ast: FieldWrapper<Scalars['String']>;
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
  addProjectDefinitionNode: FieldWrapper<ProjectDefinitionNode>;
  updateProjectField: FieldWrapper<ProjectNode>;
  createProject: FieldWrapper<ProjectDetails>;
};


export type MutationAddTranslationsArgs = {
  translations: Array<TranslationInput>;
};


export type MutationAddProjectDefinitionNodeArgs = {
  node: ProjectDefinitionNodeInput;
};


export type MutationUpdateProjectFieldArgs = {
  project_id: Scalars['ID'];
  node_id: Scalars['ID'];
  value: FieldValueInput;
};


export type MutationCreateProjectArgs = {
  projectDetails?: Maybe<ProjectDetailsInput>;
};

export type NodeConfig = {
  __typename?: 'NodeConfig';
  fieldDetails?: Maybe<FieldWrapper<FieldDetailsUnion>>;
  valueValidator?: Maybe<FieldWrapper<Scalars['JsonSchema']>>;
};

export type NodeConfigInput = {
  fieldDetails?: Maybe<FieldDetailsUnionInput>;
  valueValidator?: Maybe<Scalars['JsonSchema']>;
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
  datasheetDefId: FieldWrapper<Scalars['String']>;
  datasheetDefinition: FieldWrapper<DatasheetDefinition>;
  rootSections: FieldWrapper<ProjectDefinitionNodeTree>;
  rootSectionContainers: FieldWrapper<ProjectDefinitionNodeTree>;
  formContent: FieldWrapper<ProjectDefinitionNodeTree>;
};


export type ProjectDefinitionRootSectionsArgs = {
  projectDefId: Scalars['ID'];
};


export type ProjectDefinitionRootSectionContainersArgs = {
  projectDefId: Scalars['ID'];
  rootSectionId: Scalars['ID'];
};


export type ProjectDefinitionFormContentArgs = {
  projectDefId: Scalars['ID'];
  formId: Scalars['ID'];
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
  projectDefId: FieldWrapper<Scalars['String']>;
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
  projectDefId: Scalars['String'];
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
  projectDefId: FieldWrapper<Scalars['String']>;
  projectDefinition: FieldWrapper<ProjectDefinition>;
  datasheetId: FieldWrapper<Scalars['String']>;
  datasheet: FieldWrapper<Datasheet>;
};

export type ProjectDetailsInput = {
  id: Scalars['ID'];
  name: Scalars['String'];
  projectDefId: Scalars['String'];
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
  project_id: FieldWrapper<Scalars['String']>;
  type_path: Array<FieldWrapper<Scalars['String']>>;
  type_id: FieldWrapper<Scalars['String']>;
  path: Array<FieldWrapper<Scalars['String']>>;
  value?: Maybe<FieldWrapper<FieldValue>>;
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
  findDatasheet: FieldWrapper<Datasheet>;
  findDatasheetDefinitions: FieldWrapper<DatasheetDefinitionConnection>;
  findDatasheetDefinition: FieldWrapper<DatasheetDefinition>;
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
  findProjectFormContent: FieldWrapper<ProjectNodeTree>;
  findProjects: FieldWrapper<ProjectConnection>;
  findProjectDefinitionFormulas: FieldWrapper<FormulaConnection>;
};


export type QueryFindDatasheetArgs = {
  id: Scalars['ID'];
};


export type QueryFindDatasheetDefinitionsArgs = {
  query: Scalars['String'];
  first: Scalars['Int'];
  after?: Maybe<Scalars['String']>;
};


export type QueryFindDatasheetDefinitionArgs = {
  datasheetDefinitionId: Scalars['ID'];
};


export type QueryFindDatasheetDefinitionElementsArgs = {
  datasheetDefinitionId: Scalars['ID'];
  first: Scalars['Int'];
  after?: Maybe<Scalars['String']>;
};


export type QueryQueryDatasheetDefinitionElementsArgs = {
  query: Scalars['String'];
  first: Scalars['Int'];
  after?: Maybe<Scalars['String']>;
};


export type QueryFindProjectDefinitionArgs = {
  id: Scalars['ID'];
};


export type QueryFindProjectDefinitionRootSectionsArgs = {
  projectDefId: Scalars['ID'];
};


export type QueryFindProjectDefinitionRootSectionContainersArgs = {
  projectDefId: Scalars['ID'];
  rootSectionId: Scalars['ID'];
};


export type QueryFindProjectDefinitionFormContentArgs = {
  projectDefId: Scalars['ID'];
  formId: Scalars['ID'];
};


export type QueryFindProjectDefinitionNodeArgs = {
  projectDefId: Scalars['ID'];
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


export type QueryFindProjectFormContentArgs = {
  projectId: Scalars['ID'];
  formId: Scalars['ID'];
};


export type QueryFindProjectsArgs = {
  query: Scalars['String'];
  first: Scalars['Int'];
  after?: Maybe<Scalars['String']>;
};


export type QueryFindProjectDefinitionFormulasArgs = {
  projectDefId: Scalars['ID'];
  query: Scalars['String'];
  first: Scalars['Int'];
  after?: Maybe<Scalars['String']>;
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
  help_text: FieldWrapper<Scalars['String']>;
};

export type StaticChoiceOptionInput = {
  id: Scalars['String'];
  label: Scalars['String'];
  help_text: Scalars['String'];
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

export type Translation = {
  __typename?: 'Translation';
  id: FieldWrapper<Scalars['ID']>;
  ressourceId: FieldWrapper<Scalars['String']>;
  locale: FieldWrapper<Scalars['String']>;
  scope: FieldWrapper<Scalars['String']>;
  name: FieldWrapper<Scalars['String']>;
  value: FieldWrapper<Scalars['String']>;
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
  locale: Scalars['String'];
  scope: Scalars['String'];
  name: Scalars['String'];
  value: Scalars['String'];
};

export type FindDatasheetDefinitionsQueryVariables = Exact<{
  query: Scalars['String'];
  first: Scalars['Int'];
  after?: Maybe<Scalars['String']>;
}>;


export type FindDatasheetDefinitionsQuery = (
  { __typename?: 'Query' }
  & { findDatasheetDefinitions: (
    { __typename?: 'DatasheetDefinitionConnection' }
    & { edges: Array<(
      { __typename?: 'DatasheetDefinitionEdge' }
      & Pick<DatasheetDefinitionEdge, 'cursor'>
      & { node: (
        { __typename?: 'DatasheetDefinition' }
        & Pick<DatasheetDefinition, 'id' | 'name'>
        & { properties: Array<(
          { __typename?: 'DatasheetDefinitionPropertySchemaDict' }
          & Pick<DatasheetDefinitionPropertySchemaDict, 'name'>
          & { schema: (
            { __typename?: 'DatasheetDefinitionPropertySchema' }
            & Pick<DatasheetDefinitionPropertySchema, 'valueValidator'>
          ) }
        )> }
      ) }
    )>, pageInfo: (
      { __typename?: 'PageInfo' }
      & Pick<PageInfo, 'hasNextPage' | 'endCursor' | 'totalCount'>
    ) }
  ) }
);

export type FindDatasheetDefinitionQueryVariables = Exact<{
  datasheetDefinitionId: Scalars['ID'];
}>;


export type FindDatasheetDefinitionQuery = (
  { __typename?: 'Query' }
  & { findDatasheetDefinition: (
    { __typename?: 'DatasheetDefinition' }
    & Pick<DatasheetDefinition, 'name'>
    & { properties: Array<(
      { __typename?: 'DatasheetDefinitionPropertySchemaDict' }
      & Pick<DatasheetDefinitionPropertySchemaDict, 'name'>
      & { schema: (
        { __typename?: 'DatasheetDefinitionPropertySchema' }
        & Pick<DatasheetDefinitionPropertySchema, 'valueValidator'>
      ) }
    )> }
  ) }
);

export type QueryDatasheetDefinitionElementsQueryVariables = Exact<{
  query: Scalars['String'];
  first: Scalars['Int'];
  after?: Maybe<Scalars['String']>;
}>;


export type QueryDatasheetDefinitionElementsQuery = (
  { __typename?: 'Query' }
  & { queryDatasheetDefinitionElements: (
    { __typename?: 'DatasheetDefinitionElementConnection' }
    & { edges: Array<(
      { __typename?: 'DatasheetDefinitionElementEdge' }
      & Pick<DatasheetDefinitionElementEdge, 'cursor'>
      & { node: (
        { __typename?: 'DatasheetDefinitionElement' }
        & Pick<DatasheetDefinitionElement, 'id' | 'unitId' | 'isCollection' | 'datasheetDefId' | 'orderIndex' | 'name' | 'tags'>
        & { defaultProperties: Array<(
          { __typename?: 'DatasheetDefinitionElementPropertyDict' }
          & Pick<DatasheetDefinitionElementPropertyDict, 'name'>
          & { property: (
            { __typename?: 'DatasheetDefinitionElementProperty' }
            & Pick<DatasheetDefinitionElementProperty, 'is_readonly' | 'value'>
          ) }
        )> }
      ) }
    )>, pageInfo: (
      { __typename?: 'PageInfo' }
      & Pick<PageInfo, 'hasNextPage' | 'endCursor' | 'totalCount'>
    ) }
  ) }
);

export type AddProjectDefinitionNodeMutationVariables = Exact<{
  node: ProjectDefinitionNodeInput;
}>;


export type AddProjectDefinitionNodeMutation = (
  { __typename?: 'Mutation' }
  & { addProjectDefinitionNode: (
    { __typename?: 'ProjectDefinitionNode' }
    & Pick<ProjectDefinitionNode, 'id' | 'projectDefId' | 'name' | 'isCollection' | 'instanciateByDefault' | 'orderIndex'>
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
          & Pick<StaticChoiceOption, 'id' | 'label' | 'help_text'>
        )> }
      ) | (
        { __typename: 'CollapsibleContainerFieldConfig' }
        & Pick<CollapsibleContainerFieldConfig, 'isCollapsible'>
      )> }
    ) }
  ) }
);

export type FindProjectDefinitionFormulasQueryVariables = Exact<{
  projectDefId: Scalars['ID'];
  query: Scalars['String'];
  first: Scalars['Int'];
  after?: Maybe<Scalars['String']>;
}>;


export type FindProjectDefinitionFormulasQuery = (
  { __typename?: 'Query' }
  & { findProjectDefinitionFormulas: (
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
        & Pick<ProjectDefinitionNode, 'id' | 'projectDefId' | 'name' | 'isCollection' | 'instanciateByDefault' | 'orderIndex' | 'path'>
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
              & Pick<StaticChoiceOption, 'id' | 'label' | 'help_text'>
            )> }
          ) | (
            { __typename: 'CollapsibleContainerFieldConfig' }
            & Pick<CollapsibleContainerFieldConfig, 'isCollapsible'>
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
        )> }
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
        & Pick<ProjectDefinitionNode, 'id' | 'projectDefId' | 'name' | 'isCollection' | 'instanciateByDefault' | 'orderIndex' | 'path'>
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
              & Pick<StaticChoiceOption, 'id' | 'label' | 'help_text'>
            )> }
          ) | (
            { __typename: 'CollapsibleContainerFieldConfig' }
            & Pick<CollapsibleContainerFieldConfig, 'isCollapsible'>
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
        )> }
      ), children: Array<(
        { __typename?: 'ProjectDefinitionTreeNode' }
        & { definition: (
          { __typename?: 'ProjectDefinitionNode' }
          & Pick<ProjectDefinitionNode, 'id' | 'projectDefId' | 'name' | 'isCollection' | 'instanciateByDefault' | 'orderIndex' | 'path'>
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
                & Pick<StaticChoiceOption, 'id' | 'label' | 'help_text'>
              )> }
            ) | (
              { __typename: 'CollapsibleContainerFieldConfig' }
              & Pick<CollapsibleContainerFieldConfig, 'isCollapsible'>
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
          )> }
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
    & Pick<ProjectDefinitionNode, 'id' | 'projectDefId' | 'name' | 'isCollection' | 'instanciateByDefault' | 'orderIndex' | 'path'>
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
          & Pick<StaticChoiceOption, 'id' | 'label' | 'help_text'>
        )> }
      ) | (
        { __typename: 'CollapsibleContainerFieldConfig' }
        & Pick<CollapsibleContainerFieldConfig, 'isCollapsible'>
      )> }
    ) }
  ), findProjectDefinitionFormContent: (
    { __typename?: 'ProjectDefinitionNodeTree' }
    & { roots: Array<(
      { __typename?: 'ProjectDefinitionTreeNode' }
      & { definition: (
        { __typename?: 'ProjectDefinitionNode' }
        & Pick<ProjectDefinitionNode, 'id' | 'projectDefId' | 'name' | 'isCollection' | 'instanciateByDefault' | 'orderIndex' | 'path'>
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
              & Pick<StaticChoiceOption, 'id' | 'label' | 'help_text'>
            )> }
          ) | (
            { __typename: 'CollapsibleContainerFieldConfig' }
            & Pick<CollapsibleContainerFieldConfig, 'isCollapsible'>
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
        )> }
      ), children: Array<(
        { __typename?: 'ProjectDefinitionTreeNode' }
        & { definition: (
          { __typename?: 'ProjectDefinitionNode' }
          & Pick<ProjectDefinitionNode, 'id' | 'projectDefId' | 'name' | 'isCollection' | 'instanciateByDefault' | 'orderIndex' | 'path'>
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
                & Pick<StaticChoiceOption, 'id' | 'label' | 'help_text'>
              )> }
            ) | (
              { __typename: 'CollapsibleContainerFieldConfig' }
              & Pick<CollapsibleContainerFieldConfig, 'isCollapsible'>
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
          )> }
        ) }
      )> }
    )> }
  ) }
);

export type FindProjectDefinitionNodeQueryVariables = Exact<{
  projectDefId: Scalars['ID'];
  nodeId: Scalars['ID'];
}>;


export type FindProjectDefinitionNodeQuery = (
  { __typename?: 'Query' }
  & { findProjectDefinitionNode: (
    { __typename?: 'ProjectDefinitionNode' }
    & Pick<ProjectDefinitionNode, 'id' | 'projectDefId' | 'name' | 'isCollection' | 'instanciateByDefault' | 'orderIndex' | 'path'>
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
          & Pick<StaticChoiceOption, 'id' | 'label' | 'help_text'>
        )> }
      ) | (
        { __typename: 'CollapsibleContainerFieldConfig' }
        & Pick<CollapsibleContainerFieldConfig, 'isCollapsible'>
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
  & { findProjectDefintions: (
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
    & Pick<ProjectDetails, 'id' | 'name' | 'isStaged' | 'projectDefId' | 'datasheetId'>
  ) }
);

export type FindProjectsQueryVariables = Exact<{
  query: Scalars['String'];
  first: Scalars['Int'];
  after?: Maybe<Scalars['String']>;
}>;


export type FindProjectsQuery = (
  { __typename?: 'Query' }
  & { findProjects: (
    { __typename?: 'ProjectConnection' }
    & { edges: Array<(
      { __typename?: 'ProjectEdge' }
      & Pick<ProjectEdge, 'cursor'>
      & { node: (
        { __typename?: 'ProjectDetails' }
        & Pick<ProjectDetails, 'id' | 'name' | 'isStaged' | 'projectDefId' | 'datasheetId'>
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
        & Pick<ProjectDefinitionNode, 'id' | 'projectDefId' | 'name' | 'isCollection' | 'instanciateByDefault' | 'orderIndex'>
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
              & Pick<StaticChoiceOption, 'id' | 'label' | 'help_text'>
            )> }
          ) | (
            { __typename: 'CollapsibleContainerFieldConfig' }
            & Pick<CollapsibleContainerFieldConfig, 'isCollapsible'>
          )> }
        ) }
      ), state: (
        { __typename?: 'ProjectNodeMetaState' }
        & Pick<ProjectNodeMetaState, 'isVisible' | 'selectedChild'>
      ), nodes: Array<(
        { __typename?: 'ProjectNodeTreeNode' }
        & { node: (
          { __typename?: 'ProjectNode' }
          & Pick<ProjectNode, 'id' | 'project_id' | 'type_path' | 'type_id' | 'path'>
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
          )> }
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
        & Pick<ProjectDefinitionNode, 'id' | 'projectDefId' | 'name' | 'isCollection' | 'instanciateByDefault' | 'orderIndex'>
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
              & Pick<StaticChoiceOption, 'id' | 'label' | 'help_text'>
            )> }
          ) | (
            { __typename: 'CollapsibleContainerFieldConfig' }
            & Pick<CollapsibleContainerFieldConfig, 'isCollapsible'>
          )> }
        ) }
      ), state: (
        { __typename?: 'ProjectNodeMetaState' }
        & Pick<ProjectNodeMetaState, 'isVisible' | 'selectedChild'>
      ), nodes: Array<(
        { __typename?: 'ProjectNodeTreeNode' }
        & { node: (
          { __typename?: 'ProjectNode' }
          & Pick<ProjectNode, 'id' | 'project_id' | 'type_path' | 'type_id' | 'path'>
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
          )> }
        ), children: Array<(
          { __typename?: 'ProjectNodeTreeTypeNode' }
          & { definition: (
            { __typename?: 'ProjectDefinitionNode' }
            & Pick<ProjectDefinitionNode, 'id' | 'projectDefId' | 'name' | 'isCollection' | 'instanciateByDefault' | 'orderIndex'>
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
                  & Pick<StaticChoiceOption, 'id' | 'label' | 'help_text'>
                )> }
              ) | (
                { __typename: 'CollapsibleContainerFieldConfig' }
                & Pick<CollapsibleContainerFieldConfig, 'isCollapsible'>
              )> }
            ) }
          ), state: (
            { __typename?: 'ProjectNodeMetaState' }
            & Pick<ProjectNodeMetaState, 'isVisible' | 'selectedChild'>
          ), nodes: Array<(
            { __typename?: 'ProjectNodeTreeNode' }
            & { node: (
              { __typename?: 'ProjectNode' }
              & Pick<ProjectNode, 'id' | 'project_id' | 'type_path' | 'type_id' | 'path'>
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
              )> }
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
  & { findProjectFormContent: (
    { __typename?: 'ProjectNodeTree' }
    & { roots: Array<(
      { __typename?: 'ProjectNodeTreeTypeNode' }
      & { definition: (
        { __typename?: 'ProjectDefinitionNode' }
        & Pick<ProjectDefinitionNode, 'id' | 'projectDefId' | 'name' | 'isCollection' | 'instanciateByDefault' | 'orderIndex'>
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
              & Pick<StaticChoiceOption, 'id' | 'label' | 'help_text'>
            )> }
          ) | (
            { __typename: 'CollapsibleContainerFieldConfig' }
            & Pick<CollapsibleContainerFieldConfig, 'isCollapsible'>
          )> }
        ) }
      ), state: (
        { __typename?: 'ProjectNodeMetaState' }
        & Pick<ProjectNodeMetaState, 'isVisible' | 'selectedChild'>
      ), nodes: Array<(
        { __typename?: 'ProjectNodeTreeNode' }
        & { node: (
          { __typename?: 'ProjectNode' }
          & Pick<ProjectNode, 'id' | 'project_id' | 'type_path' | 'type_id' | 'path'>
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
          )> }
        ), children: Array<(
          { __typename?: 'ProjectNodeTreeTypeNode' }
          & { definition: (
            { __typename?: 'ProjectDefinitionNode' }
            & Pick<ProjectDefinitionNode, 'id' | 'projectDefId' | 'name' | 'isCollection' | 'instanciateByDefault' | 'orderIndex'>
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
                  & Pick<StaticChoiceOption, 'id' | 'label' | 'help_text'>
                )> }
              ) | (
                { __typename: 'CollapsibleContainerFieldConfig' }
                & Pick<CollapsibleContainerFieldConfig, 'isCollapsible'>
              )> }
            ) }
          ), state: (
            { __typename?: 'ProjectNodeMetaState' }
            & Pick<ProjectNodeMetaState, 'isVisible' | 'selectedChild'>
          ), nodes: Array<(
            { __typename?: 'ProjectNodeTreeNode' }
            & { node: (
              { __typename?: 'ProjectNode' }
              & Pick<ProjectNode, 'id' | 'project_id' | 'type_path' | 'type_id' | 'path'>
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
              )> }
            ) }
          )> }
        )> }
      )> }
    )> }
  ) }
);


export const FindDatasheetDefinitionsDocument = gql`
    query findDatasheetDefinitions($query: String!, $first: Int!, $after: String) {
  findDatasheetDefinitions(query: $query, first: $first, after: $after) {
    edges {
      node {
        id
        name
        properties {
          name
          schema {
            valueValidator
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
 * __useFindDatasheetDefinitionsQuery__
 *
 * To run a query within a React component, call `useFindDatasheetDefinitionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindDatasheetDefinitionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindDatasheetDefinitionsQuery({
 *   variables: {
 *      query: // value for 'query'
 *      first: // value for 'first'
 *      after: // value for 'after'
 *   },
 * });
 */
export function useFindDatasheetDefinitionsQuery(baseOptions: Apollo.QueryHookOptions<FindDatasheetDefinitionsQuery, FindDatasheetDefinitionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindDatasheetDefinitionsQuery, FindDatasheetDefinitionsQueryVariables>(FindDatasheetDefinitionsDocument, options);
      }
export function useFindDatasheetDefinitionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindDatasheetDefinitionsQuery, FindDatasheetDefinitionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindDatasheetDefinitionsQuery, FindDatasheetDefinitionsQueryVariables>(FindDatasheetDefinitionsDocument, options);
        }
export type FindDatasheetDefinitionsQueryHookResult = ReturnType<typeof useFindDatasheetDefinitionsQuery>;
export type FindDatasheetDefinitionsLazyQueryHookResult = ReturnType<typeof useFindDatasheetDefinitionsLazyQuery>;
export type FindDatasheetDefinitionsQueryResult = Apollo.QueryResult<FindDatasheetDefinitionsQuery, FindDatasheetDefinitionsQueryVariables>;
export const FindDatasheetDefinitionDocument = gql`
    query findDatasheetDefinition($datasheetDefinitionId: ID!) {
  findDatasheetDefinition(datasheetDefinitionId: $datasheetDefinitionId) {
    name
    properties {
      name
      schema {
        valueValidator
      }
    }
  }
}
    `;

/**
 * __useFindDatasheetDefinitionQuery__
 *
 * To run a query within a React component, call `useFindDatasheetDefinitionQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindDatasheetDefinitionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindDatasheetDefinitionQuery({
 *   variables: {
 *      datasheetDefinitionId: // value for 'datasheetDefinitionId'
 *   },
 * });
 */
export function useFindDatasheetDefinitionQuery(baseOptions: Apollo.QueryHookOptions<FindDatasheetDefinitionQuery, FindDatasheetDefinitionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindDatasheetDefinitionQuery, FindDatasheetDefinitionQueryVariables>(FindDatasheetDefinitionDocument, options);
      }
export function useFindDatasheetDefinitionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindDatasheetDefinitionQuery, FindDatasheetDefinitionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindDatasheetDefinitionQuery, FindDatasheetDefinitionQueryVariables>(FindDatasheetDefinitionDocument, options);
        }
export type FindDatasheetDefinitionQueryHookResult = ReturnType<typeof useFindDatasheetDefinitionQuery>;
export type FindDatasheetDefinitionLazyQueryHookResult = ReturnType<typeof useFindDatasheetDefinitionLazyQuery>;
export type FindDatasheetDefinitionQueryResult = Apollo.QueryResult<FindDatasheetDefinitionQuery, FindDatasheetDefinitionQueryVariables>;
export const QueryDatasheetDefinitionElementsDocument = gql`
    query queryDatasheetDefinitionElements($query: String!, $first: Int!, $after: String) {
  queryDatasheetDefinitionElements(query: $query, first: $first, after: $after) {
    edges {
      node {
        id
        unitId
        isCollection
        datasheetDefId
        orderIndex
        name
        defaultProperties {
          name
          property {
            is_readonly
            value
          }
        }
        tags
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
 * __useQueryDatasheetDefinitionElementsQuery__
 *
 * To run a query within a React component, call `useQueryDatasheetDefinitionElementsQuery` and pass it any options that fit your needs.
 * When your component renders, `useQueryDatasheetDefinitionElementsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQueryDatasheetDefinitionElementsQuery({
 *   variables: {
 *      query: // value for 'query'
 *      first: // value for 'first'
 *      after: // value for 'after'
 *   },
 * });
 */
export function useQueryDatasheetDefinitionElementsQuery(baseOptions: Apollo.QueryHookOptions<QueryDatasheetDefinitionElementsQuery, QueryDatasheetDefinitionElementsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<QueryDatasheetDefinitionElementsQuery, QueryDatasheetDefinitionElementsQueryVariables>(QueryDatasheetDefinitionElementsDocument, options);
      }
export function useQueryDatasheetDefinitionElementsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QueryDatasheetDefinitionElementsQuery, QueryDatasheetDefinitionElementsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<QueryDatasheetDefinitionElementsQuery, QueryDatasheetDefinitionElementsQueryVariables>(QueryDatasheetDefinitionElementsDocument, options);
        }
export type QueryDatasheetDefinitionElementsQueryHookResult = ReturnType<typeof useQueryDatasheetDefinitionElementsQuery>;
export type QueryDatasheetDefinitionElementsLazyQueryHookResult = ReturnType<typeof useQueryDatasheetDefinitionElementsLazyQuery>;
export type QueryDatasheetDefinitionElementsQueryResult = Apollo.QueryResult<QueryDatasheetDefinitionElementsQuery, QueryDatasheetDefinitionElementsQueryVariables>;
export const AddProjectDefinitionNodeDocument = gql`
    mutation addProjectDefinitionNode($node: ProjectDefinitionNodeInput!) {
  addProjectDefinitionNode(node: $node) {
    id
    projectDefId
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
            help_text
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
    query findProjectDefinitionFormulas($projectDefId: ID!, $query: String!, $first: Int!, $after: String) {
  findProjectDefinitionFormulas(
    projectDefId: $projectDefId
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
 *      projectDefId: // value for 'projectDefId'
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
  findProjectDefinitionRootSections(projectDefId: $id) {
    roots {
      definition {
        id
        projectDefId
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
                help_text
              }
            }
            ... on CollapsibleContainerFieldConfig {
              isCollapsible
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
    projectDefId: $id
    rootSectionId: $rootSectionId
  ) {
    roots {
      definition {
        id
        projectDefId
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
                help_text
              }
            }
            ... on CollapsibleContainerFieldConfig {
              isCollapsible
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
          projectDefId
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
                  help_text
                }
              }
              ... on CollapsibleContainerFieldConfig {
                isCollapsible
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
  findProjectDefinitionNode(projectDefId: $id, id: $formId) {
    id
    projectDefId
    name
    isCollection
    instanciateByDefault
    orderIndex
    path
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
            help_text
          }
        }
        ... on CollapsibleContainerFieldConfig {
          isCollapsible
        }
      }
    }
  }
  findProjectDefinitionFormContent(projectDefId: $id, formId: $formId) {
    roots {
      definition {
        id
        projectDefId
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
                help_text
              }
            }
            ... on CollapsibleContainerFieldConfig {
              isCollapsible
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
          projectDefId
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
                  help_text
                }
              }
              ... on CollapsibleContainerFieldConfig {
                isCollapsible
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
    query findProjectDefinitionNode($projectDefId: ID!, $nodeId: ID!) {
  findProjectDefinitionNode(projectDefId: $projectDefId, id: $nodeId) {
    id
    projectDefId
    name
    isCollection
    instanciateByDefault
    orderIndex
    path
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
            help_text
          }
        }
        ... on CollapsibleContainerFieldConfig {
          isCollapsible
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
 *      projectDefId: // value for 'projectDefId'
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
  findProjectDefintions(query: $query, first: $first, after: $after) {
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
    projectDefId
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
export const FindProjectsDocument = gql`
    query findProjects($query: String!, $first: Int!, $after: String) {
  findProjects(query: $query, first: $first, after: $after) {
    edges {
      node {
        id
        name
        isStaged
        projectDefId
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
        projectDefId
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
                help_text
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
          project_id
          type_path
          type_id
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
        projectDefId
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
                help_text
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
          project_id
          type_path
          type_id
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
            projectDefId
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
                    help_text
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
              project_id
              type_path
              type_id
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
  findProjectFormContent(projectId: $projectId, formId: $formId) {
    roots {
      definition {
        id
        projectDefId
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
                help_text
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
          project_id
          type_path
          type_id
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
            projectDefId
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
                    help_text
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
              project_id
              type_path
              type_id
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
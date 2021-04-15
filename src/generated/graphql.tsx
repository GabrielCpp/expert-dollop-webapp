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
  elementPropertiesSchema?: Maybe<FieldWrapper<DatasheetDefinitionPropertySchemaDict>>;
  elementsDefinition?: Maybe<FieldWrapper<DatasheetDefinitionElementConnection>>;
};


export type DatasheetDefinitionElementsDefinitionArgs = {
  first: Scalars['Int'];
  after?: Maybe<Scalars['String']>;
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
  defaultProperties?: Maybe<FieldWrapper<DatasheetDefinitionElementPropertyDict>>;
  tags: Array<FieldWrapper<Scalars['String']>>;
  creationDateUtc: FieldWrapper<Scalars['String']>;
};

export type DatasheetDefinitionElementConnection = {
  __typename?: 'DatasheetDefinitionElementConnection';
  edges: Array<FieldWrapper<DatasheetDefinitionElement>>;
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

export type DatasheetDefinitionPropertySchemaDict = {
  __typename?: 'DatasheetDefinitionPropertySchemaDict';
  name: FieldWrapper<Scalars['String']>;
  schema: FieldWrapper<Scalars['String']>;
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
  kind: Scalars['String'];
  int?: Maybe<IntFieldValueInput>;
  decimal?: Maybe<DecimalFieldValueInput>;
  string?: Maybe<StringFieldValueInput>;
  bool?: Maybe<BoolFieldValueInput>;
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
};


export type MutationAddTranslationsArgs = {
  translations: Array<TranslationInput>;
};


export type MutationAddProjectDefinitionNodeArgs = {
  node: ProjectDefinitionNodeInput;
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
  hasNextPage?: Maybe<FieldWrapper<Scalars['Boolean']>>;
  endCursor: FieldWrapper<Scalars['String']>;
};

export type Project = {
  __typename?: 'Project';
  id: FieldWrapper<Scalars['ID']>;
  name: FieldWrapper<Scalars['String']>;
  isStaged?: Maybe<FieldWrapper<Scalars['Boolean']>>;
  projectDefId: FieldWrapper<Scalars['String']>;
  projectDefinition: FieldWrapper<ProjectDefinition>;
  datasheetId: FieldWrapper<Scalars['String']>;
  datasheet: FieldWrapper<Datasheet>;
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

export type Query = {
  __typename?: 'Query';
  findDatasheet: FieldWrapper<Datasheet>;
  findProjectDefinition: FieldWrapper<ProjectDefinition>;
  findProjectDefinitionRootSections: FieldWrapper<ProjectDefinitionNodeTree>;
  findProjectDefinitionRootSectionContainers: FieldWrapper<ProjectDefinitionNodeTree>;
  findProjectDefinitionFormContent: FieldWrapper<ProjectDefinitionNodeTree>;
  findProjectDefinitionNode: FieldWrapper<ProjectDefinitionNode>;
  findRessourceTranslation: FieldWrapper<TranslationConnection>;
  findProjectDefintions: FieldWrapper<ProjectDefinitionConnection>;
};


export type QueryFindDatasheetArgs = {
  id: Scalars['ID'];
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
  queryFilter: Scalars['String'];
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
    ) }
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
      & Pick<PageInfo, 'hasNextPage' | 'endCursor'>
    ) }
  ) }
);


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
  findProjectDefintions(queryFilter: $query, first: $first, after: $after) {
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
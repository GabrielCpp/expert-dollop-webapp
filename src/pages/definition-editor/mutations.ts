import { gql } from "@apollo/client";

export const ADD_PROJECT_DEFINITION_NODE = gql`
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

export const UPDATE_PROJECT_DEFINITION_NODE = gql`
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

export const DELETE_PROJECT_DEFINITION_NODE = gql`
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

export const CREATE_DEFINITION = gql`
  mutation addProjectDefinition($definitionInput: DefinitionInput!) {
    addProjectDefinition(definitionInput: $definitionInput) {
      id
      name
    }
  }
`;

export const ADD_AGGREGATE_COLLECTION = gql`
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

export const UPDATE_AGGREGATE_COLLECTION = gql`
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

export const ADD_AGGREGATE = gql`
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

export const UPDATE_AGGREGATE = gql`
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

export const DELETE_AGGREGATE = gql`
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

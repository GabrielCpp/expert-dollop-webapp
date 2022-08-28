import { gql } from "@apollo/client";

export const ADD_PROJECT_DEFINITION_NODE = gql`
  mutation addProjectDefinitionNode($projectDefinitionId: String!, $node: ProjectDefinitionNodeCreationInput!) {
    addProjectDefinitionNode(projectDefinitionId: $projectDefinitionId, node: $node) {
      id
      projectDefinitionId
      name
      isCollection
      instanciateByDefault
      orderIndex
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
  mutation updateProjectDefinitionNode($projectDefinitionId: String!, $nodeId: String! $node: ProjectDefinitionNodeCreationInput!) {
    updateProjectDefinitionNode(projectDefinitionId: $projectDefinitionId, nodeId: $nodeId, node: $node) {
      id
      projectDefinitionId
      name
      isCollection
      instanciateByDefault
      orderIndex
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

import { gql } from "@apollo/client";

export const ADD_PROJECT_DEFINITION_NODE = gql`
  mutation addProjectDefinitionNode($projectDefinitionId: ID!, $node: ProjectDefinitionNodeCreationInput!) {
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
  mutation updateProjectDefinitionNode($projectDefinitionId: ID!, $nodeId: ID! $node: ProjectDefinitionNodeCreationInput!) {
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

export const DELETE_PROJECT_DEFINITION_NODE = gql`
mutation deleteProjectDefinitionNode($projectDefinitionId: ID!, $nodeId: ID!) {
	deleteProjectDefinitionNode(projectDefinitionId: $projectDefinitionId, nodeId: $nodeId)
}
`

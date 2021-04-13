import { gql } from "@apollo/client";

export const ADD_PROJECT_DEFINITION_NODE = gql`
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

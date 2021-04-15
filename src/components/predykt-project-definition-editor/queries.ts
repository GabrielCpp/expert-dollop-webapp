import { gql } from "@apollo/client";

export const FIND_PROJECT_DEFINITION_ROOT_SECTIONS = gql`
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

export const FIND_PROJECT_DEFINITION_ROOT_SECTION_CONTAINERS = gql`
  query findProjectDefinitionRootSectionContainers(
    $id: ID!
    $rootSectionId: ID!
  ) {
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

export const FIND_PROJECT_DEFINITION_FORM_CONTENT = gql`
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

export const FIND_PROJECT_DEFINITION_NODE = gql`
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

export const FIND_PROJECT_DEFINTIONS = gql`
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

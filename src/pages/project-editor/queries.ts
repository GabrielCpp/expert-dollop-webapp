import { gql } from "@apollo/client";

export const FIND_PROJECTS = gql`
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

export const FIND_PROJECT_ROOT_SECTIONS = gql`
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

export const FIND_PROJECT_ROOT_SECTION_CONTAINERS = gql`
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

export const FIND_PROJECT_FORM_CONTENT = gql`
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


export const FIND_PROJECT_DEFINITION_ID = gql`
query findProjectDefinitionId($projectId: ID!) {
  findProjectDetails(id: $projectId) {
    projectDefId
  }
}
`


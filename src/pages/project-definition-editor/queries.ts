import { gql } from "@apollo/client";

export const FIND_PROJECT_DEFINITION_FORMULAS = gql`
  query findProjectDefinitionFormulas(
    $projectDefId: ID!
    $query: String!
    $first: Int!
    $after: String
  ) {
    results: findProjectDefinitionFormulas(
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
            projectDefId
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

export const FIND_PROJECT_DEFINITION_FORM_CONTENT = gql`
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
            projectDefId
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

export const FIND_PROJECT_DEFINTIONS = gql`
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

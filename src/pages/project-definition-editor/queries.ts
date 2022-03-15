import { gql } from "@apollo/client";

export const FIND_PROJECT_DEFINITION_FORMULAS = gql`
  query findProjectDefinitionFormulas(
    $projectDefinitionId: ID!
    $query: String!
    $first: Int!
    $after: String
  ) {
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

export const FIND_PROJECT_DEFINITION_ROOT_SECTIONS = gql`
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

export const FIND_PROJECT_DEFINITION_ROOT_SECTION_CONTAINERS = gql`
  query findProjectDefinitionRootSectionContainers(
    $id: ID!
    $rootSectionId: ID!
  ) {
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

export const FIND_PROJECT_DEFINITION_FORM_CONTENT = gql`
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
    findProjectDefinitionFormContent(
      projectDefinitionId: $id
      formId: $formId
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

export const FIND_PROJECT_DEFINITION_NODE = gql`
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

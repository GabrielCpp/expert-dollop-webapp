import { gql } from '@apollo/client'

export const FIND_PROJECT_DEFINITION = gql`
query findProjectDefinitionRootSections($id: ID!) {
  findProjectDefinitionRootSections(projectDefId: $id) {
    roots {
      definition {
        id,
        projectDefId,
        name,
        isCollection,
        instanciateByDefault,
        orderIndex,
        config { 
        	valueType {
            __typename
						... on IntFieldConfig {
              validator
            }
            ... on DecimalFieldConfig {
              validator
              precision
            }
            ... on StringFieldConfig {
              validator
              transforms
            }
            ... on BoolFieldConfig {
              validator
            }
            ... on StaticChoiceFieldConfig {
              validator
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
        valueType,
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
` 

export const FIND_PROJECT_DEFINITION_ROOT_SECTION_CONTAINERS = gql`
query findProjectDefinitionRootSectionContainers($id: ID!, $rootSectionId: ID!) {
  findProjectDefinitionRootSectionContainers(projectDefId: $id, rootSectionId: $rootSectionId) {
    roots {
      definition {
        id,
        projectDefId,
        name,
        isCollection,
        instanciateByDefault,
        orderIndex,
        config { 
        	valueType {
            __typename
						... on IntFieldConfig {
              validator
            }
            ... on DecimalFieldConfig {
              validator
              precision
            }
            ... on StringFieldConfig {
              validator
              transforms
            }
            ... on BoolFieldConfig {
              validator
            }
            ... on StaticChoiceFieldConfig {
              validator
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
        valueType,
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
        },
        path,
      },
      children {
        definition {
          id,
          projectDefId,
          name,
          isCollection,
          instanciateByDefault,
          orderIndex,
          config { 
            valueType {
              __typename
              ... on IntFieldConfig {
                validator
              }
              ... on DecimalFieldConfig {
                validator
                precision
              }
              ... on StringFieldConfig {
                validator
                transforms
              }
              ... on BoolFieldConfig {
                validator
              }
              ... on StaticChoiceFieldConfig {
                validator
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
          valueType,
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
          },
          path,
        }
        children {
          definition {
            id,
            projectDefId,
            name,
            isCollection,
            instanciateByDefault,
            orderIndex,
            config { 
              valueType {
                __typename
                ... on IntFieldConfig {
                  validator
                }
                ... on DecimalFieldConfig {
                  validator
                  precision
                }
                ... on StringFieldConfig {
                  validator
                  transforms
                }
                ... on BoolFieldConfig {
                  validator
                }
                ... on StaticChoiceFieldConfig {
                  validator
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
            valueType,
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
}
`

export const FIND_PROJECT_DEFINITION_FORM_CONTENT = gql`
query findProjectDefinitionFormContent($id: ID!, $formId: ID!) {
  findProjectDefinitionFormContent(projectDefId: $id, formId: $formId) {
    roots {
      definition {
        id,
        projectDefId,
        name,
        isCollection,
        instanciateByDefault,
        orderIndex,
        config { 
        	valueType {
            __typename
						... on IntFieldConfig {
              validator
            }
            ... on DecimalFieldConfig {
              validator
              precision
            }
            ... on StringFieldConfig {
              validator
              transforms
            }
            ... on BoolFieldConfig {
              validator
            }
            ... on StaticChoiceFieldConfig {
              validator
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
        valueType,
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
        path,
      },
      children {
         definition {
          id,
          projectDefId,
          name,
          isCollection,
          instanciateByDefault,
          orderIndex,
          config { 
            valueType {
              __typename
              ... on IntFieldConfig {
                validator
              }
              ... on DecimalFieldConfig {
                validator
                precision
              }
              ... on StringFieldConfig {
                validator
                transforms
              }
              ... on BoolFieldConfig {
                validator
              }
              ... on StaticChoiceFieldConfig {
                validator
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
          valueType,
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
          },
          path,
        },
        children {
          definition {
            id,
            projectDefId,
            name,
            isCollection,
            instanciateByDefault,
            orderIndex,
            config { 
              valueType {
                __typename
                ... on IntFieldConfig {
                  validator
                }
                ... on DecimalFieldConfig {
                  validator
                  precision
                }
                ... on StringFieldConfig {
                  validator
                  transforms
                }
                ... on BoolFieldConfig {
                  validator
                }
                ... on StaticChoiceFieldConfig {
                  validator
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
            valueType,
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
            },
            path,
          },
        }
      }
    }
  }
}
`
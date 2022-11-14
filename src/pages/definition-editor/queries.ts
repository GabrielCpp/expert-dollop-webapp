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
        cursor
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
          ordinal
          validator
          translations {
            helpTextName
            label
          }
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
            ... on StaticNumberFieldConfig {
              passToTranslation
              precision
              unit
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
          ordinal
          validator
          translations {
            helpTextName
            label
          }
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
            ... on StaticNumberFieldConfig {
              passToTranslation
              precision
              unit
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
            ordinal
            validator
            translations {
              helpTextName
              label
            }
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
              ... on StaticNumberFieldConfig {
                passToTranslation
                precision
                unit
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
      ordinal
      path
      validator
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
        ... on StaticNumberFieldConfig {
          passToTranslation
          precision
          unit
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
          ordinal
          validator
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
            ... on StaticNumberFieldConfig {
              passToTranslation
              precision
              unit
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
            ordinal
            validator
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
              ... on StaticNumberFieldConfig {
                passToTranslation
                precision
                unit
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
      ordinal
      path
      validator
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
      meta {
				isVisible
			}
      fieldDetails {
        __typename
        ... on IntFieldConfig  {
          unit
          integer
        }
        ... on DecimalFieldConfig {
          unit
          precision
          numeric
        }
        ... on StringFieldConfig  {
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
        ... on CollapsibleContainerFieldConfig {
          isCollapsible
        }
        ... on StaticNumberFieldConfig {
          passToTranslation
          precision
          unit
        }
      }
      translated {
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


export const UNITS = gql`
query units {
  units {
    id
  }
}
`

export const FIND_DEFINITION_FORMULA_FIELD_MIX = gql`
query findDefinitionFormulaFieldMix(
	$projectDefinitionId: ID!
	$query: String!
	$first: Int!
	$after: String
) {
	results: findDefinitionFormulaFieldMix(
		projectDefinitionId: $projectDefinitionId
		query: $query
		first: $first
		after: $after
	) {
		edges {
			node {
				id
				label: name
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
`

export const FIND_FORMULA = gql`
query findFormula($projectDefinitionId: ID!, $formulaId: ID!) {
	result: findFormula(projectDefinitionId: $projectDefinitionId, formulaId: $formulaId) {
		id
		label: name
	}
}
`

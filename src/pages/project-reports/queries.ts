import { gql } from "@apollo/client";

export const FIND_PROJECT_REPORT_WITH_DEFINITION = gql`
  query findProjectReportWithDefinition(
    $projectId: ID!
    $reportDefinitionId: ID!
  ) {
    findReportDefinition(reportDefinitionId: $reportDefinitionId) {
      id
      name
      structure {
        formulaAttribute {
          bucketName
          attributeName
        }
        formulaAttribute {
          bucketName
          attributeName
        }
        columns {
          name
          isVisible
          unitId
        }
      }
    }
    findProjectReport(
      projectId: $projectId
      reportDefinitionId: $reportDefinitionId
    ) {
      creationDateUtc
      stages {
        summary {
          label
          unit
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
        rows {
          nodeId
          formulaId
          elementDefId
          childReferenceId
          columns {
            unit
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
      summaries {
        label
        unit
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
`;

export const FIND_REPORT_DEFINITIONS_FROM_PROJECT_DETAILS = gql`
  query findReportDefinitionsFromProjectDetails($projectId: ID!) {
    findProjectDetails(id: $projectId) {
      reportDefinitions {
        id
        name
        structure {
          formulaAttribute {
            bucketName
            attributeName
          }
          formulaAttribute {
            bucketName
            attributeName
          }
          columns {
            name
            isVisible
            unitId
          }
        }
      }
    }
  }
`;

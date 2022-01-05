import { gql } from "@apollo/client";

export const FIND_PROJECT_REPORT = gql`
  query findProjectReport($projectId: ID!, $reportDefinitionId: ID!) {
    findProjectReport(
      projectId: $projectId
      reportDefinitionId: $reportDefinitionId
    ) {
      creationDateUtc
      stages {
        label
        summary {
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
        rows {
          nodeId
          formulaId
          orderIndex
          datasheetId
          elementId
          childReferenceId
          columns {
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
`;

export const FIND_REPORT_DEFINITION = gql`
  query findReportDefinition($reportDefinitionId: ID!) {
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
  }
`;

export const FIND_PROJECT_DEFINITION_REPORTS = gql`
  query findProjectDefinitionReports($projectDefId: ID!) {
    findReportDefinitions(projectDefId: $projectDefId) {
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
`;

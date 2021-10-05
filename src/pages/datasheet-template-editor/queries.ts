import { gql } from "@apollo/client";

export const FIND_DATASHEET_DEFINITIONS = gql`
  query findDatasheetDefinitions(
    $query: String!
    $first: Int!
    $after: String
  ) {
    findDatasheetDefinitions(query: $query, first: $first, after: $after) {
      edges {
        node {
          id
          name
          properties {
            name
            schema {
              valueValidator
            }
          }
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

export const FIND_DATASHEET_DEFINITION = gql`
  query findDatasheetDefinition($datasheetDefinitionId: ID!) {
    findDatasheetDefinition(datasheetDefinitionId: $datasheetDefinitionId) {
      name
      properties {
        name
        schema {
          valueValidator
        }
      }
    }
  }
`;

export const QUERY_DATASHEET_DEFINITION_ELEMENTS = gql`
  query queryDatasheetDefinitionElements(
    $query: String!
    $first: Int!
    $after: String
  ) {
    queryDatasheetDefinitionElements(
      query: $query
      first: $first
      after: $after
    ) {
      edges {
        node {
          id
          unitId
          isCollection
          datasheetDefId
          orderIndex
          name
          defaultProperties {
            name
            property {
              isReadonly
              value
            }
          }
          tags
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

import { gql } from "@apollo/client";

export const FIND_DATASHEETS = gql`
  query findDatasheets($query: String!, $first: Int!, $after: String) {
    findDatasheets(query: $query, first: $first, after: $after) {
      pageInfo {
        totalCount
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          name
          isStaged
          datasheetDefId
          fromDatasheetId
        }
        cursor
      }
    }
  }
`;

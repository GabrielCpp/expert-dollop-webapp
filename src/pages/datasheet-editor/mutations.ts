import { gql } from "@apollo/client";

export const CREATE_DATASHEET = gql`
  mutation createDatasheet($datasheet: DatasheetInput!) {
    createDatasheet(datasheet: $datasheet) {
      id
      name
      projectDefinitionId
      fromDatasheetId
    }
  }
`;

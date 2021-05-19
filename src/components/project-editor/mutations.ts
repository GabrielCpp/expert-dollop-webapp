import { gql } from "@apollo/client";

export const CREATE_PROJECT = gql`
  mutation createProject($projectDetails: ProjectDetailsInput!) {
    createProject(projectDetails: $projectDetails) {
      id
      name
      isStaged
      projectDefId
      datasheetId
    }
  }
`;

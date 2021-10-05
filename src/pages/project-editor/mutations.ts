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

export const UPDATE_FIELDS = gql`
  mutation updateFields($projectId: ID!, $updates: [FieldUpdateInput!]!) {
    updateProjectFields(projectId: $projectId, updates: $updates) {
      id
      projectId
      typePath
      typeId
      path
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
      label
    }
  }
`;

export const ADD_PROJECT_COLLECTION_ITEM = gql`
  mutation addProjectCollectionItem(
    $projectId: ID!
    $collectionTarget: ProjectNodeCollectionTargetInput!
  ) {
    addProjectCollectionItem(
      projectId: $projectId
      collectionTarget: $collectionTarget
    ) {
      id
      projectId
      typePath
      typeId
      path
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
      label
    }
  }
`;

export const CLONE_PROJECT_COLLECTION_ITEM = gql`
  mutation cloneProjectCollection($projectId: ID!, $collectionNodeId: ID!) {
    cloneProjectCollection(
      projectId: $projectId
      collectionNodeId: $collectionNodeId
    ) {
      id
      projectId
      typePath
      typeId
      path
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
      label
    }
  }
`;

import { gql } from "@apollo/client";

export const CURRENT_USER_QUERY = gql`
  query currentUser {
    currentUser {
      id
      permissions
      email
      oauthId
      organizationId
    }
  }
`;

import { gql } from "@apollo/client";

export const CREATE_SINGLE_USER_ORGANISATION = gql`
  mutation createSingleUserOrganization(
    $singleUserOrganization: NewSingleUserOrganizationInput!
  ) {
    createSingleUserOrganization(
      singleUserOrganization: $singleUserOrganization
    ) {
      oauthId
      id
      email
      permissions
      organizationId
    }
  }
`;

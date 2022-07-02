import { gql } from "@apollo/client";

export const CREATE_SINGLE_USER_ORGANISATION = gql`
  mutation createSingleUserOrganisation(
    $singleUserOrganisation: NewSingleUserOrganisationInput!
  ) {
    createSingleUserOrganisation(
      singleUserOrganisation: $singleUserOrganisation
    ) {
      oauthId
      id
      email
      permissions
      organisationId
    }
  }
`;

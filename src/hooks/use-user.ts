import { useCurrentUserQuery, User } from "../generated";

export const NonExistentUser: User = Object.freeze({
  email: "",
  id: "",
  oauthId: "",
  organizationId: "",
  permissions: [],
});

export function useUser(): User {
  const { data } = useCurrentUserQuery({
    fetchPolicy: "cache-only",
  });

  return (data?.currentUser as User | undefined) || NonExistentUser;
}

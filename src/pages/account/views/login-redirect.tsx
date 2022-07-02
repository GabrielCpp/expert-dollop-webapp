import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

export function LoginRedirect() {
  const { loginWithRedirect } = useAuth0();

  useEffect(() => {
    loginWithRedirect();
  });

  return null;
}

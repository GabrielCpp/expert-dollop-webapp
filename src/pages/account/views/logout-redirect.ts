import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

export function LogoutRedirect() {
  const { logout } = useAuth0();

  useEffect(() => {
    logout({ returnTo: window.location.origin });
  });

  return null;
}

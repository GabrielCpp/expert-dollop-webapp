import { useState } from "react";
import { useServices } from "../../../services-def";

export function AuthTokenView() {
  const { auth0 } = useServices();
  const [token, setToken] = useState<string | undefined>(undefined);
  const [error, setError] = useState<Error | undefined>(undefined);

  auth0.getToken().then(setToken).catch(setError);

  if (error !== undefined) {
    return <div>Error while getting token: {error}</div>;
  }

  if (token === "" || token === undefined) {
    return <div>No Token</div>;
  }

  return <textarea value={token} readOnly></textarea>;
}

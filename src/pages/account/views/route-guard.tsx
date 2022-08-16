import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Services, useServices } from "../../../services-def";

export type AuthentificationCheck = (s: Services) => Promise<boolean>;

const bindyChecks =
  (
    history: ReturnType<typeof useHistory>,
    s: Services,
    setDone: (v: boolean) => void
  ) =>
  async (checks: [string, AuthentificationCheck][]) => {
    for (const [url, check] of checks) {
      if ((await check(s)) && url !== window.location.pathname) {
        console.log("Redirect to ", url, " from ", window.location.href);
        history.push(url);
        break;
      }
    }

    setDone(true);
  };

export function RouteGuard({
  children: Children,
  checks,
  loader,
}: {
  children: JSX.Element;
  loader: JSX.Element;
  checks: [string, AuthentificationCheck][];
}): JSX.Element {
  const s = useServices();
  const history = useHistory();
  const [done, setDone] = useState<boolean>(false);

  useEffect(() => {
    bindyChecks(history, s, setDone)(checks);
  });

  if (done === false) {
    return loader;
  }

  return Children;
}

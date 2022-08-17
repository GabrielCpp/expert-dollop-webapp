import { useHistory } from "react-router-dom";
import { Services, useServices } from "../../../services-def";
import { useAsync } from "react-use";

export type RouteCheck = (s: Services) => Promise<boolean>;
export type RedirectChecks = [string | false, RouteCheck][];

const bindyChecks =
  (history: ReturnType<typeof useHistory>, s: Services) =>
  async (checks: RedirectChecks) => {
    for (const [url, check] of checks) {
      const succeed = await check(s);

      if (succeed) {
        if (url !== window.location.pathname && url !== false) {
          console.log("Redirect to ", url, " from ", window.location.href);
          history.push(url);
        }

        break;
      }
    }
  };

export function RouteGuard({
  children: Children,
  checks,
  loader,
}: {
  children: JSX.Element;
  loader: JSX.Element;
  checks: RedirectChecks;
}): JSX.Element {
  const s = useServices();
  const history = useHistory();
  const state = useAsync(
    () => bindyChecks(history, s)(checks),
    [history, s, checks]
  );

  if (state.error) {
    s.loader.onError(state.error);
    return loader;
  }

  if (state.loading === true) {
    return loader;
  }

  return Children;
}

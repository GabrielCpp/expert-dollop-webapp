import { isEqual } from "lodash";
import { useEffect, useState } from "react";
import { matchPath, useHistory } from "react-router-dom";
import { useServices } from "../../service-context";
import { ComponentRouteMatching, NamedRoutes } from "../named-route";

export function matchingRoute(
  matchingComponent: ComponentRouteMatching
): boolean {
  return (
    matchPath(window.location.pathname, {
      path: matchingComponent.path,
      exact: matchingComponent.exact,
      strict: true,
    }) !== null
  );
}

interface ComponentMatcherHook {
  matchingComponents: ComponentRouteMatching[];
  hasMatch: boolean;
}

export function useComponentMatcher(
  tag: string,
  permissions: string[]
): ComponentMatcherHook {
  const history = useHistory();
  const { routes } = useServices<{ routes: NamedRoutes }>();
  const [matchingComponents, setMatchingComponents] = useState(
    routes.allHavingTag(tag, permissions).filter(matchingRoute)
  );
  const [hasMatch, setHasMatch] = useState(matchingComponents.length > 0);

  useEffect(() => {
    const toogleToolbarItems = () => {
      const currentMatchingComponents = routes
        .allHavingTag(tag, permissions)
        .filter(matchingRoute);

      if (!isEqual(matchingComponents, currentMatchingComponents)) {
        setMatchingComponents(currentMatchingComponents);
        setHasMatch(currentMatchingComponents.length > 0);
      }
    };

    return history.listen(toogleToolbarItems);
  }, [history, routes, matchingComponents, tag, permissions]);

  return { hasMatch, matchingComponents };
}

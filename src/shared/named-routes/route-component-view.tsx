import { Route, Switch } from "react-router-dom";

import { useServices } from "../../services-def";
import { ComponentRouteMatching, NamedRoutes } from "./named-route";

interface MatchingRoutesProps {
  tag: string;
  firstMatch?: boolean;
}

export function MatchingRoutes({
  tag,
  firstMatch = false,
}: MatchingRoutesProps) {
  const { routes, auth0 } = useServices();

  const matchs = routes
    .allHavingTag(tag, auth0.user.permissions)
    .map((matchingComponent) => renderNamedRoute(routes, matchingComponent));

  if (firstMatch) {
    return <Switch>{matchs}</Switch>;
  }

  return <>{matchs}</>;
}

export function renderNamedRoute(
  routes: NamedRoutes,
  matchingComponent: ComponentRouteMatching,
  backRouteName?: string,
  params?: Record<string, string>
) {
  const Component = matchingComponent.component;
  const route = routes.getRouteByName(matchingComponent.name);

  return (
    <Route path={route.path} key={route.name} exact={matchingComponent.exact}>
      {Component && (
        <Component
          returnUrl={backRouteName && routes.render(backRouteName, params)}
        />
      )}
    </Route>
  );
}

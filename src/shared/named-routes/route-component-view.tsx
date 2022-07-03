import { Route, Switch } from "react-router-dom";
import { useUser } from "../../hooks/use-user";

import { useServices } from "../../services-def";
import { ComponentRouteMatching, NamedRoutes } from "./named-route";

interface MatchingRoutesProps {
  tag: string;
  firstMatch?: boolean;
  completeAction: () => Promise<unknown>;
}

export function MatchingRoutes({
  tag,
  firstMatch = false,
  completeAction,
}: MatchingRoutesProps) {
  const { routes } = useServices();
  const user = useUser();

  const matchs = routes
    .allHavingTag(tag, user.permissions)
    .map((matchingComponent) =>
      renderNamedRoute(routes, matchingComponent, completeAction)
    );

  if (firstMatch) {
    return <Switch>{matchs}</Switch>;
  }

  return <>{matchs}</>;
}

export function renderNamedRoute(
  routes: NamedRoutes,
  matchingComponent: ComponentRouteMatching,
  completeAction?: () => Promise<unknown>
) {
  const Component = matchingComponent.component;
  const route = routes.getRouteByName(matchingComponent.name);

  return (
    <Route path={route.path} key={route.name} exact={matchingComponent.exact}>
      {Component && <Component completeAction={completeAction} />}
    </Route>
  );
}

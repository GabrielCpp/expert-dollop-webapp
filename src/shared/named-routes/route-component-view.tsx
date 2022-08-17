import { Route, Switch } from "react-router-dom";
import { useServices } from "../../services-def";
import { ComponentRouteMatching, NamedRoutes } from "./named-route";
import { useObservable } from "react-use";

interface MatchingRoutesProps {
  tag: string;
  firstMatch?: boolean;
  completeAction?: () => Promise<unknown>;
}

export function MatchingRoutes({
  tag,
  firstMatch = false,
  completeAction,
}: MatchingRoutesProps) {
  const { routes, auth0 } = useServices();
  const user = useObservable(auth0.observeCurrentUser(), auth0.currentUser);

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

import { Route } from "react-router-dom";
import { NamedRoutes } from "./named-route";

export function renderNamedRoute(
  routes: NamedRoutes,
  routeName: string,
  backRouteName: string,
  params?: Record<string, string>
) {
  const route = routes.getRouteByName(routeName);
  const Component = route.component;

  return (
    <Route path={route.path} key={routeName} exact={route.exact}>
      {Component && (
        <Component returnUrl={routes.render(backRouteName, params)} />
      )}
    </Route>
  );
}

import { Route } from "react-router-dom";
import { NamedRoutes } from "./named-route";

export function renderNamedRoute(
  routes: NamedRoutes,
  routeName: string,
  backRouteName: string,
  params?: Record<string, string>
) {
  const Component = routes.getRouteByName(routeName).component;
  return (
    <Route path={routes.getUrl(routeName)}>
      {Component && (
        <Component returnUrl={routes.render(backRouteName, params)} />
      )}
    </Route>
  );
}

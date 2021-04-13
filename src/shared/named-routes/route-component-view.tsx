import React from "react";
import { Route } from "react-router-dom";
import { useServices } from "../service-context";
import { useNavigate, RouteService } from "./named-route";

interface RouteComponentViewProps {
  routeName: string;
  backRouteName: string;
  params?: Record<string, string>;
}

export function RouteComponentView({
  routeName,
  backRouteName,
  params,
}: RouteComponentViewProps) {
  const { routes } = useServices<RouteService>();
  const { navigate } = useNavigate();
  const Component = routes.getRouteByName(routeName).component;

  function navigateBack() {
    navigate(backRouteName, params);
  }

  return (
    <Route path={routes.getUrl(routeName)}>
      {Component && <Component navigateBack={navigateBack} />}
    </Route>
  );
}

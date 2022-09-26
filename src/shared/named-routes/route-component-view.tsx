import {
  matchPath,
  Route,
  RouteComponentProps,
  Switch,
  withRouter,
} from "react-router-dom";
import { useServices } from "../../services-def";
import { ComponentRouteMatching } from "./named-route";
import { useObservable } from "react-use";
import { ReactNode } from "react";

interface MatchingRoutesProps extends RouteComponentProps<any> {
  tag: string;
  firstMatch?: boolean;
  completeAction?: () => Promise<unknown>;
  displayWhenNoMatch?: boolean;
  children?: JSX.Element | JSX.Element[];
  wrapComponent?: (c: ComponentRouteMatching, e: JSX.Element) => JSX.Element;
  overlay?: (p: { children: ReactNode }) => JSX.Element;
}

function MatchingRoutes({
  tag,
  firstMatch = false,
  displayWhenNoMatch = true,
  location,
  overlay: Overlay,
  wrapComponent,
  completeAction,
  children,
}: MatchingRoutesProps) {
  const { routes, auth0 } = useServices();
  const user = useObservable(auth0.observeCurrentUser(), auth0.currentUser);
  const matchs = routes
    .allHavingTag(tag, user.permissions)
    .filter((c) => matchingRoute(location.pathname, c));

  if (displayWhenNoMatch === false && matchs.length === 0) {
    return null;
  }

  let components = matchs.map((matchingComponent) =>
    renderNamedRoute(matchingComponent, completeAction, wrapComponent)
  );

  let overlays = [];
  if (Overlay !== undefined) {
    overlays.push(Overlay);
  }
  if (firstMatch) {
    overlays.push(Switch);
  }

  if (overlays.length === 0) {
    return (
      <>
        {components}
        {children}
      </>
    );
  }

  let layout = null;
  for (const Wrapper of overlays.reverse()) {
    if (layout === null) {
      layout = (
        <Wrapper>
          {components}
          {children}
        </Wrapper>
      );
    } else {
      layout = <Wrapper>{layout}</Wrapper>;
    }
  }

  return layout;
}

export function matchingRoute(
  pathname: string,
  matchingComponent: ComponentRouteMatching
): boolean {
  return (
    matchPath(pathname, {
      path: matchingComponent.path,
      exact: matchingComponent.exact,
      strict: true,
    }) !== null
  );
}

function renderNamedRoute(
  matchingComponent: ComponentRouteMatching,
  completeAction?: () => Promise<unknown>,
  wrapComponent?: (c: ComponentRouteMatching, e: JSX.Element) => JSX.Element
) {
  const Component = matchingComponent.component;
  if (wrapComponent === undefined) {
    wrapComponent = (_, e) => e;
  }

  return (
    <Route
      path={matchingComponent.path}
      key={`${matchingComponent.name}-${Component.name}`}
      exact={matchingComponent.exact}
    >
      {wrapComponent(
        matchingComponent,
        <Component completeAction={completeAction} />
      )}
    </Route>
  );
}

export const RouteBinding = withRouter(MatchingRoutes);

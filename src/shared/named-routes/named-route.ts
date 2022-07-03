import { buildRelativeUrl } from "../async-cursor";

export interface RouteService {
  routes: NamedRoutes;
}

export interface NamedRoute {
  name: string;
  path: string;
  requiredPermissions?: string[];
}

export interface ComponentMatching {
  exact?: boolean;
  component: (props: {
    completeAction?: () => Promise<unknown>;
  }) => JSX.Element | null;
  tags: string[];
  requiredPermissions?: string[];
}

export interface NamedRouteDefinition extends NamedRoute {
  components: ComponentMatching[];
}

export type ComponentRouteMatching = ComponentMatching & NamedRoute;
export type NamedRouteRecord = Record<string, unknown>;

export class NamedRoutes {
  private _routes = new Map<string, NamedRouteDefinition>();

  public static arePermissionsSatisfied(
    userPermissions: string[],
    routeRequiredPermissions?: string[]
  ): boolean {
    if (
      routeRequiredPermissions === undefined ||
      routeRequiredPermissions.length === 0
    ) {
      return true;
    }

    return routeRequiredPermissions.every((permission) =>
      userPermissions.includes(permission)
    );
  }

  public constructor(routes: NamedRouteDefinition[]) {
    routes.forEach((route) => this._routes.set(route.name, route));
  }

  public getRouteByName(name: string): NamedRouteDefinition {
    const route = this._routes.get(name);

    if (route === undefined) {
      throw new Error(`No route named ${name}`);
    }

    return route;
  }

  public getUrl(name: string): string {
    const route = this._routes.get(name);

    if (route === undefined) {
      throw new Error(`Route with name ${name} does not exists.`);
    }

    return route.path;
  }

  public isAccessible(routeName: string, userPermissions: string[]): boolean {
    const route = this.getRouteByName(routeName);

    return NamedRoutes.arePermissionsSatisfied(
      userPermissions,
      route.requiredPermissions
    );
  }

  public allHavingTag(
    tag: string,
    userPermissions: string[]
  ): ComponentRouteMatching[] {
    const routes: ComponentRouteMatching[] = [];

    for (const route of this._routes.values()) {
      const isUserAllowedToSeeRoute = NamedRoutes.arePermissionsSatisfied(
        userPermissions,
        route.requiredPermissions
      );

      for (const componentMatcher of route.components) {
        const hasTag = componentMatcher.tags.includes(tag);
        const isComponentAccessible = NamedRoutes.arePermissionsSatisfied(
          userPermissions,
          componentMatcher.requiredPermissions
        );

        if (hasTag && isUserAllowedToSeeRoute && isComponentAccessible) {
          routes.push({
            ...route,
            ...componentMatcher,
          });
        }
      }
    }

    return routes;
  }

  public render(
    name: string,
    params: Record<string, string> = {},
    queries: Record<string, string | number> = {}
  ): string {
    let url = this.getUrl(name);

    for (const [key, value] of Object.entries(params)) {
      url = url.replace(`:${key}`, String(value));
    }

    return buildRelativeUrl(url, queries);
  }

  public get all(): NamedRouteDefinition[] {
    return Array.from(this._routes.values());
  }

  public add(route: NamedRouteDefinition) {
    this._routes.set(route.name, route);
  }

  public addAll(routes: NamedRouteDefinition[]) {
    routes.forEach((route) => this._routes.set(route.name, route));
  }

  public remove(name: string) {
    this._routes.delete(name);
  }
}

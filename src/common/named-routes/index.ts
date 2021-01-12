import { uniq } from "lodash";
import { useHistory } from "react-router-dom";
import { useInject } from "../container-context";

export interface NamedRoute {
    name: string;
    path: string;
    component: React.ReactNode
    tags: string[]
}

export type NamedRouteRecord = Record<string, unknown>

export class NamedRoutes {
    private _routes = new Map<string, NamedRoute>();

    public constructor(routes: NamedRoute[]) {
        routes.forEach(route => this._routes.set(route.name, route));
    }


    public allPrefixed(prefix: string): NamedRoute[] {
        const routes: NamedRoute[] = [];

        for(const [name, route] of this._routes.entries()) {
            if(name.startsWith(prefix)) {
                routes.push(route);
            }
        }

        return routes;
    }

    public allHavingTag(prefix: string): NamedRoute[] {
        const routes: NamedRoute[] = [];

        for(const route of this._routes.values()) {
            if(route.tags.includes(prefix)) {
                routes.push(route);
            }
        }

        return routes;
    }

    public tag(name: string, tags: string[]): void {
        const route = this._routes.get(name);

        if(route !== undefined) {
            route.tags = uniq([...route.tags, ...tags])
        }
    }

    public getUrl(name: string): string {
        const route = this._routes.get(name);

        if(route === undefined) {
            throw new Error(`Route with name ${name} does not exists.`);
        }

        return route.path;
    }

    public render(name: string, params: Record<string, unknown>={}): string {
        let url = this.getUrl(name);

        for(const [key, value] of Object.entries(params)) {
            url = url.replace(`:${key}`, String(value));
        }

        return url;
    }

    public get routes() : NamedRoute[] {
        return Array.from(this._routes.values());
    }

    public add(route: NamedRoute) {
        this._routes.set(route.name, route);
    }

    public addAll(routes: NamedRoute[]) {
        routes.forEach(route => this._routes.set(route.name, route));
    }

    public remove(name: string) {
        this._routes.delete(name);
    }
}

export function useNavigate(): { navigate: (routeName: string,  params?: Record<string, string>) => void } {
    const history = useHistory();
    const namedRoute = useInject(NamedRoutes)

    function navigate(routeName: string,  params: Record<string, unknown>={}) {
        const path = namedRoute.render(routeName, params);
        history.push(path);        
    }
    
    return {
        navigate
    }
}
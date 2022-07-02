import { NamedRouteDefinition } from "../../shared/named-routes";
import { Registration } from "./views/registration";
import { AuthTokenView } from "./views/token-view";

export const VIEW_AUTH_TOKEN = "VIEW_AUTH_TOKEN";

export const routes: NamedRouteDefinition[] = [
  {
    name: VIEW_AUTH_TOKEN,
    path: "/token",
    components: [
      {
        component: AuthTokenView,
        tags: ["main-content"],
        exact: true,
      },
      {
        component: Registration,
        tags: ["main-content"],
        exact: true,
      },
    ],
  },
];

import { NamedRouteDefinition } from "../../shared/named-routes";
import { Registration } from "./views/registration";
import { AuthTokenView } from "./views/token-view";

export const ACCOUNT_AUTH_TOKEN = "ACCOUNT_AUTH_TOKEN";
export const ACCOUNT_REGISTRATION = "ACCOUNT_REGISTRATION";

export const routes: NamedRouteDefinition[] = [
  {
    name: ACCOUNT_AUTH_TOKEN,
    path: "/token",
    components: [
      {
        component: AuthTokenView,
        tags: ["main-content"],
        exact: true,
      },
    ],
  },

  {
    name: ACCOUNT_REGISTRATION,
    path: "/registration",
    components: [
      {
        component: Registration,
        tags: ["main-content"],
        exact: true,
      },
    ],
  },
];

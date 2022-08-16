import { NamedRouteDefinition } from "../../shared/named-routes";
import { Registration } from "./views/registration";

export const ACCOUNT_REGISTRATION = "ACCOUNT_REGISTRATION";

export const routes: NamedRouteDefinition[] = [

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

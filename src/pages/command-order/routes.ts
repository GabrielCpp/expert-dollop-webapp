import { NamedRouteDefinition } from "../../shared/named-routes";
import { ViewOrderToolbar } from "./toolbars/views-orders-toolbar";
import { OrderView } from "./views/order-view";

export const VIEW_COMMAND_ORDERS = "VIEW_COMMAND_ORDERS";
export const COMMAND_ORDERS_TOOLBAR = "COMMAND_ORDERS_TOOLBAR";

export const routes: NamedRouteDefinition[] = [
  {
    name: COMMAND_ORDERS_TOOLBAR,
    path: "/projects/:projectId/:selectedPath",
    components: [
      { component: ViewOrderToolbar, exact: false, tags: ["main-toolbar"] },
    ],
  },
  {
    name: VIEW_COMMAND_ORDERS,
    path: "/projects/:projectId/:selectedPath/distributable/:reportDefinitionId",
    components: [
      { component: OrderView, exact: false, tags: ["main-content"] },
    ],
  },
];



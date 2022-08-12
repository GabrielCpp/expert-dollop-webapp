import { NamedRouteDefinition } from "../../shared/named-routes";
import { OrderView } from "../command-order";
import { ReportToolbar } from "./toolbars/report-toolbar";
import { Report } from "./views/report";

export const PROJECT_REPORT_TOOLBAR = "PROJECT_REPORT_TOOLBAR";
export const PROJECT_REPORT = "PROJECT_REPORT";
export const VIEW_COMMAND_ORDERS = "VIEW_COMMAND_ORDERS";

export const routes: NamedRouteDefinition[] = [
  {
    name: PROJECT_REPORT_TOOLBAR,
    path: "/projects/:projectId/:selectedPath",
    components: [
      { component: ReportToolbar, exact: false, tags: ["main-toolbar"] },
    ],
  },
  {
    name: PROJECT_REPORT,
    path: "/projects/:projectId/:selectedPath/report/:reportDefinitionId",
    components: [{ component: Report, exact: false, tags: ["main-content"] }],
  },
  {
    name: VIEW_COMMAND_ORDERS,
    path: "/projects/:projectId/:selectedPath/orders",
    components: [
      { component: OrderView, exact: false, tags: ["main-content"] },
    ],
  },
];

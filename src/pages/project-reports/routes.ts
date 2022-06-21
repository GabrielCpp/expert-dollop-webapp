import { NamedRoute } from "../../shared/named-routes";
import { OrderView } from "../command-order";
import { ReportToolbar } from "./toolbars/report-toolbar";
import { Report } from "./views/report";

export const PROJECT_REPORT_TOOLBAR = "PROJECT_REPORT_TOOLBAR";
export const PROJECT_REPORT = "PROJECT_REPORT";
export const VIEW_COMMAND_ORDERS = "VIEW_COMMAND_ORDERS";

export const routes: NamedRoute[] = [
  {
    name: PROJECT_REPORT_TOOLBAR,
    path: "/project/:projectId/:selectedPath",
    component: ReportToolbar,
    exact: false,
    tags: ["main-toolbar"],
  },
  {
    name: PROJECT_REPORT,
    path: "/project/:projectId/:selectedPath/report/:reportDefinitionId",
    component: Report,
    exact: false,
    tags: ["main-content"],
  },
  {
    name: VIEW_COMMAND_ORDERS,
    path: "/project/:projectId/:selectedPath/orders",
    component: OrderView,
    exact: false,
    tags: ["main-content"],
  },
];

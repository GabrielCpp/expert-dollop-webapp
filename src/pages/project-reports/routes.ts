import { NamedRoute } from "../../shared/named-routes";
import { ReportToolbar } from "./toolbars/report-toolbar";

export const PROJECT_REPORT_TOOLBAR = "PROJECT_REPORT_TOOLBAR";

export const routes: NamedRoute[] = [
  {
    name: PROJECT_REPORT_TOOLBAR,
    path: "/project/:projectId/:selectedPath",
    component: ReportToolbar,
    exact: false,
    tags: ["main-toolbar"],
  },
];

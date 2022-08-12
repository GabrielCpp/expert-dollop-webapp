import { NamedRouteDefinition } from "../../shared/named-routes";
import { ReportToolbar } from "./toolbars/report-toolbar";
import { Report } from "./views/report";

export const PROJECT_REPORT_TOOLBAR = "PROJECT_REPORT_TOOLBAR";
export const PROJECT_REPORT = "PROJECT_REPORT";

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

];

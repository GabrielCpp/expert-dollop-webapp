import { NamedRoute } from "../../shared/named-routes";
import { AddContainerView } from "./views/add-node-view";

export const ADD_PROJECT_SECTION_ROUTE_NAME = "add_project_section";
export const CONTAINER_VIEW_ROUTE_NAME = "container_view";
export const PROJECT_DEFINITION_TRANSLATION = "project_defintion_translation";

export const routes: NamedRoute[] = [
  {
    name: CONTAINER_VIEW_ROUTE_NAME,
    path: "/project_definition_editor/:projectDefinitionId/:selectedPath",
    tags: ["main-content"],
  },
  {
    name: ADD_PROJECT_SECTION_ROUTE_NAME,
    path:
      "/project_definition_editor/:projectDefinitionId/:selectedPath/add_section",
    component: AddContainerView,
    tags: ["main-content"],
  },
  {
    name: PROJECT_DEFINITION_TRANSLATION,
    path: "/api/translation/:ressourceId/:locale",
    tags: [],
  },
];

export function buildLinkFor(projectDefinitionId: string) {
  return (...path: string[]) => {
    const selectedPath = encodeURI(`~${path.join("~")}`);
    return `/project_definition_editor/${projectDefinitionId}/${selectedPath}`;
  };
}

export function splitPath(path: string): string[] {
  return (path || "")
    .trim()
    .split("~")
    .filter((x) => x !== "");
}

export function buildPath(path: string[]): string {
  return `~${path.join("~")}`;
}

import { NamedRoute } from "../../shared/named-routes";
import { AddContainerView } from "./views/add-node-view";
import { EditorLayout } from "./views/editor-layout";
import { ProjectDefinitionHome } from "./views/home";

export const PROJECT_DEFINITION_EDITOR_HOME = "project_definition_editor_home";
export const PROJECT_DEFINITION_EDITOR_MAIN = "project_definition_editor_main";
export const ADD_PROJECT_SECTION_ROUTE_NAME = "add_project_section";
export const PROJECT_DEFINITION_TRANSLATION = "project_defintion_translation";

export const routes: NamedRoute[] = [
  {
    name: PROJECT_DEFINITION_EDITOR_HOME,
    path: "/project_definition_editor",
    component: ProjectDefinitionHome,
    exact: true,
    tags: ["main-content"],
  },
  {
    name: PROJECT_DEFINITION_EDITOR_MAIN,
    path: "/project_definition_editor/:projectDefinitionId/:selectedPath",
    component: EditorLayout,
    tags: ["main-content"],
  },
  {
    name: ADD_PROJECT_SECTION_ROUTE_NAME,
    path:
      "/project_definition_editor/:projectDefinitionId/:selectedPath/add_section",
    component: AddContainerView,
    tags: ["project-definition-view"],
  },
  {
    name: PROJECT_DEFINITION_TRANSLATION,
    path: "/api/translation/:ressourceId/:locale",
    tags: ["api"],
  },
];

export function buildLinkFor(projectDefinitionId: string, ...path: string[]) {
  const selectedPath = encodeURI(`~${path.join("~")}`);
  return `/project_definition_editor/${projectDefinitionId}/${selectedPath}`;
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

import { NamedRoute } from "../../shared/named-routes";
import { AddContainerView, EditContainerView } from "./views/add-node-view";
import { EditorLayout } from "./views/project-def-editor";
import { ProjectDefinitionHome } from "./views/home";

export const PROJECT_DEFINITION_EDITOR_HOME = "PROJECT_DEFINITION_EDITOR_HOME";
export const PROJECT_DEFINITION_EDITOR_MAIN = "PROJECT_DEFINITION_EDITOR_MAIN";
export const PROJECT_DEFINITION_EDITOR_NODE_ADD =
  "PROJECT_DEFINITION_EDITOR_NODE_ADD";
export const PROJECT_DEFINITION_EDITOR_NODE_EDIT =
  "PROJECT_DEFINITION_EDITOR_NODE_EDIT";

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
    name: PROJECT_DEFINITION_EDITOR_NODE_ADD,
    path: "/project_definition_editor/:projectDefinitionId/:selectedPath/add",
    component: AddContainerView,
    tags: ["project-definition-view"],
  },
  {
    name: PROJECT_DEFINITION_EDITOR_NODE_EDIT,
    path:
      "/project_definition_editor/:projectDefinitionId/:selectedPath/edit/:nodeId",
    component: EditContainerView,
    tags: ["project-definition-view"],
  },
];

export function buildLinkFor(projectDefinitionId: string, ...path: string[]) {
  const selectedPath = encodeURI(`~${path.join("~")}`);
  return `/project_definition_editor/${projectDefinitionId}/${selectedPath}`;
}

export function buildAddNodeParams(
  projectDefinitionId: string,
  path: string[]
) {
  const selectedPath = encodeURI(`~${path.join("~")}`);
  return {
    projectDefinitionId,
    selectedPath,
  };
}

export function buildEditNodeParams(
  projectDefinitionId: string,
  path: string[],
  nodeId: string
) {
  const selectedPath = encodeURI(`~${path.join("~")}`);
  return {
    projectDefinitionId,
    selectedPath,
    nodeId,
  };
}
export function splitPath(path: string): string[] {
  return (path || "")
    .trim()
    .split("~")
    .filter((x) => x !== "");
}

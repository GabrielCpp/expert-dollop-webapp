import { NamedRoute } from "../../shared/named-routes";
import { ProjectSearchHome } from "./views/home";
import { ProjectEditor } from "./views/project-editor";

export const PROJECT_EDITOR_HOME = "project_editor_home";
export const PROJECT_EDITOR = "project_editor";

export const routes: NamedRoute[] = [
  {
    name: PROJECT_EDITOR_HOME,
    path: "/project",
    component: ProjectSearchHome,
    exact: true,
    tags: ["main-content"],
  },
  {
    name: PROJECT_EDITOR,
    path: "/project/:projectId/:selectedPath",
    component: ProjectEditor,
    exact: true,
    tags: ["main-content"],
  },
];

export function buildLinkFor(projectDefinitionId: string, ...path: string[]) {
  const selectedPath = encodeURI(`~${path.join("~")}`);
  return `/project/${projectDefinitionId}/${selectedPath}`;
}

export function splitPath(path: string): string[] {
  return (path || "")
    .trim()
    .split("~")
    .filter((x) => x !== "");
}

import { NamedRoute } from "../../shared/named-routes";
import { HomeToolbar } from "./toolbars/home-toolbar";
import { AddProjectView } from "./views/add-project-view";
import { ProjectSearchHome } from "./views/home";
import { ProjectEditor } from "./views/project-editor";
import RootSectionCollectionPicker from "./views/root-section-collection-picker";

export const PROJECT_EDITOR_HOME = "project_editor_home";
export const PROJECT_EDITOR = "project_editor";
export const PROJECT_HOME_TOOLBAR = "PROJECT_HOME_TOOLBAR";
export const ADD_PROJECT_VIEW = "ADD_PROJECT_VIEW";
export const PROJECT_EDITOR_PICK_ROOT_COLLECTION =
  "PROJECT_EDITOR_PICK_ROOT_COLLECTION";

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
  {
    name: PROJECT_HOME_TOOLBAR,
    path: "/project",
    component: HomeToolbar,
    exact: true,
    tags: ["main-toolbar"],
  },
  {
    name: ADD_PROJECT_VIEW,
    path: "/project/add",
    component: AddProjectView,
    exact: true,
    tags: ["main-content"],
  },
  {
    name: PROJECT_EDITOR_PICK_ROOT_COLLECTION,
    path: "/project/:projectId/:rootTypeId/collection",
    component: RootSectionCollectionPicker,
    exact: true,
    tags: ["main-content"],
  },
];

export function buildLinkToProjectPath(
  projectDefinitionId: string,
  ...path: string[]
) {
  const selectedPath = encodeURI(`~${path.join("~")}`);
  return `/project/${projectDefinitionId}/${selectedPath}`;
}

export function buildLinkToProjectCollection(
  projectDefinitionId: string,
  rootTypeId: string
) {
  return `/project/${projectDefinitionId}/${rootTypeId}/collection`;
}

export function splitPath(path: string): string[] {
  return (path || "")
    .trim()
    .split("~")
    .filter((x) => x !== "");
}

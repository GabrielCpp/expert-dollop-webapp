import { NamedRouteDefinition } from "../../shared/named-routes";
import { ProjectIndexDrawerItemLink } from "./drawers/project-index-drawer-item-link";
import { HomeToolbar } from "./toolbars/home-toolbar";
import { AddProjectView } from "./views/add-project-view";
import { ProjectSearchHome } from "./views/home";
import { ProjectEditor } from "./views/project-editor";
import RootSectionCollectionPicker from "./views/root-section-collection-picker";

export const PROJECT_INDEX = "PROJECT_INDEX";
export const PROJECT_EDITOR = "project_editor";
export const PROJECT_HOME_TOOLBAR = "PROJECT_HOME_TOOLBAR";
export const ADD_PROJECT_VIEW = "ADD_PROJECT_VIEW";
export const PROJECT_EDITOR_PICK_ROOT_COLLECTION =
  "PROJECT_EDITOR_PICK_ROOT_COLLECTION";
  
export const routes: NamedRouteDefinition[] = [
  {
    name: "PROJECT_ROOT",
    path: "/",
    components: [
      {
        component: ProjectIndexDrawerItemLink,
        tags: ["main-drawer"],
      },
    ],
    requiredPermissions: ["project:get"]
  },
  {
    name: PROJECT_INDEX,
    path: "/projects",
    components: [
      {
        component: ProjectSearchHome,
        exact: true,
        tags: ["main-content"],
        requiredPermissions: ["project:get"],
      },
      {
        component: HomeToolbar,
        exact: true,
        tags: ["main-toolbar"],
      },
    ],
  },
  {
    name: PROJECT_EDITOR,
    path: "/projects/:projectId/:selectedPath",
    components: [
      {
        component: ProjectEditor,
        exact: true,
        tags: ["main-content"],
      },
    ],
  },

  {
    name: ADD_PROJECT_VIEW,
    path: "/projects/add",
    components: [
      {
        component: AddProjectView,
        exact: true,
        tags: ["main-content"],
      },
    ],
  },
  {
    name: PROJECT_EDITOR_PICK_ROOT_COLLECTION,
    path: "/projects/:projectId/:rootTypeId/collection",
    components: [
      {
        component: RootSectionCollectionPicker,
        exact: true,
        tags: ["main-content"],
      },
    ],
  },
];

export function buildLinkToProjectPath(
  projectDefinitionId: string,
  ...path: string[]
) {
  const selectedPath = encodeURI(`~${path.join("~")}`);
  return `/projects/${projectDefinitionId}/${selectedPath}`;
}

export function buildLinkToProjectCollection(
  projectDefinitionId: string,
  rootTypeId: string
) {
  return `/projects/${projectDefinitionId}/${rootTypeId}/collection`;
}

export function splitPath(path: string): string[] {
  return (path || "")
    .trim()
    .split("~")
    .filter((x) => x !== "");
}

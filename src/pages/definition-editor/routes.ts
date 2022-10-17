import { NamedRouteDefinition, NamedRoutes } from "../../shared/named-routes";
import { AddContainerView } from "./views/node-creation";
import { EditContainerView } from "./views/node-edition";
import { EditorLayout } from "./views/project-def-editor";
import { ProjectDefinitionHome } from "./views/home";
import { EditFormulas } from "./toolbars/edit-formulas";
import { FormulasSearch } from "./views/formulas-search";
import { DefinitionIndexDrawerItemLink } from "./drawers/definition-index-drawer-item-link";
import { RootSectionActionsToolbar } from "./toolbars/root-section-actions-toolbar";
import { DeleteNodeToolbar } from "./toolbars/delete-node-toolbar";
import { AccessLabelsEditorToolbar } from "./toolbars/access-labels-editor-toolbar";
import { CreateDefinition } from "./views/create-definition";
import { CreateProjectDefinitionToolbar } from "./toolbars/create-project-definition-toolbar";

export const PROJECT_DEFINITION_INDEX = "PROJECT_DEFINITION_EDITOR_HOME";
export const PROJECT_DEFINITION_EDITOR_MAIN = "PROJECT_DEFINITION_EDITOR_MAIN";
export const PROJECT_DEFINITION_EDITOR_NODE_ADD =
  "PROJECT_DEFINITION_EDITOR_NODE_ADD";
export const PROJECT_DEFINITION_EDITOR_NODE_EDIT =
  "PROJECT_DEFINITION_EDITOR_NODE_EDIT";

export const PROJECT_DEFINITION_EDITOR_FORMULAS_EDIT =
  "PROJECT_DEFINITION_EDITOR_FORMULAS_EDIT";
export const PROJECT_DEFINITION_EDITOR_FORMULA_EDIT =
  "PROJECT_DEFINITION_EDITOR_FORMULA_EDIT";
export const DEFINITION_EDITION_LABELS_EDITION =
  "DEFINITION_EDITION_LABELS_EDITION";
export const DEFINITION_ADD = "DEFINITION_ADD";

export const routes: NamedRouteDefinition[] = [
  {
    name: "PROJECT_DEFINITION_ROOT",
    path: "/",
    components: [
      { component: DefinitionIndexDrawerItemLink, tags: ["main-drawer"] },
    ],
    requiredPermissions: ["project_definition:get"],
  },
  {
    name: PROJECT_DEFINITION_INDEX,
    path: "/project_definitions",
    components: [
      { component: ProjectDefinitionHome, exact: true, tags: ["main-content"] },
      {
        component: CreateProjectDefinitionToolbar,
        exact: true,
        tags: ["main-toolbar"],
      },
    ],
  },
  {
    name: DEFINITION_ADD,
    path: "/project_definitions/add",
    components: [
      {component: CreateDefinition, exact: true, tags: ["main-content"] }
    ]
  },
  {
    name: PROJECT_DEFINITION_EDITOR_MAIN,
    path: "/project_definitions/:projectDefinitionId/:selectedPath",
    components: [
      { component: EditorLayout, tags: ["main-content"] },
      {
        component: RootSectionActionsToolbar,
        exact: true,
        tags: ["main-toolbar"],
      },
      {
        component: AccessLabelsEditorToolbar,
        exact: true,
        tags: ["main-toolbar"],
      },
      { component: EditFormulas, tags: ["main-toolbar"], exact: true }
    ],
  },
  {
    name: PROJECT_DEFINITION_EDITOR_NODE_ADD,
    path: "/project_definitions/:projectDefinitionId/:selectedPath/add",
    components: [
      {
        component: AddContainerView,
        tags: ["project-definition-view"],
        exact: true,
      },
    ],
  },
  {
    name: PROJECT_DEFINITION_EDITOR_NODE_EDIT,
    path: "/project_definitions/:projectDefinitionId/:selectedPath/edit/:nodeId",
    components: [
      {
        component: EditContainerView,
        tags: ["project-definition-view"],
        exact: true,
      },
      {
        component: DeleteNodeToolbar,
        tags: ["main-toolbar"],
        exact: true,
      },
    ],
  },
  {
    name: PROJECT_DEFINITION_EDITOR_FORMULAS_EDIT,
    path: "/project_definitions/:projectDefinitionId/:selectedPath/formulas",
    components: [
      {
        tags: ["project-definition-view"],
        component: FormulasSearch,
        exact: true,
      },
    ],
  },
  {
    name: PROJECT_DEFINITION_EDITOR_FORMULA_EDIT,
    path: "/project_definitions/:projectDefinitionId/:selectedPath/formulas/:formulaId",
    components: [
      { tags: ["project-definition-view"], exact: true, component: () => null },
    ],
  },
  {
    name: DEFINITION_EDITION_LABELS_EDITION,
    path: "/project_definitions/:projectDefinitionId/:selectedPath/labels",
    components: [],
  },
];

export function buildLinkFor(projectDefinitionId: string, ...path: string[]) {
  const selectedPath = encodeURI(`~${path.join("~")}`);
  return `/project_definitions/${projectDefinitionId}/${selectedPath}`;
}

export function renderMainViewUrl(
  router: NamedRoutes,
  projectDefinitionId: string,
  path: string[]
) {
  const selectedPath = encodeURI(`~${path.join("~")}`);
  return router.render(PROJECT_DEFINITION_EDITOR_MAIN, {
    projectDefinitionId,
    selectedPath,
  });
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

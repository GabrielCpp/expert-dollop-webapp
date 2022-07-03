import { NamedRouteDefinition } from "../../shared/named-routes";
import { AddContainerView, EditContainerView } from "./views/add-node-view";
import { EditorLayout } from "./views/project-def-editor";
import { ProjectDefinitionHome } from "./views/home";
import { EditFormulas } from "./toolbars/edit-formulas";
import { FormulasSearch } from "./views/formulas-search";

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

export const routes: NamedRouteDefinition[] = [
  {
    name: PROJECT_DEFINITION_INDEX,
    path: "/project_definitions",
    components: [
      { component: ProjectDefinitionHome, exact: true, tags: ["main-content"] },
    ],
  },
  {
    name: PROJECT_DEFINITION_EDITOR_MAIN,
    path: "/project_definitions/:projectDefinitionId/:selectedPath",
    components: [{ component: EditorLayout, tags: ["main-content"] }],
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
    name: "add_formulas_toobar",
    path: "/project_definitions/:projectDefinitionId/:selectedPath",
    components: [
      { component: EditFormulas, tags: ["main-toolbar"], exact: true },
    ],
  },
];

export function buildLinkFor(projectDefinitionId: string, ...path: string[]) {
  const selectedPath = encodeURI(`~${path.join("~")}`);
  return `/project_definitions/${projectDefinitionId}/${selectedPath}`;
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

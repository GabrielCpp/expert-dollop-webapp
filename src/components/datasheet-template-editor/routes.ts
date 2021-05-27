import { NamedRoute } from "../../shared/named-routes";
import { DatasheetDefinitionEditor } from "./views/datasheet-definition-editor";
import { DatasheetDefinitionHome } from "./views/datasheet-definition-home";

export const DATASHEET_TEMPLATE_EDITOR_HOME = "DATASHEET_TEMPLATE_EDITOR_HOME";
export const DATASHEET_TEMPLATE_EDITOR_MAIN = "DATASHEET_TEMPLATE_EDITOR_MAIN";

export const routes: NamedRoute[] = [
  {
    name: DATASHEET_TEMPLATE_EDITOR_HOME,
    path: "/datasheet_template",
    component: DatasheetDefinitionHome,
    exact: true,
    tags: ["main-content"],
  },
  {
    name: DATASHEET_TEMPLATE_EDITOR_MAIN,
    path: "/datasheet_template/:datasheetDefinitionId",
    component: DatasheetDefinitionEditor,
    tags: ["main-content"],
  },
];

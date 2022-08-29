import { NamedRouteDefinition } from "../../shared/named-routes";
import { DatasheetIndexDrawerItemLink } from "./drawers/datasheet-index-drawer-item-link";
import { NewDatasheetToolbar } from "./toolbars/new-datasheet";
import { AddDatasheet } from "./views/add-datasheet";
import { BrowseDatasheet } from "./views/browse-datasheet";
import { DatasheetEditor } from "./views/datasheet-editor";

export const NEW_DATASHEET_TOOLBAR = "NEW_DATASHEET_TOOLBAR";
export const NEW_DATASHEET_FORM = "NEW_DATASHEET_FORM";
export const DATASHEET_EDITOR = "DATASHEET_EDITOR";
export const DATASHEET_INDEX = "BROWSE_DATASHEET";

export const routes: NamedRouteDefinition[] = [
  {
    name: "DATASHEET_ROOT",
    path: "/",
    components: [
      { component: DatasheetIndexDrawerItemLink, tags: ["main-drawer"]},
    ],
    requiredPermissions: ["datasheet:get"]
  },
  {
    name: NEW_DATASHEET_TOOLBAR,
    path: "/datasheets",
    components: [
      { component: NewDatasheetToolbar, tags: ["main-toolbar"], exact: true }
    ],
  },
  {
    name: NEW_DATASHEET_FORM,
    path: "/datasheets/add",
    components: [
      { component: AddDatasheet, tags: ["main-content"], exact: true },
    ],
  },
  {
    name: DATASHEET_EDITOR,
    path: "/datasheets/:datasheetId",
    components: [
      { component: DatasheetEditor, tags: ["main-content"], exact: true },
    ],
  },
  {
    name: DATASHEET_INDEX,
    path: "/datasheets",
    components: [
      {
        component: BrowseDatasheet,
        tags: ["main-content"],
        exact: true,
        requiredPermissions: ["datasheet:get"],
      },
    ],
  },
];

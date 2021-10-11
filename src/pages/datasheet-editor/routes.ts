import { NamedRoute } from "../../shared/named-routes";
import { NewDatasheetToolbar } from "./toolbars/new-datasheet";
import { AddDatasheet } from "./views/add-datasheet";
import { BrowseDatasheet } from "./views/browse-datasheet";
import { DatasheetEditor } from "./views/datasheet-editor";

export const NEW_DATASHEET_TOOLBAR = "NEW_DATASHEET_TOOLBAR";
export const NEW_DATASHEET_FORM = "NEW_DATASHEET_FORM";
export const DATASHEET_EDITOR = "DATASHEET_EDITOR";
export const BROWSE_DATASHEET = "BROWSE_DATASHEET";

export const routes: NamedRoute[] = [
  {
    name: NEW_DATASHEET_TOOLBAR,
    path: "/datasheets",
    component: NewDatasheetToolbar,
    tags: ["main-toolbar"],
    exact: true,
  },
  {
    name: NEW_DATASHEET_FORM,
    path: "/datasheets/add",
    component: AddDatasheet,
    tags: ["main-content"],
    exact: true,
  },
  {
    name: DATASHEET_EDITOR,
    path: "/datasheets/:datasheetId",
    component: DatasheetEditor,
    tags: ["main-content"],
    exact: true,
  },
  {
    name: BROWSE_DATASHEET,
    path: "/datasheets",
    component: BrowseDatasheet,
    tags: ["main-content"],
    exact: true,
  },
];

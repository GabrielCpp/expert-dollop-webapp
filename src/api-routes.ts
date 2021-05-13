import { NamedRoute } from "./shared/named-routes";

export const API_PROJECT_DEFINITION_TRANSLATION =
  "api_project_defintion_translation";

export const routes: NamedRoute[] = [
  {
    name: API_PROJECT_DEFINITION_TRANSLATION,
    path: "/api/translation/:ressourceId/:locale",
    tags: ["api"],
  },
];

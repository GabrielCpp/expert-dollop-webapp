import { Grid } from "@mui/material";
import { Route, Switch, useParams } from "react-router-dom";

import { API_PROJECT_DEFINITION_TRANSLATION } from "../../../api-routes";
import { useServices } from "../../../services-def";
import { renderNamedRoute } from "../../../shared/named-routes";
import { useLoaderEffect } from "../../../components/loading-frame";
import { useTranlationScope } from "../../../components/translation";
import { useProjectDefPath } from "../hooks/project-def-path";
import { PROJECT_DEFINITION_EDITOR_MAIN } from "../routes";
import { FormDefinitionEditor } from "./form-definition-editor";
import { RootSectionBar } from "./root-section-bar";
import { SidePanel } from "./side-panel";

interface EditorLayoutParams extends Record<string, string> {
  projectDefinitionId: string;
  selectedPath: string;
}

export function EditorLayout() {
  const { routes } = useServices();
  const params = useParams<EditorLayoutParams>();
  const { projectDefinitionId, selectedPath } = params;
  const { loading, path } = useProjectDefPath(
    projectDefinitionId,
    selectedPath
  );
  const [rootSectionDefId, subSectionDefId, formDefId] = path || [];
  const { isLoading, error } = useTranlationScope(
    API_PROJECT_DEFINITION_TRANSLATION,
    projectDefinitionId
  );

  useLoaderEffect(error, isLoading || loading);

  return (
    <Switch>
      {routes
        .allHavingTag("project-definition-view")
        .map((route) =>
          renderNamedRoute(
            routes,
            route.name,
            PROJECT_DEFINITION_EDITOR_MAIN,
            params
          )
        )}
      <Route path={routes.getUrl(PROJECT_DEFINITION_EDITOR_MAIN)} exact={true}>
        <Grid container spacing={1} wrap={"wrap"}>
          <Grid item xs={12}>
            <RootSectionBar
              projectDefinitionId={projectDefinitionId}
              rootSectionDefId={rootSectionDefId}
            />
          </Grid>
          {rootSectionDefId && (
            <>
              <Grid item style={{ minWidth: "30%" }}>
                <SidePanel
                  projectDefinitionId={projectDefinitionId}
                  rootSectionDefId={rootSectionDefId}
                  subSectionDefId={subSectionDefId}
                  formDefId={formDefId}
                />
              </Grid>
              <Grid item>
                {formDefId && (
                  <FormDefinitionEditor
                    projectDefinitionId={projectDefinitionId}
                    formDefId={formDefId}
                  />
                )}
              </Grid>
            </>
          )}
        </Grid>
      </Route>
    </Switch>
  );
}

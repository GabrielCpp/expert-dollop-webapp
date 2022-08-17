import { Grid } from "@mui/material";
import { Route, Switch, useParams } from "react-router-dom";
import { useServices } from "../../../services-def";
import { renderNamedRoute } from "../../../shared/named-routes";
import { useLoaderEffect } from "../../../components/loading-frame";
import { useDynamicTranlation } from "../../../components/translation";
import { useProjectDefPath } from "../hooks/project-def-path";
import { PROJECT_DEFINITION_EDITOR_MAIN } from "../routes";
import { FormDefinitionEditor } from "./form-definition-editor";
import { RootSectionBar } from "./root-section-bar";
import { SidePanel } from "./side-panel";
import { useObservable } from "react-use";

interface EditorLayoutParams extends Record<string, string> {
  projectDefinitionId: string;
  selectedPath: string;
}

export function EditorLayout() {
  const { routes, auth0 } = useServices();
  const params = useParams<EditorLayoutParams>();
  const { projectDefinitionId, selectedPath } = params;
  const { loading, path } = useProjectDefPath(
    projectDefinitionId,
    selectedPath
  );
  const [rootSectionDefId, subSectionDefId, formDefId] = path || [];
  const { isLoading, error } = useDynamicTranlation(projectDefinitionId);
  const user = useObservable(auth0.observeCurrentUser(), auth0.currentUser);

  useLoaderEffect(error, isLoading || loading);

  return (
    <Switch>
      {routes
        .allHavingTag("project-definition-view", user.permissions)
        .map((matchingComponent) =>
          renderNamedRoute(routes, matchingComponent)
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

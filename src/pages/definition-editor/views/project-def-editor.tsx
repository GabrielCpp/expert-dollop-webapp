import { Grid } from "@mui/material";
import { Route, Switch, useParams } from "react-router-dom";
import { useServices } from "../../../services-def";
import {
  renderNamedRoute,
  useComponentMatcher,
} from "../../../shared/named-routes";
import { useLoaderEffect } from "../../../components/loading-frame";
import { useDynamicTranlation } from "../../../components/translation";
import { useProjectDefPath } from "../hooks/project-def-path";
import { PROJECT_DEFINITION_EDITOR_MAIN } from "../routes";
import { FormDefinitionEditor } from "../components/form-editor";
import { RootSectionBar } from "../components/root-section-bar";
import { SidePanel } from "../components/side-panel";
import { useObservable } from "react-use";
import { AlertContainer } from "../../../components/snackbar-display";
import { useId } from "../../../shared/redux-db";

interface EditorLayoutParams extends Record<string, string> {
  projectDefinitionId: string;
  selectedPath: string;
}

export function EditorLayout() {
  const snackbarId = useId();
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
  const { matchingComponents } = useComponentMatcher(
    "project-definition-view",
    user.permissions
  );

  useLoaderEffect(error, isLoading || loading);

  return (
    <Switch>
      {matchingComponents.map((m) => renderNamedRoute(m))}
      <Route path={routes.getUrl(PROJECT_DEFINITION_EDITOR_MAIN)} exact={true}>
        <Grid container direction="row" spacing={1}>
          <Grid item>
            <RootSectionBar
              projectDefinitionId={projectDefinitionId}
              rootSectionDefId={rootSectionDefId}
            />
          </Grid>

          <Grid item xs={12} md={12} xl={12}>
            <AlertContainer id={snackbarId}></AlertContainer>
          </Grid>

          <Grid item xs={12} md={4} xl={4} style={{ minWidth: "4em" }}>
            {rootSectionDefId && subSectionDefId && formDefId && (
              <SidePanel
                projectDefinitionId={projectDefinitionId}
                rootSectionDefId={rootSectionDefId}
                subSectionDefId={subSectionDefId}
                formDefId={formDefId}
              />
            )}
          </Grid>

          <Grid item xs={12} md={8} xl={6}>
            {rootSectionDefId && subSectionDefId && formDefId && (
              <FormDefinitionEditor
                projectDefinitionId={projectDefinitionId}
                formDefId={formDefId}
              />
            )}
          </Grid>
        </Grid>
      </Route>
    </Switch>
  );
}

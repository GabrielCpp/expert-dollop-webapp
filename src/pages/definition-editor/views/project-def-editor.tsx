import { Grid } from "@mui/material";
import { useEffect } from "react";
import { Route, useHistory, useParams } from "react-router-dom";
import {
  useLoaderEffect,
  useRefetchGroup,
} from "../../../components/loading-frame";
import {
  AlertContainer,
  scrollTop,
  useNotification,
} from "../../../components/snackbar-display";
import { useDynamicTranlation } from "../../../components/translation";
import { useServices } from "../../../services-def";
import { RouteBinding } from "../../../shared/named-routes";
import { useId } from "../../../shared/redux-db";
import { FormDefinitionEditor } from "../components/form-editor";
import { RootSectionBar } from "../components/root-section-bar";
import { SidePanel } from "../components/side-panel";
import { useProjectDefPath } from "../hooks/project-def-path";
import { PROJECT_DEFINITION_EDITOR_MAIN } from "../routes";

interface EditorLayoutParams extends Record<string, string> {
  projectDefinitionId: string;
  selectedPath: string;
}

export function EditorLayout() {
  const snackbarId = useId();
  const { success, clear } = useNotification(snackbarId);
  const { routes } = useServices();
  const params = useParams<EditorLayoutParams>();
  const { projectDefinitionId, selectedPath } = params;
  const { loading, path } = useProjectDefPath(
    projectDefinitionId,
    selectedPath
  );
  const [rootSectionDefId, subSectionDefId, formDefId] = path || [];
  const { isLoading, error } = useDynamicTranlation(projectDefinitionId);
  const refectGroup = useRefetchGroup();
  const history = useHistory();
  useLoaderEffect(error, isLoading || loading);
  useEffect(clear, [clear, formDefId]);

  async function completeAction() {
    history.push(routes.render(PROJECT_DEFINITION_EDITOR_MAIN, params));
    refectGroup.refetchAll();
    success("shared.forms.saved");
    scrollTop();
  }

  return (
    <RouteBinding tag="project-definition-view" completeAction={completeAction}>
      <Route path={routes.getUrl(PROJECT_DEFINITION_EDITOR_MAIN)} exact={true}>
        <Grid container direction="row" spacing={1}>
          <Grid item>
            <RootSectionBar
              projectDefinitionId={projectDefinitionId}
              rootSectionDefId={rootSectionDefId}
              refectGroup={refectGroup}
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
                refectGroup={refectGroup}
              />
            )}
          </Grid>

          <Grid item xs={12} md={8} xl={6}>
            {rootSectionDefId && subSectionDefId && formDefId && (
              <FormDefinitionEditor
                projectDefinitionId={projectDefinitionId}
                formDefId={formDefId}
                refectGroup={refectGroup}
              />
            )}
          </Grid>
        </Grid>
      </Route>
    </RouteBinding>
  );
}

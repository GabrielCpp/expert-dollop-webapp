import { Grid } from "@mui/material";
import { Route, Switch, useParams } from "react-router-dom";
import {
  useLoaderEffect,
  useRefetchGroup,
} from "../../../components/loading-frame";
import { useDynamicTranlation } from "../../../components/translation";
import { useServices } from "../../../services-def";
import { FormEditor } from "../components/form-editor";
import { useProjectPath } from "../hooks/project-path";
import { PROJECT_EDITOR } from "../routes";
import { RootSectionBar } from "../components/root-section-bar";
import { SidePanel } from "./side-panel";
import { useId } from "../../../shared/redux-db";
import { AlertContainer } from "../../../components/snackbar-display";

interface ProjectEditorParams extends Record<string, string> {
  projectId: string;
  selectedPath: string;
}

export function ProjectEditor() {
  const snackbarId = useId();
  const { routes } = useServices();
  const { projectId, selectedPath } = useParams<ProjectEditorParams>();
  const { loading, path } = useProjectPath(projectId, selectedPath);
  const [rootSectionId, subSectionId, formId] = path || [];
  const { isLoading, error } = useDynamicTranlation(projectId);
  const overallLoading = useLoaderEffect(error, isLoading, loading);
  const refectGroup = useRefetchGroup();

  if (overallLoading) {
    return null;
  }

  return (
    <Switch>
      <Route path={routes.getUrl(PROJECT_EDITOR)} exact={true}>
        {rootSectionId && (
          <Grid container spacing={1}>
            <Grid item xs={12} md={12} xl={12}>
              <RootSectionBar
                projectId={projectId}
                rootSectionId={rootSectionId}
                snackbarId={snackbarId}
                refectGroup={refectGroup}
              />
            </Grid>

            <Grid item xs={12} md={12} xl={12}>
              <AlertContainer id={snackbarId}></AlertContainer>
            </Grid>

            <Grid item xs={12} md={4} xl={4} style={{ minWidth: "4em" }}>
              {subSectionId && formId && (
                <SidePanel
                  projectId={projectId}
                  rootSectionId={rootSectionId}
                  subSectionId={subSectionId}
                  formId={formId}
                  refectGroup={refectGroup}
                />
              )}
            </Grid>

            <Grid item xs={12} md={8} xl={6}>
              {formId && (
                <FormEditor
                  snackbarId={snackbarId}
                  projectId={projectId}
                  rootSectionId={rootSectionId}
                  formId={formId}
                  refectGroup={refectGroup}
                />
              )}
            </Grid>
          </Grid>
        )}
      </Route>
    </Switch>
  );
}

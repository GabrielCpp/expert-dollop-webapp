import { Grid } from "@mui/material";
import { Route, Switch, useParams } from "react-router-dom";
import {
  useLoaderEffect,
  useRefetchGroup,
} from "../../../components/loading-frame";
import { AlertContainer } from "../../../components/snackbar-display";
import { useDynamicTranlation } from "../../../components/translation";
import { useServices } from "../../../services-def";
import { FormEditor } from "../components/form-editor";
import { RootSectionBar } from "../components/root-section-bar";
import { useProjectPath } from "../hooks/project-path";
import { PROJECT_EDITOR } from "../routes";
import { SidePanel } from "./side-panel";

interface ProjectEditorParams extends Record<string, string> {
  projectId: string;
  selectedPath: string;
}

export function ProjectEditor() {
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
                refectGroup={refectGroup}
              />
            </Grid>

            <Grid item xs={12} md={12} xl={12}>
              <AlertContainer></AlertContainer>
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

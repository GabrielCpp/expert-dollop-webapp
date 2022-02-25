import { Grid } from "@mui/material";
import { Route, Switch, useParams } from "react-router-dom";
import { useLoaderEffect } from "../../../components/loading-frame";
import { useDynamicTranlation } from "../../../components/translation";
import { useServices } from "../../../services-def";
import { FormEditor } from "../components/form-editor";
import { useProjectPath } from "../hooks/project-path";
import { PROJECT_EDITOR } from "../routes";
import { RootSectionBar } from "./root-section-bar";
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

  if (overallLoading) {
    return null;
  }

  return (
    <Switch>
      <Route path={routes.getUrl(PROJECT_EDITOR)} exact={true}>
        {rootSectionId && (
          <Grid container spacing={1} wrap={"wrap"} direction="row">
            <Grid item xs={12}>
              <RootSectionBar
                projectId={projectId}
                rootSectionId={rootSectionId}
              />
            </Grid>

            <Grid item md={4} style={{ minWidth: "4em" }}>
              {subSectionId && formId && (
                <SidePanel
                  projectId={projectId}
                  rootSectionId={rootSectionId}
                  subSectionId={subSectionId}
                  formId={formId}
                />
              )}
            </Grid>

            <Grid item>
              {formId && (
                <FormEditor
                  projectId={projectId}
                  rootSectionId={rootSectionId}
                  formId={formId}
                />
              )}
            </Grid>
          </Grid>
        )}
      </Route>
    </Switch>
  );
}

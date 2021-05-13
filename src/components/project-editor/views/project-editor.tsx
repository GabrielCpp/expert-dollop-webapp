import { Grid } from "@material-ui/core";
import { useEffect } from "react";
import { Route, Switch, useParams } from "react-router-dom";

import { API_PROJECT_DEFINITION_TRANSLATION } from "../../../api-routes";
import { useServices } from "../../../services-def";
import { RouteViewCompoenentProps } from "../../../shared/named-routes";
import { useLoader } from "../../loading-frame";
import { useTranlationScope } from "../../translation";
import { useProjectPath } from "../hooks/project-path";
import { PROJECT_EDITOR } from "../routes";
import { FormEditor } from "./form-editor";
import { RootSectionBar } from "./root-section-bar";
import { SidePanel } from "./side-panel";

interface ProjectEditorParams extends Record<string, string> {
  projectId: string;
  selectedPath: string;
}

export function ProjectEditor(_: RouteViewCompoenentProps) {
  const { routes } = useServices();
  const { projectId, selectedPath } = useParams<ProjectEditorParams>();
  const { loading, path } = useProjectPath(projectId, selectedPath);
  const [rootSectionId, subSectionId, formId] = path || [];
  const { onLoading } = useLoader();
  const { isLoading, error } = useTranlationScope(
    API_PROJECT_DEFINITION_TRANSLATION,
    projectId
  );

  useEffect(() => {
    onLoading(isLoading || loading, error);
  }, [error, isLoading, loading, onLoading]);

  return (
    <Switch>
      <Route path={routes.getUrl(PROJECT_EDITOR)} exact={true}>
        {rootSectionId && (
          <Grid container spacing={1} wrap={"wrap"}>
            <Grid item xs={12}>
              <RootSectionBar
                projectId={projectId}
                rootSectionId={rootSectionId}
              />
            </Grid>
            <Grid item xs={5}>
              {subSectionId && formId && (
                <SidePanel
                  projectId={projectId}
                  rootSectionId={rootSectionId}
                  subSectionId={subSectionId}
                  formId={formId}
                />
              )}
            </Grid>
            <Grid item xs={7}>
              {formId && <FormEditor projectId={projectId} formId={formId} />}
            </Grid>
          </Grid>
        )}
      </Route>
    </Switch>
  );
}

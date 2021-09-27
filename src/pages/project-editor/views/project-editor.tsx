import { Grid } from "@material-ui/core";
import { useEffect } from "react";
import { Route, Switch, useParams } from "react-router-dom";

import { API_PROJECT_DEFINITION_TRANSLATION } from "../../../api-routes";
import { useServices } from "../../../services-def";
import { RouteViewCompoenentProps } from "../../../shared/named-routes";
import { useLoader, useLoaderEffect } from "../../../components/loading-frame";
import { useTranlationScope } from "../../../components/translation";
import { useProjectPath } from "../hooks/project-path";
import { PROJECT_EDITOR } from "../routes";
import { FormEditor } from "./form-editor";
import { RootSectionBar } from "./root-section-bar";
import { SidePanel } from "./side-panel";
import { useFindProjectDefinitionIdQuery } from "../../../generated";

interface ProjectEditorParams extends Record<string, string> {
  projectId: string;
  selectedPath: string;
}

export function ProjectEditor(_: RouteViewCompoenentProps) {
  const { routes } = useServices();
  const { projectId, selectedPath } = useParams<ProjectEditorParams>();
  const { loading, path } = useProjectPath(projectId, selectedPath);
  const [rootSectionId, subSectionId, formId] = path || [];
  const {
    data,
    loading: queryLoading,
    error: queryError,
  } = useFindProjectDefinitionIdQuery({
    variables: {
      projectId,
    },
  });
  const { isLoading, error } = useTranlationScope(
    API_PROJECT_DEFINITION_TRANSLATION,
    data?.findProjectDetails.projectDefId || "",
    data === undefined
  );

  useLoaderEffect(error || queryError, isLoading, loading, queryLoading);

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

            <Grid item style={{ minWidth: "4em" }}>
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

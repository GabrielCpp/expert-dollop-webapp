import { CircularProgress, Grid } from "@material-ui/core";
import React from "react";
import { Route, useParams, Switch } from "react-router-dom";

import { Services } from "../../../hooks";
import { renderNamedRoute } from "../../../shared/named-routes";
import { useServices } from "../../../shared/service-context";
import { LoadingFrame } from "../../loading-frame";
import { useTranlationScope } from "../../translation";
import {
  ADD_PROJECT_SECTION_ROUTE_NAME,
  PROJECT_DEFINITION_EDITOR_MAIN,
  PROJECT_DEFINITION_TRANSLATION,
} from "../routes";
import { FormDefinitionEditor } from "./form-definition-editor";
import { RootSectionBar } from "./root-section-bar";
import { SidePanel } from "./side-panel";

interface EditorLayoutParams extends Record<string, string> {
  projectDefinitionId: string;
  selectedPath: string;
}

export function EditorLayout() {
  const params = useParams<EditorLayoutParams>();
  const { routes } = useServices<Services>();
  const isLoading = useTranlationScope(
    PROJECT_DEFINITION_TRANSLATION,
    params.projectDefinitionId
  );

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Switch>
      {renderNamedRoute(
        routes,
        ADD_PROJECT_SECTION_ROUTE_NAME,
        PROJECT_DEFINITION_EDITOR_MAIN,
        params
      )}
      <Route path={routes.getUrl(PROJECT_DEFINITION_EDITOR_MAIN)} exact={true}>
        <LoadingFrame loaderComponent={<CircularProgress />}>
          {(getLoader) => (
            <Grid container spacing={1} wrap={"wrap"}>
              <Grid item xs={12}>
                <RootSectionBar onLoading={getLoader("RootSectionBar")} />
              </Grid>
              <Grid item xs={5}>
                <SidePanel onLoading={getLoader("SidePanel")} />
              </Grid>
              <Grid item xs={7}>
                <FormDefinitionEditor
                  onLoading={getLoader("FormDefinitionEditor")}
                />
              </Grid>
            </Grid>
          )}
        </LoadingFrame>
      </Route>
    </Switch>
  );
}

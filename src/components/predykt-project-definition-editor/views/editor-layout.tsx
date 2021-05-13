import { Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import { Route, useParams, Switch } from "react-router-dom";
import { API_PROJECT_DEFINITION_TRANSLATION } from "../../../api-routes";
import { useServices } from "../../../services-def";

import { renderNamedRoute } from "../../../shared/named-routes";
import { useLoader } from "../../loading-frame";
import { useTranlationScope } from "../../translation";
import {
  ADD_PROJECT_SECTION_ROUTE_NAME,
  PROJECT_DEFINITION_EDITOR_MAIN,
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
  const { routes } = useServices();
  const { onLoading } = useLoader();
  const { isLoading, error } = useTranlationScope(
    API_PROJECT_DEFINITION_TRANSLATION,
    params.projectDefinitionId
  );

  useEffect(() => {
    onLoading(isLoading, error);
  }, [error, isLoading, onLoading]);

  return (
    <Switch>
      {renderNamedRoute(
        routes,
        ADD_PROJECT_SECTION_ROUTE_NAME,
        PROJECT_DEFINITION_EDITOR_MAIN,
        params
      )}
      <Route path={routes.getUrl(PROJECT_DEFINITION_EDITOR_MAIN)} exact={true}>
        <Grid container spacing={1} wrap={"wrap"}>
          <Grid item xs={12}>
            <RootSectionBar />
          </Grid>
          <Grid item xs={5}>
            <SidePanel />
          </Grid>
          <Grid item xs={7}>
            <FormDefinitionEditor />
          </Grid>
        </Grid>
      </Route>
    </Switch>
  );
}

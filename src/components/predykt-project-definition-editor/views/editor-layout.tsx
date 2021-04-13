import { Grid } from "@material-ui/core";
import React from "react";
import { Route, useParams } from "react-router-dom";

import { Services } from "../../../hooks";
import { RouteComponentView } from "../../../shared/named-routes";
import { useServices } from "../../../shared/service-context";
import { TranslationScope } from "../../translation";
import {
  ADD_PROJECT_SECTION_ROUTE_NAME,
  CONTAINER_VIEW_ROUTE_NAME,
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

  return (
    <TranslationScope
      name={PROJECT_DEFINITION_TRANSLATION}
      ressourceId={params.projectDefinitionId}
    >
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
        <RouteComponentView
          routeName={ADD_PROJECT_SECTION_ROUTE_NAME}
          backRouteName={CONTAINER_VIEW_ROUTE_NAME}
          params={params}
        />
        <Route path={routes.getUrl(CONTAINER_VIEW_ROUTE_NAME)} exact={true}>
          <RootSectionBar />
          <SidePanel />
          <Grid item xs={9}>
            <FormDefinitionEditor />
          </Grid>
        </Route>
      </Grid>
    </TranslationScope>
  );
}

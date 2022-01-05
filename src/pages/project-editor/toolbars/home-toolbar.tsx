import React from "react";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Link as RouterLink } from "react-router-dom";
import { useServices } from "../../../services-def";
import { ADD_PROJECT_VIEW } from "../routes";

export function HomeToolbar() {
  const { routes } = useServices();

  return (
    <Button
      startIcon={<AddIcon />}
      component={RouterLink}
      to={routes.render(ADD_PROJECT_VIEW)}
    >
      Add Project
    </Button>
  );
}

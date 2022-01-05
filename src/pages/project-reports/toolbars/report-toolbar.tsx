import React from "react";
import { Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useServices } from "../../../services-def";
import { PROJECT_REPORT_TOOLBAR } from "../routes";

export function ReportToolbar() {
  const { routes } = useServices();

  return (
    <Button component={RouterLink} to={routes.render(PROJECT_REPORT_TOOLBAR)}>
      Reports
    </Button>
  );
}

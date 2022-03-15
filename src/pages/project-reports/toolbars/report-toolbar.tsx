import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Button from "@mui/material/Button";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { alpha, styled } from "@mui/material/styles";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { Link as RouterLink, useParams } from "react-router-dom";

import { useLoaderEffect } from "../../../components/loading-frame";
import { useDbTranslation } from "../../../components/translation";
import { useFindReportDefinitionsFromProjectDetailsQuery } from "../../../generated";
import { useServices } from "../../../services-def";
import { PROJECT_REPORT } from "../routes";

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

interface ReportToolbarParams {
  projectId: string;
  selectedPath: string;
}

export function ReportToolbar() {
  const { t } = useTranslation();
  const { projectId, selectedPath } = useParams<ReportToolbarParams>();
  const { dbTrans } = useDbTranslation(projectId);
  const { routes } = useServices();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { loading, data, error } =
    useFindReportDefinitionsFromProjectDetailsQuery({
      variables: {
        projectId,
      },
    });

  useLoaderEffect(error, loading);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  if (data === undefined) {
    return null;
  }

  const reportDefinitions = data.findProjectDetails.reportDefinitions;

  return (
    <div>
      <Button
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        {t("project_reports.view")}
      </Button>
      <StyledMenu
        MenuListProps={{
          "aria-labelledby": "reports",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {reportDefinitions.map((reportDefinition) => (
          <MenuItem
            key={reportDefinition.id}
            onClick={handleClose}
            disableRipple
          >
            <RouterLink
              to={routes.render(PROJECT_REPORT, {
                projectId,
                reportDefinitionId: reportDefinition.id,
                selectedPath,
              })}
            >
              {dbTrans(reportDefinition.name)}
            </RouterLink>
          </MenuItem>
        ))}
      </StyledMenu>
    </div>
  );
}

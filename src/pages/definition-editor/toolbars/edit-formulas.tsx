import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link as RouterLink, useParams } from "react-router-dom";
import { useServices } from "../../../services-def";
import { PROJECT_DEFINITION_EDITOR_FORMULAS_EDIT } from "../routes";

export function EditFormulas() {
  const { routes } = useServices();
  const { t } = useTranslation();
  const params = useParams();

  return (
    <Button
      component={RouterLink}
      to={routes.render(PROJECT_DEFINITION_EDITOR_FORMULAS_EDIT, params)}
    >
      {t("definition_editor.edit_formulas.button_edit")}
    </Button>
  );
}

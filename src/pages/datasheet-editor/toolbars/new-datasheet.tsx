import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useParams, Link as RouterLink } from "react-router-dom";
import { useServices } from "../../../services-def";
import { NEW_DATASHEET_FORM } from "../routes";

export function NewDatasheetToolbar() {
  const { routes } = useServices();
  const { t } = useTranslation();
  const params = useParams();

  return (
    <Button
      component={RouterLink}
      to={routes.render(NEW_DATASHEET_FORM, params)}
    >
      {t("datasheet-editor.add-datasheet")}
    </Button>
  );
}

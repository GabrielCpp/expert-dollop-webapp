import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import { useServices } from "../../../services-def";
import { PROJECT_DEFINITION_INDEX } from "../routes";
import { useTranslation } from "react-i18next";

export function DefinitionIndexDrawerItemLink() {
  const { routes } = useServices();
  const { t } = useTranslation();

  return (
    <ListItem
      button
      component={RouterLink}
      to={routes.render(PROJECT_DEFINITION_INDEX)}
      key={PROJECT_DEFINITION_INDEX}
    >
      <ListItemIcon>
        <AccountTreeIcon />
      </ListItemIcon>
      <ListItemText primary={t("definition_editor.drawers.index_link_name")} />
    </ListItem>
  );
}

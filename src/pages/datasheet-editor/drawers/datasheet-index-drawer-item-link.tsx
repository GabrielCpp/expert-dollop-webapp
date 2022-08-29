import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { useServices } from "../../../services-def";
import { DATASHEET_INDEX } from "../routes";

export function DatasheetIndexDrawerItemLink() {
  const { routes } = useServices();

  return (
    <ListItem
      button
      component={RouterLink}
      to={routes.render(DATASHEET_INDEX)}
      key={DATASHEET_INDEX}
    >
      <ListItemIcon>
        <ListAltIcon />
      </ListItemIcon>
      <ListItemText primary={"Datasheet"} />
    </ListItem>
  );
}

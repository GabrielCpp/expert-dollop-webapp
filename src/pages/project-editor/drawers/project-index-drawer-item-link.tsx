import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import ApartmentIcon from "@mui/icons-material/Apartment";
import { useServices } from "../../../services-def";
import { PROJECT_INDEX } from "../routes";

export function ProjectIndexDrawerItemLink() {
  const { routes } = useServices();

  return (
    <ListItem
      button
      component={RouterLink}
      to={routes.render(PROJECT_INDEX)}
      key={PROJECT_INDEX}
    >
      <ListItemIcon>
        <ApartmentIcon />
      </ListItemIcon>
      <ListItemText primary={"Projects"} />
    </ListItem>
  );
}

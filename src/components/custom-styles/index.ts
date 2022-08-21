import {
  CardContent,
  Grid,
  IconButton,
  List,
  ListItem,
  styled,
} from "@mui/material";
import { theme } from "../../theme";

interface ExpandIconButtonProps {
  expanded: boolean;
}

export const ExpandIconButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== "expanded",
})<ExpandIconButtonProps>(({ expanded }) => {
  const styles = {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  };

  if (expanded) {
    styles.transform = "rotate(180deg)";
  }

  return styles;
});

export const UnpadCardContent = styled(CardContent)(() => ({
  paddingTop: 0,
}));

export const ListRoot = styled(List)(() => ({
  width: "100%",
  backgroundColor: theme.palette.background.paper,
}));

export const NestedListItem = styled(ListItem)(() => ({
  paddingLeft: theme.spacing(4),
}));

export const ActionToolbar = styled(Grid)(() => ({
  display: "flex",
  width: "100%",
  height: theme.spacing(6),
  borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
  borderRadius: "0",
}));


export const LeftSideButton = styled("span")(() => ({
  marginLeft: "auto",
}));

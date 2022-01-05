import styled from "@emotion/styled";
import { CardContent, IconButton, List, ListItem, Paper } from "@mui/material";
import { theme } from "../../theme";

interface ExpandIconButtonProps {
  expanded: boolean;
}

export const ExpandIconButton = styled(IconButton)<ExpandIconButtonProps>(
  ({ expanded }) => {
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
  }
);

export const UnpadCardContent = styled(CardContent)(() => ({
  paddingTop: 0,
}));

export const ListRoot = styled(List)(() => ({
  width: "100%",
  backgroundColor: theme.palette.background.paper,
  padding: "o",
}));

export const NestedListItem = styled(ListItem)(() => ({
  paddingLeft: theme.spacing(4),
}));

interface ActionToolbarProps {
  hidden: boolean;
}

export const ActionToolbar = styled(Paper)<ActionToolbarProps>(({ hidden }) => {
  const styles: Record<string, string> = {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    width: "100%",
    height: theme.spacing(6),
    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
    borderRadius: "0",
  };

  if (hidden) {
    styles.display = "none";
  }

  return styles;
});

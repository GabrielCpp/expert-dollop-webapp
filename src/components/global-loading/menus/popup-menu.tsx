import { Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export interface MenuOption {
  id: string;
  label: string;
  action?: () => void;
}

export function usePopupMenu(options: MenuOption[]) {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (_: React.MouseEvent<HTMLElement>, id?: string) => {
    setAnchorEl(null);
    const option = options.find((x) => x.id === id);
    if (option && option.action) {
      option.action();
    }
  };

  const menu = (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      onClick={handleClose}
      MenuListProps={{
        "aria-labelledby": "lock-button",
        role: "listbox",
      }}
    >
      {options.map((option) => (
        <MenuItem
          key={option.id}
          onClick={(event) => handleClose(event, option.id)}
        >
          {t(option.label)}
        </MenuItem>
      ))}
    </Menu>
  );

  return { menu, handleClick };
}

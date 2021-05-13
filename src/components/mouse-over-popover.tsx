import React from "react";
import { Typography, Popover } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    popover: {
      pointerEvents: "none",
    },
    paper: {
      padding: theme.spacing(1),
    },
  })
);

export interface MouseOverPopoverChildren {
  "aria-owns": string | undefined;
  "aria-haspopup":
    | boolean
    | "dialog"
    | "menu"
    | "true"
    | "false"
    | "listbox"
    | "tree"
    | "grid"
    | undefined;
  onMouseEnter: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  onMouseLeave: () => void;
}

interface MouseOverPopoverChildrenProps {
  onMouseEnter: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  onMouseLeave: () => void;
  "aria-owns": string | undefined;
  "aria-haspopup": "true";
}

export interface MouseOverPopoverProps {
  text: string;
  name: string;
  children: (props: MouseOverPopoverChildrenProps) => JSX.Element;
}

export function MouseOverPopover({
  text,
  name,
  children,
}: MouseOverPopoverProps) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const { t } = useTranslation();

  const handlePopoverOpen = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      {children({
        "aria-owns": open ? name : undefined,
        "aria-haspopup": "true",
        onMouseEnter: handlePopoverOpen,
        onMouseLeave: handlePopoverClose,
      })}
      <Popover
        id={name}
        className={classes.popover}
        classes={{
          paper: classes.paper,
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography>{t(text)}</Typography>
      </Popover>
    </>
  );
}

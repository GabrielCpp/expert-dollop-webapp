import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { alpha, styled } from "@mui/material/styles";
import { ReactNode, useRef, useState } from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import {
  ClickAwayListener,
  Grow,
  MenuList,
  Paper,
  Popper,
} from "@mui/material";

export interface DropdownItem {
  label: () => JSX.Element;
  key: string;
  link: string;
  buttonProps?: ButtonProps;
}

type ButtonProps = Parameters<typeof Button>[0];
export interface DropdownButtonProps extends ButtonProps {
  label: ReactNode;
  link?: string;
  items: DropdownItem[];
}

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

export function DropdownButton({
  label,
  items,
  link,
  ...others
}: DropdownButtonProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement | SVGSVGElement>(
    null
  );
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const linkProps = link
    ? {
        component: RouterLink,
        to: link,
        endIcon: (
          <ArrowDropDownIcon onClick={(e) => setAnchorEl(e.currentTarget)} />
        ),
      }
    : { onClick: handleClick, endIcon: <ArrowDropDownIcon /> };

  return (
    <>
      <Button
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="contained"
        disableElevation
        {...linkProps}
        {...others}
      >
        {label}
      </Button>
      <StyledMenu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {items.map(({ label: ItemLabel, key, link }) => (
          <MenuItem
            key={key}
            onClick={handleClose}
            disableRipple
            component={RouterLink}
            to={link}
          >
            <ItemLabel />
          </MenuItem>
        ))}
      </StyledMenu>
    </>
  );
}

export interface DefaultDropdownButtonProps {
  mainActions: DropdownItem[];
  subActions: DropdownItem[];
}

export function DefaultDropdownButton({
  mainActions,
  subActions,
}: DefaultDropdownButtonProps) {
  const anchorRef = useRef<HTMLDivElement>(null);
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const handleClose = (event: any) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  const doMainAction = (link: string) => () => {
    history.push(link);
  };

  return (
    <>
      <ButtonGroup variant="contained" ref={anchorRef}>
        {mainActions.map((item) => (
          <Button
            {...item.buttonProps}
            onClick={doMainAction(item.link)}
            key={item.key}
          >
            <item.label />
          </Button>
        ))}

        <Button
          size="small"
          aria-controls={open ? "split-button-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{
          zIndex: 1,
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
              zIndex: "999",
              width:
                anchorRef.current === null
                  ? undefined
                  : anchorRef.current.clientWidth,
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem>
                  {subActions.map(({ label: ItemLabel, key, link }) => (
                    <MenuItem
                      key={key}
                      onClick={handleClose}
                      disableRipple
                      component={RouterLink}
                      to={link}
                    >
                      <ItemLabel />
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
}

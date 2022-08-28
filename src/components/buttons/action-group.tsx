import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { once } from "lodash";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

type ButtonAction = () => void;

interface ActionIconButtonDetails {
  icon: JSX.Element;
  act: ButtonAction;
  disabled?: boolean;
}

export interface ActionButtonsProps {
  iconButtons: ActionIconButtonDetails[];
  moreMenuButton?: {
    icon: JSX.Element;
    actions: {
      label: string;
      act?: ButtonAction;
      disabled?: boolean;
    }[];
  };
}

export function ButtonActionsGroup({
  iconButtons,
  moreMenuButton,
}: ActionButtonsProps) {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    },
    [setAnchorEl]
  );
  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, [setAnchorEl]);

  const actions = (moreMenuButton?.actions || []).filter(
    (a) => a.act !== undefined
  );

  return (
    <>
      {iconButtons.map((iconButton, index) => (
        <IconButton key={index} onClick={iconButton.act}>
          {iconButton.icon}
        </IconButton>
      ))}
      {moreMenuButton && (
        <IconButton
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          {moreMenuButton.icon}
        </IconButton>
      )}
      {moreMenuButton && (
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          {actions.map((action, index) => (
            <MenuItem
              key={index}
              onClick={action.act}
              disabled={action.disabled}
            >
              {t(action.label)}
            </MenuItem>
          ))}
        </Menu>
      )}
    </>
  );
}

interface AdditionRemovalActionGroupProps {
  addAction: ButtonAction;
  deleteAction?: ButtonAction;
}

export function AdditionRemovalActionGroup({
  addAction,
  deleteAction,
}: AdditionRemovalActionGroupProps) {
  const makeProps = once(
    useCallback((): ActionButtonsProps => {
      return {
        iconButtons: [
          {
            act: addAction,
            icon: <AddIcon />,
          },
        ],
        moreMenuButton: {
          icon: <MoreVertIcon />,
          actions: [
            {
              act: deleteAction,
              label: "shared.buttons.delete",
              disabled: deleteAction === undefined,
            },
          ],
        },
      };
    }, [addAction, deleteAction])
  );

  return <ButtonActionsGroup {...makeProps()}></ButtonActionsGroup>;
}

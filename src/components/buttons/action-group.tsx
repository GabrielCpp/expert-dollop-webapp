import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";
import { useCallback, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { once } from "lodash";

type ButtonAction = () => void;

interface ActionIconButtonDetails {
  icon: JSX.Element;
  act: ButtonAction;
}

export interface ActionButtonsProps {
  iconButtons: ActionIconButtonDetails[];
  moreMenuButton?: {
    icon: JSX.Element;
    actions: {
      label: string;
      act?: ButtonAction;
    }[];
  };
}

function useBoundedCallbacks<E, A, C>(
  elements: E[],
  getArg: (e: E) => A,
  makeCallback: (a: A) => C
): C[] {
  const callbacks = useRef(new Map<A, C>());

  const args: A[] = elements.map((e) => getArg(e));

  for (const arg of callbacks.current.keys()) {
    if (!args.includes(arg)) {
      callbacks.current.delete(arg);
    }
  }

  for (const arg of args) {
    if (!callbacks.current.has(arg)) {
      callbacks.current.set(arg, makeCallback(arg));
    }
  }

  return args.map((a) => callbacks.current.get(a) as C);
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

  const acts = useBoundedCallbacks(
    actions,
    (a) => a.act as ButtonAction,
    (act: () => void) => () => {
      handleClose();
      act();
    }
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
            <MenuItem key={index} onClick={acts[index]}>
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
    useCallback(
      (): ActionButtonsProps => ({
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
            },
          ],
        },
      }),
      [addAction, deleteAction]
    )
  );

  return <ButtonActionsGroup {...makeProps()}></ButtonActionsGroup>;
}

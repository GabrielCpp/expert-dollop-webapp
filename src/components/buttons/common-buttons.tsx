import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import { Button, IconButton, Tooltip, styled } from "@mui/material";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";

const ButtonFullWidth = styled(Button)({
  width: "100%",
});

type ButtonProps = Parameters<typeof Button>[0];
interface ButtonLinkProps extends ButtonProps {
  label?: string;
  to?: string;
  title?: string;
}

export function CheckIconButton(props: ButtonLinkProps) {
  const { t } = useTranslation();
  return buildButton(IconButton, {
    ...props,
    ...getLinkProps(props),
    ...getTranslations(t, props),
    label: <CheckIcon fontSize="inherit" />,
  });
}

export function AddIconButton(props: ButtonLinkProps) {
  const { t } = useTranslation();
  return buildButton(IconButton, {
    ...props,
    ...getLinkProps(props),
    ...getTranslations(t, props),
    label: <AddIcon fontSize="inherit" />,
  });
}

export function DeleteIconButton(props: ButtonLinkProps) {
  const { t } = useTranslation();
  return buildButton(IconButton, {
    ...props,
    ...getLinkProps(props),
    ...getTranslations(t, props),
    label: <DeleteIcon fontSize="inherit" />,
  });
}

export function EditIconButtonLink(props: ButtonLinkProps): JSX.Element {
  const { t } = useTranslation();
  return buildButton(IconButton, {
    ...props,
    ...getLinkProps(props),
    ...getTranslations(t, props),
    label: <EditIcon fontSize="inherit" />,
  });
}

export function AddButtonLinkFullWidth(props: ButtonLinkProps): JSX.Element {
  const { t } = useTranslation();
  return buildButton(ButtonFullWidth, {
    ...props,
    variant: "outlined",
    startIcon: <AddIcon />,
    ...getLinkProps(props),
    ...getTranslations(t, props),
  });
}

export function EditButtonLink(props: ButtonLinkProps): JSX.Element {
  const { t } = useTranslation();
  return buildButton(Button, {
    ...props,
    variant: "outlined",
    startIcon: <EditIcon />,
    ...getLinkProps(props),
    ...getTranslations(t, props),
  });
}

export function DeleteButtonLink(props: ButtonLinkProps): JSX.Element {
  const { t } = useTranslation();
  return buildButton(Button, {
    ...props,
    variant: "outlined",
    startIcon: <DeleteIcon />,
    ...getLinkProps(props),
    ...getTranslations(t, props),
  });
}

export function AddButtonLink(props: ButtonLinkProps): JSX.Element {
  const { t } = useTranslation();
  return buildButton(Button, {
    ...props,
    variant: "outlined",
    startIcon: <AddIcon />,
    ...getLinkProps(props),
    ...getTranslations(t, props),
  });
}

export function OutlinedButtonLink(props: ButtonLinkProps) {
  const { t } = useTranslation();
  return buildButton(Button, {
    ...props,
    variant: "outlined",
    ...getLinkProps(props),
    ...getTranslations(t, props),
  });
}

function buildButton(
  ButtonNode: (
    p: Omit<ButtonLinkProps, "label" | "title"> & { component?: unknown }
  ) => any,
  {
    label,
    title,
    ...other
  }: Omit<ButtonLinkProps, "label" | "title"> & {
    component?: unknown;
    label?: ReactNode;
    title?: ReactNode;
  }
) {
  let button: JSX.Element = <ButtonNode {...other}>{label}</ButtonNode>;

  if (title) {
    button = <Tooltip title={title}>{button}</Tooltip>;
  }

  return button;
}

function getLinkProps(props: ButtonLinkProps) {
  return props.to === undefined
    ? {}
    : {
        component: RouterLink,
        to: props.to,
      };
}

function getTranslations(t: (k: string) => ReactNode, props: ButtonLinkProps) {
  return {
    label: props.label ? t(props.label) : "",
    title: props.title ? t(props.title) : undefined,
  };
}

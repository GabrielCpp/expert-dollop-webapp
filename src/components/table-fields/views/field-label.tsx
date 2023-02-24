import { Tooltip, Typography } from "@mui/material";
import { ReactNode, ReactNodeArray } from "react";
import { applyT, Translator } from "../form-field-record";

interface FieldLabelProps {
  label?: ReactNode;
  translated?: boolean;
  title?: ReactNode;
  t: Translator;
  children?: ReactNode | ReactNodeArray;
  component?: (p: { children: ReactNodeArray }) => JSX.Element;
}

export function FieldLabel({
  label,
  title,
  t,
  children,
  translated = false,
  component: Component = Typography,
}: FieldLabelProps): JSX.Element | null {
  let node: JSX.Element | null = null;

  if (label) {
    node = (
      <Component>
        {!translated ? applyT(t, label as string) : label}
        {children}
      </Component>
    );

    if (title) {
      node = <Tooltip title={applyT(t, title)}>{node}</Tooltip>;
    }
  }

  return node;
}

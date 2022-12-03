import { Tooltip, Typography } from "@mui/material";
import { ReactElement, ReactNode, ReactNodeArray } from "react";
import { TranslatedString, Translator } from "../form-field-record";

interface FieldLabelProps {
  label?: string | TranslatedString;
  translated?: boolean;
  title?: string;
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
        {!translated ? t(label as string) : label}
        {children}
      </Component>
    );

    if (title) {
      node = <Tooltip title={t(title)}>{node}</Tooltip>;
    }
  }

  return node;
}

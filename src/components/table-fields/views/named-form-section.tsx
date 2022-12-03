import { isEqual } from "lodash";
import React, { useRef } from "react";
import { usePrevious } from "react-use";
import { MixedChildren } from "../helpers";
import { useForm } from "../hooks";
import { FormSection, FormSectionProps } from "./form-section";

interface NamedFormSectionProps {
  name: string;
  parentPath: string | string[];
  ordinal?: number;
  children: (p: string[]) => MixedChildren;
  deps?: React.DependencyList;
}

export function NamedFormSection({
  name,
  parentPath,
  ordinal,
  children,
  deps,
  ...others
}: NamedFormSectionProps & Omit<FormSectionProps, "children">) {
  const { formPath } = useForm({ name, parentPath, metadata: { ordinal } });
  const elements = useRef<MixedChildren>(null);
  const previousDeps = usePrevious(deps);

  if (previousDeps === undefined || !isEqual(previousDeps, deps)) {
    elements.current = children(formPath);
  }

  return <FormSection {...others}>{elements.current}</FormSection>;
}

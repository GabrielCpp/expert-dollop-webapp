import { useEffect, useState } from "react";
import { useHiddenField } from "../hooks";

interface HiddenFieldProps {
  name: string;
  parentPath: string[];
  value: unknown;
  ordinal?: number;
}

export function HiddenField({
  name,
  parentPath,
  value,
  ordinal,
}: HiddenFieldProps) {
  const [metadata, setMetadata] = useState({ ordinal });

  useHiddenField({
    name,
    parentPath,
    value,
    metadata,
  });

  useEffect(() => setMetadata({ ordinal }), [ordinal]);

  return null;
}

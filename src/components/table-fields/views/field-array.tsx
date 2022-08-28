import { useRef } from "react";
import { FieldArrayElement } from "../hooks/use-field-array";

export interface OrdinalMetadata {
  ordinal: number;
}

interface FieldArrayProps<T> {
  elements: FieldArrayElement<T>[];
  current?: string;
  children: (
    element: FieldArrayElement<T>,
    metadata: OrdinalMetadata
  ) => JSX.Element;
}

export function FieldArray<T>({
  elements,
  current,
  children,
}: FieldArrayProps<T>): JSX.Element {
  const lastFields = useRef<Map<string, OrdinalMetadata>>(
    new Map<string, OrdinalMetadata>()
  );
  const content = elements.map((element, index) => {
    let metadata = lastFields.current.get(element.id);

    if (metadata === undefined) {
      metadata = { ordinal: index };
      lastFields.current.set(element.id, metadata);
    }

    metadata.ordinal = index;

    if (current === undefined || current === element.id) {
      return children(element, metadata);
    }

    return null;
  });

  for (const previousId of lastFields.current.keys()) {
    if (!elements.some((e) => e.id === previousId)) {
      lastFields.current.delete(previousId);
    }
  }

  return <>{content}</>;
}

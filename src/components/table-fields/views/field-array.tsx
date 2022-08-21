import { useRef } from "react";

interface OrdinalMetadata {
  ordinal: number;
}
interface FieldArrayProps {
  ids: string[];
  children: (id: string, metadata: OrdinalMetadata) => JSX.Element;
}

export function FieldArray({ ids, children }: FieldArrayProps): JSX.Element {
  const lastFields = useRef<Map<string, OrdinalMetadata>>(
    new Map<string, OrdinalMetadata>()
  );
  const content = ids.map((id, index) => {
    let metadata = lastFields.current.get(id);

    if (metadata === undefined) {
      metadata = { ordinal: index };
      lastFields.current.set(id, metadata);
    }

    metadata.ordinal = index;

    return children(id, metadata);
  });

  for (const previousId of lastFields.current.keys()) {
    if (!ids.includes(previousId)) {
      lastFields.current.delete(previousId);
    }
  }

  return <>{content}</>;
}

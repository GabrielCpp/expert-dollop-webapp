import { useRef } from "react";
import { useId } from "../../../shared/redux-db";

export type TagMetadata = { tag: string };
export function useFieldTag(forceTag?: string): TagMetadata {
  const tag = useId(forceTag);
  const tagRef = useRef({ tag });
  return tagRef.current;
}

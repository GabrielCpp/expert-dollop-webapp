import { AcceptableChild } from "../helpers";
import {
  useFieldArray,
  UseFieldArray,
  UseFieldArrayHook,
} from "../hooks/use-field-array";

interface FormArrayProps<T, FrameProps, ElementProps> {
  frameTemplate: (
    p: { children: AcceptableChild } & Omit<UseFieldArray<T>, "elements"> &
      FrameProps
  ) => JSX.Element;
  elementTemplate: (
    p: {
      children: UseFieldArray<T>["elements"][number];
      parentPath: string[];
    } & ElementProps
  ) => JSX.Element;
  frameProps: FrameProps;
  elementProps: ElementProps;
  parentPath: string[];
}

export function FormArray<T, FrameProps, ElementProps>({
  frameTemplate: Frame,
  elementTemplate: Element,
  elementProps,
  frameProps,
  parentPath,
  ...arrayHookProps
}: FormArrayProps<T, FrameProps, ElementProps> &
  UseFieldArrayHook<T>): JSX.Element {
  const { elements, ...other } = useFieldArray(arrayHookProps);

  return (
    <Frame {...other} {...frameProps}>
      {elements.map((element) => (
        <Element parentPath={parentPath} key={element.id} {...elementProps}>
          {element}
        </Element>
      ))}
    </Frame>
  );
}

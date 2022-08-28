import { flatten } from "lodash";

export type AcceptableChild = JSX.Element | JSX.Element[] | false | null;
export type MixedChildren = AcceptableChild | AcceptableChild[]
export function getJsxElements(children: MixedChildren): JSX.Element[] {
  return (
    Array.isArray(children) ? flatten(children) : [children]
  ).filter((x) => Boolean(x)) as JSX.Element[];
}

export class KeyMapping<T extends string = string> {
  private map: Map<string, string>;
  private defaultValue?: string;

  public constructor(keys: Record<T, string>, defaultValue?: string) {
    this.map = new Map<string, string>(Object.entries(keys));
    this.defaultValue = defaultValue;
  }

  public get(...keys: T[]): string {
    const key = keys.join("/");
    let value = this.map.get(key);

    if (value === undefined) {
      if (this.defaultValue === undefined) {
        throw new Error(`Translation for key '${key}' was not found`);
      } else {
        value = this.defaultValue;
      }
    }

    return value;
  }
}

export class KeyNamespace<Namespace extends string, K extends string> {
  private namespaces: Map<Namespace, KeyMapping<K>>;

  public constructor(namespaces: Record<Namespace, KeyMapping<K>>) {
    this.namespaces = new Map<Namespace, KeyMapping<K>>(
      Object.entries(namespaces) as [Namespace, KeyMapping<K>][]
    );
  }

  public get(n: Namespace, ...keys: K[]): string {
    const keyGetter = this.namespaces.get(n);

    if (keyGetter === undefined) {
      throw new Error(`No such namespace '${n}'`);
    }

    return keyGetter.get(...keys);
  }
}
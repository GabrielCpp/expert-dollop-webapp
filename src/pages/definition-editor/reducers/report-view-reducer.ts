import { SelectOption } from "@mui/base";
import { head, tail } from "lodash";
import { useCallback } from "react";
import { useMethods } from "react-use";
import { DefaultEmptyId } from "../../../components/table-fields/hooks/use-field";
import {
  AfterInsert,
  AfterRemove,
  OnInsert,
  OnRemove,
} from "../../../components/table-fields/hooks/use-field-array";
import { ReportJoin, ReportViewQuery } from "../../../generated";
import { useCallbackValue } from "../../../shared/redux-db";

export type Collections = ReportViewQuery["findDefinitionAggregateCollections"];
export type Collection = Collections[number];

export interface JoinOption extends SelectOption<string> {
  collection: Collection;
  name: string;
  tag: string;
}

export interface ReportViewState {
  collections: Collections;
  abstractCollection: AbstractAliasedCollection;
  fromCollections: AliasedCollection[];
  toCollections: AliasedCollection[];
  canAddNewCollection: boolean;
  elementOptions: Record<string, ElementDetails>;
}

interface ElementDetails {
  fromOptionSelected: JoinOption;
  fromOptions: JoinOption[];
  toOptions: JoinOption[];
  toOptionSelected: JoinOption;
  alias: string;
}

interface AliasedCollection {
  tag: string;
  collection: Collection;
  alias: string;
  options: JoinOption[];
}

interface AbstractAliasedCollection {
  alias: string;
  options: SelectOption<string>[];
  selectedOption: string;
}

export const DefaultOption: JoinOption = {
  tag: "",
  name: "",
  label: "Please select option",
  value: DefaultEmptyId,
  collection: {
    attributesSchema: [],
    id: "",
    isAbstract: false,
    name: "",
    projectDefinitionId: "",
    translated: [],
  },
};

export interface ReportViewReducerMethods {
  addJoin: OnInsert<ReportJoin>;
  removeJoin: OnRemove<ReportJoin>;
  updateAliasName(p: { elementId: string; alias: string }): void;
  updateJoinFrom(p: { elementId: string; option?: JoinOption }): void;
  updateJoinTo(p: { elementId: string; option?: JoinOption }): void;
  updateAbstractCollection({ value }: { value: string }): void;
}

export function useReportViewReducer(
  collections: Collections
): [ReportViewState, ReportViewReducerMethods] {
  const createInitialState = useCallback((): ReportViewState => {
    const toCollections = collections.filter((x) => !x.isAbstract);
    const abstractCollections = collections.filter((x) => x.isAbstract);
    const firstAbstractCollection = head(abstractCollections);

    if (firstAbstractCollection === undefined) {
      return {
        collections,
        abstractCollection: {
          alias: "",
          options: [],
          selectedOption: DefaultEmptyId,
        },
        fromCollections: [],
        toCollections: [],
        elementOptions: {},
        canAddNewCollection: false,
      };
    }

    return {
      collections,
      abstractCollection: {
        options: abstractCollections.map((c) => ({
          label: c.name,
          value: c.id,
        })),
        selectedOption: firstAbstractCollection.id,
        alias: firstAbstractCollection.name,
      },
      fromCollections: [
        buildAliasedCollection(
          firstAbstractCollection,
          firstAbstractCollection.id,
          firstAbstractCollection.name,
        ),
      ],
      toCollections: toCollections.map((c) =>
        buildAliasedCollection(c, c.id, c.name)
      ),
      elementOptions: {},
      canAddNewCollection: toCollections.length > 0,
    };
  }, [collections]);
  const initialState = useCallbackValue(createInitialState);
  return useMethods<ReportViewReducerMethods, ReportViewState>(
    createMethods,
    initialState
  );
}

function createMethods(state: ReportViewState) {
  function updateAbstractCollection({
    value,
  }: {
    value: string;
  }): ReportViewState {
    const collection = state.collections.find((c) => c.id === value);

    if (collection === undefined) {
      return state;
    }

    return {
      ...state,
      abstractCollection: {
        ...state.abstractCollection,
        selectedOption: value,
      },
      fromCollections: state.fromCollections.map((c) =>
        c.collection.id === collection.id
          ? buildAliasedCollection(
              collection,
              collection.id,
              state.abstractCollection.alias
            )
          : c
      ),
    };
  }

  function updateAbstractAlias({ value }: { value: string }): ReportViewState {
    if (state.abstractCollection === undefined) {
      return state;
    }

    return {
      ...state,
      abstractCollection: {
        ...state.abstractCollection,
        alias: value,
      },
    };
  }

  function addJoin({ element }: AfterInsert<ReportJoin>): ReportViewState {
    const fromCollection = head(state.fromCollections);
    const alias = fromCollection?.alias || "";
    const fromOptions: JoinOption[] = state.fromCollections.flatMap(
      (c) => c.options
    );
    const fromOptionSelected = head(fromOptions) || DefaultOption;
    const newFromCollection: AliasedCollection = buildAliasedCollection(
      fromOptionSelected.collection,
      element.id,
      alias
    );

    if (fromCollection === undefined) {
      return state;
    }

    return {
      ...state,
      fromCollections: [...tail(state.fromCollections), newFromCollection],
      canAddNewCollection: state.fromCollections.length - 1 > 0,
      elementOptions: {
        ...state.elementOptions,
        [element.id]: {
          alias,
          fromOptions,
          fromOptionSelected,
          toOptions: state.toCollections.flatMap((c) => c.options),
          toOptionSelected: DefaultOption,
        },
      },
    };
  }

  function removeJoin(p: AfterRemove<ReportJoin>): ReportViewState {
    return state;
  }

  function updateAliasName({
    elementId,
    alias,
  }: {
    elementId: string;
    alias: string;
  }): ReportViewState {
    const bucket = state.elementOptions[elementId];
    const newElementOptions: Record<string, ElementDetails> = {};
    const newCollection: AliasedCollection = buildAliasedCollection(
      bucket.fromOptionSelected.collection,
      elementId,
      alias
    );

    for (const [id, aliased] of Object.entries(state.elementOptions)) {
      if (id === elementId) {
        newElementOptions[id] = {
          ...aliased,
          alias,
        };
      } else if (aliased.fromOptions.some((o) => o.tag === elementId)) {
        const fromOptions = aliased.fromOptions;
        const newFromOptions = fromOptions.map((o: JoinOption) => {
          if (o.tag === elementId) {
            return buildOption(o.collection, alias, o.name, o.tag);
          }

          return o;
        });

        newElementOptions[id] = {
          ...aliased,
          fromOptions: newFromOptions,
          fromOptionSelected: buildOption(
            aliased.fromOptionSelected.collection,
            alias,
            aliased.fromOptionSelected.name,
            aliased.fromOptionSelected.tag
          ),
        };
      } else {
        newElementOptions[id] = aliased;
      }
    }

    return {
      ...state,
      fromCollections: remap(state.fromCollections, c => c.tag === elementId, newCollection),
      elementOptions: newElementOptions
    };
  }

  function updateJoinFrom(p: {
    elementId: string;
    option?: JoinOption;
  }): ReportViewState {
    return state;
  }

  function updateJoinTo(p: {
    elementId: string;
    option?: JoinOption;
  }): ReportViewState {
    return state;
  }

  return {
    addJoin,
    removeJoin,
    updateAliasName,
    updateJoinFrom,
    updateJoinTo,
    updateAbstractCollection,
    updateAbstractAlias,
  };
}

function remap<T>(elements: T[], shouldBeReplaced: (e: T) => boolean, replacement: T ): T[] {
  return elements.map(e => shouldBeReplaced(e) ? replacement : e)
}

function buildAliasedCollection(
  collection: Collection,
  tag: string,
  alias: string
): AliasedCollection {
  return {
    tag,
    collection,
    alias,
    options: buildOptions(collection, alias, tag),
  };
}

function buildOptions(
  collection: Collection,
  alias: string,
  tag: string
): JoinOption[] {
  return collection.attributesSchema.map((c) =>
    buildOption(collection, alias, c.name, tag)
  );
}

function buildOption(
  collection: Collection,
  alias: string,
  name: string,
  tag: string
): JoinOption {
  return {
    value: `${tag}.${name}`,
    label: `${alias}.${name}`,
    name,
    collection,
    tag,
  };
}

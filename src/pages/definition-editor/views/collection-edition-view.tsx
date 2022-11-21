import { useParams } from "react-router-dom";
import { useLoaderEffect } from "../../../components/loading-frame";
import {
  AggregateCollectionInput,
  useFindAggregateCollectionQuery,
  useUpdateAggregateCollectionMutation,
} from "../../../generated";
import { CollectionForm } from "../forms/collection-form";
import { mapAttributeSchemaDetails } from "../mappings/config-mapping";

interface CollectionEditionViewParams {
  projectDefinitionId: string;
  collectionId: string;
}

interface CollectionEditionViewProps {
  completeAction?: (() => Promise<unknown>) | undefined;
}

export function CollectionEditionView({
  completeAction,
}: CollectionEditionViewProps) {
  const { projectDefinitionId, collectionId } =
    useParams<CollectionEditionViewParams>();
  const [updateAggregateCollection] = useUpdateAggregateCollectionMutation();
  const { data, loading, error } = useFindAggregateCollectionQuery({
    variables: {
      collectionId,
      projectDefinitionId,
    },
  });

  useLoaderEffect(error, loading);

  if (data === undefined) {
    return null;
  }

  async function onSubmit(data: AggregateCollectionInput) {
    await updateAggregateCollection({
      variables: {
        projectDefinitionId,
        collectionId,
        collection: data,
      },
    });

    if (completeAction) {
      await completeAction();
    }
  }

  const collection: AggregateCollectionInput = {
    name: data.findAggregateCollection.name,
    isAbstract: data.findAggregateCollection.isAbstract,
    attributesSchema: data.findAggregateCollection.attributesSchema.map(
      (x) => ({
        name: x.name,
        details: mapAttributeSchemaDetails(
          x.details,
          data.findAggregateCollection.translated
        ),
      })
    ),
  };

  return (
    <CollectionForm
      role={"edit"}
      collection={collection}
      projectDefinitionId={projectDefinitionId}
      onSubmit={onSubmit}
    />
  );
}

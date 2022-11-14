import { useParams } from "react-router-dom";
import {
  AggregateCollectionInput,
  useAddAggregateCollectionMutation,
} from "../../../generated";
import { CollectionForm } from "../forms/collection-form";

interface CollectionCreationViewParams {
  projectDefinitionId: string;
}

interface CollectionCreationViewProps {
  completeAction?: (() => Promise<unknown>) | undefined;
}

export function CollectionCreationView({
  completeAction,
}: CollectionCreationViewProps) {
  const { projectDefinitionId } = useParams<CollectionCreationViewParams>();
  const collection: AggregateCollectionInput = {
    name: "",
    isAbstract: false,
    attributesSchema: [],
  };

  const [addAggregateCollection] = useAddAggregateCollectionMutation();

  async function onSubmit(data: AggregateCollectionInput) {
    await addAggregateCollection({
      variables: {
        projectDefinitionId,
        collection: data,
      },
    });

    if (completeAction) {
      await completeAction();
    }
  }

  return (
    <CollectionForm
      role={"add"}
      collection={collection}
      projectDefinitionId={projectDefinitionId}
      onSubmit={onSubmit}
    />
  );
}

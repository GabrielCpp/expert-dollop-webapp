import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useLoaderEffect } from "../../../components/loading-frame";
import {
  FieldDetailsType,
  ProjectDefinitionNode,
  useFindProjectDefinitionNodeQuery,
} from "../../../generated";
import { useServices } from "../../../services-def";
import { splitPath } from "../../project-editor/routes";
import { levelMapping } from "../form-definitions";
import { NodeForm } from "../forms/node-form";

export interface AddContainerFormProps {
  configType: FieldDetailsType;
}

interface AddContainerFormBody {
  name: string;
  isCollection: boolean;
  instanciateByDefault: boolean;
  orderIndex: number;
  fr: {
    label: string;
    helpText: string;
  };

  en: {
    label: string;
    helpText: string;
  };

  config?: {
    isCollapsible: boolean;
  };
}

interface AddContainerFormParams {
  projectDefinitionId: string;
  selectedPath: string;
}

export function AddContainerView() {
  const { reduxDb, ajv, apollo } = useServices();
  const { projectDefinitionId, selectedPath } =
    useParams<AddContainerFormParams>();
  const nodePath = splitPath(selectedPath);
  const level = levelMapping[nodePath.length];
  /*
  function getFieldDetails(): FieldDetailsType | null {
    return null;
  }

  async function onSubmit() {
    if (validateForm(reduxDb, ajv)(path) === false) {
      return;
    }

    let newNodePath: string[] = [];

    if (nodePath.length > 0) {
      const { data } = await apollo.query<FindProjectDefinitionNodeQuery>({
        query: FindProjectDefinitionNodeDocument,
        variables: {
          projectDefinitionId: projectDefinitionId,
          nodeId: nodePath[nodePath.length - 1],
        },
      });

      const node = data.findProjectDefinitionNode;
      newNodePath = [...node.path, node.id];
    }

    const form = hydrateForm<AddContainerFormBody>(reduxDb, path);

    await apollo.mutate({
      mutation: AddProjectDefinitionNodeDocument,
      variables: {
        node: {
          id: uuidv4(),
          projectDefinitionId: projectDefinitionId,
          name: form.name,
          isCollection: form.isCollection,
          instanciateByDefault: form.instanciateByDefault,
          orderIndex: form.orderIndex,
          config: {
            fieldDetails: getFieldDetails(),
            valueValidator: null,
          },
          defaultValue: null,
          path: newNodePath,
        },
      },
    });
  }
*/
  const node: ProjectDefinitionNode = {
    id: uuidv4(),
    isCollection: false,
    projectDefinitionId: projectDefinitionId,
    name: "",
    instanciateByDefault: true,
    orderIndex: 0,
    config: {
      fieldDetails: null,
      valueValidator: null,
      translations: {
        helpTextName: "",
        label: "",
      },
      triggers: [],
    },
    defaultValue: null,
    path: [],
    children: [],
    translations: [],
  };

  return <NodeForm level={level} node={node} role="add" />;
}

interface EditContainerFormParams {
  projectDefinitionId: string;
  selectedPath: string;
  nodeId: string;
}

export function EditContainerView() {
  const { projectDefinitionId, selectedPath, nodeId } =
    useParams<EditContainerFormParams>();
  const nodePath = splitPath(selectedPath);
  const level = levelMapping[nodePath.length];

  const { data, loading, error } = useFindProjectDefinitionNodeQuery({
    variables: {
      projectDefinitionId: projectDefinitionId,
      nodeId,
    },
  });

  useLoaderEffect(error, loading);

  if (data === undefined) {
    return null;
  }

  const node: ProjectDefinitionNode = {
    ...data.findProjectDefinitionNode,
    children: [],
  };

  return <NodeForm level={level} node={node} role="edit" />;
}

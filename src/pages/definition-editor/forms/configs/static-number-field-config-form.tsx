import { useTranslation } from "react-i18next";
import {
  useForm,
  SelectOption,
  Field,
  remoteReferencePickerField,
} from "../../../../components/table-fields";
import {
  FindDefinitionFormulaFieldMixQuery,
  QueryFindDefinitionFormulaFieldMixArgs,
  FindDefinitionFormulaFieldMixDocument,
  FindFormulaQuery,
  QueryFindFormulaArgs,
  FindFormulaDocument,
  StaticNumberFieldConfig,
} from "../../../../generated";
import { useServices } from "../../../../services-def";
import {
  useApolloPageFetch,
  useApolloFetchItem,
} from "../../../../shared/async-cursor";

interface StaticNumberFieldConfigProps {
  name: string;
  parentPath: string[];
  labels: {
    string: {
      name: string;
      label: string;
    };
  };
  config?: StaticNumberFieldConfig | null;
}

export function StaticNumberFieldConfigForm({
  name,
  parentPath,
  labels,
  config,
  projectDefinitionId,
}: StaticNumberFieldConfigProps & { projectDefinitionId: string }) {
  const { t } = useTranslation();
  const { formPath } = useForm({ name, parentPath });
  const { apollo, loader } = useServices();
  const formulaNodeFetcher = useApolloPageFetch<
    SelectOption,
    FindDefinitionFormulaFieldMixQuery,
    QueryFindDefinitionFormulaFieldMixArgs
  >({
    apollo,
    document: FindDefinitionFormulaFieldMixDocument,
    onError: loader.onError,
    variables: {
      projectDefinitionId,
    },
  });

  const fetchFormulabyId = useApolloFetchItem<
    SelectOption,
    FindFormulaQuery,
    QueryFindFormulaArgs,
    "formulaId"
  >({
    apollo,
    document: FindFormulaDocument,
    onError: loader.onError,
    variables: {
      projectDefinitionId,
    },
    idKey: "formulaId",
  });

  return (
    <Field
      validator={true}
      defaultValue={""}
      path={formPath}
      name={labels.string.name}
      key={labels.string.name}
      label={labels.string.label}
      t={t}
      component={remoteReferencePickerField}
      fetchPage={formulaNodeFetcher}
      findById={fetchFormulabyId}
    />
  );
}

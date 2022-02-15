import { useDbTranslation as useDbTranslator } from "../../../components/translation";

export const useDbTranslation = (ressourceId: string) =>
  useDbTranslator(ressourceId, "project_definition_editor.empty_placeholder");

import { useDbTranslation as useDbTranslator } from "../../../components/translation";

export const useDbTranslation = (ressourceId: string) =>
  useDbTranslator(ressourceId, "definition_editor.shared.empty_placeholder");

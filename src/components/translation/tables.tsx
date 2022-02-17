import { PrimaryIndex, TableRecord } from "../../shared/redux-db";
import { ReduxDatabase } from "../../shared/redux-db/database";

const TranslationTableName = "translation";

export interface LocalizedTranslation extends TableRecord {
  ressourceId: string;
  name: string;
  value: string;
}

function buildTranslationPk(translation: TableRecord): string {
  return translation.name as string;
}

export function setupTables(reduxDb: ReduxDatabase) {
  reduxDb.addTable(TranslationTableName, new PrimaryIndex(buildTranslationPk));
}

export function addTranslations(
  reduxDb: ReduxDatabase,
  translations: LocalizedTranslation[]
): void {
  reduxDb.getTable(TranslationTableName).upsertMany(translations);
}

export function getAllRessourceId(reduxDb: ReduxDatabase): string[] {
  const ressourceIds = new Set<string>();
  reduxDb
    .getTable(TranslationTableName)
    .where((record: LocalizedTranslation) => {
      ressourceIds.add(record.ressourceId);
      return false;
    });

  return Array.from(ressourceIds.keys());
}


import { Translation } from '../../generated';
import { PrimaryIndex, TableRecord } from '../../shared/redux-db';
import { ReduxDatabase } from '../../shared/redux-db/database';

const TranslationTableName = 'translation';

type TranslationRecord = TableRecord

function buildTranslationPk(translation: TranslationRecord): string {
    return `${translation.ressourceId}-${translation.locale}-${translation.name}`
}

export function setupTables(reduxDb: ReduxDatabase) {
    reduxDb.addTable(TranslationTableName, new PrimaryIndex(buildTranslationPk))
}

export function addTranslations(reduxDb: ReduxDatabase, translations: Translation[]): void {
    reduxDb.getTable(TranslationTableName).upsertMany(translations)
}
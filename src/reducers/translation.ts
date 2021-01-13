import { TFunction, useTranslation } from 'react-i18next';
import { useDatabase } from '../common/query-hook/index';
import { Translation } from '../models';

export function useDbTranslation(ressourceId: string): { dbTrans: (key: string) => string, t: TFunction<string> } {
    const database = useDatabase()
    const { t, i18n } = useTranslation()
    const translation = database.getTable('translation')

    return {
        t,
        dbTrans: (key: string) => translation.findRecordSafe<Translation>(`${ressourceId}-${i18n.language}-${key}`)?.value || key
    }
}

export function getI18nLabelKey(name: string): string {
    return name
}

export function getI18nHelpTextKey(name: string): string {
    return `${name}_helptext`
}
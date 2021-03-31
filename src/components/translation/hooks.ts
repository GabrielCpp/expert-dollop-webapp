import { TFunction, useTranslation } from 'react-i18next';
import { Translation } from '../../generated';
import { Services } from '../../hooks';
import { useServices } from '../../shared/service-context';

interface TranslationHook {
    labelTrans: (key: string) => string;
    helpTextTrans: (key: string) => string;
    dbTrans: (key: string) => string;
    t: TFunction<string>;
}


export function useDbTranslation(ressourceId: string): TranslationHook {
    const { reduxDb } = useServices<Services>()
    const { t, i18n } = useTranslation()
    const translation = reduxDb.getTable('translation')

    function trans(key: string, suffix: string = '') {
        return translation.findRecordSafe<Translation>(`${ressourceId}-${i18n.language}-${key}${suffix}`)?.value || key
    }

    return {
        t,
        dbTrans: trans,
        labelTrans: trans,
        helpTextTrans: (key: string) => trans(key, '_helptext')
    }
}

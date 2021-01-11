import { TableRecord } from "../common/redux-db";

export interface Translation extends TableRecord {
    ressourceId: string;
    locale: string;
    name: string;
    value: string;
}

export function createTranslation(
    ressourceId: string,
    locale: string,
    name: string,
    value: string,
): Translation {
    return {
        ressourceId,
        locale,
        name,
        value
    };
}
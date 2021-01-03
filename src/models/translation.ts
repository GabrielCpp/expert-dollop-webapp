import { TableRecord } from "../common/redux-db";

export interface Translation extends TableRecord {
    ressourceId: string
    locale: string
    name: string
    value: string
}
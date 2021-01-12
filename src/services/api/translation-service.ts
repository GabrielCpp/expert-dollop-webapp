import { AxiosInstance } from "axios";
import { AsyncCursor, AsyncRestCursor, buildRelativeUrl } from "../../common/async-cursor";
import { Translation } from "../../models";

export class TranslationService {
    private axios: AxiosInstance;

    public constructor(axios: AxiosInstance) {
        this.axios = axios;
    }

    public getRessourceTranslation(ressourceId: string): AsyncCursor<Translation[]> {
        return new AsyncRestCursor(
            this.axios, 
            500, 
            (nextPageToken, limit) => buildRelativeUrl(`/api/${ressourceId}/translations`,  {
                nextPageToken,
                limit
            })
        );
    }
    public addTranslations(translations: Translation[]): Promise<Translation[]> {
        return this.axios.post(`/api/translations`, translations).then(request => request.data);
    }
}
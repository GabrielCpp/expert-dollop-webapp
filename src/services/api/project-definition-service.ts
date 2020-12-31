import { AxiosInstance } from 'axios';
import { inject, injectable } from 'inversify';
import { ProjectDefinition } from '../../models';
import { AXIOS_SERVICE } from '../external';

@injectable()
export class ProjectDefinitionService {
    private axios: AxiosInstance;

    public constructor(@inject(AXIOS_SERVICE) axios: AxiosInstance) {
        this.axios = axios;
    }

    public getProjectDefinition(projectDefinitionId: string): Promise<ProjectDefinition> {
        return this.axios.get(`/api/project_definition/${projectDefinitionId}`)
    }
}
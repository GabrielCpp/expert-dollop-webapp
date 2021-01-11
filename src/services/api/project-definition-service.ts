import { AxiosInstance } from 'axios';
import { ProjectDefinition } from '../../models';

export class ProjectDefinitionService {
    private axios: AxiosInstance;

    public constructor(axios: AxiosInstance) {
        this.axios = axios;
    }

    public getProjectDefinition(projectDefinitionId: string): Promise<ProjectDefinition> {
        return this.axios.get(`/api/project_definition/${projectDefinitionId}`)
    }

    public addProjectDefinition(projectDefinition: ProjectDefinition): Promise<ProjectDefinition> {
        return this.axios.post(`/api/project_definition`, projectDefinition)
    }
}
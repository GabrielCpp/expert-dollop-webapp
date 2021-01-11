import { AxiosInstance } from 'axios';
import { AsyncCursor, AsyncRestCursor, buildRelativeUrl } from '../../common/async-cursor';
import { ProjectContainerDefinition } from '../../models';

export class ProjectContainerDefinitionService {
    private axios: AxiosInstance;

    public constructor(axios: AxiosInstance) {
        this.axios = axios;
    }

    public getProjectContainerDefinitions(projectDefinitionId: string): AsyncCursor<ProjectContainerDefinition[]> {
        return new AsyncRestCursor(
            this.axios, 
            500, 
            (nextPageToken, limit) => buildRelativeUrl(`/api/${projectDefinitionId}/project_container_definitions`,  {
                nextPageToken,
                limit
            })
        );
    }

    public addProjectContainerDefinitions(projectDefinitionId: string, projectContainerDefinition: ProjectContainerDefinition[]): Promise<ProjectContainerDefinition[]> {
        return this.axios.post(`/api/${projectDefinitionId}/project_container_definitions`, projectContainerDefinition)
    }
}
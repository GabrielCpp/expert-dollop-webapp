
import { ProjectDefinitionService } from '../services/api/project-definition-service';
import { ProjectDefinition } from '../models';
import { ProjectContainerDefinition } from '../models/project-container.definition';
import { concatAll } from '../common/async-cursor';
import { RouteComponentProps, useParams } from '@reach/router'
import { useTableProvider } from '../common/query-hook';
import { ProjectContainerDefinitionService } from '../services';
import { EditorLayout } from './predykt-project-definition-editor';

interface ProjectDefinitionEditorProps {
    projectDefinitionId: string
}


export function ProjectDefinitionEditor(_: RouteComponentProps) {
    const { projectDefinitionId } = useParams() as ProjectDefinitionEditorProps

    const { isLoading, errors } = useTableProvider({
        "project_definition": {
            service: ProjectDefinitionService,
            async fetch(x: ProjectDefinitionService): Promise<ProjectDefinition[]> {
                return [await x.getProjectDefinition(projectDefinitionId)]
            }
        },
        "project_container_definition": {
            service: ProjectContainerDefinitionService,
            async fetch(x: ProjectContainerDefinitionService): Promise<ProjectContainerDefinition[]> {
                return await concatAll(x.getProjectContainerDefinitions(projectDefinitionId))
            }
        }
    })


    if(isLoading) return (<span>{'Loading..'}</span>)
    if(errors.length > 0) {
        return (<span>{'Error!'}</span>)
    }

    return (
        <EditorLayout projectDefinitionId={projectDefinitionId}></EditorLayout>
    );
} 


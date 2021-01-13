
import { ProjectDefinitionService } from '../services/api/project-definition-service';
import { ProjectDefinition, Translation } from '../models';
import { ProjectContainerDefinition } from '../models/project-container.definition';
import { concatAll } from '../common/async-cursor';
import { useParams } from 'react-router-dom'
import { useTableProvider } from '../common/query-hook';
import { ProjectContainerDefinitionService, TranslationService } from '../services';


export interface ProjectDefinitionEditorParams {
    projectDefinitionId: string
}


export function ProjectDefinitionEditor({ children }: { children: React.ReactNode }) {
    const { projectDefinitionId } = useParams() as ProjectDefinitionEditorParams
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
        },
        "translation": {
            service: TranslationService,
            async fetch(x: TranslationService): Promise<Translation[]> {
                return await concatAll(x.getRessourceTranslation(projectDefinitionId))
            }
        }
    })


    if(isLoading) return (<span>{'Loading..'}</span>)
    if(errors.length > 0) {
        console.error(errors)
        return (<span>{'Error!'}</span>)
    }

    return (
        <>
        {children}
        </>
    );
} 


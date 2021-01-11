
import { NamedRoute } from '../../common/named-routes';
import { AddContainerView } from './add-container-view';
import { EditorLayout } from './editor-layout';

export const ADD_PROJECT_SECTION_ROUTE_NAME = "add_project_section"
export const CONTAINER_VIEW_ROUTE_NAME = "container_view"

export const routes: NamedRoute[] = [
    {
        name: CONTAINER_VIEW_ROUTE_NAME,
        path: '/project_definition_editor/:projectDefinitionId/:selectedPath',
        component: EditorLayout,
        tags: [
            'main-content'
        ]
    },
    {
        name: ADD_PROJECT_SECTION_ROUTE_NAME,
        path: '/project_definition_editor/:projectDefinitionId/:selectedPath/add_section',
        component: AddContainerView,
        tags: [
            'main-content'
        ]
    }
]

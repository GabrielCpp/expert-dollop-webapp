import { Button, Grid } from '@material-ui/core';
import React from 'react';
import { Link, Route, useParams } from 'react-router-dom';

import { SidePanel } from './components/predykt-project-definition-editor/views/side-panel';
import { useDbTranslation } from './components/translation';
import { useFindProjectDefinitionRootSectionsQuery } from './generated/graphql';


interface EditorUrlParams {
    projectDefinitionId: string
    selectedPath: string;
}

function RootSectionBar() {
    const { projectDefinitionId } = useParams<EditorUrlParams>()
    const { labelTrans } = useDbTranslation(projectDefinitionId)
    const buildLink = buildLinkFor(projectDefinitionId);
    const { loading, data, error} = useFindProjectDefinitionRootSectionsQuery({
        variables: {
            id: projectDefinitionId
        }
    })

    if(error) {
        console.error(error)
    }

    if(loading) {
        return <span>Loading...</span>
    }

    if(data === undefined) {
        return null
    }

    return (
        <Grid item xs={12}>
            {data.findProjectDefinitionRootSections.roots.map(c => (
                <Button key={c.definition.name} component={Link} to={buildLink(c.definition.id)} color="primary">
                    {labelTrans(c.definition.name)}
                </Button>
            ))}
        </Grid>
    )
}

export function EditorLayout() {

/*


            <FormDefinitionEditor projectDefinitionId={projectDefinitionId} formNode={thirdNode}></FormDefinitionEditor>
*/
    return (
        <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
            spacing={4}
        >
            <RootSectionBar/>
            <Route path="/project_definition_editor/:projectDefinitionId/:rootSection">
                <SidePanel/> 
            </Route>
            
            <Grid item xs={9}>

                
            </Grid>
        </Grid>
    )
}

function buildLinkFor(projectDefinitionId: string) {
    return (...path: string[]) => {
        const selectedPath = encodeURI(`~${path.join('~')}`);
        return `/project_definition_editor/${projectDefinitionId}/${selectedPath}`
    }
}
/*
function pickPath(projectContainerDefinitionRoot: ProjectContainerDefinitionRoot, selectedPath: string[], depth: number): ProjectContainerDefinitionTree[] {
    const nodes: ProjectContainerDefinitionTree[] = [];
    let childrenIndex: Map<string, ProjectContainerDefinitionTree> = projectContainerDefinitionRoot.childrenIndex;
    let children: ProjectContainerDefinitionTree[] = projectContainerDefinitionRoot.children

    for(let index = 0; index < depth; index++) {
        const node = childrenIndex.get(selectedPath[index]) || head(children)

        if(node === undefined) {
            break;
        }

        nodes.push(node);
        childrenIndex = node.childrenIndex;
        children = node.children;
    }

    return nodes;
}

*/
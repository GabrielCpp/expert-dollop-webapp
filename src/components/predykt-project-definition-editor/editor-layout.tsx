import React, { useEffect } from 'react'
import { Button, Grid } from '@material-ui/core';
import { Link, useParams } from 'react-router-dom'
import { ProjectContainerDefinition, ProjectContainerDefinitionRoot, ProjectContainerDefinitionTree } from '../../models';
import { QueryBuilder } from '../../common/redux-db/query-builder';
import { useTableQuery } from '../../common/query-hook';
import { ops, recordParam, queryParam } from '../../common/redux-db';
import { SidePanel } from './side-panel'
import { head, noop } from 'lodash';
import { FormDefinitionEditor } from './form-definition-editor';
import { splitPath } from './helpers';
import { getI18nLabelKey, useDbTranslation } from '../../reducers';


const query = QueryBuilder
    .fromTable("project_container_definition")
    .where(ops("eq", recordParam("projectDefId"), queryParam("projectDefinitionId")))
    .binding;

interface EditorUrlParams {
    projectDefinitionId: string
    selectedPath: string;
}

export function EditorLayout() {
    const { projectDefinitionId, selectedPath }= useParams<EditorUrlParams>();
    const { dbTrans } = useDbTranslation(projectDefinitionId)
    const projectContainerDefinitionRoot = useTableQuery<ProjectContainerDefinition, ProjectContainerDefinitionRoot>(query({
        projectDefinitionId
    }), buildDisplayTree)

    const currentTreePath = splitPath(selectedPath)
    const [ firstNode, secondNode, thirdNode ] = pickPath(projectContainerDefinitionRoot, currentTreePath, 3);
    const buildLink = buildLinkFor(projectDefinitionId);


    useEffect(noop);

    return (
        <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
            spacing={4}
        >
            {firstNode && <SidePanel 
                buildLink={buildLink} 
                topLayerNode={firstNode} 
                selectedNodeFirstLayer={secondNode} 
                selectedNodeSecondLayer={thirdNode}/> 
            }   
            <Grid item xs={9}>
                <Grid item xs={12}>
                    {projectContainerDefinitionRoot.children.map(c => (
                        <Button key={c.name} component={Link} to={buildLink(c.id)} color="primary">
                            {dbTrans(getI18nLabelKey(c.name))}
                        </Button>
                    ))}
                </Grid>
                <FormDefinitionEditor projectDefinitionId={projectDefinitionId} formNode={thirdNode}></FormDefinitionEditor>
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


interface DisplayTree {
    node?: ProjectContainerDefinition
    children: Map<string, DisplayTree>
}

function createDisplayTree(node?: ProjectContainerDefinition): DisplayTree{
    return {
        node,
        children: new Map<string, DisplayTree>()
    }
}

function projectTree(root: DisplayTree): ProjectContainerDefinitionRoot {
    function projectSubTree(node: DisplayTree): ProjectContainerDefinitionTree {
        const children: ProjectContainerDefinitionTree[] = []

        for(const child of node.children.values()) {
            children.push(projectSubTree(child));
        }

        if(node.node === undefined) {
            throw new Error(`Empty Node`)
        }

        return {
            ...node.node,
            children,
            childrenIndex: new Map<string, ProjectContainerDefinitionTree>(children.map(c => [c.id, c]))
        }
    }

    const roots: ProjectContainerDefinitionTree[] = []

    for(const node of root.children.values()) {
        roots.push(projectSubTree(node));
    }

    return {
        children: roots,
        childrenIndex: new Map<string, ProjectContainerDefinitionTree>(roots.map(c => [c.id, c]))
    };
}

function buildDisplayTree(containers: ProjectContainerDefinition[]): ProjectContainerDefinitionRoot {
    const projectRoot: DisplayTree = createDisplayTree()

    for(const container of containers) {
        let containerRoot = projectRoot;

        for(const nodeId of container.path) {
            let subContainer = containerRoot.children.get(nodeId);

            if(subContainer === undefined) {
                subContainer = {
                    children: new Map<string, DisplayTree>()
                }

                containerRoot.children.set(nodeId, subContainer);
            }

            containerRoot = subContainer;
        }

        containerRoot.children.set(container.id, createDisplayTree(container))

    }

    return projectTree(projectRoot);
}
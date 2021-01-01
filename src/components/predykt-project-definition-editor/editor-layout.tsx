import React from 'react'
import { Button, ListItemText, List, ListItem, Grid } from '@material-ui/core';
import { ProjectContainerDefinition } from '../../models/project-container.definition';
import { QueryBuilder } from '../../common/redux-db/query-builder';
import { Link, RouteComponentProps } from '@reach/router'
import { useTableQuery } from '../../common/query-hook';


const query = QueryBuilder
    .fromTable("project_container_definition")
    .binding;

export interface EditorLayoutProps extends RouteComponentProps {
    projectDefinitionId: string
}

export function EditorLayout({ projectDefinitionId }: EditorLayoutProps) {
    const containers = useTableQuery<ProjectContainerDefinition>(query({
        projectDefinitionId
    }))

    return (
        <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
        >
            <Grid container item xs={12} spacing={2} justify="flex-start" alignItems="flex-start">
                {containers.filter(c => c.path.length === 0).map(c => (
                    <Button component={Link} to="/custom" color="primary">
                        {c.name}
                    </Button>
                ))}
            </Grid>
            <Grid container item xs={4}  justify="flex-start" alignItems="flex-start">
                <List>
                    <ListItem button>
                        <ListItemText primary="Trash"  />
                    </ListItem>
                </List>
            </Grid>
        </Grid>
    )
}

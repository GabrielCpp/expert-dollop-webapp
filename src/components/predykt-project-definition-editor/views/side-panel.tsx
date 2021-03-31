import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    createStyles,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemText,
    makeStyles,
    Theme,
    Tooltip,
    Typography,
} from '@material-ui/core';
import { Add as AddIcon, DeleteForever as DeleteForeverIcon, ExpandMore as ExpandMoreIcon } from '@material-ui/icons';
import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import { useFindProjectDefinitionRootSectionContainersQuery } from '../../../generated/graphql';
import { useNavigate } from '../../../shared/named-routes';
import { DisplayOnMouseOver } from '../../display-on-mouseover';
import { MouseOverPopover } from '../../mouse-over-popover';
import { useDbTranslation } from '../../translation';
import { buildPath, splitPath } from '../helpers';
import { ADD_PROJECT_SECTION_ROUTE_NAME, buildLinkFor } from '../routes';


const useStyles = makeStyles((theme: Theme) => createStyles({
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
        width: '100%',
    },
    selectedListItem: {
        fontWeight: 'bold'
    },
    grid: {
        width: '100%',
    }
}));

interface SidePanelParams extends Record<string, string> {
    projectDefinitionId: string
    selectedPath: string;
}

export function SidePanel() {
    const { navigate } = useNavigate()
    const params = useParams<SidePanelParams>();
    const { projectDefinitionId, selectedPath } = params;
    let [ rootSectionId, subSectionId, formId ] = splitPath(selectedPath)
    const buildLink = buildLinkFor(projectDefinitionId);
    const { t, labelTrans, helpTextTrans } = useDbTranslation(projectDefinitionId)
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState<string | undefined>(subSectionId);
    const { data, loading, error } = useFindProjectDefinitionRootSectionContainersQuery({
        skip: rootSectionId === undefined,
        variables: {            
            id: projectDefinitionId,
            rootSectionId: rootSectionId as string
        }
    })

    useEffect(() => {
        const subSections = data?.findProjectDefinitionRootSectionContainers.roots

        if(subSections !== undefined && subSections.length > 0) {
            setExpanded(subSections[0].definition.id);
        }        
    }, [data, subSectionId]);

    const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : undefined);
    };

    const addContainer = () => {
        navigate(ADD_PROJECT_SECTION_ROUTE_NAME, params, { 
            path: buildPath([rootSectionId])
        })
    }

    if(loading) {
        return <span>Loading..</span>
    }

    if(error) {
        console.error(error)
    }


    const subSections = data?.findProjectDefinitionRootSectionContainers.roots;

    if(subSections !== undefined && subSectionId === undefined && subSections.length > 0) {
        subSectionId = subSections[0].definition.id;

        if(formId === undefined && subSections[0].children.length > 0) {
            formId = subSections[0].children[0].definition.id
        }
    }

    return (
        <Grid container item xs={3} spacing={1} direction="column" justify="flex-start" alignItems="flex-start">    
        {subSections && subSections.map(firstLayerNode => (
            <Grid item key={firstLayerNode.definition.name} className={classes.grid}>
                <Accordion expanded={expanded === firstLayerNode.definition.id || (expanded === undefined && expanded === subSectionId)} onChange={handleChange(firstLayerNode.definition.id)}>
                    <DisplayOnMouseOver>
                        {(isDisplayed, props) =>(                     
                            <AccordionSummary
                                className={classes.heading}
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls={`${firstLayerNode.definition.name}-content`}
                                id={`${firstLayerNode.definition.name}-header`}
                                {...props}
                            >
                                <Grid
                                    container
                                    item
                                    xs={12}
                                    direction="row"
                                    justify="flex-start"
                                    alignItems="center"
                                >
                                    <Grid item>
                                        <MouseOverPopover name={`${firstLayerNode.definition.name}-popover`} text={helpTextTrans(firstLayerNode.definition.name)}>
                                            <Typography>{labelTrans(firstLayerNode.definition.name)}</Typography> 
                                        </MouseOverPopover>
                                    </Grid>
       
                                    <Grid
                                        item
                                        style={{ visibility: isDisplayed ? 'visible' : 'hidden'}}
                                    >
                                        <Tooltip title="Delete" aria-label="delete">
                                            <IconButton color="default" aria-label="remove">
                                                <DeleteForeverIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Add" aria-label="delete">
                                            <IconButton color="primary" aria-label="add">
                                                <AddIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </Grid>
                                </Grid>
                            </AccordionSummary>
                        )}
                    </DisplayOnMouseOver>

                    <AccordionDetails>
                        <List>
                            {firstLayerNode.children.map(secondLayerNode => (
                                <ListItem button key={secondLayerNode.definition.name} component={Link} to={buildLink(rootSectionId as string, firstLayerNode.definition.id, secondLayerNode.definition.id)}>
                                    <MouseOverPopover name={`${firstLayerNode.definition.name}-popover`} text={helpTextTrans(secondLayerNode.definition.name)}>
                                        {secondLayerNode.definition.id === formId && <ListItemText primaryTypographyProps={{ className: classes.selectedListItem }} primary={labelTrans(secondLayerNode.definition.name)}  />}
                                        {secondLayerNode.definition.id !== formId && <ListItemText primary={labelTrans(secondLayerNode.definition.name)}  />}
                                    </MouseOverPopover>
                                </ListItem>
                            ))}
                        </List>
                    </AccordionDetails>
                </Accordion>
            </Grid>
        ))}
        <Grid item className={classes.grid}>
            <Button variant="contained" color="primary" onClick={addContainer}>
                {t('add')}
            </Button>
        </Grid>
        </Grid>
    )
}

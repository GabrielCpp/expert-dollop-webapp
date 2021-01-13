import React, { useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ExpandMore as ExpandMoreIcon, Add as AddIcon, DeleteForever as DeleteForeverIcon } from '@material-ui/icons';
import { 
    ListItemText, List, ListItem, Accordion, AccordionSummary, 
    Typography, AccordionDetails, makeStyles, createStyles, Theme, 
    Grid, Button, Tooltip, IconButton
} from '@material-ui/core';
import { ProjectContainerDefinitionTree } from '../../models';
import { MouseOverPopover } from '../mouse-over-popover';
import { DisplayOnMouseOver } from '../display-on-mouseover'
import { ADD_PROJECT_SECTION_ROUTE_NAME } from './routes';
import { useNavigate } from '../../common/named-routes';
import { buildPath } from './helpers';
import { getI18nHelpTextKey, getI18nLabelKey, useDbTranslation } from '../../reducers';


export interface SidePanelProps {
    topLayerNode: ProjectContainerDefinitionTree;
    selectedNodeFirstLayer: ProjectContainerDefinitionTree | undefined;
    selectedNodeSecondLayer: ProjectContainerDefinitionTree | undefined;
    buildLink: (...path: string[]) => string;
}

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


export function SidePanel({ topLayerNode, selectedNodeFirstLayer, selectedNodeSecondLayer, buildLink }: SidePanelProps) {
    const { t, dbTrans } = useDbTranslation(topLayerNode.projectDefId)
    const { navigate } = useNavigate();
    const params = useParams()
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState<string | undefined>(selectedNodeFirstLayer?.id);
    const lastSelectedNodeFirstLayer = useRef(selectedNodeFirstLayer?.id);

    const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : undefined);
    };

    const addContainer = () => {
        navigate(ADD_PROJECT_SECTION_ROUTE_NAME, params, { 
            path: buildPath([topLayerNode.id])
        })
    }

    if(lastSelectedNodeFirstLayer.current !== selectedNodeFirstLayer?.id) {
        lastSelectedNodeFirstLayer.current = selectedNodeFirstLayer?.id;
        setExpanded(selectedNodeFirstLayer?.id)
    }

    return (
        <Grid container item xs={3} spacing={1} direction="column" justify="flex-start" alignItems="flex-start">    
        {topLayerNode.children.map(firstLayerNode => (
            <Grid item key={firstLayerNode.name} className={classes.grid}>
                <Accordion expanded={expanded === firstLayerNode.id} onChange={handleChange(firstLayerNode.id)}>
                    <DisplayOnMouseOver>
                        {(isDisplayed, props) =>(                     
                            <AccordionSummary
                                className={classes.heading}
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls={`${firstLayerNode.name}-content`}
                                id={`${firstLayerNode.name}-header`}
                                {...props}
                            >
                                <Grid
                                    container
                                    direction="row"
                                    justify="flex-start"
                                    alignItems="center"
                                >
                                    <MouseOverPopover name={`${firstLayerNode.name}-popover`} text={dbTrans(getI18nHelpTextKey(firstLayerNode.name))}>
                                        <Typography>{dbTrans(getI18nLabelKey(firstLayerNode.name))}</Typography> 
                                    </MouseOverPopover>
                                </Grid>
                                <Grid
                                    container
                                    direction="row"
                                    justify="flex-end"
                                    alignItems="center"
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
                            </AccordionSummary>
                        )}
                    </DisplayOnMouseOver>

                    <AccordionDetails>
                        <List>
                            {firstLayerNode.children.map(secondLayerNode => (
                                <ListItem button key={secondLayerNode.name} component={Link} to={buildLink(topLayerNode.id, firstLayerNode.id, secondLayerNode.id)}>
                                    <MouseOverPopover name={`${firstLayerNode.name}-popover`} text={dbTrans(getI18nHelpTextKey(secondLayerNode.name))}>
                                        {secondLayerNode.id === selectedNodeSecondLayer?.id && <ListItemText primaryTypographyProps={{ className: classes.selectedListItem }} primary={dbTrans(getI18nLabelKey(secondLayerNode.name))}  />}
                                        {secondLayerNode.id !== selectedNodeSecondLayer?.id && <ListItemText primary={dbTrans(getI18nLabelKey(secondLayerNode.name))}  />}
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

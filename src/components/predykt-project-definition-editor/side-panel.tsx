import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';
import { ListItemText, List, ListItem, Accordion, AccordionSummary, Typography, AccordionDetails, makeStyles, createStyles, Theme, Grid } from '@material-ui/core';
import { ProjectContainerDefinitionTree } from '../../models';
import { MouseOverPopover } from '../mouse-over-popover';

export interface SidePanelProps {
    topLayerNode: ProjectContainerDefinitionTree;
    selectedNodeFirstLayer: string;
    selectedNodeSecondLayer: string;
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
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState<string | false>(selectedNodeFirstLayer);
    const lastSelectedNodeFirstLayer = useRef(selectedNodeFirstLayer);

    const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    if(lastSelectedNodeFirstLayer.current !== selectedNodeFirstLayer) {
        lastSelectedNodeFirstLayer.current = selectedNodeFirstLayer;
        setExpanded(selectedNodeFirstLayer)
    }

    return (
        <Grid container item xs={3} spacing={1} direction="column" justify="flex-start" alignItems="flex-start">    
        {topLayerNode.children.map(firstLayerNode => (
            <Grid item key={firstLayerNode.name} className={classes.grid}>
                <Accordion expanded={expanded === firstLayerNode.id} onChange={handleChange(firstLayerNode.id)}>
                    <AccordionSummary
                        className={classes.heading}
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`${firstLayerNode.name}-content`}
                        id={`${firstLayerNode.name}-header`}
                    >
                        <MouseOverPopover name={`${firstLayerNode.name}-popover`} text={firstLayerNode.name}>
                            <Typography>{firstLayerNode.name}</Typography> 
                        </MouseOverPopover>
                        
                    </AccordionSummary>
                    <AccordionDetails>
                        <List>
                            {firstLayerNode.children.map(secondLayerNode => (
                                <ListItem button key={secondLayerNode.name} component={Link} to={buildLink(topLayerNode.id, firstLayerNode.id, secondLayerNode.id)}>
                                    <MouseOverPopover name={`${firstLayerNode.name}-popover`} text={firstLayerNode.name}>
                                        {secondLayerNode.id === selectedNodeSecondLayer && <ListItemText primaryTypographyProps={{ className: classes.selectedListItem }} primary={secondLayerNode.name}  />}
                                        {secondLayerNode.id !== selectedNodeSecondLayer && <ListItemText primary={secondLayerNode.name}  />}
                                    </MouseOverPopover>
                                </ListItem>
                            ))}
                        </List>
                    </AccordionDetails>
                </Accordion>
            </Grid>
        ))}
        </Grid>
    )
}
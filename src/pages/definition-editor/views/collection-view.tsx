import {
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { AddButtonLinkFullWidth } from "../../../components/buttons";
import { useFindDefinitionAggregateCollectionsQuery } from "../../../generated";
import { useServices } from "../../../services-def";
import { DEFINITION_AGGREGATE_COLLECTION_ADD } from "../routes";

interface LabelEditionViewParams extends Record<string, string> {
  projectDefinitionId: string;
  selectedPath: string;
}

export function LabelEditionView() {
  const params = useParams<LabelEditionViewParams>();

  return (
    <Grid container direction="row" spacing={1}>
      <Grid item xs={12} md={4} xl={4} style={{ minWidth: "4em" }}>
        <AggregateCollectionList params={params} />
      </Grid>
      <Grid item xs={12} md={8} xl={6}>
        <span>content</span>
      </Grid>
    </Grid>
  );
}

interface AggregateCollectionListProps {
  params: LabelEditionViewParams;
}

function AggregateCollectionList({ params }: AggregateCollectionListProps) {
  const { routes } = useServices();
  const { data } = useFindDefinitionAggregateCollectionsQuery({
    variables: {
      projectDefinitionId: params.projectDefinitionId,
    },
  });

  if (data === undefined) {
    return null;
  }

  return (
    <Card>
      <CardContent style={{ padding: "0" }}>
        <List>
          {data.findDefinitionAggregateCollections.map((collection) => (
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary={collection.name} />
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem disablePadding>
            <AddButtonLinkFullWidth
              label="definition_editor.side_panel.add_new_sub_section"
              to={routes.render(DEFINITION_AGGREGATE_COLLECTION_ADD, params)}
            />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
}

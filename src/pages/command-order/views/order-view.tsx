import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Checkbox,
  Collapse,
  Grid,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { groupBy, head, orderBy, values } from "lodash";
import { Fragment, useState } from "react";
import { useParams } from "react-router-dom";
import { useLoaderEffect } from "../../../components/loading-frame";
import { useDynamicTranlation } from "../../../components/translation";
import {
  FindDistributableItemsQuery,
  useFindDistributableItemsQuery,
} from "../../../generated";
import { useDbTranslation } from "../../project-definition-editor/hooks/db-trans";

interface OrderViewParams {
  projectId: string;
  reportDefinitionId: string;
}

type DistributableItem =
  FindDistributableItemsQuery["findDistributableItems"][number];

export function OrderView() {
  const { projectId, reportDefinitionId } = useParams<OrderViewParams>();
  const translations = useDynamicTranlation(projectId);
  const { data, error, loading } = useFindDistributableItemsQuery({
    variables: {
      projectId,
      reportDefinitionId,
    },
    fetchPolicy: "cache-first",
    nextFetchPolicy: "cache-first",
  });

  useLoaderEffect(error || translations.error, loading, translations.isLoading);

  if (data === undefined) {
    return null;
  }

  const itemBySupplier: Record<string, DistributableItem[]> = groupBy(
    data.findDistributableItems,
    (item) => item.summary.label
  );
  const groupedItems = values(itemBySupplier);
  const orderedGroupedItems = orderBy(
    groupedItems,
    (items) => head(items)?.summary.label
  );

  return (
    <>
      <Typography variant="h4">Bon de commandes</Typography>
      <Grid container item direction="column" alignItems="flex-start">
        {orderedGroupedItems.map((items) => (
          <ExpandableGridRow
            projectId={projectId}
            items={items}
            key={head(items)?.summary.label}
          ></ExpandableGridRow>
        ))}
      </Grid>
    </>
  );
}

const ExpandableGridRow = ({
  projectId,
  items,
}: {
  projectId: string;
  items: DistributableItem[];
}) => {
  const { dbTrans } = useDbTranslation(projectId);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <Grid container item direction="row" alignItems="flex-start" spacing={1}>
        <Grid md={0.2} item style={{ verticalAlign: "center" }}>
          <IconButton
            onClick={() => setIsExpanded(!isExpanded)}
            style={{ padding: "0" }}
          >
            {isExpanded ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </Grid>
        <Grid md={0.3} item style={{ verticalAlign: "center" }}>
          <Checkbox
            indeterminate={
              head(items)?.summary.label !==
              "orderformcategory_blown_wool_install_material__34"
            }
            style={{ padding: "0" }}
          />
        </Grid>
        <Grid
          container
          item
          direction="row"
          alignItems="flex-start"
          justifyContent="space-between"
          spacing={1}
          md={11.5}
        >
          <Grid sm={4} item>
            {dbTrans(head(items)?.summary.label || "")}
          </Grid>
          <Grid sm={2} item></Grid>
          <Grid sm={2} item></Grid>
          <Grid sm={2} item></Grid>
        </Grid>
      </Grid>
      <Collapse
        in={isExpanded}
        unmountOnExit={true}
        timeout={300}
        style={{ width: "100%" }}
      >
        <Grid
          container
          item
          direction="row"
          alignItems="flex-start"
          spacing={1}
        >
          <Grid item md={0.2}>
            <IconButton style={{ visibility: "hidden", padding: "0" }}>
              <ExpandMore />
            </IconButton>
          </Grid>
          <Grid item md={0.3}>
            <Checkbox style={{ visibility: "hidden", padding: "0" }} />
          </Grid>
          <Grid item md={0.3}>
            <Checkbox style={{ visibility: "hidden", padding: "0" }} />
          </Grid>
          <Grid
            container
            item
            direction="row"
            alignItems="flex-start"
            justifyContent="space-between"
            spacing={1}
            md={11.2}
          >
            <Grid sm={4} item>
              <strong>Produits</strong>
            </Grid>
            <Grid sm={2} item>
              <strong>Order id</strong>
            </Grid>
            <Grid sm={2} item>
              <strong>Supplier</strong>
            </Grid>
            <Grid sm={2} item>
              <strong> Email</strong>
            </Grid>
          </Grid>
        </Grid>
        {items.map((item) => (
          <Grid
            container
            item
            direction="row"
            alignItems="flex-start"
            spacing={1}
            key={item.id}
          >
            <Grid md={0.2} item style={{ verticalAlign: "center" }}>
              <IconButton style={{ visibility: "hidden", padding: "0" }}>
                <ExpandLess />
              </IconButton>
            </Grid>
            <Grid item md={0.3}>
              <Checkbox style={{ visibility: "hidden", padding: "0" }} />
            </Grid>
            <Grid md={0.3} item style={{ verticalAlign: "center" }}>
              <Checkbox style={{ padding: "0" }} />
            </Grid>

            <Grid
              container
              item
              direction="row"
              alignItems="flex-start"
              justifyContent="space-between"
              spacing={1}
              md={11.2}
            >
              <Grid sm={4} item>
                {dbTrans((item.columns[6].value as any)["text"])}
              </Grid>
              <Grid sm={2} item>
                EA4-123
              </Grid>
              <Grid sm={2} item>
                Test supplier
              </Grid>
              <Grid sm={2} item>
                test@example.com
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Collapse>
    </>
  );
};

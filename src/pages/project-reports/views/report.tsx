import { useParams } from "react-router-dom";
import {
  useFindProjectReportWithDefinitionQuery,
  FindProjectReportWithDefinitionQuery,
} from "../../../generated";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useLoaderEffect } from "../../../components/loading-frame";
import {
  useDbTranslation,
  useDynamicTranlation,
} from "../../../components/translation";
import {
  List,
  ListItemText,
  ListItem,
  ListItemSecondaryAction,
  IconButton,
  Collapse,
  Divider,
  Typography,
  Grid,
} from "@mui/material";
import { Fragment, useState } from "react";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { isNumber, isString } from "lodash";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

interface ReportParams {
  projectId: string;
  selectedPath: string;
  reportDefinitionId: string;
}

interface ColumnValueProps {
  projectId: string;
  value: Record<string, string | number | boolean> | undefined | null;
  unit?: string | null;
}

function ColumnValue({
  projectId,
  value,
  unit,
}: ColumnValueProps): JSX.Element {
  const { dbTrans, t } = useDbTranslation(projectId);
  const { text, numeric, enabled, integer } = {
    text: null,
    numeric: null,
    enabled: null,
    integer: null,
    ...value,
  };

  const realValue = [text, numeric, enabled, integer].find((x) => x != null);

  if (realValue === null || realValue === undefined) {
    throw new Error("Bad value");
  }

  let result: string | JSX.Element = realValue;

  if (isString(realValue)) {
    result = dbTrans(realValue);
  } else if (isNumber(realValue)) {
    result = t("intlNumber", { val: realValue, minimumFractionDigits: 2 });
  }

  return (
    <span>
      {result}
      {unit && (
        <>
          {"\u00A0"}
          {dbTrans(unit)}
        </>
      )}
    </span>
  );
}

export function Report() {
  const { reportDefinitionId, projectId } = useParams<ReportParams>();
  const { dbTrans } = useDbTranslation(projectId);
  const { data, error, loading } = useFindProjectReportWithDefinitionQuery({
    variables: {
      projectId,
      reportDefinitionId,
    },
  });
  const [expanded, setExpanded] = useState<number | undefined>(undefined);
  const { isLoading: reportLoading, error: translationError } =
    useDynamicTranlation(projectId);

  useLoaderEffect(error || translationError, loading, reportLoading);

  const handleChange = (id: number) => () => {
    setExpanded(expanded === id ? undefined : id);
  };

  if (data === undefined) {
    return null;
  }

  const columns = data.findReportDefinition.structure.columns;
  const stages = data.findProjectReport.stages;
  const summaries = data.findProjectReport.summaries;

  return (
    <div>
      <Typography variant="h3">
        {dbTrans(data.findReportDefinition.name)}
      </Typography>
      <List>
        {stages.map((stage, index) => (
          <Fragment key={index}>
            <ListItem>
              <ListItemText>
                <Grid container>
                  <Grid item md={11}>
                    {dbTrans(stage.summary.label)}
                  </Grid>
                  <Grid item>
                    <ColumnValue
                      projectId={projectId}
                      value={stage.summary.value}
                      unit={stage.summary.unit}
                    ></ColumnValue>
                  </Grid>
                </Grid>
              </ListItemText>
              <ListItemSecondaryAction>
                {expanded === index ? (
                  <IconButton size="small" onClick={handleChange(index)}>
                    <ExpandLess />
                  </IconButton>
                ) : (
                  <IconButton size="small" onClick={handleChange(index)}>
                    <ExpandMore />
                  </IconButton>
                )}
              </ListItemSecondaryAction>
            </ListItem>
            <Collapse
              in={expanded === index}
              mountOnEnter={true}
              timeout="auto"
            >
              <ReportStage
                projectId={projectId}
                stage={stage}
                columns={columns}
              />
            </Collapse>
            <Divider />
          </Fragment>
        ))}
      </List>
      <Grid container>
        {summaries.map((summary, index) => (
          <Grid container spacing={2} key={index}>
            <Grid item xs={1}>
              <Typography align="right">{dbTrans(summary.label)}</Typography>
            </Grid>
            <Grid item xs={1}>
              <ColumnValue
                projectId={projectId}
                value={summary.value}
                unit={summary.unit}
              />
            </Grid>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

interface ReportStageProps {
  projectId: string;
  stage: FindProjectReportWithDefinitionQuery["findProjectReport"]["stages"][number];
  columns: FindProjectReportWithDefinitionQuery["findReportDefinition"]["structure"]["columns"];
}

function ReportStage({ stage, columns, projectId }: ReportStageProps) {
  const { dbTrans } = useDbTranslation(projectId);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {columns
              .filter((c) => c.isVisible)
              .map((column, index) => (
                <StyledTableCell key={index}>
                  {dbTrans(column.name)}
                </StyledTableCell>
              ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {stage.rows.map((row, rowIndex) => (
            <StyledTableRow key={rowIndex}>
              {row.columns
                .filter((_, i) => columns[i].isVisible === true)
                .map((column, columnIndex) => (
                  <StyledTableCell key={columnIndex}>
                    <ColumnValue
                      projectId={projectId}
                      value={column.value}
                      unit={column.unit}
                    ></ColumnValue>
                  </StyledTableCell>
                ))}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

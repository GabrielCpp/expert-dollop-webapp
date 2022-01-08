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
import { useDbTranslation } from "../../../components/translation";
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
import { TFunction } from "i18next";

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

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

interface ReportParams {
  projectId: string;
  selectedPath: string;
  reportDefinitionId: string;
}

function getFieldValue(
  value: Record<string, string | number | boolean> | undefined | null,
  dbTrans: (key?: string | null | undefined) => string,
  t: any
): string | number | boolean {
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

  if (isString(realValue)) {
    return dbTrans(realValue);
  }

  if (isNumber(realValue)) {
    return t("intlNumber", { val: realValue, minimumFractionDigits: 2 });
  }

  return realValue;
}

export function Report() {
  const { reportDefinitionId, projectId } = useParams<ReportParams>();
  const { dbTrans, t } = useDbTranslation(projectId);
  const { data, error, loading } = useFindProjectReportWithDefinitionQuery({
    variables: {
      projectId,
      reportDefinitionId,
    },
  });
  const [expanded, setExpanded] = useState<number | undefined>(undefined);

  useLoaderEffect(error, loading);

  const handleChange = (id: number) => () => {
    setExpanded(expanded === id ? undefined : id);
  };

  if (data === undefined) {
    return null;
  }

  const columns = data.findReportDefinition.structure.columns;
  const stages = data.findProjectReport.stages;

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
                    {dbTrans(stage.label)}
                  </Grid>
                  <Grid item>{getFieldValue(stage.summary, dbTrans, t)}</Grid>
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
    </div>
  );
}

interface ReportStageProps {
  projectId: string;
  stage: FindProjectReportWithDefinitionQuery["findProjectReport"]["stages"][number];
  columns: FindProjectReportWithDefinitionQuery["findReportDefinition"]["structure"]["columns"];
}

function ReportStage({ stage, columns, projectId }: ReportStageProps) {
  const { dbTrans, t } = useDbTranslation(projectId);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {columns.map((column, index) => (
              <StyledTableCell key={index}>
                {dbTrans(column.name)}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {stage.rows.map((row, rowIndex) => (
            <StyledTableRow key={rowIndex}>
              {row.columns.map((column, columnIndex) => (
                <StyledTableCell key={columnIndex}>
                  {getFieldValue(column, dbTrans, t)}
                </StyledTableCell>
              ))}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

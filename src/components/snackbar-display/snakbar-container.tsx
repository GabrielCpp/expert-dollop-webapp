import { Alert, Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useTableQuery } from "../../shared/redux-db";
import {
  ALERT_NOTIFICATION,
  queryFeedNotification,
  SnackbarRecord,
} from "./table";

export function AlertContainer() {
  const { t } = useTranslation();
  const results = useTableQuery<SnackbarRecord>(
    queryFeedNotification(ALERT_NOTIFICATION)
  );
  const failure = results.find((r) => r.type === "failure");
  const sucess = results.find((r) => r.type === "success");

  return (
    <Box>
      {sucess && <Alert severity="success">{t(sucess.message)}</Alert>}
      {failure && <Alert severity="error">{t(failure.message)}</Alert>}
    </Box>
  );
}

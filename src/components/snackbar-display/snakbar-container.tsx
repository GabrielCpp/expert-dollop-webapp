import { Alert, Box } from "@mui/material";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { FeedEvent, useWatchFeed } from "../../shared/feed";
import { SUCESS_FEED, FAILURE_FEED, CLEAR_ALERTS } from "./snackbar-hooks";

export interface AlertContainerProps {
  id: string;
}

export function AlertContainer({ id }: AlertContainerProps) {
  const { t } = useTranslation();
  const [sucess, setSuccess] = useState<string | undefined>(undefined);
  const [failure, setFailure] = useState<string | undefined>(undefined);
  const onEvent = useCallback((event: FeedEvent) => {
    if (event.type === SUCESS_FEED) {
      setSuccess(event.payload.message as string | undefined);
    } else if (event.type === FAILURE_FEED) {
      setFailure(event.payload.message as string | undefined);
    } else if (event.type === CLEAR_ALERTS) {
      setSuccess(undefined);
      setFailure(undefined);
    }
  }, []);

  useWatchFeed(id, onEvent);

  return (
    <Box>
      {sucess && <Alert severity="success">{t(sucess)}</Alert>}
      {failure && <Alert severity="error">{t(failure)}</Alert>}
    </Box>
  );
}

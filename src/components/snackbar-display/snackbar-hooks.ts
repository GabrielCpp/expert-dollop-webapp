import { useCallback } from "react";
import { useServices } from "../../services-def";
import { useId } from "../../shared/redux-db";
import { clearNotifications, setNotification } from "./table";

export function useNotification(feedName: string) {
  const id = useId();
  const { reduxDb, loader } = useServices();
  const success = useCallback(
    (message?: string) => {
      setNotification(reduxDb, {
        type: "success",
        feedId: feedName,
        message,
      });
    },
    [feedName, reduxDb]
  );

  const failure = useCallback(
    (message?: string) => {
      setNotification(reduxDb, {
        type: "failure",
        feedId: feedName,
        message,
      });
    },

    [feedName, reduxDb]
  );

  const clear = useCallback(() => {
    clearNotifications(reduxDb, feedName);
  }, [feedName, reduxDb]);

  const catchError = useCallback(
    (error?: Error) => {
      if (error) {
        failure(error.name);
        loader.onError(error, id);
      }
    },
    [failure, loader, id]
  );

  return { success, failure, clear, catchError };
}

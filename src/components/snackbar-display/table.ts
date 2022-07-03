import {
  ops,
  Query,
  queryParam,
  recordParam,
  ReduxDatabase,
  TableRecord,
} from "../../shared/redux-db";

export const SnackbarTableName = "snackbars";
export type NotificationKind = "success" | "failure";

export interface SnackbarNotification {
  type: NotificationKind;
  feedId: string;
  message?: string;
}

export interface SnackbarRecord extends TableRecord {
  id: string;
  feedId: string;
  type: NotificationKind;
  message: string;
}

export function setNotification(
  database: ReduxDatabase,
  notification: SnackbarNotification
): void {
  database.getTable(SnackbarTableName).upsertMany([
    {
      id: `${notification.feedId}-${notification.type}`,
      ...notification,
    },
  ]);
}

export function clearNotifications(database: ReduxDatabase, feedId: string) {
  const table = database.getTable(SnackbarTableName);
  const records = table.where<SnackbarRecord>(
    (record) => record.feedId === feedId
  );
  table.removeMany(records);
}

export function queryFeedNotification(feedId: string): Query {
  return {
    fromTable: SnackbarTableName,
    where: ops("arrayStartWith", recordParam("fieldPath"), queryParam("path")),
    joins: [],
    sort: [],
    parameters: {},
    projections: [],
  };
}

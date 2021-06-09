import { Typography } from "@material-ui/core";
import React from "react";
import {
  createHeadCell,
  PaginatedDataGrid,
  SearchResultSet,
} from "./paginated-data-grid";

interface TestRow {
  name: string;
  convertionUnit: number;
  isCollection: boolean;
}

const headers = [
  createHeadCell<TestRow>("name", "name"),
  createHeadCell<TestRow>("convertionUnit", "convertionUnit"),
  createHeadCell<TestRow>("isCollection", "isCollection"),
];

const rows = (function () {
  const data: TestRow[] = [];

  for (let i = 0; i < 1000; i++) {
    data.push({
      name: "Name " + (i + 1),
      convertionUnit: Number(i + 1),
      isCollection: Boolean(Number(i + 1) % 2 == 0),
    });
  }

  return data;
})();

async function fetch(
  query: string,
  limit: number,
  nextPageToken?: string
): Promise<SearchResultSet<TestRow>> {
  const startOffset = Number(nextPageToken || 0);
  const queries = rows.filter((x) => x.name.includes(query) || query == "");

  const results = queries.slice(startOffset, startOffset + limit).map((x) => ({
    columns: {
      name: () => <Typography>{x.name}</Typography>,
      convertionUnit: () => <Typography>{x.convertionUnit}</Typography>,
      isCollection: () => (
        <Typography>{x.isCollection ? "true" : "false"}</Typography>
      ),
    },
    rowKey: x.name,
    actionComponent: undefined,
  }));

  return {
    results,
    pageInfo: {
      endCursor: String(startOffset + limit),
      hasNextPage: startOffset + limit < 1000,
      totalCount: queries.length,
    },
  };
}

//👇 We create a “template” of how args map to rendering
const Template = (args: any) => <PaginatedDataGrid fetch={fetch} {...args} />;

export const QueryGrid: {
  (args: any): JSX.Element;
  args?: any;
} = Template.bind({});

QueryGrid.args = {
  headers: headers,
  defaultRowsPerPage: 10,
};

export default {
  title: "PaginatedDataGrid",
  component: QueryGrid,
};

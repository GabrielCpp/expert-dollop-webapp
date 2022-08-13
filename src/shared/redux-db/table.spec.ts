import { TableTransaction } from "./table-transaction";
import { Table } from "./table";
import { TableRecord } from "./table-record";
import { Transaction } from "./transaction";


interface RecordModel extends TableRecord {
  id: string;
  description: string;
  linked: number[];
}

describe("Table test", () => {
  let table: Table;
  let initialData: TableRecord[];
  let transaction: Transaction;
  let eventAccumulator: TableTransaction

  beforeEach(() => {
    initialData = [
      { id: "1", description: "Abc123", linked: [1] },
      { id: "2", description: "CBD", linked: [2] },
      { id: "3", description: "Test", linked: [2] },
    ];

    table = new Table(initialData);
    transaction = new Transaction()
    eventAccumulator = new TableTransaction(transaction, table.tableEventEmitter);
  });

  test("Given table should primary keys be the id", () => {
    expect(table.primaryKeys).toEqual(["1", "2", "3"]);
  });

  test("Given untouched table should records be initial data", () => {
    expect(table.records).toEqual(initialData);
  });

  test("Given table should filtered by predicate should retain truthy elements", () => {
    const expected = [
      { id: "2", description: "CBD", linked: [2] },
      { id: "3", description: "Test", linked: [2] },
    ];

    const actual = table.where<RecordModel>((record) =>
      record.linked.includes(2)
    );
    expect(actual).toEqual(expected);
  });

  test("Given table watched record should be inform of record update", (done) => {
    const oldRecord = initialData[1];
    const newRecord = { id: "2", description: "ABC", linked: [2] };

    function onUpdate(before: TableRecord, after: TableRecord) {
      expect(before).toEqual(oldRecord);
      expect(after).toEqual(newRecord);
      done();
    }

    table.watchRecord("2", { onUpdate });
    table.upsertMany(eventAccumulator, [newRecord]);
    eventAccumulator.flush();
  });

  test("Given table watched record should be batch notification up to latest", (done) => {
    const initialRecord = initialData[1];
    const firstChange = { id: "2", description: "WWWW", linked: [2] };
    const expectedRecord = { id: "2", description: "ABC", linked: [2] };

    function onUpdate(before: TableRecord, after: TableRecord) {
      expect(before).toEqual(initialRecord);
      expect(after).toEqual(expectedRecord);
      done();
    }

    table.watchRecord("2", { onUpdate });
    table.upsertMany(eventAccumulator, [firstChange, expectedRecord]);
    eventAccumulator.flush();
  });
});

import { Table } from "./table";
import { TableTransaction } from "./table-transaction";

export class Transaction {
  public haveOpenTransaction: boolean = false;
  private _tableTransactions = new Map<Table, TableTransaction>();

  public openTransaction() {
    this.haveOpenTransaction = true;
  }

  public closeTransaction() {
    this.haveOpenTransaction = false;
  }

  public openTableTransaction(table: Table): TableTransaction {
    let tableTransaction = this._tableTransactions.get(table);

    if (tableTransaction === undefined) {
      tableTransaction = new TableTransaction(this, table.tableEventEmitter);
      this._tableTransactions.set(table, tableTransaction);
    }

    return tableTransaction;
  }

  public commit() {
    for (const tableTransaction of this._tableTransactions.values()) {
      tableTransaction.flush();
    }
  }
}

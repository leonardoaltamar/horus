import { AccountingProcess } from './accounting_process.model';

export class ProcessType {
  id?: number;
  name: string;
  code: string;
  accountingProcess: AccountingProcess;
  constructor() {
    this.id = null;
    this.name = '';
    this.code = '';
    this.accountingProcess = new AccountingProcess();
  }
}

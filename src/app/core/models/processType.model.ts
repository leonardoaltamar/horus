import { AccountingProcess } from './accounting_process.model';

export class ProcessType {
  id?: number;
  name: string;
  code: string;
  accountingProcess: AccountingProcess;
  processCategory: number;
  constructor() {
    this.id = null;
    this.name = '';
    this.code = '';
    this.processCategory = 0;
    this.accountingProcess = new AccountingProcess();
  }
}

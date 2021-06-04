import { Process } from './process.model';
import { Account } from './accounts.model';

export class DetailProcess {
  id: number;
  process: Process;
  account: Account;
  value: number;
  nature: string;
  constructor() {
    this.id = null;
    this.process = new Process();
    this.account = new Account();
    this.value = 0;
    this.nature = '';
  }
}

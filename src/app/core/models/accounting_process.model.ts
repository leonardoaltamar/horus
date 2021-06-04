import { Account } from './accounts.model';

export class AccountingProcess{
  id?:number;
  creditAccount:Account;
  debitAccount:Account;
  ivaAccount:Account;
  reteIvaAccount:Account;
  reteIcaAccount:Account;
  reteFuenteAccount:Account;
  processNature: string;

  constructor(){
    this.id = null;
    this.creditAccount = new Account();
    this.debitAccount = new Account();
    this.ivaAccount = new Account();
    this.reteIvaAccount = new Account();
    this.reteIcaAccount = new Account();
    this.reteFuenteAccount = new Account();
    this.processNature = '';
  }

}

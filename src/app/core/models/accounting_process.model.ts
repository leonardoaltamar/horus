import { Account } from './accounts.model';

export class AccountingProcess{
  id?:number;
  creditAccount:Account;
  debitAccount:Account;
  processNature: string;
  ivaAccount:Account;
  ivaAccountNature: string;
  reteIvaAccount:Account;
  reteIvaAccountNature: string;
  reteIcaAccount:Account;
  reteIcaAccountNature: string;
  reteFuenteAccount:Account;
  processNature: string;

  constructor(){
    this.id = null;
    this.creditAccount = new Account();
    this.debitAccount = new Account();
    this.processNature = 'C';
    this.ivaAccount = new Account();
    this.ivaAccountNature= 'C';
    this.reteIvaAccount = new Account();
    this.reteIvaAccountNature = 'C';
    this.reteIcaAccount = new Account();
    this.reteIcaAccountNature = 'C';
    this.reteFuenteAccount = new Account();
    this.processNature = '';
  }

}

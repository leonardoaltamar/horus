import { ParentAccount } from './parentAccount.model';

export class Account {
  id: number;
  code: string;
  description: string;
  nature: string;
  balance: number;
  parentAccount: ParentAccount;

  constructor() {
    this.id = null;
    this.code = '';
    this.description = '';
    this.nature = '';
    this.balance = 0;
    this.parentAccount = new ParentAccount();
  }
}

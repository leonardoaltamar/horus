export class ParentAccount {
  id: number;
  code: string;
  description: string;
  nature: string;
  balance: number;

  constructor() {
    this.id = null;
    this.code = '';
    this.description = '';
    this.nature = '';
    this.balance = 0;
  }
}

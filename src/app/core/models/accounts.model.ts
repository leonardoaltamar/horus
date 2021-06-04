export class Account {
  id: number;
  code: string;
  name: string;
  nature: string;
  value? : number;

  constructor() {
    this.id = null;
    this.code = null;
    this.name = null;
    this.nature = null;
    this.value = 0;
  }
}

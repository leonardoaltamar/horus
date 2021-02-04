export class Category {
  id?: number;
  code: number;
  description: string;
  auth: number;
  constructor() {
    this.id = null;
    this.code = null;
    this.description = '';
    this.auth = 0;
  }
}

export class Permission {
  id: number;
  code: string;
  name: string;
  notes: string;
  active: number;

  constructor() {
    this.id = null;
    this.code = '';
    this.name = '';
    this.notes = '';
    this.active = null;
  }
}

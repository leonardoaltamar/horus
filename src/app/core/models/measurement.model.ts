export class Measurement {
  id?: number;
  code: string;
  description: string;

  constructor() {
    this.id = null;
    this.code = '';
    this.description = '';
  }
}

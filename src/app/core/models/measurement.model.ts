export class Measurement {
  id?: number;
  code: string;
  description: string;
  equivalence: number;

  constructor() {
    this.id = null;
    this.code = '';
    this.description = '';
    this.equivalence = 0;
  }
}

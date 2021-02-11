import { Data } from '@angular/router';

export class rawMaterial {
  id?: number;
  code: string;
  name: string;
  stock: number;
  measure: string;

  constructor() {
    this.id = null;
    this.code = '';
    this.name = '';
    this.stock = 0;
    this.measure = '';
  }
}

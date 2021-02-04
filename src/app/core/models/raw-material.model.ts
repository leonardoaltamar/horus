import { Data } from '@angular/router';

export class rowMaterial {
  id?: number;
  description: string;
  count: number;
  startAt: string;
  price: number;

  constructor() {
    this.id = null;
    this.description = '';
    this.count = 0;
    this.startAt = '';
    this.price = 0;
  }
}

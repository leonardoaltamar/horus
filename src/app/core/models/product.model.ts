import { Artitle } from './artitle.model';
export class Product {
  id?: number;
  production_cost: number
  artitle: Artitle;

  constructor() {
    this.id = null;
    this.production_cost = 0;
    this.artitle = new Artitle();
  }
}

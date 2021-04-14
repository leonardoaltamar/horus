import { Product } from './product.model';

export class MovementOrder {
  id?: number;
  product: Product;
  quantity: number;

  constructor() {
    this.id = null;
    this.product =  new Product();
    this.quantity = 0;
  }
}

import { Product } from './product.model';

export class InventoryMovement {
  id?: number;
  product: Product;
  quantity: number;
  total: number;

  constructor() {
    this.id = null;
    this.product = new Product();
    this.quantity = 0;
    this.total = 0;
  }
}

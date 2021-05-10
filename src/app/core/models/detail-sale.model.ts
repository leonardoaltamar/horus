import { Product } from './product.model';
import { Measurement } from './measurement.model';
export class InventoryMovement {
  id?: number;
  product: Product;
  quantity: number;
  total: number;
  measurement: Measurement;

  constructor() {
    this.id = null;
    this.product = new Product();
    this.quantity = 0;
    this.total = 0;
    this.measurement = new Measurement();
  }
}

import { Measurement } from './measurement.model';
import { Product } from './product.model';
import { Artitle } from './artitle.model';

export class rawMaterial {
  id?: number;
  quantity: string;
  artitle: Artitle;
  measurement: Measurement;
  product: Product;

  constructor() {
    this.id = null;
    this.quantity = '';
    this.artitle = new Artitle();
    this.measurement = new Measurement;
    this.product = new Product;
  }
}

import { Category } from './category.model';
import { Measurement } from './measurement.model';

export class RawMaterial {
  id?: number;
  code: string;
  name: string;
  stock: number;
  unitValue: number;
  dateExpiry: string;
  category: Category;
  measurement: Measurement;

  constructor() {
    this.id = null;
    this.code = '';
    this.name = '';
    this.stock = 0;
    this.unitValue = 0;
    this.dateExpiry = '';
    this.category = new Category();
    this.measurement = new Measurement();
  }
}

import { Category } from './category.model';
import { Measurement } from './measurement.model';
import { Lien } from './lien.model';

export class RawMaterial {
  id?: number;
  code: string;
  name: string;
  stock: number;
  unitValue: number;
  dateExpiry: string;
  category: Category;
  measurement: Measurement;
  lien: Lien;

  constructor() {
    this.id = null;
    this.code = '';
    this.name = '';
    this.stock = 0;
    this.unitValue = 0;
    this.dateExpiry = '';
    this.category = new Category();
    this.measurement = new Measurement();
    this.lien = new Lien();
  }
}

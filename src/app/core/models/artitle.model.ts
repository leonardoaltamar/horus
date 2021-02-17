import { Category } from './category.model'

export class Artitle {
  id?: number;
  name: string;
  data_expiry: Date;
  stock: number;
  acquisition: string;
  unit_value: number;
  bar_code: string;
  category: Category

  constructor() {
    this.id = null;
    this.name = '';
    this.data_expiry = null;
    this.stock = 0;
    this.acquisition = '';
    this.unit_value = 0;
    this.bar_code = '';
    this.category = new Category();
  }
}

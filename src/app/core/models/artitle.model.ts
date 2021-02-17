import { Category } from './category.model';

export class Artitle {
  id?: number;
  name: string;
  date_expire: string;
  stock: number;
  acquisition_value: number;
  unit_value: number;
  bar_code: string;
  category: Category;

  constructor() {
    this.id = null;
    this.name = '';
    this.date_expire = '';
    this.stock = 0;
    this.acquisition_value = 0;
    this.unit_value = 0;
    this.bar_code = '';
    this.category = new Category();
  }
}

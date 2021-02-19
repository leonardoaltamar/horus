import { Category } from './category.model';

export class Article {
  id?: number;
  name: string;
  dateExpiry: string;
  stock: number;
  acquisitionValue: number;
  unitValue: number;
  barCode: string;
  category: Category;

  constructor() {
    this.id = null;
    this.name = '';
    this.dateExpiry = '';
    this.stock = 0;
    this.acquisitionValue = 0;
    this.unitValue = 0;
    this.barCode = '';
    this.category = new Category();
  }
}

import { Category } from './category.model'
export class product {
  id?: number;
  description: string;
  salePrice: number;
  category: Category
  auth: number;
  constructor() {
    this.id = null;
    this.description = '';
    this.salePrice = null;
    this.category = new Category();
    this.auth = 0;
  }
}

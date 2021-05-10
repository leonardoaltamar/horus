import { DetailProduct } from './detail-product.model';
import { Category } from './category.model';
import { Lien } from './lien.model';


export class Product {
  id?: number;
  code: string;
  name: string;
  stock: number;
  productionCost?: number;
  unitValue?: number;
  category?: Category;
  detailProducts?: DetailProduct[];
  lien: Lien;

  constructor() {
    this.id = null;
    this.code = '';
    this.name = '';
    this.productionCost = 0;
    this.stock = 0;
    this.unitValue = 0;
    this.category = new Category();
    this.detailProducts = [];
    this.lien = new Lien();
  }
}

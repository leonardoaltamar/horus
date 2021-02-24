import { RawMaterial } from './raw-material.model';
import { Category } from './category.model';

export class Article {
  id?: number;
  code: string;
  name: string;
  dateExpiry?: string;
  stock: number;
  production_cost?: number;
  acquisitionValue?: number;
  unitValue?: number;
  barCode?: string;
  category?: Category;
  quantity?: number;
  rawMaterials?: RawMaterial[];

  constructor() {
    this.id = null;
    this.code = '';
    this.name = '';
    this.dateExpiry = '';
    this.production_cost = 0;
    this.stock = 0;
    this.acquisitionValue = 0;
    this.unitValue = 0;
    this.barCode = '';
    this.category = new Category();
    this.rawMaterials = [];
    this.quantity = 0;
  }
}

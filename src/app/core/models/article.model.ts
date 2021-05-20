import { Category } from './category.model';
import { Lien } from './lien.model';
import { RawMaterial } from './raw-material.model';

export class Article {
  id?: number;
  code: string;
  name: string;
  stock: number;
  barCode?: string;
  unitValue?: number;
  acquisitionValue?: number;
  productionCost?: number;
  dateExpiry?: string;
  category: Category;
  rawMaterials: RawMaterial[];
  lien?: Lien;

  constructor() {
    this.id = null;
    this.code = '';
    this.name = '';
    this.barCode = '';
    this.stock = 0;
    this.unitValue = 0;
    this.dateExpiry = '';
    this.category = new Category();
    this.rawMaterials = [];
    this.lien = new Lien();
  }
}

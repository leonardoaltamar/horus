import { Article } from './article.model';
import { Measurement } from './measurement.model';
export class InventoryMovement {
  id?: number;
  article: Article;
  quantity: number;
  subtotal: number;
  total: number;
  measurement: Measurement;
  totalLien: number;
  constructor() {
    this.id = null;
    this.article = new Article();
    this.quantity = 0;
    this.subtotal = 0;
    this.total = 0;
    this.measurement = new Measurement();
    this.totalLien = 0;
  }
}

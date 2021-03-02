import { Article } from './article.model';
import { Measurement } from './measurement.model';
export class InventoryMovement {
  id?: number;
  article: Article;
  quantity: number;
  total: number;
  measurement: Measurement;

  constructor() {
    this.id = null;
    this.article = new Article();
    this.quantity = 0;
    this.total = 0;
    this.measurement = new Measurement();
  }
}

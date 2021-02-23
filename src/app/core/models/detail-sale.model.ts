import { Article } from './article.model';
export class InventoryMovement {
  id?: number;
  article: Article;
  quantity: number;
  total: number;

  constructor() {
    this.id = null;
    this.article = new Article();
    this.quantity = 0;
    this.total = 0;
  }
}

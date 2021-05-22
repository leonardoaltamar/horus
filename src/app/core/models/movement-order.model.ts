import { Article } from './article.model';

export class MovementOrder {
  id?: number;
  product: Article;
  quantity: number;

  constructor() {
    this.id = null;
    this.product =  new Article();
    this.quantity = 0;
  }
}

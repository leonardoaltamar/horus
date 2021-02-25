import { Article } from './article.model';
export class MovementOrder {
  id?: number;
  article: Article;
  quantity: number;

  constructor() {
    this.id = null;
    this.article =  new Article;
    this.quantity = 0;
  }
}

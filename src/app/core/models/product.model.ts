import { Article } from './article.model';
export class Product {
  id?: number;
  productionCost: number
  article: Article;

  constructor() {
    this.id = null;
    this.productionCost = 0;
    this.article = new Article();
  }
}

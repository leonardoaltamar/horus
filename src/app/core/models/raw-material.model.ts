import { Measurement } from './measurement.model';
import { Article } from './article.model';

export class rawMaterial {
  id?: number;
  quantity: string;
  measurement: Measurement;
  article: Article;

  constructor() {
    this.id = null;
    this.quantity = '';
    this.measurement = new Measurement;
    this.article = new Article();
  }
}

import { Measurement } from './measurement.model';
import { Article } from './article.model';

export class RawMaterial {
  id?: number;
  quantity: number;
  measurement: Measurement;
  article: Article;

  constructor() {
    this.id = null;
    this.quantity = 0;
    this.measurement = new Measurement;
    this.article = new Article();
  }
}

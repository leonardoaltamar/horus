import { Article } from './article.model'
import { Measurement } from './measurement.model';
import { Process } from './process.model';

export class InventoryMovement {
    id: number;
    article: Article;
    date: string;
    typeMoviment: number;
    quantity: number;
    measurement: Measurement;
    unitValue: number;
    process: Process;
  
    constructor() {
      this.id = null;
      this.article = new Article();
      this.date = '';
      this.typeMoviment = 0;
      this.quantity = 0;
      this.measurement = new Measurement; 
      this.unitValue = 0;
      this.process = new Process();
    }
  }
  
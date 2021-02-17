import { Measurement } from './measurement.model';
import { Artitle } from './artitle.model';

export class rawMaterial {
  id?: number;
  quantity: string;
  measurement: Measurement;
  artitle: Artitle;

  constructor() {
    this.id = null;
    this.quantity = '';
    this.measurement = new Measurement;
    this.artitle = new Artitle();
  }
}

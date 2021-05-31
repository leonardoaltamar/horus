import { RawMaterial } from "./raw-material.model";
import { Measurement } from './measurement.model';

export class DetailProduct {
  id?: number;
  rawMaterial: RawMaterial;
  measurement: Measurement;
  quantity: number;

  constructor() {
    this.id = null;
    this.rawMaterial = new RawMaterial();
    this.measurement = new Measurement();
    this.quantity = 0;
  }

}

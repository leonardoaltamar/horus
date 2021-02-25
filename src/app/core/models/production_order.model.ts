import { MovementOrder } from './movement-order.model';
export class ProductionOrder{
  id?:number;
  date: string;
  numOrder: string;
  numLote: string;
  details: MovementOrder[];

  constructor(){
    this.id = null;
    this.date;
    this.numOrder;
    this.details = [];
  }
}




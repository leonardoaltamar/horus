import { MovementOrder } from './movement-order.model';
export class ProductionOrder{
  id?:number;
  date: string;
  numOrder: string;
  numLote: string;
  details: MovementOrder[];
  createdAt: string;

  constructor(){
    this.id = null;
    this.date;
    this.numOrder;
    this.details = [];
    this.createdAt = '';
  }
}




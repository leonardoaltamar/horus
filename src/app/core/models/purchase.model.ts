import { InventoryMovement } from './detail-sale.model';
import { Supplier } from './supplier.model';

export class Purchase {
  id?: number;
  description: string;
  numberInvoice: string;
  date: string;
  typeProcess: string;
  details: InventoryMovement[];
  supplier: Supplier;
  total: number;

  constructor() {
    this.id = null;
    this.description = '';
    this.numberInvoice = '';
    this.date = '';
    this.typeProcess = '';
    this.details = [];
    this.supplier = new Supplier();
    this.total = 0;
  }
}

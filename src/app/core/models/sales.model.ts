import { InventoryMovement } from './detail-sale.model';
import { Supplier } from './supplier.model';
import { Customer } from './customer.model';

export class Sale {
  id?: number;
  description: string;
  numberInvoice: string;
  date: string;
  typeProcess: string;
  client: Customer;
  details: InventoryMovement[];
  supplier: Supplier;
  total: number;

  constructor() {
    this.id = null;
    this.description = '';
    this.numberInvoice = '';
    this.date = '';
    this.typeProcess = '';
    this.client = new Customer();
    this.details = [];
    this.supplier = new Supplier();
    this.total = 0;
  }

  getTotal() {
    this.details.forEach(item => {
      this.total = item.total + this.total;
    })
    return this.total
  }
}

import { Customer } from './customer.model';
export class Product {
  id?: number;
  description: string;
  numberInvoice: string;
  date: string;
  typeProcess: string;
  client: Customer;

  constructor() {
    this.id = null;
  }
}

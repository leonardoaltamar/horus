import { Customer } from './customer.model';
import { InventoryMovement } from './detail-sale.model';
import { Employee } from './employee.model';
import { Supplier } from './supplier.model';
import { TypePayment } from './type-payment.model';

export class Process {
  id?: number;
  description: string;
  numberInvoice: string;
  dateInvoice: string;
  typeMoviment: string;
  typePayment: TypePayment;
  client: Customer;
  details: InventoryMovement[];
  seller: Employee;
  carrier: Employee;
  supplier: Supplier;
  total: number;

  constructor() {
    this.id = null;
    this.description = '';
    this.numberInvoice = '';
    this.dateInvoice = '';
    this.typeMoviment = '';
    this.typePayment = new TypePayment();
    this.client = new Customer();
    this.details = [];
    this.seller = new Employee();
    this.carrier = new Employee();
    this.supplier = new Supplier();
    this.total = 0;
  }

  getTotal() {
    this.details.forEach(item => {
      this.total = item.total + this.total;
    })
    return this.total;
  }
}
import { Customer } from './customer.model';
import { InventoryMovement } from './detail-sale.model';
import { Employee } from './employee.model';
import { Supplier } from './supplier.model';
import { TypePayment } from './type-payment.model';

import { ProcessType }  from './processType.model';
import { DetailProcess } from './detail-process.model';
import { Account } from './accounts.model';
export class Process {
  id?: number;
  description: string;
  numberInvoice: string;
  numLote: string;
  dateInvoice: string;
  typeMoviment: string;
  typePayment: TypePayment;
  client: Customer;
  details: InventoryMovement[];
  detailProcess: DetailProcess[];
  seller: Employee;
  carrier: Employee;
  supplier: Supplier;
  processType: ProcessType;
  state: string;
  address: string;
  total: number;
  reteIva: number;
  reteFuente:number;
  reteIca: number;
  subTotal: number;
  totalLien:number;
  createdAt: string;

  constructor() {
    this.id = null;
    this.description = '';
    this.numberInvoice = '';
    this.numLote = '';
    this.dateInvoice = '';
    this.typeMoviment = '';
    this.typePayment = new TypePayment();
    this.client = new Customer();
    this.details = [];
    this.detailProcess = [];
    this.seller = new Employee();
    this.carrier = new Employee();
    this.supplier = new Supplier();
    this.processType = new ProcessType();
    this.state = 'P';
    this.address = '';
    this.total = 0;
    this.reteFuente = 0;
    this.reteIca = 0;
    this.reteIva = 0;
    this.subTotal= 0;
    this.totalLien = 0;
    this.createdAt = '';

  }

}

import { first } from 'rxjs/operators';
import { Component, Input, OnInit } from '@angular/core';
import { ConfirmationService, SelectItem, MessageService } from 'primeng/api';
import { SupplierService } from '@core/services/supplier.service';
import { CustomerService } from '@core/services/customer.service';
import { ProcessTypeService } from '@core/services/process-type.service';
import { ProcessService } from '@core/services/process.service';
import { PaymentService } from '@core/services/payment.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

import { Process } from '@core/models/process.model';
import { Payment } from '@core/models/payment.model';

@Component({
  selector: 'form-pay',
  templateUrl: './form-pay.component.html',
  styleUrls: ['./form-pay.component.css'],
  providers: [ConfirmationService]
})
export class FormPayComponent implements OnInit {
  @Input() associateProcess: Process;
  @Input() processCategory: string;
  @Input() isSale: boolean;

  model: Payment = new Payment();
  pays: Process[] = [];
  states: SelectItem[] = [];
  processTypes: SelectItem[] = [];
  suppliers: SelectItem[] = [];
  customers: SelectItem[] = [];
  payments: Payment[] = [];
  sumPayment: number = 0;
  constructor(
    private service: ProcessService,
    private processTypeService: ProcessTypeService,
    private serviceSupplier: SupplierService,
    private serviceCustomer: CustomerService,
    private paymentService: PaymentService,
    private messageService: MessageService
  ) { }
  ngOnInit() {

    this.getAllSuppliers();
    this.getAllCustomers();
    this.genarateCode();
    this.getProcessTypeByCategory(this.processCategory);
  }

  genarateCode() {
    const date = new Date();
    const numberCode = this.pays.length + 1;
    this.model.process.numberInvoice = `${date.getDay()}${date.getMonth()}${date.getFullYear()}${numberCode}`;
  }

  async getProcessTypeByCategory(processCategory: string) {
    try {
      (await this.processTypeService.getProcessTypeByCategory(processCategory)).forEach(processType => {
        this.processTypes.push({
          label: processType.name,
          value: processType
        });
      });
    } catch (error) {
      console.error(error);
    }
  }

  async getAllSuppliers() {
    const data = await this.serviceSupplier.getAll();
    data.forEach(item => {
      this.suppliers.push({
        label: `${item.person.name} ${item.person.surname} ${item.person.secondSurname}`,
        value: item
      })
    })
  }

  async getAllCustomers() {
    const data = await this.serviceCustomer.getAll();
    data.forEach(item => {
      this.customers.push({
        label: `${item.person.name} ${item.person.surname} ${item.person.secondSurname}`,
        value: item
      })
    })
  }

  async getAllPaymentByProcess(process: Process) {
    this.payments = await this.paymentService.getByProcess(process.id);
    this.payments.forEach(pay => {
      this.sumPayment += pay.value;
    });
    if (process.total === this.sumPayment) {
      process.state = 'F';
      this.service.update(process.id, process).pipe(first()).subscribe(
        data => {
          if (data['success']) {
            console.log("proceso actualizado")
          }
        }
      )
    }
  }

  async savePayment() {
    this.model.associateProcess = this.associateProcess;
    this.paymentService.create(this.model).pipe(first()).subscribe(data => {
      this.messageService.add({ severity: 'success', summary: `Pago ingresado con éxito`, detail: `descripción: ${this.model.process.description}` });
    });
    this.getAllPaymentByProcess(this.associateProcess);
  }
}

import { first } from 'rxjs/operators';
import { RouteStateService } from '@core/services/route-state.service';
import { ProcessService } from '@core/services/process.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ConfirmationService, SelectItem } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Process } from '@core/models/process.model';
import { ProcessTypeService } from '@core/services/process-type.service';
import { SupplierService } from '@core/services/supplier.service';
import { CustomerService } from '@core/services/customer.service';
// Models



@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css'],
  providers: [ConfirmationService]
})
export class PayComponent implements OnInit {
  showModal: boolean = false;
  isLoading: boolean = false;
  form_city: FormGroup;
  model: Process = new Process();
  pays: Process[] = [];
  processCategory: string = "4";
  states: SelectItem[] = [];
  processTypes: SelectItem[] = [];
  suppliers: SelectItem[] = [];
  customers: SelectItem[] = [];

  constructor(private routeStateService: RouteStateService,
              private service: ProcessService,
              private processTypeService: ProcessTypeService,
              private serviceSupplier: SupplierService,
              private serviceCustomer: CustomerService
    ) {}

  ngOnInit(): void {
    this.routeStateService.add("Ciudad", "/process/pay", null, false);
    this.getAllPurchases();
    this.getProcessTypeByCategory(this.processCategory);
    this.getAllSuppliers();
    this.getAllCustomers();
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

  async getProcessTypeByCategory(processCategory:string ){
    try {
      (await this.processTypeService.getProcessTypeByCategory(processCategory)).forEach(processType=>{
          this.processTypes.push({
              label: processType.name,
              value: processType
          });
      });
    } catch (error) {
      console.error(error);
    }

  }

  newPay() {
    this.showModal = true;
    this.model = new Process();
    this.genarateCode();
  }

  genarateCode() {
    const date = new Date();
    const numberCode = this.pays.length + 1;
    this.model.numberInvoice = `${date.getDay()}${date.getMonth()}${date.getFullYear()}${numberCode}`;
  }

  async getAllPurchases() {
    const data = await this.service.getAll();
    this.pays = data.filter(e => e.typeMoviment === 'E');
    console.log(this.pays);

  }


}

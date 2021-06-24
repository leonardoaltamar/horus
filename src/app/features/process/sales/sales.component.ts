import { first } from 'rxjs/operators';

import { SettingService } from '@core/services/setting.service';
import { MessageService, SelectItem } from 'primeng/api';
import { CustomerService } from '@core/services/customer.service';
import { Component } from '@angular/core';
import { RouteStateService } from '@core/services/route-state.service';
import { ArticleService } from '@core/services/article.service';
import { InventoryMovement } from '@core/models/detail-sale.model';
import { EmployeeService } from '@core/services/employee.service';
import { TypePaymentService } from '@core/services/type-payment.service';
import { Process } from '@core/models/process.model';
import { ProcessService } from '@core/services/process.service';
import { Article, Employee, Measurement, Lien, Account } from '@core/models';
import { MeasurementService } from '@core/services/measurement.service';
import { PaymentService } from '@core/services/payment.service';
import { LienService } from '@core/services/lien.service';
import * as moment from 'moment';
import { ProcessTypeService } from '@core/services/process-type.service';
import { Payment } from '@core/models/payment.model';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { generatePdf } from '@core/helpers/invoice-pdf'
import { Validations } from '../../../../utils/validations';
import { ConfirmationService } from 'primeng/api';
import { StoreService } from '@core/services/store.service';

@Component({
  selector: 'sales',
  templateUrl: 'sales.component.html',
  styleUrls: ['sales.component.css'],
  providers: [ConfirmationService]
})

export class SalesComponent {

  model: Process = new Process();
  sales: Process[] = [];
  stores: SelectItem[] = [];
  payments: Payment[] = [];
  form_purchase: FormGroup;
  articles: Article[] = [];
  suppliers: SelectItem[] = [];
  employees: SelectItem[] = [];
  customers: SelectItem[] = [];
  typePayments: SelectItem[] = [];
  sellers: SelectItem[] = [];
  carriers: SelectItem[] = [];
  processTypes: SelectItem[] = [];
  showModal: boolean = false;
  showModalPayment: boolean = false;
  measurements: Measurement[] = [];
  viewPayment: boolean = false;
  showEdit: boolean = false;
  liens: Lien[] = [];
  accounts: Account[] = [];
  subtotal: number = 0;
  dataDetail: any[] = [];
  filterAccounts: Account[] = [];
  processCategory: string = "3";
  sumPayment: number = 0;
  constructor(private service: ProcessService,
    private paymentService: PaymentService,
    private storeService: StoreService,
    private employeeService: EmployeeService,
    private serviceSetting: SettingService,
    private serviceCustomer: CustomerService,
    private serviceTypePayment: TypePaymentService,
    private routeStateService: RouteStateService,
    private serviceArticle: ArticleService,
    private serviceMeasurement: MeasurementService,
    private processTypeService: ProcessTypeService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private _formBuilder: FormBuilder,
    private lienService: LienService) {
    this.form_purchase = this._formBuilder.group({
      code: ['', [Validators.required]],
      description: [''],
      date: ['', [Validators.required]],
      seller: ['', [Validations.validateDropdown]],
      customer: ['', [Validations.validateDropdown]],
      carrier: [''],
      processType: ['', [Validations.validateDropdown]],
      typePayment: ['', [Validations.validateDropdown]],
      details: this._formBuilder.array([this.addDetailsFormGroup()])
    })
  }
  ngOnInit(): void {
    this.routeStateService.add("Compras", "/process/sales", null, false);
    this.getAllSales();
    this.getAllEmployees();
    this.getAllProducts();
    this.getAllMeasurements();
    this.getProcessTypeByCategory(this.processCategory);
    this.getAllCustomer();
    this.getAllTypePayments();
    this.getAllLiens();
    this.getAllStores();
  }

  newSales() {
    this.showModal = true;
    this.model = new Process();
    console.log(this.model);

    this.genarateCode();
  }

  async getAllTypePayments() {
    const data = await this.serviceTypePayment.getAll();
    data.forEach(item => {
      this.typePayments.push({
        label: item.description,
        value: item
      })
    })
  }


  async getAllLiens() {
    try {
      this.liens = await this.lienService.getAll();
    } catch (error) {
      console.error(error);
    }
  }

  async getAllStores() {
    try {
      (await this.storeService.getAll()).forEach(store =>{
          this.stores.push({
            label: store.name,
            value: store
          })
      });
    } catch (error) {
      console.error(error);
    }
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

  async getAllProcessTypes() {
    try {
      (await this.processTypeService.getAll()).forEach(processType => {
        this.processTypes.push({
          label: processType.name,
          value: processType
        });
      });
    } catch (error) {
      console.error(error);
    }
  }



  genarateCode() {
    const date = new Date();
    const numberCode = this.sales.length + 1;
    this.model.numberInvoice = `${date.getDay()}${date.getMonth()}${date.getFullYear()}${numberCode}`;
  }

  addProduct() {
    this.model.details.push(new InventoryMovement());
    // this.dataDetail.push(new InventoryMovement());
    this.details.push(this.addDetailsFormGroup());
  }

  async getAllSales() {
    const data = await this.service.getAll();
    this.sales = data.filter(e => e.typeMoviment === 'S');
    this.sales = this.sales.map(purchase => {
      purchase.total = 0;
      purchase.subTotal = 0;
      purchase.totalLien = 0;
      purchase.details.forEach(detail => {
        purchase.subTotal = (detail.article.unitValue * detail.quantity);
        purchase.totalLien = (detail.article.lien.percentage / 100) * purchase.subTotal;
        purchase.total += purchase.subTotal + purchase.totalLien;

      })
      return purchase;
    })
  }

  addDetailsFormGroup() {
    return this._formBuilder.group({
      article: [''],
      measurement: [''],
      quantity: [''],
      lien: ['']
    })
  }

  get details(): FormArray {
    return this.form_purchase.get('details') as FormArray;
  }

  async getAllEmployees() {
    const configuration = await this.serviceSetting.get();
    const data = await this.employeeService.getAll();
    data.forEach(item => {
      if (item.typeEmployee.id === configuration.carrierId) {
        this.carriers.push({
          label: `${item.person.name} ${item.person.surname} ${item.person.secondSurname}`,
          value: item
        })
      } else {
        this.sellers.push({
          label: `${item.person.name} ${item.person.surname} ${item.person.secondSurname}`,
          value: item
        })
      }
    })
  }



  async getAllCustomer() {
    const data = await this.serviceCustomer.getAll();
    data.forEach(item => {
      this.customers.push({
        label: `${item.person.name} ${item.person.surname} ${item.person.secondSurname}`,
        value: item
      })
    })
  }

  async getAllProducts() {
    this.articles = await this.serviceArticle.getAll();
    this.articles = this.articles.filter(article => article.rawMaterials.length > 0);
  }

  async getAllMeasurements() {
    this.measurements = await this.serviceMeasurement.getAll();
  }

  onChangeQuantity() {
    this.calculateTotal();
  }

  modifySale(process: Process) {
    this.model = process;
    this.showModal = true;
  }

  modalPayment(process: Process){
    this.showModalPayment = true;
    this.model = process;
    this.getAllPaymentByProcess(process);
  }

  async getAllPaymentByProcess(process: Process){
    this.payments = await this.paymentService.getByProcess(process.id);
    this.payments.forEach(pay =>{
      this.sumPayment += pay.value;
    })
  }

  OnChangeReteFuente() {
    this.model.total += this.model.reteFuente;
  }

  OnChangeReteIva() {
    this.model.total += this.model.reteIva;
  }

  OnChangeReteIca() {
    this.model.total += this.model.reteIca;
  }
  save() {
    if (!this.model.id) {
      this.model.processType.accountingProcess.debitAccount.value = this.model.subTotal;
      this.model.processType.accountingProcess.creditAccount.value = this.model.total;
      this.model.processType.accountingProcess.ivaAccount.value = this.model.totalLien;
      this.model.processType.accountingProcess.reteIvaAccount.value = this.model.reteIva;
      this.model.processType.accountingProcess.reteFuenteAccount.value = this.model.reteFuente;
      this.model.processType.accountingProcess.reteIcaAccount.value = this.model.reteIca;
      this.model.typeMoviment = 'S';
      this.model.dateInvoice = moment(this.model.dateInvoice).format('YYYY-MM-DD');
      this.service.create(this.model).pipe().subscribe(
        data => {
          console.log(data);
          this.model = data;
          this.calculateTotal();
          this.sales.push(this.model);
          this.showModal = false;
          this.messageService.add({ severity: 'success', summary: `Compra creada con exito`, detail: `Codigo: ${this.model.numberInvoice}` });
        }
      )
    } else {
      this.service.update(this.model.id, this.model).pipe(first()).subscribe(
        data => {
          if (data['success']) {
            this.sales = this.sales.map(x => {
              if (x.id == this.model.id)
                x = this.model;
              return x
            });
            this.messageService.add({ severity: 'success', summary: `Venta actualizada con éxito` });
          }
        }
      )
    }
    this.showModal = false;

  }
  deleteSale(process: Process) {
    this.confirmationService.confirm({
      header: 'Alerta',
      message: `Está eliminando: ${process.description}`,
      icon: 'fas fa-exclamation-triangle',
      accept: () => {
        this.service.delete(process.id, process).pipe(first()).subscribe(
          data => {
            if (data['success']) {
              this.sales = this.sales.filter((x) => x.id != process.id);
              this.messageService.add({ severity: 'success', summary: '', detail: 'Venta eliminada con éxito' });
            };
          },
          error => {
            console.error(error);
          }
        );
      }
    });
  }

  calculateTotal() {
    console.log(this.model.details);
    this.model.details.forEach(item => {
      item.subtotal = item.quantity * item.article.unitValue;
      item.totalLien = (item.article.lien.percentage / 100) * item.subtotal;
      item.total = item.subtotal + item.totalLien;
    })
    this.getTotal();
  }

  getTotal() {
    this.model.total = 0;
    this.model.subTotal = 0;
    this.model.totalLien = 0;
    this.model.details.forEach(item => {
      this.model.subTotal = item.subtotal + this.model.subTotal;
      this.model.totalLien = item.totalLien + this.model.totalLien;
      this.model.total = item.total + this.model.total;
    })
  }





  deleteInventoryMovement(index: number) {
    this.model.details.splice(index, 1);
    this.calculateTotal();
  }



  printTotal(...total) {
    return total;
  }

  subTotal(subtotal: number) {
    setTimeout(() => this.subtotal = subtotal, 200);
    return subtotal;
  }

}

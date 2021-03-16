import { first } from 'rxjs/operators';
import { PaymentService } from '@core/services/payment.service';
import { SettingService } from '@core/services/setting.service';
import { Article } from '@core/models/article.model';
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
import { Employee, Measurement } from '@core/models';
import { MeasurementService } from '@core/services/measurement.service';
import * as moment from 'moment';
import { Payment } from '@core/models/payment.model';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { generatePdf } from '@core/helpers/invoice-pdf'

@Component({
  selector: 'sales',
  templateUrl: 'sales.component.html',
  styleUrls: ['sales.component.css']
})

export class SalesComponent {

  model: Process = new Process();
  modelPayment: Payment = new Payment();
  sales: Process[] = [];
  payments: Payment[] = [];
  customers: SelectItem[] = [];
  articles: Article[] = [];
  measurements: Measurement[] = [];
  viewPaymentCreate: boolean = false;
  showModal: boolean = false;
  sellers: SelectItem[] = [];
  carriers: SelectItem[] = [];
  viewPayment: boolean = false;
  typePayments: SelectItem[]= [];
  sumPayment: number = 0;

  constructor(private routeStateService: RouteStateService,
    private _fB: FormBuilder,
    private service: ProcessService,
    private servicePayment: PaymentService,
    private serviceEmployee: EmployeeService,
    private serviceMeasurement: MeasurementService,
    private serviceCustomer: CustomerService,
    private messageService: MessageService,
    private serviceTypePayment: TypePaymentService,
    private serviceSetting: SettingService,
    private serviceArticle: ArticleService){}

    formSale: FormGroup = this._fB.group({
      code: ['', [Validators.required]],
      date: ['', [Validators.required]],
      client: ['', [Validators.required]],
      seller: ['', [Validators.required]],
      carrier: ['', [Validators.required]],
      address: ['', [Validators.required]],
      typePayment: ['', [Validators.required]],
      details: this._fB.array([this.addDetailGroup()])
    })

  addDetailGroup(){
    return this._fB.group({
      article: ['', [Validators.required]],
      quantity: ['', [Validators.required]]
    })
  }

  get addDetails(): FormArray {
    return <FormArray>this.formSale.get('details');
  }

  ngOnInit(): void {
    this.routeStateService.add("Ventas", "/process/sales", null, false);
    this.getAllSales();
    this.getAllCustomer();
    this.getAllEmployee();
    this.getAllTypePayments();
    this.getAllProducts();
    this.getAllMeasurements();
  }

  genarateCode() {
    const date = new Date();
    const numberCode = this.sales.length + 1;
    this.model.numberInvoice = `${date.getDay()}${date.getMonth()}${date.getFullYear()}${numberCode}`;
  }

  async getAllSales() {
    const data = await this.service.getAll();
    this.sales = data.filter(e => e.typeMoviment === 'S');
    this.sales = this.sales.map(e => {
      e.total = 0;
      e.details.forEach(de => {
        de.total = de.quantity * de.article.unitValue;
        e.total = de.total + e.total;
      })
      return e;
    })
  }

  async getAllPayments() {
    const data = await this.servicePayment.getByProcess(this.model.id);
    this.sumPayment = 0;
    this.payments = data.map(item => {
      this.sumPayment = item.value + this.sumPayment;
      item.datePay = moment(this.model.dateInvoice).format('YYYY/MM/DD');
      return item;
    })
  }

  async getAllCustomer() {
    const data = await this.serviceCustomer.getAll();
    data.forEach( item => {
      this.customers.push({
        label: `${item.person.name} ${item.person.surname} ${item.person.secondSurname}`,
        value: item.id
      })
    })
  }

  async getAllTypePayments() {
    const data = await this.serviceTypePayment.getAll();
    data.forEach(item => {
      this.typePayments.push({
        label: item.description,
        value: item.id
      })
    })
  }

  async getAllEmployee() {
    const configuration = await this.serviceSetting.get();
    const data = await this.serviceEmployee.getAll();
    data.forEach( item => {
      if(item.typeEmployee.id === configuration.carrierId) {
        this.carriers.push({
          label: `${item.person.name} ${item.person.surname} ${item.person.secondSurname}`,
          value: item.id
        })
      } else {
        this.sellers.push({
          label: `${item.person.name} ${item.person.surname} ${item.person.secondSurname}`,
          value: item.id
        })
      }
    })
  }

  async getAllProducts() {
    const data = await this.serviceArticle.getAll();
    this.articles = data.filter(item => item.rawMaterials.length > 0);
  }

  async getAllMeasurements() {
    this.measurements = await this.serviceMeasurement.getAll();
  }

  addProduct() {
    this.model.details.push(new InventoryMovement());
  }

  onChangeQuantity() {
    this.calculateTotal();
  }

  modifySales(sale: Process) {
    this.model = sale;
    this.model.carrier = this.model.carrier || new Employee();
    this.showModal = true;
    this.getAllPayments();
    this.model.details.forEach(item => {
      if(this.model.details.length != this.addDetails.length){
        this.addDetails.push(this.addDetailGroup())
      }
    });
  }

  save() {
    console.log(this.model)
    this.model.typeMoviment = 'S';
    this.model.dateInvoice = moment(this.model.dateInvoice).format('YYYY-MM-DD');

    if(!this.model.id) {
      this.service.create(this.model).pipe().subscribe(
        data =>{
          this.model = data;
          this.calculateTotal();
          this.sales.push(this.model);
          console.log(this.model);
          generatePdf(this.model);
          this.showModal = false;
          this.messageService.add({ severity: 'success', summary: `Venta creada con exito`, detail: `Codigo: ${this.model.numberInvoice}` });
        }
      )
    }
  }

  savePayment() {
    this.modelPayment.datePay = moment(this.modelPayment.datePay).format('YYYY-MM-DD');
    this.modelPayment.process = this.model;
    this.servicePayment.create(this.modelPayment).pipe(first()).subscribe(
      data => {
        this.payments.push(data);
        this.sumPayment = 0;
        this.payments.forEach(e => this.sumPayment = e.value + this.sumPayment);
        if(this.sumPayment === this.model.total) {
          this.model.state = 'P';
          this.service.update(this.model.id, this.model).pipe().subscribe(
            data => console.log(data)
          );
        }
        this.viewPaymentCreate = false;
        this.messageService.add({ severity: 'success', summary: `Pago realizado con exito`});
      },
      error => {
        console.error(error);
      }
    )
  }

  calculateTotal() {
    this.model.total = 0;
    this.model.details.forEach(item => {
      item.total = item.quantity * item.article.unitValue;
      this.model.total = item.total + this.model.total;
    })
  }

  async calculateTotalDetail(dataRow: InventoryMovement) {
    const { article } = dataRow;
    console.log(article);

  }

  newSale() {
    this.showModal = true;
    this.model = new Process();
    this.genarateCode();
  }

  deleteInventoryMovement(index: number){
    this.model.details.splice(index,1);
  }

  downloadPdf(dataRow){
    generatePdf(dataRow);
  }
}

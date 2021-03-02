import { SettingService } from '@core/services/setting.service';
import { Article } from './../../../core/models/article.model';
import { Sale } from '@core/models/sales.model';
import { MessageService, SelectItem } from 'primeng/api';
import { CustomerService } from './../../../core/services/customer.service';
import { Component } from '@angular/core';
import { RouteStateService } from '@core/services/route-state.service';
import { ArticleService } from '@core/services/article.service';
import { InventoryMovement } from '@core/models/detail-sale.model';
import { EmployeeService } from '@core/services/employee.service';
import { TypePaymentService } from '@core/services/type-payment.service';
import { Process } from '@core/models/process.model';
import { ProcessService } from '@core/services/process.service';
import { Measurement } from '@core/models';
import { MeasurementService } from '@core/services/measurement.service';
import * as moment from 'moment';

@Component({
  selector: 'sales',
  templateUrl: 'sales.component.html',
  styleUrls: ['sales.component.css']
})

export class SalesComponent {

  model: Process = new Process();
  sales: Process[] = [];
  customers: SelectItem[] = [];
  articles: Article[] = [];
  measurements: Measurement[] = [];
  showModal: boolean = false;
  sellers: SelectItem[] = [];
  carriers: SelectItem[] = [];
  viewPayment: boolean = false;
  typePayments: SelectItem[]= []
  payments: any = [{date: '2002/02/02', value: '584425'},{date: '2002/02/02', value: '584425'}];

  constructor(private routeStateService: RouteStateService,
    private service: ProcessService,
    private serviceEmployee: EmployeeService,
    private serviceMeasurement: MeasurementService,
    private serviceCustomer: CustomerService,
    private messageService: MessageService,
    private serviceTypePayment: TypePaymentService,
    private serviceSetting: SettingService,
    private serviceArticle: ArticleService){}


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
    console.log(this.sales);
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
    this.showModal = true;
  }

  save() {
    this.model.typeMoviment = 'S';
    this.model.dateInvoice = moment(this.model.dateInvoice).format('YYYY-MM-DD');
    // console.log(this.model);
    if(!this.model.id) {
      this.service.create(this.model).pipe().subscribe(
        data =>{
          console.log(data);
          this.model = data;
          this.calculateTotal();
          this.sales.push(this.model);
          this.showModal = false;
          this.messageService.add({ severity: 'success', summary: `Compra creada con exito`, detail: `Codigo: ${this.model.numberInvoice}` });
        }
      )
    }
  }

  calculateTotal() {
    this.model.total = 0;
    this.model.details.forEach(item => {
      item.total = item.quantity * item.article.unitValue;
      this.model.total = item.total + this.model.total;
    })
  }

  async calculateTotalDetail(dataRow: InventoryMovement) {
    console.log(dataRow);
  }

  newSale() {
    this.showModal = true;
    this.model = new Process();
    this.genarateCode();
  }

  deleteInventoryMovement(index: number){
    this.model.details.splice(index,1);
  }
}

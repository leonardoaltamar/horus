import { SettingService } from '@core/services/setting.service';
import { Article } from './../../../core/models/article.model';
import { Sale } from '@core/models/sales.model';
import { SelectItem } from 'primeng/api';
import { CustomerService } from './../../../core/services/customer.service';
import { Component } from '@angular/core';
import { RouteStateService } from '@core/services/route-state.service';
import { ArticleService } from '@core/services/article.service';
import { InventoryMovement } from '@core/models/detail-sale.model';
import { EmployeeService } from '@core/services/employee.service';
import { TypePaymentService } from '@core/services/type-payment.service';

@Component({
  selector: 'sales',
  templateUrl: 'sales.component.html',
  styleUrls: ['sales.component.css']
})

export class SalesComponent {

  constructor(private routeStateService: RouteStateService,
    private serviceEmployee: EmployeeService,
    private serviceCustomer: CustomerService,
    private serviceTypePayment: TypePaymentService,
    private serviceSetting: SettingService,
    private serviceArticle: ArticleService){}

  model: Sale = new Sale();
  customers: SelectItem[] = [];
  showModal: boolean = false;
  showModalArticles: boolean = false;
  details: InventoryMovement[] = [];
  messageError: boolean = false;
  sellers: SelectItem[] = [];
  carriers: SelectItem[] = [];
  viewPayment: boolean = false;
  typePayments: SelectItem[]= []
  payments: any = [{date: '2002/02/02', value: '584425'},{date: '2002/02/02', value: '584425'}]

  ngOnInit(): void {
    this.routeStateService.add("Ventas", "/process/sales", null, false);
    this.getAllCustomer();
    this.getAllEmployee();
    this.getAllTypePayments();
    this.getAllProducts();
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
    console.log(data)
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
    console.log(this.carriers)
  }

  async getAllProducts() {
    const data = await this.serviceArticle.getAll();
    data.forEach((item: Article) => {
      const detail = new InventoryMovement();
      detail.article = item;
      this.details.push(detail);
    })
  }

  onChangeQuantity(dataRow: any) {
    const { quantity, article } = dataRow;
    if(quantity > article.stock) {
      dataRow.quantity = 0;
      this.messageError = true;
      setTimeout(() => {
        this.messageError = false;
      }, 3000);
    }
  }

  newSale() {
    this.showModal = true;
  }

  deleteInventoryMovement(index: number){
    console.log(index)
    this.model.details.splice(index,1);
  }

  addInventoryMovement(inventoryMovement: InventoryMovement) {
    inventoryMovement.article.stock = inventoryMovement.article.stock - inventoryMovement.quantity;
    const inventoryMovementDestructuring = {...inventoryMovement};
    let isExit = false;
    this.model.details = this.model.details.map(item => {
      if(item.article.id === inventoryMovementDestructuring.article.id) {
        isExit = true;
        item.quantity = (item.quantity + inventoryMovementDestructuring.quantity);
        item.total = item.quantity * item.article.unitValue;
      }
      return item;
    })
    if(!isExit) {
      inventoryMovementDestructuring.total = inventoryMovementDestructuring.article.unitValue * inventoryMovementDestructuring.quantity;
      this.model.details.push(inventoryMovementDestructuring);
    }
    this.model.details.forEach(item => this.model.total = this.model.total + item.total);
  }
}

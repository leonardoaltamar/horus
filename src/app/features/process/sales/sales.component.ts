import { Article } from './../../../core/models/article.model';
import { Sale } from '@core/models/sales.model';
import { SelectItem } from 'primeng/api';
import { CustomerService } from './../../../core/services/customer.service';
import { Component } from '@angular/core';
import { RouteStateService } from '@core/services/route-state.service';
import { ArticleService } from '@core/services/article.service';
import { InventoryMovement } from '@core/models/detail-sale.model';
import { Message, MessageService } from 'primeng/api';
import { EmployeeService } from '@core/services/employee.service';

@Component({
  selector: 'sales',
  templateUrl: 'sales.component.html',
  styleUrls: ['sales.component.css']
})

export class SalesComponent {

  constructor(private routeStateService: RouteStateService,
    private serviceEmployee: EmployeeService,
    private serviceCustomer: CustomerService,
    private serviceArticle: ArticleService){}

  model: Sale = new Sale();
  customers: SelectItem[] = [];
  showModal: boolean = false;
  showModalArticles: boolean = false;
  details: InventoryMovement[] = [];
  messageError: boolean = false;
  sellers: SelectItem[] = [];
  carriers: SelectItem[] = [];

  ngOnInit(): void {
    this.routeStateService.add("Ventas", "/process/sales", null, false);
    this.getAllCustomer();
    this.getAllEmployee();
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

  async getAllEmployee() {
    const data = await this.serviceEmployee.getAll();
    data.forEach( item => {
      if(item.type === 'C') {
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

import { Sale } from '@core/models/sales.model';
import { Product } from '@core/models/product.model';
import { SelectItem } from 'primeng/api';
import { CustomerService } from './../../../core/services/customer.service';
import { Component } from '@angular/core';
import { RouteStateService } from '@core/services/route-state.service';
import { ProductService } from '@core/services/product.service';
import { InventoryMovement } from '@core/models/detail-sale.model';
import { Message, MessageService } from 'primeng/api';

@Component({
  selector: 'sales',
  templateUrl: 'sales.component.html',
  styleUrls: ['sales.component.css']
})

export class SalesComponent {

  constructor(private routeStateService: RouteStateService,
    private serviceCustomer: CustomerService,
    private serviceProduct: ProductService){}

  model: Sale = new Sale();
  customers: SelectItem[] = [];
  products: Product[] = [];
  showModal: boolean = false;
  showModalProducts: boolean = false;
  details: InventoryMovement[] = [];
  messageError: boolean = false;

  ngOnInit(): void {
    this.routeStateService.add("Ventas", "/process/sales", null, false);
    this.getAllCustomer();
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

  async getAllProducts() {
    const data = await this.serviceProduct.getAll();
    data.forEach((item: Product) => {
      const detail = new InventoryMovement();
      detail.product = item;
      this.details.push(detail);
    })
  }

  onChangeQuantity(dataRow: any) {
    const { quantity, product } = dataRow;
    if(quantity > product.article.stock) {
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

  addInventoryMovement() {
    this.model.details = this.details.filter(item => item.quantity != 0);
    this.model.details = this.model.details.map(item=> {
      item.total = item.product.article.unitValue * item.quantity;
      this.model.total = this.model.total + item.total;
      return item;
    })
    this.showModalProducts = false;
  }
}

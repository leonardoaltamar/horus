import { ProcessService } from '@core/services/process.service';
import { MessageService, SelectItem } from 'primeng/api';
import { Process } from '@core/models/process.model';
import { Component } from '@angular/core';
import { RouteStateService } from '@core/services/route-state.service';
import { InventoryMovement } from '@core/models/detail-sale.model';
import { ArticleService } from '@core/services/article.service';
import { Article, Measurement } from '@core/models';
import { SupplierService } from '@core/services/supplier.service';
import * as moment from 'moment';
import { MeasurementService } from '@core/services/measurement.service';
import { generatePdfPurchases } from '@core/helpers/invoice-pdf'
@Component({
  selector: 'purchases',
  templateUrl: 'purchases.component.html',
  styleUrls: ['purchases.component.css']
})

export class purchasesComponent {

  model: Process = new Process();
  purchases: Process[] = [];
  articles: Article[] = [];
  suppliers: SelectItem[] = [];
  showModal: boolean = false;
  measurements: Measurement[] = [];
  showEdit: boolean = false;

  constructor(private service: ProcessService,
              private routeStateService: RouteStateService,
              private serviceArticle: ArticleService,
              private serviceMeasurement: MeasurementService,
              private messageService: MessageService,
              private serviceSupplier: SupplierService) {}

  ngOnInit(): void {
    this.routeStateService.add("Compras", "/process/purchases", null, false);
    this.getAllPurchases();
    this.getAllSuppliers();
    this.getAllProducts();
    this.getAllMeasurements();
  }

  newPurchases() {
    this.showModal = true;
    this.model = new Process();
    this.genarateCode();
  }

  genarateCode() {
    const date = new Date();
    const numberCode = this.purchases.length + 1;
    this.model.numberInvoice = `${date.getDay()}${date.getMonth()}${date.getFullYear()}${numberCode}`;
  }

  addProduct() {
    this.model.details.push(new InventoryMovement());
  }

  async getAllPurchases() {
    const data = await this.service.getAll();
    this.purchases = data.filter(e => e.typeMoviment === 'E');
    this.purchases = this.purchases.map(e => {
      e.total = 0;
      e.details.forEach(de => {
        de.total = de.quantity * de.article.acquisitionValue;
        e.total = de.total + e.total;
      })
      return e;
    })
  }

  async getAllSuppliers() {
    const data = await this.serviceSupplier.getAll();
    data.forEach(item => {
      this.suppliers.push({
        label: `${item.person.name} ${item.person.surname} ${item.person.secondSurname}`,
        value: item.id
      })
    })
  }

  async getAllProducts() {
    this.articles = await this.serviceArticle.getAll();
  }

  async getAllMeasurements() {
    this.measurements = await this.serviceMeasurement.getAll();
  }

  onChangeQuantity() {
    this.calculateTotal();
  }

  save() {
    this.model.typeMoviment = 'E';
    this.model.dateInvoice = moment(this.model.dateInvoice).format('YYYY-MM-DD');
    console.log(this.model);
    if(!this.model.id) {
      this.service.create(this.model).pipe().subscribe(
        data => {
          console.log(data);
          this.model = data;
          this.calculateTotal();
          this.purchases.push(this.model);
          this.showModal = false;
          this.messageService.add({ severity: 'success', summary: `Compra creada con exito`, detail: `Codigo: ${this.model.numberInvoice}` });
        }
      )
    }
  }

  calculateTotal() {
    this.model.total = 0;
    this.model.details.forEach(item => {
      item.total = item.quantity * item.article.acquisitionValue;
      this.model.total = item.total + this.model.total;
    })
  }

  deleteInventoryMovement(index: number){
    this.model.details.splice(index,1);
    this.calculateTotal();
  }

  downloadPdf(datarow){
    generatePdfPurchases(datarow);
  }
}

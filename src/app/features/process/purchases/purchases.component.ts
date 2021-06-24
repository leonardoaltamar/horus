import { ProcessService } from '@core/services/process.service';
import { MessageService, SelectItem } from 'primeng/api';
import { Process } from '@core/models/process.model';
import { Payment } from '@core/models/payment.model';
import { Component } from '@angular/core';
import { RouteStateService } from '@core/services/route-state.service';
import { InventoryMovement } from '@core/models/detail-sale.model';
import { ArticleService } from '@core/services/article.service';
import { Article, Account,Measurement, Lien } from '@core/models';
import { SupplierService } from '@core/services/supplier.service';
import * as moment from 'moment';
import { MeasurementService } from '@core/services/measurement.service';
import { ProcessTypeService } from '@core/services/process-type.service';
import { generatePdfPurchases } from '@core/helpers/pdf-purchases'
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LienService } from '@core/services/lien.service';
import { AccountService } from '@core/services/account.service';
import { StoreService } from '@core/services/store.service';
import { PaymentService } from '@core/services/payment.service';
@Component({
  selector: 'purchases',
  templateUrl: 'purchases.component.html',
  styleUrls: ['purchases.component.css']
})

export class purchasesComponent {

  model: Process = new Process();
  purchases: Process[] = [];
  processCategory: string = "1";

  form_purchase: FormGroup;
  articles: Article[] = [];
  suppliers: SelectItem[] = [];
  stores: SelectItem[] = [];
  payments: Payment[] = [];
  processTypes: SelectItem[] = [];
  showModal: boolean = false;
  measurements: Measurement[] = [];
  showEdit: boolean = false;
  showModalPayment: boolean = false;
  viewPayment: boolean = false;
  liens: Lien[] = [];
  accounts: Account[] = [];
  subtotal:number = 0;
  reteFuente:number = 0;
  reteIca: number = 0;
  reteIva:number = 0;
  sumPayment: number = 0;
  dataDetail: any[] = [];
  filterAccounts: Account[] = [];
  constructor(private service: ProcessService,
              private storeService: StoreService,
              private routeStateService: RouteStateService,
              private serviceArticle: ArticleService,
              private serviceMeasurement: MeasurementService,
              private processTypeService: ProcessTypeService,
              private messageService: MessageService,
              private paymentService: PaymentService,
              private _formBuilder: FormBuilder,
              private serviceSupplier: SupplierService,
              private accountService: AccountService,
              private lienService: LienService) {
                this.form_purchase = this._formBuilder.group({
                  code: ['', [Validators.required]],
                  account: [''],
                  description: [''],
                  date: ['', [Validators.required]],
                  supplier: ['', [Validators.required]],
                  processType: ['', [Validators.required]]
                })
              }
  ngOnInit(): void {
    this.routeStateService.add("Compras", "/process/purchases", null, false);
    this.getProcessTypeByCategory(this.processCategory);
    this.getAllPurchases();
    this.getAllStores();
    this.getAllSuppliers();
    this.getAllProducts();
    this.getAllMeasurements();
    this.getAllLiens();
  }



  newPurchases() {
    this.showModal = true;
    this.model = new Process();
    this.genarateCode();
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

  genarateCode() {
    const date = new Date();
    const numberCode = this.purchases.length + 1;
    this.model.numberInvoice = `${date.getDay()}${date.getMonth()}${date.getFullYear()}${numberCode}`;
  }

  addProduct() {
    this.model.details.push(new InventoryMovement());
    // this.dataDetail.push(new InventoryMovement());
    // this.details.push(this.addDetailsFormGroup());
  }

  async getAllPurchases() {
    const data = await this.service.getAll();
    this.purchases = data.filter(e => e.typeMoviment === 'E');
    this.purchases = this.purchases.map(purchase => {
      purchase.total = 0;
      purchase.subTotal = 0;
      purchase.totalLien = 0;
      purchase.details.forEach(detail=>{
        purchase.subTotal = (detail.article.acquisitionValue * detail.quantity);
        purchase.totalLien = (detail.article.lien.percentage/100) * purchase.subTotal;
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

  async getAllSuppliers() {
    const data = await this.serviceSupplier.getAll();
    data.forEach(item => {
      this.suppliers.push({
        label: `${item.person.name} ${item.person.surname} ${item.person.secondSurname}`,
        value: item
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

  save() {
    console.log(this.model);
    this.model.processType.accountingProcess.debitAccount.value = this.model.subTotal;

    this.model.processType.accountingProcess.creditAccount.value = this.model.total;

    this.model.processType.accountingProcess.ivaAccount.value = this.model.totalLien;
    this.model.processType.accountingProcess.reteIvaAccount.value = this.model.reteIva;
    this.model.processType.accountingProcess.reteFuenteAccount.value = this.model.reteFuente;
    this.model.processType.accountingProcess.reteIcaAccount.value = this.model.reteIca;

    if(this.model.processType.accountingProcess.ivaAccount){
      this.model.processType.accountingProcess.ivaAccount.nature = this.model.processType.accountingProcess.ivaAccountNature;
    }

    if(this.model.processType.accountingProcess.reteIcaAccount){
      this.model.processType.accountingProcess.reteIcaAccount.nature = this.model.processType.accountingProcess.reteIcaAccountNature;
    }

    if(this.model.processType.accountingProcess.reteFuenteAccount){
      this.model.processType.accountingProcess.reteFuenteAccount.nature = this.model.processType.accountingProcess.reteFuenteAccountNature;
    }

    this.model.typeMoviment = 'E';
    this.model.dateInvoice = moment(this.model.dateInvoice).format('YYYY-MM-DD');
    if(!this.model.id) {
      this.service.create(this.model).pipe().subscribe(
        data => {
          console.log(data);
          this.model = data;
          this.purchases.push(this.model);
          this.showModal = false;
          this.messageService.add({ severity: 'success', summary: `Compra creada con exito`, detail: `Codigo: ${this.model.numberInvoice}` });
        }
      )
    }else{
      this.service.update(this.model.id,this.model).pipe().subscribe(
        data =>{
          if(data['success']){
            this.purchases = this.purchases.map(purchase=>{
              if(purchase.id === this.model.id){
                purchase = this.model;
                return purchase;
              }
            })
          }
        }
      )
    }
  }

  calculateTotal() {
    this.model.details.forEach(item => {
      item.subtotal = item.quantity * item.article.acquisitionValue;
      item.totalLien = (item.article.lien.percentage / 100) * item.subtotal;
      item.total = item.subtotal + item.totalLien;
    })
    this.getTotal();
  }

  getTotal(){
    this.model.total = 0;
    this.model.subTotal = 0;
    this.model.totalLien = 0;
    this.model.details.forEach(item=>{
      this.model.subTotal = item.subtotal + this.model.subTotal;
      this.model.totalLien  = item.totalLien + this.model.totalLien;
      this.model.total = item.total + this.model.total;
    })
    this.model.total += this.model.reteFuente;
  }

  filterAccount(event): void {
    let filtered: Account[] = [];
    let { query } = event;

    this.accounts.forEach( account => {
      if (account.code.indexOf(query) >= 0) {
          filtered.push(account);
      }
    });
    this.filterAccounts = filtered;

  }

  OnChangeReteFuente(){
    this.model.total += this.model.reteFuente;
  }

  OnChangeReteIva(){
    this.model.total += this.model.reteIva;
  }

  OnChangeReteIca(){
    this.model.total += this.model.reteIca;
  }

  deleteInventoryMovement(index: number){
    this.model.details.splice(index,1);
    this.calculateTotal();
  }

  downloadPdf(datarow){
    generatePdfPurchases(datarow);
  }

  printTotal(...total){
    return total;
  }

  subTotal(subtotal:number){
    setTimeout(() => this.subtotal = subtotal, 200);
    return subtotal;
  }

}

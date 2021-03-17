import { Component, OnInit } from '@angular/core';
import { RouteStateService } from 'src/app/core/services/route-state.service';
import { FormBuilder, Validators, FormArray, FormGroup, AbstractControl } from '@angular/forms';
import { Article, MovementOrder, ProductionOrder } from '@core/models';
import { ConfirmationService, MessageService } from 'primeng/api';

//servicios
import { ArticleService } from '@core/services/article.service';
import { ProductionOrderService } from '@core/services/production_order.service';
@Component({
  selector: 'app-production',
  templateUrl: './production.component.html',
  styleUrls: ['./production.component.css']
})
export class ProductionComponent implements OnInit {
  isLoading: boolean = false;
  showModal: boolean = false;
  articles: Article[] = [];
  article: Article = new Article();
  productionOrder: ProductionOrder = new ProductionOrder();
  productionOrders: ProductionOrder[];
  form_production: FormGroup;
  showEdit: boolean = false;
  constructor(private routeStateService: RouteStateService,
    private articleService: ArticleService,
    private productionService: ProductionOrderService,
    private _formuilder: FormBuilder,
    private messageService: MessageService,) {
      this.form_production = this._formuilder.group({
        date: ['', [Validators.required], []],
        numOrder: ['', [Validators.required], []],
        numLote: ['', [Validators.required], []],
        details: this._formuilder.array([this._formuilder.group({
          article: [''],
          quantity: ['']
        })]),
      })

    }

  ngOnInit(): void {
    this.routeStateService.add("Productos", "/inventary/productions", null, false);
    this.getAllArticles();
    this.getAllProduction();
  }

  newProduction(){
    this.showModal = true;
    this.productionOrder = new ProductionOrder();
  }

  get productionOrder_from(): FormArray {
    return this.form_production.get('productionOrder') as FormArray;
  }

  get details(): FormArray{
    return this.form_production.get('details') as FormArray;
  }

  addProduct(){
    this.productionOrder.details = [...this.productionOrder.details];
    this.productionOrder.details.push(new MovementOrder);
    this.details.push(this._formuilder.group({
      article: [''],
      quantity: ['']
    }))
  }

  async getAllProduction(){
    try {
      this.isLoading = true;
      this.productionOrders = await this.productionService.getAll();
      this.isLoading = false;
    } catch (error) {
      this.isLoading = false;
      console.error(error)
    }
  }

  async getAllArticles() {
    try {
      this.isLoading = true;
      const data = await this.articleService.getAll();
      this.articles = data.filter(e => e.rawMaterials != null && e.rawMaterials.length > 0);
      this.isLoading = false;
    } catch (error) {
      this.isLoading = false;
      console.error(error)
    }
  }

  addRow() {
    this.articles = [...this.articles];
    this.articles.push(new Article());
  }

  modifyProductionOrder(productionOrder: ProductionOrder) {
    this.showEdit = true;
    this.productionOrder = productionOrder;
    console.log(productionOrder);
  }

  saveProductionOrder(){
    console.log(this.productionOrder);
    this.productionService.create(this.productionOrder).subscribe(
      data => {
        console.log(data);
        this.productionOrder = data;
        this.productionOrders.push(this.productionOrder);
        this.messageService.add({ severity: 'success', summary: `Orden de producción creada con exito` });
      },
      error => {
        console.error(`Error de guardado ${error}`);
      }
    );
    this.showModal = false;
  }
}

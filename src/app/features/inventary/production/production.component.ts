import { Component, OnInit } from '@angular/core';
import { RouteStateService } from 'src/app/core/services/route-state.service';
import { FormBuilder, Validators, FormArray, FormGroup, AbstractControl } from '@angular/forms';
import { Article, ProductionOrder } from '@core/models';
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
  constructor(private routeStateService: RouteStateService,
    private articleService: ArticleService,
    private productionService: ProductionOrderService,
    private _formuilder: FormBuilder,
    private messageService: MessageService,) {
      this.form_production = this._formuilder.group({
        date: ['', [Validators.required], []],
        numOrder: ['', [Validators.required], []],
        numLote: ['', [Validators.required], []],
        article:['', [Validators.required], []],
        quantity:['', [Validators.required], []]
      })

    }



  ngOnInit(): void {
    this.routeStateService.add("Productos", "/inventary/productions", null, false);
    this.getAllArticles();
    this.getAllProduction();
  }

  newProduction(){
    this.showModal = true;
  }

  get productionOrder_from(): FormArray {
    return this.form_production.get('productionOrder') as FormArray;
  }

  deleteRow(dataRow, rowIndex){

  }

  addProduct(){
      console.log(this.article);
      this.productionOrder.articles.push(this.article);

  }

  async getAllProduction(){
    try {
      this.isLoading = true;
      this.productionOrders = await this.productionService.getAll();
      console.log(this.productionOrders);
      this.isLoading = false;
    } catch (error) {
      this.isLoading = false;
      console.error(error)
    }
  }

  async getAllArticles() {
    try {
      this.isLoading = true;
      this.articles = await this.articleService.getAll();
      console.log(this.articles);
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

  saveProductionOrder(){
    console.log(this.productionOrder)

    this.productionService.create(this.productionOrder).subscribe(
      data => {
        console.log(this.article);
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

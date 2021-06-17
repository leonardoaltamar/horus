import { Component, OnInit } from '@angular/core';
import { RouteStateService } from 'src/app/core/services/route-state.service';
import { FormBuilder, Validators, FormArray, FormGroup, AbstractControl } from '@angular/forms';
import { Article, MovementOrder, ProductionOrder } from '@core/models';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { generatePdf } from '@core/helpers/production_order.pdf'

//servicios
import { ArticleService } from '@core/services/article.service';
import { ProcessTypeService } from '@core/services/process-type.service';
import { ProductionOrderService } from '@core/services/production_order.service';
import { first } from 'rxjs/operators';
import { Process } from '@core/models/process.model';
import { InventoryMovement } from '@core/models/detail-sale.model';
import { ProcessService } from '@core/services/process.service';

@Component({
  selector: 'app-production',
  templateUrl: './production.component.html',
  styleUrls: ['./production.component.css'],
  providers: [ConfirmationService]
})
export class ProductionComponent implements OnInit {
  isLoading: boolean = false;
  showModal: boolean = false;
  articles: Article[] = [];
  processTypes: SelectItem[] = [];
  product: Article = new Article();
  productionOrder: Process = new Process();
  productionOrders: Process[];
  isChangeState: boolean = false;
  form_production: FormGroup;
  showEdit: boolean = false;
  constructor(private routeStateService: RouteStateService,
    private productService: ArticleService,
    private processTypeService: ProcessTypeService,
    private confirmationService: ConfirmationService,
    private processService: ProcessService,
    private _formuilder: FormBuilder,
    private messageService: MessageService,) {
      this.form_production = this._formuilder.group({
        date: ['', [Validators.required], []],
        numOrder: ['', [Validators.required], []],
        numLote: ['', [Validators.required], []],
        processType: ['', [Validators.required], []],
        details: this._formuilder.array([this.addDetailFormGroup()]),
      })

    }

  ngOnInit(): void {
    this.routeStateService.add("Produccion", "/inventary/productions", null, false);
    this.getAllProducts();
    this.getAllProduction();
    this.getAllProcessTypes();
  }

  newProduction(){
    this.showModal = true;
    this.productionOrder = new Process();
  }

  get productionOrder_from(): FormArray {
    return this.form_production.get('productionOrder') as FormArray;
  }

  get details(): FormArray{
    return this.form_production.get('details') as FormArray;
  }

  addProduct(){
    this.productionOrder.details = [...this.productionOrder.details];
    this.productionOrder.details.push(new InventoryMovement);
    this.details.push(this.addDetailFormGroup())
  }

  addDetailFormGroup() {
    return this._formuilder.group({
      article: [''],
      quantity: ['']
    })
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

  async getAllProduction(){
    try {
      this.isLoading = true;
      this.productionOrders = await this.processService.getAll();
      this.productionOrders = this.productionOrders.filter(e => e.typeMoviment = 'P');
      console.log(this.productionOrder);
      this.isLoading = false;
      console.log(this.productionOrders);
    } catch (error) {
      this.isLoading = false;
      console.error(error)
    }
  }

  async getAllProducts() {
    try {
      this.isLoading = true;
      this.articles = await this.productService.getAll();
      this.articles = this.articles.filter(article => article.rawMaterials.length > 0);
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

  modifyProductionOrder(productionOrder: Process) {
    this.productionOrder = productionOrder;
    this.productionOrder.details.forEach( email => {
      if(this.productionOrder.details.length != this.details.length){
        this.details.push(this.addDetailFormGroup())
      }
    });
    this.showEdit = true;
  }

  saveProductionOrder(){
    console.log(this.productionOrder);
    this.productionOrder.typeMoviment = 'P';
    this.processService.create(this.productionOrder).subscribe(
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

  // confirmState(event: Event) {
  //   this.isChangeState = true;
  //   this.confirmationService.confirm({
  //     target: event.target,
  //     acceptLabel: 'Sí',
  //     rejectLabel: 'No',
  //     message: '¿Deseas cambiar el estado a terminado?',
  //     icon: 'pi pi-exclamation-triangle',
  //     accept: () => {
  //       this.productionOrder.state = 'A';
  //       this.productionService.update(this.productionOrder.id, this.productionOrder).pipe(first()).subscribe(
  //         response => {
  //           if(response['success']) {
  //             this.messageService.add({severity:'info', detail:'Estado actualizado a terminado'});
  //           }
  //         },
  //         erorr => {
  //           this.messageService.add({severity:'error', detail:'Ocurrio un error al momento de actualizar el estado'});
  //         }
  //       )
  //     },
  // });
  // }

  // deleteProdution(productionOrder: ProductionOrder) {
  //   this.isChangeState = false;
  //   const canDeleted = productionOrder.state === 'E'
  //   if(canDeleted) {
  //     this.confirmationService.confirm({
  //       header: 'Alerta',
  //       message: `¿Está seguro de eliminar esta orden de producción?`,
  //       icon: 'fas fa-exclamation-triangle',
  //       accept: () => {
  //         this.productionService.delete(productionOrder.id, productionOrder).pipe(first()).subscribe(
  //           data => {
  //             console.log(data);
  //             if (data['success']) {
  //               this.messageService.add({ severity: 'success', summary: '', detail: `Orden de producción eliminada con éxito` });
  //               this.productionOrders = this.productionOrders.filter((x) => x.id != productionOrder.id);
  //             }
  //           },
  //           error => console.log(error)
  //         );
  //       }
  //     });
  //   }
  // }

  downloadPdf(productionOrder){
    generatePdf(productionOrder);
  }
}

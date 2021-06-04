import { Component, OnInit } from '@angular/core';
import { RouteStateService } from 'src/app/core/services/route-state.service';
import { FormBuilder, Validators, FormArray, FormGroup, AbstractControl } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SelectItem } from 'primeng/api';
import { first } from 'rxjs/operators';

//models
import { RawMaterial, Measurement, Article} from '@core/models/';


//services
import { CategoryService } from '@core/services/category.service';
import { LienService } from '@core/services/lien.service';
import { ArticleService } from '@core/services/article.service';
import { RawMaterialService } from '@core/services/raw-material.service';
import { DetailProductService } from '@core/services/detail-product.service';
import { MeasurementService } from '@core/services/measurement.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [ConfirmationService]
})

export class ProductComponent implements OnInit {
  form_product: FormGroup;
  isLoading: boolean = false;
  showModal: boolean = false;
  rawMaterials: Article[] = [];
  liens: SelectItem[] = [];
  //Modelos
  model: Article = new Article();
  products: Article[] = [];
  categories: SelectItem[] = [];
  measurements: Measurement[] = [];

  constructor(private service: ArticleService,
    private rawMaterialService: RawMaterialService,
    private detailProductService: DetailProductService,
    private lienService: LienService,
    private routeStateService: RouteStateService,
    private _formuilder: FormBuilder,
    private categoryService: CategoryService,
    private measurementService: MeasurementService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  ) {
    this.form_product = this._formuilder.group({
      code: ['', [Validators.required], [this.validate_articles.bind(this)]],
      name: ['', [Validators.required], []],
      lien: [''],
      unitValue: [''],
      expeditionDate: [],
      materials: this._formuilder.array([this.addRowMaterialFormGroup()])
    })
  }

  ngOnInit(): void {
    this.routeStateService.add("Productos", "/inventary/products", null, false);
    this.getAllProducts();
    this.getAllLiens();
    this.getAllCategory();
    this.getAllMeasurements();

  }

  async getAllProducts() {
    try {
      this.isLoading = true;
      this.products = await this.service.getAll();
      this.rawMaterials = this.products;
      this.products = this.products.filter(article => article.rawMaterials.length > 0);
      this.isLoading = false;
    } catch (error) {
      this.isLoading = false;
      console.error(error)
    }
  }

  async getAllLiens() {
    this.isLoading = true;
    const response = await this.lienService.getAll()
    response.forEach(lien => {
      this.liens.push({
        label: lien.name,
        value: lien.id
      })
    })
  }

  async getAllCategory() {
    try {
      this.isLoading = true;
      let data = await this.categoryService.getAll();
      data.forEach(item => {
        this.categories.push({ value: item, label: item.description })
      })
      this.isLoading = false;
    } catch (error) {
      this.isLoading = false;
      console.error(error);
    }
  }

  async getAllMeasurements() {
    try {
      this.isLoading = true;
      this.measurements = await this.measurementService.getAll();
      this.isLoading = false;
    } catch (error) {
      this.isLoading = false;
      console.error(error);
    }
  }

  newProduct() {
    this.model = new Article();
    this.form_product.reset();
    this.showModal = true;
  }

  saveProduct() {
    console.log(this.model);
    if (!this.model.id) {
      this.service.create(this.model).subscribe(
        data => {
          console.log(data);
          this.model = data;
          this.products.push(this.model);
          this.messageService.add({ severity: 'success', summary: `Producto creado con éxito`, detail: `Nombre: ${this.model.name}` });
        },
        error => {
          console.error(`Error de guardado ${error}`);
        }
      );
    } else {
      this.service.update(this.model.id, this.model).pipe(first()).subscribe(
        data => {
          if (data['success']) {
            this.products = this.products.map(x => {
              if (x.id == this.model.id)
                x = this.model;
              return x
            });
            this.messageService.add({ severity: 'success', summary: `Producto actualizado con exito` });
          }
        }
      )
    }
    this.showModal = false;
  }

  modifyProduct(product: Article) {
    this.model = product;
    this.model.rawMaterials.forEach( item => {
      if(this.model.rawMaterials.length != this.materials.length){
        this.materials.push(this.addRowMaterialFormGroup())
      }
    });
    this.showModal = true;
  }

  deleteProduct(product: Article) {
    this.confirmationService.confirm({
      header: 'Alerta',
      message: `Está eliminando: ${product.name}`,
      icon: 'fas fa-exclamation-triangle',
      accept: () => {
        this.service.delete(product.id, product).pipe(first()).subscribe(
          data => {
            console.log(data);
            if (data['success']) {
              this.messageService.add({ severity: 'success', summary: `Producto eliminado con éxito`, detail: `producto: ${product.name} ` });
              this.products = this.products.filter((x) => x.id != product.id);
            }
          },
          error => console.log(error)
        );
      }
    });
  }

  //validations rawMaterials
  addRow() {
    this.model.rawMaterials = [...this.model.rawMaterials];
    this.model.rawMaterials.push(new RawMaterial());
    console.log(this.model.rawMaterials);
    this.materials.push(this.addRowMaterialFormGroup())
  }

  get materials(): FormArray {
    return this.form_product.get('materials') as FormArray;
  }

  addRowMaterialFormGroup() {
    return this._formuilder.group({
      description: [''],
      measurement: [],
      quantity: [''],
      article: [false]
    })
  }


  deleteRow(row: RawMaterial, rowIndex: number) {
    // if (!row.id) {
    //   this.model.rawMaterials.splice(rowIndex, 1);
    // } else {
    //   this.detailProductService.delete(row.id, row).pipe(first()).subscribe(
    //     data => {
    //       console.log(data)
    //       if (data['success']) {
    //         this.model.detailProducts = this.model.detailProducts.filter((x) => x.id != row.id);
    //       }
    //     },
    //     error => {
    //       console.log(error);
    //     }
    //   );
    // }
  }


  async validate_articles(control: AbstractControl) {
    const val = control.value;
    const response = await this.service.getAll();
    if (this.model.id) {
      return null;
    } else {
      for (let i = 0; i < response.length; i++) {
        if (response[i].code == val) {
          return { A: true }
        }
      }
    }
    return null;
  }

  calculateProductionCost() {
    this.model.productionCost = 0;

    this.model.rawMaterials.forEach(material => {
      const totalMaterial = material.article.acquisitionValue * material.quantity;

      this.model.productionCost = this.model.productionCost + totalMaterial
    })
  }
}

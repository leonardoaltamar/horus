import { Component, OnInit } from '@angular/core';
import { RouteStateService } from 'src/app/core/services/route-state.service';
import { FormBuilder, Validators, FormArray, FormGroup, AbstractControl } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SelectItem } from 'primeng/api';
import { first } from 'rxjs/operators';

//models
import { DetailProduct, Measurement, Product, } from '@core/models/';
import { RawMaterial } from '@core/models/raw-material.model';

//services
import { CategoryService } from '@core/services/category.service';
import { ProductService } from '@core/services/product.service';
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
  rawMaterials: RawMaterial[] = [];
  //Modelos
  model: Product = new Product();
  products: Product[] = [];
  categories: SelectItem[] = [];
  measurements: Measurement[] = [];

  constructor(private service: ProductService,
    private rawMaterialService: RawMaterialService,
    private detailProductService: DetailProductService,
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
      stock: ['', [Validators.required], []],
      unitValue: [''],
      expeditionDate: [],
      materials: this._formuilder.array([this.addRowMaterialFormGroup()])
    })
  }

  ngOnInit(): void {
    this.routeStateService.add("Productos", "/inventary/products", null, false);
    this.getAllProducts();
    this.getAllRawMaterials();
    this.getAllCategory();
    this.getAllMeasurements();
  }

  async getAllProducts() {
    try {
      this.isLoading = true;
      this.products = await this.service.getAll();
      console.log(this.products);
      this.isLoading = false;
    } catch (error) {
      this.isLoading = false;
      console.error(error)
    }
  }

  async getAllRawMaterials() {
    try {
      this.isLoading = true;
      this.rawMaterials = await this.rawMaterialService.getAll();
      this.isLoading = false;
    } catch (error) {
      this.isLoading = false;
      console.error(error);
    }
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
    this.model = new Product();
    this.form_product.reset();
    this.showModal = true;
  }

  saveProduct() {
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

  modifyProduct(product: Product) {
    this.model = product;
    this.model.detailProducts.forEach( item => {
      if(this.model.detailProducts.length != this.materials.length){
        this.materials.push(this.addRowMaterialFormGroup())
      }
    });
    this.showModal = true;
  }

  deleteProduct(product: Product) {
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
    this.model.detailProducts = [...this.model.detailProducts];
    this.model.detailProducts.push(new DetailProduct());
    console.log(this.model.detailProducts);
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
      main: [false]
    })
  }


  deleteRow(row: DetailProduct, rowIndex: number) {
    if (!row.id) {
      this.model.detailProducts.splice(rowIndex, 1);
    } else {
      this.detailProductService.delete(row.id, row).pipe(first()).subscribe(
        data => {
          console.log(data)
          if (data['success']) {
            this.model.detailProducts = this.model.detailProducts.filter((x) => x.id != row.id);
          }
        },
        error => {
          console.log(error);
        }
      );
    }
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
    this.model.detailProducts.forEach(material => {
      const totalMaterial = material.rawMaterial.unitValue * material.quantity
      this.model.productionCost = this.model.productionCost + totalMaterial
    })
  }
}

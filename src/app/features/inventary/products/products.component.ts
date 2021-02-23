import { Component, OnInit } from '@angular/core';
import { RouteStateService } from 'src/app/core/services/route-state.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SelectItem } from 'primeng/api';
import { first } from 'rxjs/operators';

//models
import { Product } from '@core/models/product.model';
import { RawMaterial } from '@core/models/raw-material.model';
import { Category } from '@core/models/category.model';

//services
import { CategoryService } from '@core/services/category.service';
import { ProductService } from '@core/services/product.service';
import { RawMaterialService } from '@core/services/raw-material.service';
import { MeasurementService } from '@core/services/measurement.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [ConfirmationService]
})

export class ProductsComponent implements OnInit {
  form_product: FormGroup;
  isLoading: boolean = false;
  showModal: boolean = false;
  checked: boolean = false;
  cost: string = '$00.0'


  //Modelos
  product: Product = new Product();
  products: Product[] = [];
  rawMaterial: RawMaterial = new RawMaterial();
  rawMaterials: RawMaterial[] = [];
  categories: SelectItem[] = [];
  measurements: SelectItem[] = [];

  optionsRawMaterials: SelectItem[] = [];

  constructor(private routeStateService: RouteStateService,
    private _formuilder: FormBuilder,
    private categoryService: CategoryService,
    private productService: ProductService,
    private rowMaterialService: RawMaterialService,
    private confirmationService: ConfirmationService,
    private measurementService: MeasurementService,
    private messageService: MessageService,
  ) {
    this.form_product = this._formuilder.group({
      name: ['', [Validators.required], []],
      stock: ['', [Validators.required], []],
      unitValue: ['', [Validators.required], []],
      measurement: [],
      category: ['', [Validators.required], []],
      expeditionDate: [],

      rawMaterial: this._formuilder.array([this._formuilder.group({
        description: [''],
        quantity: [''],
        main: [false]
      })])
    })
  }

  ngOnInit(): void {
    this.routeStateService.add("Productos", "/inventary/products", null, false);
    this.getAllProducts();
    this.getAllCategory();
    this.getAllMeasurement();
  }

  handleChange(e: any) {
    // this.checked = e.checked;
    console.log(this.checked)
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

  async getAllMeasurement() {
    try {
      this.isLoading = true;
      let data = await this.measurementService.getAll();
      data.forEach(item => {
        this.measurements.push({ value: item, label: item.description })
      })
      this.isLoading = false;
    } catch (error) {
      this.isLoading = false;
      console.error(error);
    }
  }

  //Metodo de recarga de informacion
  async getAllProducts() {
    try {
      this.isLoading = true;
      this.products = await this.productService.getAll();
      console.log(this.products);
      this.isLoading = false;
    } catch (error) {
      this.isLoading = false;
      console.error(error)
    }
  }

  //Guardar material
  saveArtitle() {
    if (this.checked) {
      if (!this.product.id) {
        this.productService.create(this.product).subscribe(
          data => {
            console.log(this.product);
            console.log(this.rawMaterial);
            this.product = data;
            this.products.push(this.product);
            this.messageService.add({ severity: 'success', summary: `producto creada con éxito`, detail: `Nombre: ${this.product.article.name}` });
          },
          error => {
            console.error(`Error de guardado ${error}`);
          }
        );
      } else {
        this.productService.update(this.product.id, this.product).pipe(first()).subscribe(
          data => {
            if (data['success']) {
              this.products = this.products.map(x => {
                if (x.id == this.product.id)
                  x = this.product;
                return x
              });
              this.messageService.add({ severity: 'success', summary: `Producto actualizado con exito` });
            }
          }
        )
      }
      this.showModal = false;
    } else {
      if (!this.rawMaterial.id) {
        this.rowMaterialService.create(this.rawMaterial).subscribe(
          data => {
            console.log(data);
            this.rawMaterial = data;
            this.rawMaterials.push(this.rawMaterial);
            this.messageService.add({ severity: 'success', summary: `producto creada con éxito`, detail: `Nombre: ${this.rawMaterial.article.name}` });
          },
          error => {
            console.error(`Error de guardado ${error}`);
          }
        );
      } else {
        this.rowMaterialService.update(this.rawMaterial.id, this.rawMaterial).pipe(first()).subscribe(
          data => {
            if (data['success']) {
              this.rawMaterials = this.rawMaterials.map(x => {
                if (x.id == this.rawMaterial.id)
                  x = this.rawMaterial;
                return x
              });
              this.messageService.add({ severity: 'success', summary: `Producto actualizado con exito` });
            }
          }
        )
      }
      this.showModal = false;
    }
  }

  newProduct() {
    this.product = new Product();
    this.form_product.reset();
    this.showModal = true;
  }

  modifyProduct(dataRow: Product) {
    this.product = dataRow;
    this.showModal = true;
  }

  deleteProduct(product: Product) {
    this.confirmationService.confirm({
      header: 'Alerta',
      message: `Está eliminando: ${product.article.name}`,
      icon: 'fas fa-exclamation-triangle',
      accept: () => {
        this.productService.delete(product.id, product).pipe(first()).subscribe(
          data => {
            console.log(data['success']);
            if (data['success']) {
              this.messageService.add({ severity: 'success', summary: `producto borrado con éxito`, detail: `producto: ${product.article.name} ` });
              this.products = this.products.filter((x) => x.id != product.id);
            }
          },
          error => {
            console.log(error);
          });
      }
    });
  }

  async validate_products(control: AbstractControl) {
    const val = control.value;
    const response = await this.productService.getAll();
    if (this.product.id) {
      return null;
    } else {
      for (let i = 0; i < response.length; i++) {
        if (response[i].article.name = val) {
          return { A: true }
        }
      }
    }
    return null;
  }
}

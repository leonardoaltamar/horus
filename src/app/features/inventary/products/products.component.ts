import { Component, OnInit } from '@angular/core';
import { RouteStateService } from 'src/app/core/services/route-state.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { first } from 'rxjs/operators';


//
import { Product } from '@core/models/product.model';
import { ProductService } from '@core/services/product.service';
import { Category } from '@core/models/category.model';
import { CategoryService } from '@core/services/category.service';

import { SelectItem } from 'primeng/api';

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


  //Modelos
  products: Product[] = [];
  product: Product = new Product();
  categories: SelectItem[] = [];

  optionsRawMaterials: SelectItem[] = [];


  constructor(private routeStateService: RouteStateService,
    private _formuilder: FormBuilder,
    private categoryService: CategoryService,
    private productService: ProductService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  ) {
    this.form_product = this._formuilder.group({
      name: ['', [Validators.required], []],
      stock:['', [Validators.required], []],
      unitValue:['', [Validators.required], []],
      price: ['', [Validators.required], []],
      category: ['', [Validators.required], []],
      productionCost: ['', [Validators.required], []],
      expeditionDate: [ ]
    })
  }

  ngOnInit(): void {
    this.routeStateService.add("Productos", "/inventary/products", null, false);
    this.getAllProducts();
    this.getAllCategory();
  }


  async getAllCategory() {
    try {
      this.isLoading = true;
      let data =  await this.categoryService.getAll();
      data.forEach(item=>{
          this.categories.push({ value: item, label: item.description})
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
  saveProduct() {
    if(!this.product.id){
      this.productService.create(this.product).subscribe(
        data => {
          this.product = data;
          this.products.push(this.product);
          this.messageService.add({ severity: 'success', summary: `producto creada con éxito`, detail: `Nombre: ${this.product.article.name}` });
        },
        error => {
          console.error(`Error de guardado ${error}`);
        }
      );
    }else{
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
  }

  newProduct() {
    this.product = new Product();
    this.form_product.reset();
    this.showModal = true;
  }

  modifyProduct(dataRow:Product) {
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
    if(this.product.id){
      return null;
    }else{
      for (let i = 0; i < response.length; i++) {
        if(response[i].article.name = val){
          return {A:true}
        }
      }
    }
    return null;
  }
}

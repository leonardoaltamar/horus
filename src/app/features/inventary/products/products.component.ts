import { product } from './../../../core/models/product.model';
import { Component, OnInit } from '@angular/core';
import { RouteStateService } from 'src/app/core/services/route-state.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Category } from '@core/models/category.model';
import { CategoryService } from '@core/services/category.service';
import { ProductService } from '@core/services/product.service';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [ConfirmationService]
})
export class ProductsComponent implements OnInit {
  products: product[] = [];
  product: product = new product();
  categories: Category[] = [];
  form_rowMaterial: FormGroup;
  isLoading: boolean = false;
  showModal: boolean = false;
  selectedCity: Category;
  constructor(private routeStateService: RouteStateService,
    private _formuilder: FormBuilder,
    private categoryService: CategoryService,
    private productService: ProductService,
    private confirmationService: ConfirmationService,
    ) {
    this.form_rowMaterial = this._formuilder.group({
      description: ['', [Validators.required], []],
      price: ['', [Validators.required], []],
      category: ['', [Validators.required], []]
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
      this.categories = await this.categoryService.getAll();
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
    console.log(this.product);
    this.productService.create(this.product).subscribe(
      data => {
        this.products.push(this.product);
      },
      error => {
        console.error(`Error de guardado ${error}`);
      }
    );
    this.showModal = false;
   }

  newProduct() {
    this.showModal = true;
  }

  modifyMateiral() {
    // this.model = academicField;
    this.showModal = true;
  }

  deleteProduct(product: product){
    this.confirmationService.confirm({
      header: 'Alerta',
      message: `Está eliminando: ${product.description}`,
      icon: 'fas fa-exclamation-triangle',
      accept: () => {
        this.productService.delete(product.id, product).pipe(first()).subscribe(
          data => {
            if(data['success']){
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
    return null;
    // const response = await this.service.getAll();
    // if(this.model.id){
    //   return null;
    // }else{
    //   for (let i = 0; i < response.length; i++) {
    //     if(response[i].code == val ||response[i].name == val){
    //       return {A:true}
    //     }
    //   }
    // }
  }
}

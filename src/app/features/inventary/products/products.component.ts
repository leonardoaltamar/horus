import { product } from './../../../core/models/product.model';
import { Component, OnInit } from '@angular/core';
import { RouteStateService } from 'src/app/core/services/route-state.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: product[] = [];

  form_rowMaterial: FormGroup;
  isLoading: boolean = false;
  showModal: boolean = false;

  constructor(private routeStateService: RouteStateService,
    private _formuilder: FormBuilder) {
    this.form_rowMaterial = this._formuilder.group({
      description: ['', [Validators.required], []],
      price: ['', [Validators.required], []],
      category: ['', [Validators.required], []]
    })
  }

  ngOnInit(): void {
    this.routeStateService.add("Productos", "/inventary/products", null, false);
    this.products.push({
      description: "carne con mucho guiso",
      price: 4,
      category: "Guineo gisao"
    })
  }

  //Metodo de recarga de informacion
  async getAllMaterial() {
    try {
      this.isLoading = true;
      // this.academicFields = await this.service.getAll();
      this.isLoading = false;
    } catch (error) {
      this.isLoading = false;
      console.error(error)
    }
  }

  //Guardar material
  saveRawMaterial() { }

  newProduct() {
    this.showModal = true;
  }

  modifyMateiral() {
    // this.model = academicField;
    this.showModal = true;
  }

  // deleteAcademicField(academicField: AcademicField){
  //   this.confirmationService.confirm({
  //     header: 'Alerta',
  //     message: `Está eliminando: ${academicField.code} - ${academicField.name}`,
  //     icon: 'fas fa-exclamation-triangle',
  //     accept: () => {
  //       this.service.delete(academicField.id).pipe(first()).subscribe(
  //         data => {
  //           if(data['success']){
  //             this.academicFields = this.academicFields.filter((x) => x.id != academicField.id);
  //           }
  //         },
  //         error => {
  //           console.log(error);
  //         });
  //     }
  //   });
  // }

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

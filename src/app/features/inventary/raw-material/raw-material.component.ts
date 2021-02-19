import { rawMaterial } from '@core/models/raw-material.model';
import { Component, OnInit } from '@angular/core';
import { RouteStateService } from '@core/services/route-state.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-raw-material',
  templateUrl: './raw-material.component.html',
  styleUrls: ['./raw-material.component.css'],
  providers: [ConfirmationService]
})

export class RawMaterialComponent implements OnInit {
  rowMaterial: rawMaterial[] = [];

  form_product: FormGroup;
  dateAdd: Date;
  isLoading: boolean = false;
  showModal: boolean = false;


  constructor(private routeStateService: RouteStateService,
    private confirmationService: ConfirmationService,
    private _formuilder: FormBuilder) {
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
    this.routeStateService.add("Productos", "/inventary/raw-materials", null, false);

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

  newRawMaterial() {
    this.showModal = true;
    // this.model = new AcademicField();
  }

  modifyMateiral() {
    // this.model = academicField;
    this.showModal = true;
  }



  async validate_rawMaterial(control: AbstractControl) {
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

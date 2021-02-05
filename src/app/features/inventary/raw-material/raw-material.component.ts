import { rawMaterial } from './../../../core/models/raw-material.model';
import { Component, OnInit } from '@angular/core';
import { RouteStateService } from 'src/app/core/services/route-state.service';
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

  form_rowMaterial: FormGroup;
  dateAdd: Date;
  isLoading: boolean = false;
  showModal: boolean = false;


  constructor(private routeStateService: RouteStateService,
    private confirmationService: ConfirmationService,
    private _formuilder: FormBuilder) {
    this.form_rowMaterial = this._formuilder.group({
      description: ['', [Validators.required], []],
      count: ['', [Validators.required], []],
      price: ['', [Validators.required], []]
    })
  }

  ngOnInit(): void {
    this.routeStateService.add("Productos", "/inventary/raw-materials", null, false);
    this.getAllMaterial();
    this.rowMaterial.push({
      description: 'carne guisada',
      count: 23,
      startAt: "12/03/2020",
      price: 4300
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

  newRawMaterial() {
    this.showModal = true;
    // this.model = new AcademicField();
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

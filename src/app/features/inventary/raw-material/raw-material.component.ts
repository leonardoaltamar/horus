import { RawMaterial } from '@core/models/raw-material.model';
import { Component, OnInit } from '@angular/core';
import { RouteStateService } from '@core/services/route-state.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { CategoryService } from '@core/services/category.service';
import { ConfirmationService, SelectItem, MessageService } from 'primeng/api';
import { RawMaterialService } from '@core/services/raw-material.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-raw-material',
  templateUrl: './raw-material.component.html',
  styleUrls: ['./raw-material.component.css'],
  providers: [ConfirmationService]
})

export class RawMaterialComponent implements OnInit {
  rawMaterials: RawMaterial[] = [];
  categories: SelectItem[] = [];
  rawMaterial: RawMaterial = new RawMaterial();
  form_product: FormGroup;
  dateAdd: Date;
  isLoading: boolean = false;
  showModal: boolean = false;


  constructor(private routeStateService: RouteStateService,
    private confirmationService: ConfirmationService,
    private categoryService: CategoryService,
    private service: RawMaterialService,
    private messageService: MessageService,
    private _formuilder: FormBuilder) {
      this.form_product = this._formuilder.group({
        name: ['', [Validators.required], []],
        stock:['', [Validators.required], []],
        acquisitionValue:['', [Validators.required], []],
        price: ['', [Validators.required], []],
        category: ['', [Validators.required], []],
        expeditionDate: [ ]
      })
  }

  ngOnInit(): void {
    this.routeStateService.add("Productos", "/inventary/raw-materials", null, false);
    this.getAllMaterial();
    this.getAllCategory();
  }

  //Metodo de recarga de informacion
  async getAllMaterial() {
    try {
      this.isLoading = true;
       this.rawMaterials = await this.service.getAll();
       console.log(this.rawMaterials);
      this.isLoading = false;
    } catch (error) {
      this.isLoading = false;
      console.error(error)
    }
  }

  async getAllCategory() {
    try {
      this.isLoading = true;
      let data =  await this.categoryService.getAll();
      data.forEach(item=>{
          this.categories.push({ value: item, label: item.description})
      })
      console.log(this.categories);
      this.isLoading = false;
    } catch (error) {
      this.isLoading = false;
      console.error(error);
    }
  }

  addRow(){

  }

  //Guardar material
  saveRawMaterial() {
    console.log(this.rawMaterial);
    if(!this.rawMaterial.id){
      this.service.create(this.rawMaterial).subscribe(
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
    }else{
      this.service.update(this.rawMaterial.id, this.rawMaterial).pipe(first()).subscribe(
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

  newRawMaterial() {
    this.showModal = true;
    // this.model = new AcademicField();
  }

  modifyMaterial(dataRow: RawMaterial) {
    this.rawMaterial = dataRow;
    this.showModal = true;
  }

  deleteMaterial(dataRow: RawMaterial){
    console.log(dataRow);
    this.confirmationService.confirm({
      header: 'Alerta',
      message: `Está eliminando: ${dataRow.article.name}`,
      icon: 'fas fa-exclamation-triangle',
      accept: () => {
        this.service.delete(dataRow.id, dataRow).pipe(first()).subscribe(
          data => {
            console.log(data['success']);
            if (data['success']) {
              this.messageService.add({ severity: 'success', summary: `producto borrado con éxito`, detail: `producto: ${dataRow.article.name} ` });
              this.rawMaterials = this.rawMaterials.filter((x) => x.id != dataRow.id);
            }
          },
          error => {
            console.log(error);
          });
      }
    });
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

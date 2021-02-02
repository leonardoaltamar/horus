import { Component, OnInit } from '@angular/core';
import { RouteStateService } from 'src/app/core/services/route-state.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
@Component({
  selector: 'app-raw-material',
  templateUrl: './raw-material.component.html',
  styleUrls: ['./raw-material.component.css']
})
export class RawMaterialComponent implements OnInit {
  showModal:boolean = false;
  form_rowMaterial: FormGroup;
  constructor(private routeStateService: RouteStateService,  private _formuilder: FormBuilder) {
    this.form_rowMaterial = this._formuilder.group({
      description: ['', [Validators.required], [this.validate_rawMaterial.bind(this)]],
      dateAdd: ['', [Validators.required], [this.validate_rawMaterial.bind(this)]],
      count: ['', [Validators.required], []],
      amount: ['', [Validators.required], []]
    })
  }

  ngOnInit(): void {
    this.routeStateService.add("Productos", "/inventary/raw-materials", null, false);

  }



  newRawMaterial(){
    this.showModal = true;
  }

  async validate_rawMaterial(control: AbstractControl){
    const val = control.value;
    //const response = await this.service.getAll();
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

  saveRawMaterial(){

  }
}

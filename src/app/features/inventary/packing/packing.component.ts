import { Component, OnInit } from '@angular/core';
import { RouteStateService } from 'src/app/core/services/route-state.service';

import { ConfirmationService, MessageService } from 'primeng/api';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import {PackingService } from '../../../core/services/packing.service';
import { packing } from '@core/models/packing.model';
import { first } from 'rxjs/operators';
import { ToastService } from '../../../core/services/toast.service';
@Component({
  selector: 'app-packing',
  templateUrl: './packing.component.html',
  styleUrls: ['./packing.component.css'],
  providers: [ConfirmationService]
})

export class PackingComponent implements OnInit {
  packings: packing[] = [];
  packing: packing = new packing();
  isLoading: boolean = false;
  showModal: boolean = false;

  constructor(private routeStateService: RouteStateService,
            private confirmationService: ConfirmationService,
            private toastService: ToastService,
             private service: PackingService
    ) { }

  ngOnInit(): void {
    this.routeStateService.add("Productos", "/inventary/packings", null, false);
    this.getAllAcademicFields();
  }

  newPacking() {
    this.showModal = true;
  }

  save(){

  }
  //Metodo de recarga de informacion
  async getAllAcademicFields() {
    try {
      this.isLoading = true;
      this.packings = await this.service.getAll();
      console.log(this.packings);
      this.isLoading = false;
    } catch (error) {
      this.isLoading = false;
      console.error(error)
    }
  }


  deletedPacking(packing: packing){
    this.confirmationService.confirm({
      header: 'Alerta',
      message: `Está eliminando: ${packing.description}`,
      icon: 'fas fa-exclamation-triangle',
      accept: () => {
        this.service.delete(packing.id, packing).pipe(first()).subscribe(
          data => {
            if(data['success']){
              this.toastService.addSingle('success', '', 'Grado actualizado con éxito');
              this.packings = this.packings.filter((x) => x.id != packing.id);
            }
          },
          error => {
            console.log(error);
          });
      }
    });
  }

  savePacking(){
    console.log(this.packing);
    this.service.create(this.packing).subscribe(
      data => {
        console.table(data)
        this.packings.push(this.packing);
      },
      error => {
        console.error(`Error de guardado ${error}`);
      }
    );
    this.showModal = false;
  }
}

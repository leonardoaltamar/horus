import { Component } from '@angular/core';
import { first } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouteStateService } from '@core/services/route-state.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Lien } from '@core/models/';
import { LienService } from '@core/services/lien.service';

@Component({
  selector: 'lien',
  templateUrl: './lien.component.html',
  styleUrls: ['./lien.component.css'],
  providers: [ConfirmationService]
})

export class LienComponent {
  form_lien: FormGroup;
  model: Lien = new Lien();
  models: Lien[] = [];
  isLoading: boolean = false;
  showModal: boolean = false;

  constructor(private routeStateService: RouteStateService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private _formuilder: FormBuilder,
    private service: LienService){
      this.form_lien = this._formuilder.group({
        name: ['', [Validators.required], []],
        percentage: ['', [Validators.required], []]
      })
    }

  ngOnInit(): void {
    this.routeStateService.add("Gravámenes", "/configuration/liens", null, false);
    this.getAllLiens();
  }

  newLien() {
    this.model = new Lien();
    this.showModal = true;
  }

  async getAllLiens() {
    try {
      this.isLoading = true;
      this.models = await this.service.getAll();
      this.isLoading = false;
    } catch (error) {
      this.isLoading = false;
      console.error(error);
    }
  }

  saveLien() {
    if (!this.model.id) {
      this.service.create(this.model).subscribe(
        data => {
          if (data['errno']) {
            this.messageService.add({ severity: 'error', summary: 'Dato duplicado', detail: data['sqlMessage'] });
          }else{
            this.model = data;
            this.models.push(this.model);
            this.messageService.add({ severity: 'success', summary: `Gravamen creado con éxito`, detail: `Name: ${data.name} percentage: ${data.percentage} ` });
          }

        },
        error => {
          this.messageService.add({ severity: 'info', summary: `Error de guardado`, detail: error });
        }
      );
    }
    else {
      this.service.update(this.model.id, this.model).pipe(first()).subscribe(
        data => {
          if (data['success']) {
              this.models = this.models.map(x => {
              if (x.id == this.model.id)
                x = this.model;
              return x
            });
            this.messageService.add({ severity: 'success', summary: `Gravamen actualizado con éxito` });
          }
        }
      )
    }
    this.showModal = false;
  }


  modifyLien(lien: Lien) {
    this.model = lien;
    this.showModal = true;
  }

  deletedLien(lien: Lien) {
    this.confirmationService.confirm({
      header: 'Alerta',
      message: `Está eliminando: ${lien.name}`,
      icon: 'fas fa-exclamation-triangle',
      accept: () => {
        this.service.delete(lien.id, lien).pipe(first()).subscribe(
          data => {
            if (data['success']) {
              this.models = this.models.filter((x) => x.id != lien.id);
              this.messageService.add({ severity: 'success', summary: '', detail: 'Gravamen eliminado con éxito' });
            }
          },
          error => {
            console.error(error);
          }
        );
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { RouteStateService } from '@core/services/route-state.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { StoreService } from '@core/services/store.service';
import { Store } from '@core/models/store.model';
import { first } from 'rxjs/operators';

import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.css'],
  providers: [ConfirmationService]

})

export class StoreComponent {
  form_store: FormGroup;
  model: Store = new Store();
  models: Store[] = [];

  isLoading: boolean = false;
  showModal: boolean = false;

  constructor(
    private storeService: StoreService,
    private confirmationService: ConfirmationService,
    private _formuilder: FormBuilder,
    private routeStateService: RouteStateService,
    private messageService: MessageService) {
    this.form_store = this._formuilder.group({
      code: ['', [Validators.required]],
      name: ['', [Validators.required], []]
    })
  }

  ngOnInit(): void {
    this.routeStateService.add("Store", "/configuration/stores", null, false);
    this.getAllStores();
  }

  newStore() {
    this.model = new Store();
    this.showModal = true;
  }

  async getAllStores() {
    try {
      this.isLoading = true;
      this.models = await this.storeService.getAll();
      this.isLoading = false;
    } catch (error) {
      this.isLoading = false;
      console.error(error);
    }
  }

  modifyStore(store: Store) {
    this.model = store;
    this.showModal = true;
  }


  saveStore() {
    if (!this.model.id) {
      this.storeService.create(this.model).subscribe(
        data => {
          if (data['errno']) {
            this.messageService.add({ severity: 'error', summary: 'Dato duplicado', detail: data['sqlMessage'] });
          }else{
            this.model = data;
            this.models.push(this.model);
            this.messageService.add({ severity: 'success', summary: `Bodega creada con éxito`, detail: `Code: ${data.code} Name: ${data.name}` });
          }

        },
        error => {
          this.messageService.add({ severity: 'info', summary: `Error de guardado`, detail: error });
        }
      );
    }
    else {
      this.storeService.update(this.model.id, this.model).pipe(first()).subscribe(
        data => {
          if (data['success']) {
              this.models = this.models.map(x => {
              if (x.id == this.model.id)
                x = this.model;
              return x
            });
            this.messageService.add({ severity: 'success', summary: `Bodega actualizada con éxito` });
          }
        }
      )
    }
    this.showModal = false;
  }


  deletedStore(store: Store) {
    this.confirmationService.confirm({
      header: 'Alerta',
      message: `Está eliminando: ${store.code} - ${store.name}`,
      icon: 'fas fa-exclamation-triangle',
      accept: () => {
        this.storeService.delete(store.id, store).pipe(first()).subscribe(
          data => {
            if (data['success']) {
              this.models = this.models.filter((x) => x.id != store.id);
              this.messageService.add({ severity: 'success', summary: 'Bodega Eliminada con éxito' });
            }
          },
          error => {
            console.log(error);
          }
        );
      }
    });
  }

}

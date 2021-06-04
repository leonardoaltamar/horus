import { first } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { RouteStateService } from '@core/services/route-state.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

// Models
import { State } from '@core/models/state.modal'

// Servoces
import { StateService } from '@core/services/state.service';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css'],
  providers: [ConfirmationService]
})
export class StateComponent implements OnInit {
  form_state: FormGroup;
  showModal: boolean = false;
  isLoading: boolean = false;
  country: { name: string }[];

  model: State = new State();
  models: State[] = [];

  constructor(private routeStateService: RouteStateService,
    private confirmationService: ConfirmationService,
    private _formBuilder: FormBuilder,
    private stateService: StateService,
    private messageService: MessageService) {
    this.form_state = this._formBuilder.group({
      code: ['', [Validators.required]],
      name: ['', [Validators.required], []],
      country: ['', [Validators.required], []]
    })
  }

  ngOnInit(): void {
    this.routeStateService.add("Configuration", "/configuration/states", null, false);
    this.getAllState();
    this.country = [
      { name: 'Argentina' },
      { name: 'Bolivar' },
      { name: 'Brasil' },
      { name: 'Chile' },
      { name: 'Colombia' },
      { name: 'Ecuador' },
      { name: 'Guyana' },
      { name: 'Paraguay' },
      { name: 'Peru' },
      { name: 'Uruguay' }
    ]

  }


  async getAllState() {
    try {
      this.isLoading = true;
      this.models = await this.stateService.getAll();
      this.isLoading = false;
    } catch (error) {
      this.isLoading = false;
      console.error(error);
    }
  }

  newState() {
    this.model = new State();
    this.showModal = true;
  }

  modifyState(state: State) {
    this.model = state;
    this.showModal = true;
  }

  deleteState(state: State) {
    this.confirmationService.confirm({
      header: 'Alerta',
      message: `Está eliminando: ${state.code} - ${state.name}`,
      icon: 'fas fa-exclamation-triangle',
      accept: () => {
        this.stateService.delete(state.id, state).pipe(first()).subscribe(
          data => {
            console.log(data);
            if (data['success']) {
              this.models = this.models.filter((x) => x.id != state.id);
              this.messageService.add({ severity: 'success', summary: `Departamento eliminado con éxito` });
            }
          },
          error => {
            console.log(error);
          }
        );
      }
    });
  }

  saveState() {
    if (!this.model.id) {
      this.stateService.create(this.model).subscribe(
        data => {
          if (data['errno']) {
            this.messageService.add({ severity: 'error', summary: 'Dato duplicado', detail: data['sqlMessage'] });
          }else{
            this.model = data;
            this.models.push(this.model);
            this.messageService.add({ severity: 'success', summary: `Departamento creado con éxito`, detail: `Code: ${data.code} Name: ${data.name} country: ${data.country}` });
          }

        },
        error => {
          this.messageService.add({ severity: 'info', summary: `Error de guardado`, detail: error });
        }
      );
    }
    else {
      this.stateService.update(this.model.id, this.model).pipe(first()).subscribe(
        data => {
          if (data['success']) {
              this.models = this.models.map(x => {
              if (x.id == this.model.id)
                x = this.model;
              return x
            });
            this.messageService.add({ severity: 'success', summary: `Departamento actualizado con éxito` });
          }
        }
      )
    }
    this.showModal = false;
  }


}

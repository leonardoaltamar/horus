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

  state: State = new State();
  states: State[] = [];

  constructor(private routeStateService: RouteStateService,
    private confirmationService: ConfirmationService,
    private _formBuilder: FormBuilder,
    private stateService: StateService,
    private messageService: MessageService) {
    this.form_state = this._formBuilder.group({
      code: ['', [Validators.required], [this.validate_state.bind(this)]],
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

  async validate_state(control: AbstractControl) {
    const val = control.value;
    const response = await this.stateService.getAll();
    if (this.state.id) {
      return null;
    } else {
      for (let i = 0; i < response.length; i++) {
        if (response[i].code == val) {
          return { A: true }
        }
      }
    }
  }

  async getAllState() {
    try {
      this.isLoading = true;
      this.states = await this.stateService.getAll();
      this.isLoading = false;
    } catch (error) {
      this.isLoading = false;
      console.error(error);
    }
  }

  modifyState(state: State) {
    this.state = state;
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
              this.states = this.states.filter((x) => x.id != state.id);
              this.messageService.add({ severity: 'success', summary: `Eliminado con exito` });
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
    if (!this.state.id) {
      this.stateService.create(this.state).subscribe(
        data => {
          this.states.push(this.state);
          this.messageService.add({ severity: 'success', summary: `Departamento creada con éxito`, detail: `Code: ${data.code} Nombre: ${data.name}` });
        },
        error => {
          this.messageService.add({ severity: 'info', summary: `Error de guardado`, detail: error });
        }
      );
    }
    else {
      this.stateService.update(this.state.id, this.state).pipe(first()).subscribe(
        data => {
          if (data['success']) {
            this.states = this.states.map(x => {
              if (x.id == this.state.id)
                x = this.state;
              return x
            });
            this.messageService.add({ severity: 'success', summary: `Departamento actualizada con éxito` });
          }
        }
      )
    }
    this.showModal = false;
  }

  newState() {
    this.state = new State();
    this.showModal = true;
  }
}

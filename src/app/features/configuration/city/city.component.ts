import { first } from 'rxjs/operators';
import { RouteStateService } from '@core/services/route-state.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ConfirmationService, SelectItem } from 'primeng/api';
import { MessageService } from 'primeng/api';

// Models
import { City } from '@core/models/city.model';

// Service
import { CityService } from '@core/services/city.service';
import { StateService } from '@core/services/state.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css'],
  providers: [ConfirmationService]
})
export class CityComponent implements OnInit {
  showModal: boolean = false;
  isLoading: boolean = false;
  form_city: FormGroup;
  model:  City = new City();
  models: City[] = [];


  states: SelectItem[] = [];

  constructor(private routeStateService: RouteStateService,
    private confirmationService: ConfirmationService,
    private stateService: StateService,
    private cityService: CityService,
    private messageService: MessageService,
    private _formBuilder: FormBuilder) {
    this.form_city = this._formBuilder.group({
      code: ['', [Validators.required]],
      name: ['', [Validators.required], []],
      state: ['', [Validators.required], []]
    })
  }

  ngOnInit(): void {
    this.routeStateService.add("Ciudad", "/configuration/cities", null, false);
    this.getAllCity();
    this.stateService.getAll().then(data =>
      data.forEach(x =>
        this.states.push({
          label: x.name,
          value: x.id
        })
      )
    );
  }


  async getAllCity() {
    try {
      this.isLoading = true;
      this.models = await this.cityService.getAll();
      this.isLoading = false;
    } catch (error) {
      this.isLoading = false;
      console.error(error);
    }
  }

  newCity() {
    this.model = new City();
    this.showModal = true;
    this.form_city.reset();
  }

  modifyCity(city: City) {
   console.log(city);
    this.model = city;
    this.showModal = true;
  }

  deleteCity(city: City) {
    this.confirmationService.confirm({
      header: 'Alerta',
      message: `Está eliminando: ${city.code} - ${city.name}`,
      icon: 'fas fa-exclamation-triangle',
      accept: () => {
        this.cityService.delete(city.id, city).pipe(first()).subscribe(
          data => {
            if (data['success']) {
              this.models = this.models.filter((x) => x.id != city.id);
              this.messageService.add({ severity: 'success', summary: '', detail: 'Ciudad eliminada con é xito'});
            }
          },
          error => {
            console.log(error);
          }
        );
      }
    });
  }

  saveCity() {
    if (!this.model.id) {
          this.cityService.create(this.model).pipe(first()).subscribe(
            data => {
          if(data['errno']){
            this.messageService.add({ severity: 'error', summary: 'Dato duplicado', detail: data['sqlMessage'] });
        }else{
          this.model = data;
          this.models.push(this.model);
          this.messageService.add({ severity: 'success', summary: `Ciudad creada con éxito`, detail: `Code: ${data.code} Name: ${data.name} state: ${data.state}` });
        }

      },
        error => {
          this.messageService.add({ severity: 'info', summary: `Error de guardado`, detail: error });
        }
      );
    }
    else {
      this.cityService.update(this.model.id, this.model).pipe(first()).subscribe(
        data => {
          if (data['success']) {
            this.models = this.models.map(x => {
            if (x.id == this.model.id)
              x = this.model;
            return x
          });
          this.messageService.add({ severity: 'success', summary: `Ciudad actualizada con éxito` });
        }
      }
    )
  }
  this.showModal = false;
}
}

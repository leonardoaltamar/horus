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

  city: City = new City();
  cities: City[] = [];
  states: SelectItem[] = [];

  constructor(private routeStateService: RouteStateService,
    private confirmationService: ConfirmationService,
    private stateService: StateService,
    private cityService: CityService,
    private messageService: MessageService,
    private _formBuilder: FormBuilder) {
    this.form_city = this._formBuilder.group({
      code: ['', [Validators.required], [this.validate_city.bind(this)]],
      name: ['', [Validators.required], []],
      state: ['', [Validators.required], []]
    })
  }

  ngOnInit(): void {
    this.routeStateService.add("Configuration", "/configuration/cities", null, false);
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

  async validate_city(control: AbstractControl) {
    const val = control.value;
    const response = await this.cityService.getAll();
    if (this.city.id) {
      return null;
    } else {
      for (let i = 0; i < response.length; i++) {
        if (response[i].code == val) {
          return { A: true }
        }
      }
    }
  }

  async getAllCity() {
    try {
      this.isLoading = true;
      this.cities = await this.cityService.getAll();
      this.isLoading = false;
    } catch (error) {
      this.isLoading = false;
      console.error(error);
    }
  }

  newCity() {
    this.city = new City;
    this.showModal = true;
    this.form_city.reset();
  }

  modifyCity(city: City) {
    this.city = city;
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
              this.cities = this.cities.filter((x) => x.id != city.id);
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
    if (!this.city.id) {
      this.cityService.create(this.city).pipe(first()).subscribe(
        data => {
          this.city = data;
          this.cities.push(this.city);
          this.messageService.add({ severity: 'success', summary: `Departamento creada con éxito`, detail: `Code: ${data.code} Nombre: ${data.name}` });
        },
        error => {
          console.log(error);
        }
      );
    }
    else {
      this.cityService.update(this.city.id, this.city).pipe(first()).subscribe(
        data => {
          if (data['success']) {
            this.cities = this.cities.map(x => {
              if (x.id == this.city.id)
                x = this.city;
              return x
            });
            this.messageService.add({ severity: 'success', summary: `Departamento actualizada con éxito` });
          }
        },
        error => {
          console.log(error);
        }
      );
    }
    this.showModal = false;
  }
}

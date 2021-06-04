import { RouteStateService } from '@core/services/route-state.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { ConfirmationService } from 'primeng/api';
import { MeasurementService } from '@core/services/measurement.service';
import { MessageService } from 'primeng/api';
import { Measurement } from '@core/models/measurement.model';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-measurement',
  templateUrl: './measurement.component.html',
  styleUrls: ['./measurement.component.css'],
  providers: [ConfirmationService]

})
export class MeasurementComponent implements OnInit {
  form_measurement: FormGroup;
  model: Measurement = new Measurement();
  models: Measurement[];

  showModal: boolean = false;
  isLoading: boolean = false;

  constructor(private measurementService: MeasurementService,
    private confirmationService: ConfirmationService,
    private _formuilder: FormBuilder,
    private routeStateService: RouteStateService,
    private messageService: MessageService) {
    this.form_measurement = this._formuilder.group({
      code: ['', [Validators.required]],
      description: ['', [Validators.required], []],
      equivalence: ['', [Validators.required], []]
    })
  }

  ngOnInit(): void {
    this.routeStateService.add('Configuration', '/configuration/measurements', null, false);
    this.getAllMeasurement();
  }


  async getAllMeasurement() {
    try {
      this.isLoading = true;
      this.models = await this.measurementService.getAll();
      this.isLoading = false;
    } catch (error) {
      this.isLoading = false;
      console.error(error);
    }
  }

  newMeasurement() {
    this.model = new Measurement();
    this.showModal = true;
  }

  modifyMeasurement(measurement: Measurement) {
    this.model = measurement;
    this.showModal = true;
  }

  deleteMeasurement(measurement: Measurement) {
    this.confirmationService.confirm({
      header: 'Alerta',
      message: `Está eliminando: ${measurement.code} - ${measurement.description}`,
      icon: 'fas fa-exclamation-triangle',
      accept: () => {
        this.measurementService.delete(measurement.id, measurement).pipe(first()).subscribe(
          data => {
            console.log(data);
            if (data['success']) {
              this.models = this.models.filter((x) => x.id != measurement.id);
              console.log(this.models);
            }
          },
          error => {
            console.log(error);
          }
        );
      }
    });
  }

  saveMeasurement() {
    if (!this.model.id) {
      this.measurementService.create(this.model).subscribe(
        data => {
          if (data['errno']) {
            this.messageService.add({ severity: 'error', summary: 'Dato duplicado', detail: data['sqlMessage'] });
          }else{
            this.model = data;
            this.models.push(this.model);
            this.messageService.add({ severity: 'success', summary: `Medida creada con éxito`, detail: `code: ${data.code} description: ${data.description} equivalence: ${data.equivalence}  ` });
          }

        },
        error => {
          this.messageService.add({ severity: 'info', summary: `Error de guardado`, detail: error });
        }
      );
    }
    else {
      this.measurementService.update(this.model.id, this.model).pipe(first()).subscribe(
        data => {
          if (data['success']) {
              this.models = this.models.map(x => {
              if (x.id == this.model.id)
                x = this.model;
              return x
            });
            this.messageService.add({ severity: 'success', summary: `Medida actualizada con éxito` });
          }
        }
      )
    }
    this.showModal = false;
  }

}

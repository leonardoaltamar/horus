import { RouteStateService } from '@core/services/route-state.service';
import { Component, OnInit } from '@angular/core';

import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-measurement',
  templateUrl: './measurement.component.html',
  styleUrls: ['./measurement.component.css'],
  providers: [ConfirmationService]

})
export class MeasurementComponent implements OnInit {
  showModal: boolean = false;
  isLoading: boolean = false;

  constructor(private routeStateSerice: RouteStateService) { }

  ngOnInit(): void {
    this.routeStateSerice.add('Configuration', '/configuration/measurements', null, false);
  }

  newMeasurement() {
    this.showModal = true;
  }

  deleteMeasurement() {

  }

  saveMeasurement() {

  }


}

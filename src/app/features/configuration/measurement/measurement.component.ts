import { RouteStateService } from '@core/services/route-state.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-measurement',
  templateUrl: './measurement.component.html',
  styleUrls: ['./measurement.component.css']
})
export class MeasurementComponent implements OnInit {


  constructor(private routeStateSerice: RouteStateService) { }

  ngOnInit(): void {
    this.routeStateSerice.add('Configuration', '/configuration/measurements', null, false);
  }



}

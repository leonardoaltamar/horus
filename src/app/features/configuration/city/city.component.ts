import { RouteStateService } from '@core/services/route-state.service';
import { Component, OnInit } from '@angular/core';

import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css'],
  providers: [ConfirmationService]
})
export class CityComponent implements OnInit {
  showModal: boolean = false;
  isLoading: boolean = false;

  constructor(private routeStateService: RouteStateService,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.routeStateService.add("Configuration", "/configuration/cities", null, false);
  }

  newCity() {
    this.showModal = true;
  }

  deleteCity() {

  }

  saveCity() {

  }
}

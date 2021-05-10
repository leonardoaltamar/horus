import { Component, OnInit } from '@angular/core';
import { RouteStateService } from '@core/services/route-state.service';

@Component({
  selector: 'hr-configuration',
  template: '<router-outlet></router-outlet>',
})
export class AccountingComponent {
  constructor(private routeStateService: RouteStateService) {}

  ngOnInit() {
    this.routeStateService.add('Contabilidad', 'accounting', null, true);
  }
}

import { Component, OnInit } from '@angular/core';
import { RouteStateService } from '../../core/services/route-state.service';

@Component({
  selector: 'hr-inventary',
  template: '<router-outlet></router-outlet>'

})
export class ProcessComponent {

  constructor(private routeStateService: RouteStateService) { }

  ngOnInit() {
    this.routeStateService.add("Procesos", "process", null, true);
  }

}

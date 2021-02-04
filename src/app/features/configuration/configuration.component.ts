import { Component, OnInit } from '@angular/core';
import { RouteStateService } from '../../core/services/route-state.service';

@Component({
  selector: 'hr-configuration',
  template: '<router-outlet></router-outlet>'

})
export class ConfigurationComponent {

  constructor(private routeStateService: RouteStateService) { }

  ngOnInit() {
    this.routeStateService.add("Configuration", "configuration", null, true);
  }

}

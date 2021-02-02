import { Component, OnInit } from '@angular/core';
import { RouteStateService } from '../../core/services/route-state.service';

@Component({
  selector: 'hr-inventary',
  template: '<router-outlet></router-outlet>'

})
export class InventaryComponent {

  constructor(private routeStateService: RouteStateService) {  }

  ngOnInit(){
    this.routeStateService.add("Inventario", "main/inventary", null, true);
  }

}

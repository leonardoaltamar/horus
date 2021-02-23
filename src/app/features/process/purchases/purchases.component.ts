import { Purchase } from '@core/models/purchase.model';
import { Component } from '@angular/core';
import { RouteStateService } from '@core/services/route-state.service';

@Component({
  selector: 'purchases',
  templateUrl: 'purchases.component.html',
  styleUrls: ['purchases.component.css']
})

export class purchasesComponent {

  showModal: boolean = false;
  model: Purchase = new Purchase();

  constructor(private routeStateService: RouteStateService) {}

  ngOnInit(): void {
    this.routeStateService.add("Compras", "/process/purchases", null, false);
  }

  newPurchases() {
    this.showModal = true;
  }
}

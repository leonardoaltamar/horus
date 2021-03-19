import { Component } from '@angular/core';
import { RouteStateService } from '@core/services/route-state.service';
import { InventoryMovementService } from '@core/services/inventory-movement.service'
import { InventoryMovement } from '@core/models';
import * as moment from 'moment';

@Component({
    selector: 'inventory-movement',
    templateUrl: './inventory-movement.component.html',
    styleUrls: ['./inventory-movement.component.css']
})

export class InventoryMovementComponent {

    inventoryMovements: InventoryMovement[] = [];
    isLoading: boolean = false;

    constructor(private routeStateService: RouteStateService,
                private service: InventoryMovementService) {}

    ngOnInit() {
        this.routeStateService.add("Productos", "/inventary/inventory_movements", null, false);
        this.getAll();
    }

    async getAll() {
        this.isLoading = true;
        const response = await this.service.getAll();
        this.inventoryMovements = response.map((inventoryMovement) => {
            inventoryMovement.date = moment(inventoryMovement.date).format('YYYY-MM-DD hh:mm A')
            return inventoryMovement
        })
        console.log(this.inventoryMovements);
        this.isLoading = false;
    }

}
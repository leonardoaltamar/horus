import { Component, OnInit } from '@angular/core';
import { RouteStateService } from 'src/app/core/services/route-state.service';
@Component({
  selector: 'app-production',
  templateUrl: './production.component.html',
  styleUrls: ['./production.component.css']
})
export class ProductionComponent implements OnInit {
  isLoading: boolean = false;
  constructor(private routeStateService: RouteStateService) { }

  ngOnInit(): void {
    this.routeStateService.add("Productos", "/inventary/productions", null, false);
  }

}

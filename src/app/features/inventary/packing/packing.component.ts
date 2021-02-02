import { Component, OnInit } from '@angular/core';
import { RouteStateService } from 'src/app/core/services/route-state.service';
@Component({
  selector: 'app-packing',
  templateUrl: './packing.component.html',
  styleUrls: ['./packing.component.css']
})
export class PackingComponent implements OnInit {
  showModal:boolean = false;
  constructor(private routeStateService: RouteStateService) { }

  ngOnInit(): void {
    this.routeStateService.add("Productos", "/inventary/packings", null, false);
  }

  newPacking(){
    this.showModal = true;
  }
}

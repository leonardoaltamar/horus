import { Product } from './../../../core/models/product.model';
import { Component, OnInit } from '@angular/core';
import { RouteStateService } from 'src/app/core/services/route-state.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products:Product[] = [];
  showModal:boolean = false;
  constructor(private routeStateService: RouteStateService) { }

  ngOnInit(): void {
    this.routeStateService.add("Productos", "/inventary/products", null, false);
    this.products.push({
      name:'carne guisada',
      description: "carne con mucho guiso",
      count: 4
    })
  }

  newProduct(){
    this.showModal = true;
  }
}

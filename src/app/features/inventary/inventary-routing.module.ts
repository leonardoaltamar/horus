import { ProductsComponent } from './products/products.component';
import { RouterModule, Routes } from '@angular/router';
import { InventaryComponent } from './inventary';
import { NgModule } from '@angular/core';
const routes: Routes = [
  {
    path: '',
    component: InventaryComponent,
    children: [
      {
        path: 'products',
        component: ProductsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventaryRoutingModule { }

import { ProductsComponent } from './products/products.component';
import { PackingComponent } from './packing/packing.component';
import { RouterModule, Routes } from '@angular/router';
import { InventaryComponent } from './inventary.component';
import { RawMaterialComponent } from './raw-material/raw-material.component'
import { ProductionComponent } from './production/production.component';
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
      {
        path: 'packings',
        component: PackingComponent,
      },
      {
        path: 'raw-materials',
        component: RawMaterialComponent,
      },
      {
        path: 'productions',
        component: ProductionComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventaryRoutingModule { }

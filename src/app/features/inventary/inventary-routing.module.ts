import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InventaryComponent } from './inventary.component';
import { ArticlesComponent } from './articles/articles.component';
import { InventoryMovementComponent } from './inventory-movement/inventory-movement.component';
import { ProductionComponent } from './production/production.component';

const routes: Routes = [
  {
    path: '',
    component: InventaryComponent,
    children: [
      {
        path: 'articles',
        component: ArticlesComponent,
      },
      {
        path: 'inventory_movements',
        component: InventoryMovementComponent
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

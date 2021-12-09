import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InventaryComponent } from './inventary.component';
import { ProductComponent } from './product/product.component';
import { InventoryMovementComponent } from './inventory-movement/inventory-movement.component';
import { ProductionComponent } from './production/production.component';
import { RawMaterialComponent } from './row-material/row-material.component';
import { ArticleComponent } from './article/article.component';

const routes: Routes = [
  {
    path: '',
    component: InventaryComponent,
    children: [
      {
        path:'articles',
        component: ArticleComponent
      },
      {
        path: 'products',
        component: ProductComponent,
      },
      {
        path: 'inventory_movements',
        component: InventoryMovementComponent
      },
      {
        path: 'productions',
        component: ProductionComponent,
      },
      {
        path: 'raw_materials',
        component: RawMaterialComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventaryRoutingModule { }

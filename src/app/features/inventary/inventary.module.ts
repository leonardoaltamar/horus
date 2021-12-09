import { InventaryComponent } from './inventary.component';
import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";

import { ProductComponent } from './product/product.component';
import { InventaryRoutingModule } from './inventary-routing.module';
import { InventoryMovementComponent } from './inventory-movement/inventory-movement.component';
import { ProductionComponent } from './production/production.component';
import { RawMaterialComponent } from './row-material/row-material.component';

//Theme Primeng
import { SharedModule } from '@shared/shared.module';
import { ArticleComponent } from './article/article.component';

@NgModule({
  declarations: [
    ProductComponent,
    InventaryComponent,
    InventoryMovementComponent,
    ProductionComponent,
    RawMaterialComponent,
    ArticleComponent
  ],
  exports: [
  ],
  imports: [
    InventaryRoutingModule,
    CommonModule,
    SharedModule
  ],
  providers: [],
  entryComponents: []
})
export class InventaryModule { }

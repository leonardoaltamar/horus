import { InventaryComponent } from './inventary';
import {ButtonModule} from 'primeng/button';
import { NgModule } from "@angular/core";
import { ProductsComponent } from './products/products.component';
import { InventaryRoutingModule } from './inventary-routing.module';
import { NbCardModule, NbInputModule, NbLayoutModule } from '@nebular/theme';
import { TableModule } from 'primeng/table'
@NgModule({
  declarations: [
    InventaryComponent,
    ProductsComponent
  ],
  exports:[
  ],
  imports: [
    NbInputModule,
    InventaryRoutingModule,
    NbCardModule,
    NbLayoutModule,
    TableModule,
    ButtonModule,
  ],
  providers: [ ],
  entryComponents: []
})
export class InventaryModule { }

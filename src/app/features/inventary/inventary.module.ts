import { InventaryComponent } from './inventary';
import {ButtonModule} from 'primeng/button';
import { NgModule } from "@angular/core";
import { ProductsComponent } from './products/products.component';
import { InventaryRoutingModule } from './inventary-routing.module';
import { NbCardModule, NbInputModule, NbLayoutModule } from '@nebular/theme';
import { TableModule } from 'primeng/table';
import {DialogModule} from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
@NgModule({
  declarations: [
    InventaryComponent,
    ProductsComponent
  ],
  exports:[
  ],
  imports: [
    InventaryRoutingModule,
    TableModule,
    ButtonModule,
    DialogModule,
    InputTextModule
  ],
  providers: [ ],
  entryComponents: []
})
export class InventaryModule { }

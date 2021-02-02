import { InventaryComponent } from './inventary';
import { CommonModule } from '@angular/common';
import {ButtonModule} from 'primeng/button';
import { NgModule } from "@angular/core";
import { ProductsComponent } from './products/products.component';
import { InventaryRoutingModule } from './inventary-routing.module';
import { NbCardModule, NbInputModule, NbLayoutModule } from '@nebular/theme';
import { TableModule } from 'primeng/table';
import {DialogModule} from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { PackingComponent } from './packing/packing.component';
import { RawMaterialComponent } from './raw-material/raw-material.component';
import { ProductionComponent } from './production/production.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    InventaryComponent,
    ProductsComponent,
    PackingComponent,
    RawMaterialComponent,
    ProductionComponent
  ],
  exports:[
  ],
  imports: [
    InventaryRoutingModule,
    TableModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [ ],
  entryComponents: []
})
export class InventaryModule { }

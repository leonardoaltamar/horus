import { InventaryComponent } from './inventary.component';
import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { ProductsComponent } from './products/products.component';
import { InventaryRoutingModule } from './inventary-routing.module';
import { PackingComponent } from './packing/packing.component';
import { RawMaterialComponent } from './raw-material/raw-material.component';
import { ProductionComponent } from './production/production.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Theme Primeng
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
  declarations: [
    InventaryComponent,
    ProductsComponent,
    PackingComponent,
    RawMaterialComponent,
    ProductionComponent
  ],
  exports: [
  ],
  imports: [
    InventaryRoutingModule,
    TableModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    CalendarModule,
    InputNumberModule,
    ProgressSpinnerModule
  ],
  providers: [],
  entryComponents: []
})
export class InventaryModule { }

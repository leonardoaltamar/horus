import { ArticlesComponent } from './articles/articles.component';
import { InventaryComponent } from './inventary.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from "@angular/core";

import { InventaryRoutingModule } from './inventary-routing.module';
import { InventoryMovementComponent } from './inventory-movement/inventory-movement.component';
import { ProductionComponent } from './production/production.component';

//Theme Primeng
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { TabViewModule } from 'primeng/tabview';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ConfirmPopupModule } from 'primeng/confirmpopup';

@NgModule({
  declarations: [
    ArticlesComponent,
    InventaryComponent,
    InventoryMovementComponent,
    ProductionComponent
  ],
  exports: [
  ],
  imports: [
    InventaryRoutingModule,
    TableModule,
    TabViewModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ConfirmDialogModule,
    ConfirmPopupModule,
    CalendarModule,
    InputNumberModule,
    ProgressSpinnerModule,
    ToastModule,
    DropdownModule,
    MultiSelectModule,
    ToggleButtonModule
  ],
  providers: [],
  entryComponents: []
})
export class InventaryModule { }

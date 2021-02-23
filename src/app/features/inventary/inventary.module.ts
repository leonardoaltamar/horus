import { ArticlesComponent } from './articles/articles.component';
import { InventaryComponent } from './inventary.component';
import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { InventaryRoutingModule } from './inventary-routing.module';
import { PackingComponent } from './packing/packing.component';
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
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { TabViewModule } from 'primeng/tabview';
import { ToggleButtonModule } from 'primeng/togglebutton';

@NgModule({
  declarations: [
    InventaryComponent,
    ArticlesComponent,
    PackingComponent,
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

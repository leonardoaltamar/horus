import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProcessComponent } from './process.component';
import { SalesComponent } from './sales/sales.component';
import { ProcessRoutingModule } from './process-routing.module';

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

@NgModule({
  declarations: [
    ProcessComponent,
    SalesComponent
  ],
  exports: [
  ],
  imports: [
    ProcessRoutingModule,
    TableModule,
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
    MultiSelectModule
  ],
  providers: [],
  entryComponents: []
})
export class ProcessModule { }

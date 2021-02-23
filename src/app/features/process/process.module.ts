import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProcessComponent } from './process.component';
import { SalesComponent } from './sales/sales.component';
import { purchasesComponent } from './purchases/purchases.component';
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
import { CheckboxModule } from 'primeng/checkbox';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';

@NgModule({
  declarations: [
    ProcessComponent,
    purchasesComponent,
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
    MultiSelectModule,
    CheckboxModule,
    MessageModule,
    MessagesModule
  ],
  providers: [],
  entryComponents: []
})
export class ProcessModule { }

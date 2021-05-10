import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountingRoutingModule } from './accounting-routing.module';
import { AccountingComponent } from './accounting.component';

//Importaciones primeng
import { AutoCompleteModule } from 'primeng/autocomplete';
import { TableModule } from 'primeng/table';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import { CheckboxModule } from 'primeng/checkbox';

import { AccountComponent } from './account/account.component';

@NgModule({
  declarations: [AccountingComponent, AccountComponent],
  exports: [],
  imports: [
    AutoCompleteModule,
    CommonModule,
    AccountingRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    //Importaciones Primeng
    DialogModule,
    TableModule,
    ProgressSpinnerModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    ConfirmDialogModule,
    DropdownModule,
    CalendarModule,
    TabViewModule,
    ToastModule,
    CheckboxModule,
  ],
  providers: [],
  entryComponents: [],
})
export class AccountingModule {}

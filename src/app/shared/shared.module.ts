import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormPayComponent } from './form-pay/form-pay.component';

//modulos angular
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//primeNG
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
import { AutoCompleteModule } from 'primeng/autocomplete';
import { TabViewModule } from 'primeng/tabview';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DataViewModule } from 'primeng/dataview';

const MODULES = [
    CommonModule,
    CalendarModule,
    TableModule,
    DialogModule,
    DataViewModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    ProgressSpinnerModule,
    ConfirmDialogModule,
    ToastModule,
    DropdownModule,
    MultiSelectModule,
    CheckboxModule,
    MessageModule,
    MessagesModule,
    FormsModule,
    ReactiveFormsModule,
    AutoCompleteModule,
    TabViewModule,
    ToggleButtonModule,
    ConfirmPopupModule
]

@NgModule({
  declarations: [FormPayComponent],
  imports: [
    ...MODULES
  ],
  exports:[
    FormPayComponent,
    ...MODULES
  ]
})
export class SharedModule { }

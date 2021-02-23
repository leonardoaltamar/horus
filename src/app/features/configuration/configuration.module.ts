import { ConfigurationRoutingModule } from './configuration-routing.module';
import { ConfigurationComponent } from './configuration.component';
import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { CategoryComponent } from './category/category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeComponent } from './employee/employee.component';
import { CustomerComponent } from './customer/customer.component';

//Importaciones primeng
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
import { SupplierComponent } from './supplier/supplier.component';
import { CityComponent } from './city/city.component';
import { ToastModule } from 'primeng/toast';
import { MeasurementComponent } from './measurement/measurement.component';
import { CheckboxModule } from 'primeng/checkbox';
import { StateComponent } from './state/state.component';

@NgModule({
  declarations: [
    ConfigurationComponent,
    CategoryComponent,
    CustomerComponent,
    EmployeeComponent,
    SupplierComponent,
    CityComponent,
    MeasurementComponent,
    StateComponent
  ],
  exports: [
  ],
  imports: [
    CommonModule,
    ConfigurationRoutingModule,
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
    CheckboxModule
  ],
  providers: [],
  entryComponents: []
})
export class ConfigurationModule { }

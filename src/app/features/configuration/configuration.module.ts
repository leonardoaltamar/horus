import { ConfigurationRoutingModule } from './configuration-routing.module';
import { ConfigurationComponent } from './configuration.component';
import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";

import { CategoryComponent } from './category/category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeComponent } from './employee/employee.component';
import { CustomerComponent } from './customer/customer.component';
import { LienComponent } from './lien/lien.component';
import { TypeEmployeeComponent } from './type-employee/type-employee.component';
import { TypePaymentComponent } from './type-payment/type-payment.component';
import { TypeSupplierComponent } from './type-supplier/type-supplier.component';
import { SettingComponent } from './setting/setting.component';
import { StateComponent } from './state/state.component';
import { SectionComponent } from './section/section.component';
import { StoreComponent } from './stores/stores.component';
import { SupplierComponent } from './supplier/supplier.component';
import { CityComponent } from './city/city.component';
import { ProcessTypeComponent } from './process-type/process-type.component';
import { TaxRegimeComponent } from './tax-regime/tax-regime.component';
import { MeasurementComponent } from './measurement/measurement.component';

//Importaciones shared
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    ConfigurationComponent,
    CategoryComponent,
    CityComponent,
    CustomerComponent,
    EmployeeComponent,
    LienComponent,
    MeasurementComponent,
    SupplierComponent,
    StateComponent,
    TypeEmployeeComponent,
    TypePaymentComponent,
    TypeSupplierComponent,
    ProcessTypeComponent,
    TaxRegimeComponent,
    SettingComponent,
    SectionComponent,
    StoreComponent
  ],
  exports: [
  ],
  imports: [
    CommonModule,
    ConfigurationRoutingModule,
    SharedModule
  ],
  providers: [],
  entryComponents: []
})
export class ConfigurationModule { }

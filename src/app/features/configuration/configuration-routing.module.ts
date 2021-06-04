import { MeasurementComponent } from './measurement/measurement.component';
import { RouterModule, Routes } from '@angular/router';
import { ConfigurationComponent } from './configuration.component';
import { NgModule, Component } from '@angular/core';

//Importaciones:componentes de configuration
import { CategoryComponent } from './category/category.component';
import { CustomerComponent } from './customer/customer.component';
import { CityComponent } from './city/city.component';
import { LienComponent } from './lien/lien.component';
import { SupplierComponent } from './supplier/supplier.component';
import { StateComponent } from './state/state.component';
import { StoreComponent } from './stores/stores.component';
import { EmployeeComponent } from './employee/employee.component';
import { TypePaymentComponent } from './type-payment/type-payment.component';
import { TypeSupplierComponent } from './type-supplier/type-supplier.component';
import { TypeEmployeeComponent } from './type-employee/type-employee.component';
import { ProcessTypeComponent } from './process-type/process-type.component';
import { TaxRegimeComponent } from './tax-regime/tax-regime.component';
import { SettingComponent } from './setting/setting.component';
import { SectionComponent } from './section/section.component';

const routes: Routes = [
  {
    path: '',
    component: ConfigurationComponent,
    children: [
      //Hijos del modulo de cofiguracion
      {
        path: 'categories',
        component: CategoryComponent,
      },
      {
        path: 'customers',
        component: CustomerComponent,
      },
      {
        path: 'employee',
        component: EmployeeComponent,
      },
      {
        path: 'suppliers',
        component: SupplierComponent,
      },
      {
        path: 'sections',
        component: SectionComponent
      },
      {
        path: 'cities',
        component: CityComponent,
      },
      {
        path: 'liens',
        component: LienComponent,
      },
      {
        path: 'measurements',
        component: MeasurementComponent,
      },
      {
        path: 'process_types',
        component: ProcessTypeComponent,
      },
      {
        path: 'states',
        component: StateComponent,
      },
      {
        path: 'stores',
        component: StoreComponent,
      },
      {
        path: 'settings',
        component: SettingComponent,
      },
      {
        path: 'type_employee',
        component: TypeEmployeeComponent,
      },
      {
        path: 'type_payment',
        component: TypePaymentComponent,
      },
      {
        path: 'type_supplier',
        component: TypeSupplierComponent,
      },
      {
        path: 'tax_regime',
        component: TaxRegimeComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationRoutingModule { }

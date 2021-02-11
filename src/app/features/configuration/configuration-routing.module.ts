import { MeasurementComponent } from './measurement/measurement.component';
import { RouterModule, Routes } from '@angular/router';
import { ConfigurationComponent } from './configuration.component';
import { NgModule, Component } from '@angular/core';

//Importaciones:componentes de configuration
import { CategoryComponent } from './category/category.component';
import { CustomerComponent } from './customer/customer.component';
import { CityComponent } from './city/city.component';
import { SupplierComponent } from './supplier/supplier.component';
import { SalesmanComponent } from './salesman/salesman.component';

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
        path: 'salesmen',
        component: SalesmanComponent,
      },
      {
        path: 'suppliers',
        component: SupplierComponent,
      },
      {
        path: 'cities',
        component: CityComponent,
      },
      {
        path: 'measurements',
        component: MeasurementComponent,
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationRoutingModule { }

import { RouterModule, Routes } from '@angular/router';
import { ProcessComponent } from './process.component';
import { NgModule } from '@angular/core';
import { SalesComponent } from './sales/sales.component';
import { purchasesComponent } from './purchases/purchases.component';
import { PayComponent } from './pay/pay.component';

const routes: Routes = [
  {
    path: '',
    component: ProcessComponent,
    children: [
      {
        path: 'sales',
        component: SalesComponent,
      },
      {
        path: 'purchases',
        component: purchasesComponent,
      },
      {
        path: 'pay',
        component: PayComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcessRoutingModule { }

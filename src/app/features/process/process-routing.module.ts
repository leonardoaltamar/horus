import { RouterModule, Routes } from '@angular/router';
import { ProcessComponent } from './process.component';
import { NgModule } from '@angular/core';
import { SalesComponent } from './sales/sales.component';

const routes: Routes = [
  {
    path: '',
    component: ProcessComponent,
    children: [
      {
        path: 'sales',
        component: SalesComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcessRoutingModule { }

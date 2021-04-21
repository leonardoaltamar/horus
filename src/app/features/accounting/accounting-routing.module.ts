import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AccountingComponent } from './accounting.component';
import { AccountComponent } from './account/account.component';
//Importaciones:componentes de configuration

const routes: Routes = [
  {
    path: '',
    component: AccountingComponent,
    children: [
      {
        path: 'accounts',
        component: AccountComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountingRoutingModule {}

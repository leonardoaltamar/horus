import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccountingRoutingModule } from './accounting-routing.module';
import { AccountingComponent } from './accounting.component';
import { AccountComponent } from './account/account.component';

import { SharedModule } from '@shared/shared.module';
@NgModule({
  declarations: [AccountingComponent, AccountComponent],
  exports: [],
  imports: [
    CommonModule,
    AccountingRoutingModule,
    SharedModule

  ],
  providers: [],
  entryComponents: [],
})
export class AccountingModule {}

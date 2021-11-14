import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProcessComponent } from './process.component';
import { SalesComponent } from './sales/sales.component';
import { purchasesComponent } from './purchases/purchases.component';
import { PayComponent } from './pay/pay.component';
import { EgressComponent } from './egress/egress.component';
import { ProcessRoutingModule } from './process-routing.module';

//shared
import { FormPayComponent } from '@shared/form-pay/form-pay.component';
import { SharedModule } from '@shared/shared.module';
//Theme Primeng
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

@NgModule({
  declarations: [
    ProcessComponent,
    purchasesComponent,
    SalesComponent,
    PayComponent,
    EgressComponent
  ],
  exports: [
  ],
  imports: [
    CommonModule,
    ProcessRoutingModule,
    SharedModule
  ],
  providers: [],
  entryComponents: []
})
export class ProcessModule { }

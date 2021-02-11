import { LoginComponent } from './login.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginRoutingModule } from './login-routing.module';
import { AppCommonModule } from '../../app.common.module';
import { ToastModule } from 'primeng/toast';

import { InputTextModule } from 'primeng/inputtext';
@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    AppCommonModule,
    InputTextModule,
    ToastModule
  ],
  declarations: [LoginComponent],
  exports: []
})
export class LoginModule { }

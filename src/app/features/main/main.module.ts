import { AppCommonModule } from './../../app.common.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import {CardModule} from 'primeng/card';
import { NgApexchartsModule } from "ng-apexcharts";
import { TableModule } from 'primeng/table';
import { BadgeModule } from 'primeng/badge';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MainRoutingModule,
    AppCommonModule,
    CardModule,
    NgApexchartsModule,
    TableModule,
    BadgeModule
  ],
  declarations: [MainComponent,],
  exports:[]
})
export class MainModule { }

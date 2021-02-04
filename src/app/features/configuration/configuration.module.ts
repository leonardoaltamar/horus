import { ConfigurationRoutingModule } from './configuration-routing.module';
import { ConfigurationComponent } from './configuration.component';
import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { CategoryComponent } from './category/category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Importaciones primeng
import { TableModule } from 'primeng/table';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@NgModule({
  declarations: [
    ConfigurationComponent,
    CategoryComponent
  ],
  exports: [
  ],
  imports: [
    CommonModule,
    ConfigurationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    //Importaciones Primeng
    DialogModule,
    TableModule,
    ProgressSpinnerModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    ConfirmDialogModule
  ],
  providers: [],
  entryComponents: []
})
export class ConfigurationModule { }

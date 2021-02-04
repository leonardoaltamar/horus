import { RouterModule, Routes } from '@angular/router';
import { ConfigurationComponent } from './configuration.component';
import { NgModule } from '@angular/core';

//Importaciones:componentes de configuration
import { CategoryComponent } from './category/category.component';

const routes: Routes = [
  {
    path: '',
    component: ConfigurationComponent,
    children: [
      //Hijos del modulo de cofiguracion
      {
        path: 'categorys',
        component: CategoryComponent,
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationRoutingModule { }

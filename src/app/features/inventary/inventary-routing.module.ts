import { ArticlesComponent } from './articles/articles.component';
import { RouterModule, Routes } from '@angular/router';
import { InventaryComponent } from './inventary.component';
import { ProductionComponent } from './production/production.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: InventaryComponent,
    children: [
      {
        path: 'articles',
        component: ArticlesComponent,
      },
      {
        path: 'productions',
        component: ProductionComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventaryRoutingModule { }

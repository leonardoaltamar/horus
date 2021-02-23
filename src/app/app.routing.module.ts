import { LayoutComponent } from './shared/layout/layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./features/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'main',
    component: LayoutComponent,
    loadChildren: () => import('./features/main/main.module').then(m => m.MainModule)
  },
  {
    path: 'inventary',
    component: LayoutComponent,
    children: [{
      path: '',
      loadChildren: () => import('./features/inventary/inventary.module').then(m => m.InventaryModule)
    }
    ]
  },
  {
    path: 'process',
    component: LayoutComponent,
    children: [{
      path: '',
      loadChildren: () => import('./features/process/process.module').then(m => m.ProcessModule)
    }
    ]
  },
  {
    path: 'configuration',
    component: LayoutComponent,
    children: [{
      path: '',
      loadChildren: () => import('./features/configuration/configuration.module').then(m => m.ConfigurationModule)
    }
    ]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

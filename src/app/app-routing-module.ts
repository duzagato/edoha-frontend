import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivateFn } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { Default } from './layout/default/default';

const routes: Routes = [
  {
    path: '',
    component: Default,
    children: [
      {
        path: 'login',
        loadChildren: () => import('./features/auth/auth-module').then(m => m.AuthModule)
      },
      {
        path: '',
        canActivate: [authGuard],
        loadChildren: () => import('./features/home/home-module').then(m => m.HomeModule)
      },
      { path: '**', redirectTo: '' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

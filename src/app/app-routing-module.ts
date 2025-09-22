import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { Default } from './layout/default/default';
import { UserModule } from './features/user/user-module';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./features/auth/auth-module').then(m => m.AuthModule),
  },

  {
    path: '',
    component: Default,
    children: [
      {
        path: '',
        canActivate: [authGuard],
        loadChildren: () => import('./features/home/home-module').then(m => m.HomeModule),
      },
      {
        path: 'usuarios',
        canActivate: [authGuard],
        loadChildren: () => import('./features/user/user-module').then(m => m.UserModule),
      },
    ],
  },

  // 404 global
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

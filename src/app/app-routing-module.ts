import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { Default } from './layout/default/default';
import { Blank } from './layout/blank/blank';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./features/auth/auth-module').then(m => m.AuthModule),
  },

  // Grupo com layout Default
  {
    path: '',
    component: Default,
    children: [
      {
        path: '',
        canActivate: [authGuard],
        loadChildren: () => import('./features/home/home-module').then(m => m.HomeModule),
      },
      // outras rotas com o Default layout aqui
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

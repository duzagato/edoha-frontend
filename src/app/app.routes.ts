import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { InstitutionComponent } from './features/institution/institution.component';
import { DefaultLayoutComponent } from './layouts/default/default.component';
import { HomeComponent } from './features/home/home.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'institution',
    component: InstitutionComponent,
    canActivate: [authGuard],
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'usuarios',
        loadChildren: () => import('./features/user/user.routes').then(m => m.userRoutes),
      },
      {
        path: 'rifas',
        loadChildren: () => import('./features/lottery/lottery.routes').then(m => m.lotteryRoutes),
      },
    ],
  },
  // Fallback client-side: redireciona rotas desconhecidas para a raiz.
  // O fallback server-side (404 → index.html) deve ser configurado no CloudFront (Etapa 03).
  {
    path: '**',
    redirectTo: '',
  },
];


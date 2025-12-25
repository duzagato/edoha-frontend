import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { DefaultLayoutComponent } from './layouts/default/default.component';
import { HomeComponent } from './features/home/home.component';
import { authGuard } from './core/guards/auth.guard';
import { UserListComponent } from './features/user/user-list/user-list.component';
import { UserFormComponent } from './features/user/user-form/user-form.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
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
        path: 'users',
        component: UserListComponent,
      },
      {
        path: 'users/new',
        component: UserFormComponent,
      },
      {
        path: 'users/:id/edit',
        component: UserFormComponent,
      },
      {
        path: 'rifas',
        loadChildren: () => import('./features/lottery/lottery.routes').then(m => m.lotteryRoutes),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];


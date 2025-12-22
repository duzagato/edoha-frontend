import { Routes } from '@angular/router';
import { GerenciarComponent } from './gerenciar/gerenciar.component';
import { AdicionarComponent } from './adicionar/adicionar.component';

export const lotteryRoutes: Routes = [
  {
    path: 'gerenciar',
    component: GerenciarComponent,
  },
  {
    path: 'adicionar',
    component: AdicionarComponent,
  },
  {
    path: '',
    redirectTo: 'gerenciar',
    pathMatch: 'full',
  },
];

import { Routes } from '@angular/router';
import { GerenciarComponent } from './gerenciar/gerenciar.component';
import { AdicionarComponent } from './adicionar/adicionar.component';
import { ResumoComponent } from './detail/resumo/resumo.component';
import { GerenciarDetailComponent } from './detail/gerenciar/gerenciar.component';
import { RetiradaComponent } from './detail/retirada/retirada.component';
import { VendaComponent } from './detail/venda/venda.component';

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
    path: ':id/resumo',
    component: ResumoComponent,
  },
  {
    path: ':id/gerenciar',
    component: GerenciarDetailComponent,
  },
  {
    path: ':id/retirada',
    component: RetiradaComponent,
  },
  {
    path: ':id/venda',
    component: VendaComponent,
  },
  {
    path: '',
    redirectTo: 'gerenciar',
    pathMatch: 'full',
  },
];

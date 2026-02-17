import { Routes } from '@angular/router';
import { GerenciarComponent } from './gerenciar/gerenciar.component';
import { AdicionarComponent } from './adicionar/adicionar.component';
import { ResumoComponent } from './resumo/resumo.component';
import { GerenciarTaloesComponent } from './gerenciar-taloes/gerenciar-taloes.component';
import { GerenciarNumerosComponent } from './gerenciar-numeros/gerenciar-numeros.component';
import { RetiradaTalaoComponent } from './retirada-talao/retirada-talao.component';
import { DevolucaoTalaoComponent } from './devolucao-talao/devolucao-talao.component';
import { VendaNumeroComponent } from './venda-numero/venda-numero.component';
import { VendaTalaoComponent } from './venda-talao/venda-talao.component';

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
    path: ':id/gerenciar-taloes',
    component: GerenciarTaloesComponent,
  },
  {
    path: ':id/gerenciar-numeros',
    component: GerenciarNumerosComponent,
  },
  {
    path: ':id/retirada-talao',
    component: RetiradaTalaoComponent,
  },
  {
    path: ':id/devolucao-talao',
    component: DevolucaoTalaoComponent,
  },
  {
    path: ':id/venda-numero',
    component: VendaNumeroComponent,
  },
  {
    path: ':id/venda-talao',
    component: VendaTalaoComponent,
  },
  {
    path: '',
    redirectTo: 'gerenciar',
    pathMatch: 'full',
  },
];

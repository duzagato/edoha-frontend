import { Routes } from '@angular/router';
import { GerenciarComponent } from './gerenciar/gerenciar.component';
import { AdicionarComponent } from './adicionar/adicionar.component';
import { EditarComponent } from './editar/editar.component';

export const userRoutes: Routes = [
  {
    path: 'gerenciar',
    component: GerenciarComponent,
  },
  {
    path: 'adicionar',
    component: AdicionarComponent,
  },
  {
    path: 'editar/:id',
    component: EditarComponent,
  },
  {
    path: '',
    redirectTo: 'gerenciar',
    pathMatch: 'full',
  },
];

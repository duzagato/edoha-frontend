import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Gerenciar } from './gerenciar/gerenciar';
import { Adicionar } from './adicionar/adicionar';

const routes: Routes = [
  { path: 'gerenciar', component: Gerenciar },
  { path: 'adicionar', component: Adicionar }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Gerenciar } from './gerenciar/gerenciar';

const routes: Routes = [
  { path: 'gerenciar', component: Gerenciar }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }

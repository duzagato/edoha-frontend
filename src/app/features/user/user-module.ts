import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing-module';
import { Gerenciar } from './gerenciar/gerenciar';


@NgModule({
  declarations: [
    Gerenciar
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }

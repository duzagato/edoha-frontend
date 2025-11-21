import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing-module';
import { SharedModule } from '../../shared/shared-module';
import { Gerenciar } from './gerenciar/gerenciar';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { Adicionar } from './adicionar/adicionar';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    Gerenciar,
    Adicionar
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class UserModule { }

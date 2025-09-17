import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Default } from './default/default';
import { Blank } from './blank/blank';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    Default,
    Blank
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    Default,
    Blank
  ]
})
export class LayoutModule { }

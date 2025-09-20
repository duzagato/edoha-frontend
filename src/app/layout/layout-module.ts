import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { Default } from './default/default';
import { Blank } from './blank/blank';
import { RouterModule } from '@angular/router';
import { SideNavbar } from './default/side-navbar/side-navbar';

@NgModule({
  declarations: [
    Default,
    Blank,
    SideNavbar
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule
  ],
  exports: [
    Default,
    Blank
  ]
})
export class LayoutModule { }

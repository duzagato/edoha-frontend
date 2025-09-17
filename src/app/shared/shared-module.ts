import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeToggleComponent } from './components/theme-toggle/theme-toggle';


@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    ThemeToggleComponent
  ],
  exports: [
    ThemeToggleComponent
  ]
})
export class SharedModule { }

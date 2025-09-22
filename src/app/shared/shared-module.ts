import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeToggleComponent } from './components/theme-toggle/theme-toggle';
import { Insert } from './components/crud/insert/insert';


@NgModule({
  declarations: [
    
  
    Insert
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

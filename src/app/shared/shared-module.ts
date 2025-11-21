import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ThemeToggleComponent } from './components/theme-toggle/theme-toggle';
import { Insert } from './components/crud/insert/insert';
import { DynamicForm } from './components/dynamic-form/dynamic-form';

@NgModule({
  declarations: [ 
    Insert, DynamicForm
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule, 
    ThemeToggleComponent
  ],
  exports: [
    ReactiveFormsModule, 
    ThemeToggleComponent,
    Insert,
    DynamicForm
  ]
})
export class SharedModule { }

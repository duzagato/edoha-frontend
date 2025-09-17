import { Injectable } from '@angular/core';
import { CacheKeys } from '../../../shared/constants/cache-keys';
import { DataKeys } from './../../../shared/constants/data-keys';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  constructor(){
    const savedTheme = localStorage.getItem(CacheKeys.THEME) || 'dark';
    this.setTheme(savedTheme);
  }

  setTheme(theme: string){
    document.documentElement.setAttribute(DataKeys.THEME, theme);
    localStorage.setItem(CacheKeys.THEME, theme);
  }

  toggleTheme(){
    const currentTheme = document.documentElement.getAttribute(DataKeys.THEME);
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
  }

  getTheme(): string{
    const theme = document.documentElement.getAttribute(DataKeys.THEME) === null ? 'dark' : document.documentElement.getAttribute(DataKeys.THEME);

    return theme!;
  }
}
